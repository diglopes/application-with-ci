import ToyController from '../controllers/toy-controller';
import { Application } from 'express';

export default (server: Application): void => {
  server.get('/api/toy', ToyController.getAll);
  server.post('/api/toy', ToyController.insert);
  server.put('/api/toy/:id', ToyController.update);
  server.delete('/api/toy/:id', ToyController.delete);
};
