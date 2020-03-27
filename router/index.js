import { Router } from "express";

import UserController from "../controller/UserController";

const routes = new Router();

routes.post("/v1/users", UserController.register);
routes.get("/v1/users/:id", UserController.search);

export default routes;
