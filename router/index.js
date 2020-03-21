import { Router } from 'express';

import Hello from '../controller/hello'
import User from '../controller/user'

const routes = new Router();

routes.get('/hello', Hello.main);
routes.post('/v1/user', User.post);

export default routes;