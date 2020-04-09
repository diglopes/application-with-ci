import { Document } from 'mongoose';

export interface Toy extends Document {
  name: string;
  description: string;
  minimumAge: number;
}
