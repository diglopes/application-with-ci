import Service from './service';
import Toy from '../models/toy';
import '../config/database';
import mongoose from 'mongoose';
import { Service as IService, ServiceResponse } from '../../types';

const TOY_MOCK = {
  name: 'Ball',
  description: 'Just a rounded object',
  minimumAge: 1,
};
const toy = new Toy();
const toyModel = toy.getInstance();

const makeSut = (): IService => {
  const service = new Service(toyModel);
  return service;
};

describe('Service', () => {
  afterAll(() => {
    mongoose.disconnect();
    toyModel.deleteMany({});
  });

  it('should create an item on database', async () => {
    const sut = makeSut();
    const response: ServiceResponse = await sut.insert(TOY_MOCK);
    expect(response.statusCode).toBe(201);
  });

  it('should get items', async () => {
    const sut = makeSut();
    const response: ServiceResponse = await sut.getAll({ name: TOY_MOCK.name });
    expect(response.statusCode).toBe(200);
  });

  it('should update an item by id', async () => {
    const sut = makeSut();
    const toys: ServiceResponse = await sut.getAll({ name: TOY_MOCK.name });
    const id: string = toys.data[0]._id;
    const response: ServiceResponse = await sut.update(id, { name: 'any_new_name' });
    expect(response.statusCode).toBe(202);
  });

  it('should delete an item by id', async () => {
    const sut = makeSut();
    const toys: ServiceResponse = await sut.getAll({ name: TOY_MOCK.name });
    const id: string = toys.data[0]._id;
    const response: ServiceResponse = await sut.delete(id);
    expect(response.statusCode).toBe(200);
    expect(response.message).toBe('Resource deleted successfully');
  });
});
