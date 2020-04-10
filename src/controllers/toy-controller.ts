import Controller from './controller';
import ToyService from '../services/toy-service';
import Toy from '../models/toy';
import { Service as IService } from '../../types';

const toyService = new ToyService(new Toy().getInstance());

class ToyController extends Controller {
  service: IService;
  constructor(service: IService) {
    super(service);
  }
}

export default new ToyController(toyService);
