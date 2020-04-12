/* eslint jest/expect-expect: 0 */

import mongoose from 'mongoose';
import server from './server';
import request from 'supertest';

describe('Routes', () => {
  afterAll(async () => {
    mongoose.disconnect();
  });

  it('should create a resource', async () => {
    await request(server)
      .post('/api/toy')
      .send({
        name: 'Playstation',
        description: 'A video game',
        minimumAge: 6,
      })
      .expect(201);
  });

  it('should get all items from resource', async () => {
    await request(server).get('/api/toy').expect(200);
  });
});
