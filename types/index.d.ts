import { Document, Types } from 'mongoose';

export interface Toy extends Document {
  name: string;
  description: string;
  minimumAge: number;
}

export interface Query {
  id?: string;
  skip?: number;
  limit?: number;
  _id?: Types.ObjectId;
  [key: string]: any /*eslint-disable-line*/;
}

export interface Service {
  getAll(query: Query): Promise<ServiceResponse>;
  insert(data: object): Promise<ServiceResponse>;
  update(id: string, data: object): Promise<ServiceResponse>;
  delete(id: string): Promise<ServiceResponse>;
}

export interface ServiceResponse {
  error: boolean;
  statusCode: number;
  data?: Array<Document>;
  message?: string;
  total?: number;
}
