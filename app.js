import express from 'express';
import cors from 'cors';

import routes from './router';
import './helper/db';
import './helper/socket';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
	this.routes();
  }

  middlewares() {
    this.server.use(express.json());
	this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;