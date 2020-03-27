import { Router } from "express";

import Hello from "../controller/hello";
import UserController from "../controller/UserController";

const routes = new Router();

routes.post("/v1/users", UserController.register);

export default routes;
