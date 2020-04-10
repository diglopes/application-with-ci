import express from 'express';
import setRoutes from './routes';
import './database';

const server = express();
server.use(express.json());
setRoutes(server);

export default server;
