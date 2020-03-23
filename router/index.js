import { Router } from 'express';

import Hello from '../controller/hello'
import UserController from '../controller/UserController'

const routes = new Router();

routes.get('/hello', Hello.main);
routes.post('/v1/users', UserController.register);

export default routes;