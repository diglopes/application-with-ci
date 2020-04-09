import express from 'express';
import './database';

const server = express();
server.use(express.json());

export default server;
