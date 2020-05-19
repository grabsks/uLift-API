import { Router } from "express";

import UserController from "../controller/UserController";
import SessionController from "../controller/SessionController";

const routes = new Router();

routes.post("/v1/users", UserController.register);
routes.post("/v1/sessions", SessionController.store);

routes.get("/v1/users/:id", UserController.search);

export default routes;
