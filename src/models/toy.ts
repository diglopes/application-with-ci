import mongoose, { Schema, Model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { Toy as IToy } from '../../types';

export default class Toy {
  toySchema: Schema = null;

  initSchema(): void {
    this.toySchema = new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        minimumAge: {
          type: Number,
          required: true,
        },
      },
      { timestamps: true },
    );
    this.toySchema.plugin(uniqueValidator);
    mongoose.model('toys', this.toySchema);
  }

  getInstance(): Model<IToy> {
    this.initSchema();
    return mongoose.model('toys');
  }
}
