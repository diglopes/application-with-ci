import mongoose, { Model, Document } from 'mongoose';
import chalk from 'chalk';
import { Query, ServiceResponse, Service as IService, Toy } from '../../types';

export default class Service implements IService {
  model: Model<Document>;
  constructor(theModel: Model<Document>) {
    this.model = theModel;
    this.getAll = this.getAll.bind(this);
  }

  public async getAll(query: Query): Promise<ServiceResponse> {
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
        data: errors,
      };
    }
  }

  public async insert(data: Toy): Promise<ServiceResponse> {
    try {
      const item = await this.model.create(data);
      if (item) {
        return {
          error: false,
          message: 'Resource created successfully',
          statusCode: 201,
          data: [item],
        };
      }
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        message: errors.errmsg || 'Not able to create item.',
        data: errors,
      };
    }
  }

  public async update(id: string, data: object): Promise<ServiceResponse> {
    try {
      const item = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {
        error: false,
        statusCode: 202,
        data: [item],
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        message: errors.errmsg || 'Not able to create item.',
        data: errors,
      };
    }
  }

  public async delete(id: string): Promise<ServiceResponse> {
    try {
      const item = await this.model.findByIdAndDelete(id);
      if (!item)
        return {
          error: true,
          statusCode: 404,
          message: 'item not found',
        };

      return {
        error: false,
        statusCode: 200,
        data: [item],
        message: 'Resource deleted successfully',
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        message: errors.errmsg || 'Not able to create item.',
        data: errors,
      };
    }
  }
}
