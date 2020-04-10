import { Service as IService } from '../../types';
import { Request, Response } from 'express';

export default class Controller {
  service: IService;
  constructor(service: IService) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const result = await this.service.getAll(req.query);
    return res.status(result.statusCode).send(result.data);
  }

  async insert(req: Request, res: Response): Promise<Response> {
    const result = await this.service.insert(req.body);
    return res.status(result.statusCode).send(result.data);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const result = await this.service.update(req.params.id, req.query);
    return res.status(result.statusCode).send(result.data);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const result = await this.service.delete(req.params.id);
    return res.status(result.statusCode).send(result.data);
  }
}
