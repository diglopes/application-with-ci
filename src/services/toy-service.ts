import Service from './service';
import { Model, Document } from 'mongoose';

export default class ToyService extends Service {
  constructor(model: Model<Document>) {
    super(model);
  }
}
