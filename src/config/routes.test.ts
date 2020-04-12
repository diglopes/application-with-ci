/* eslint jest/expect-expect: 0 */

import server from './server';
import request from 'supertest';
import mongoose from 'mongoose';
import Toy from '../models/toy';

describe('Routes', () => {
  afterAll(async () => {
    const toy = new Toy();
    const toyModel = toy.getInstance();
    toyModel.deleteMany({});
  });

  it('should create a resource', async () => {
    await request(server)
      .post('/api/toy')
      .send({
        name: 'Playstation',
        description: 'A video game',
        minimumAge: 6,
      })
      .expect(201)
      .then(() => {
        mongoose.disconnect();
      });
  });
});
