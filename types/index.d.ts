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
}

export interface ServiceResponse {
  error: boolean;
  statusCode: number;
  data: object;
  total?: number;
}

export interface ServiceError {
  error: boolean;
  statusCode: number;
  message: string;
  errors?: object;
}
