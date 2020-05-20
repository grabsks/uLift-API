import express from "express";

import routes from "./router";
import "./helper/db";
import Socket from "./helper/socket";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.socket = new Socket();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
