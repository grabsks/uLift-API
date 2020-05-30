import express from "express";
import cors from 'cors';
import fileupload from "express-fileupload";

import routes from "./router";
import "./helper/db";
import Socket from "./helper/socket";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    new Socket();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(fileupload());
    this.server.use(cors({ origin: '*' }));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
