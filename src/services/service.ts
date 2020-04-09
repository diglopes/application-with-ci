import mongoose, { Model, Document } from 'mongoose';
import chalk from 'chalk';
import { Query, ServiceResponse, ServiceError } from '../../types';

export default class Service {
  model: Model<Document>;

  constructor() {
    this.getAll = this.getAll.bind(this);
  }

  async getAll(query: Query): Promise<ServiceResponse | ServiceError> {
    const { skip = 0, limit = 0 } = query;

    delete query.skip;
    delete query.limit;

    if (query.id) {
      try {
        query._id = new mongoose.mongo.ObjectId(query._id);
      } catch (error) {
        console.log('>>', chalk.red('not able to generate mongoose id with content', query._id));
      }
    }

    try {
      const items = await this.model.find(query).skip(skip).limit(limit);
      const total = await this.model.count({});

      return {
        error: false,
        statusCode: 200,
        data: items,
        total,
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        message: errors.errmsg || 'Not able to list items.',
        errors,
      };
    }
  }

  async insert(data: object): Promise<ServiceResponse | ServiceError> {
    try {
      const item = await this.model.create(data);
      if (item) {
        return {
          error: false,
          statusCode: 201,
          data: item,
        };
      }
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        message: errors.errmsg || 'Not able to create item.',
        errors: errors,
      };
    }
  }

  async update(id: string, data: object): Promise<ServiceResponse | ServiceError> {
    try {
      const item = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {
        error: false,
        statusCode: 202,
        data: item,
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        message: errors.errmsg || 'Not able to create item.',
        errors: errors,
      };
    }
  }
}
