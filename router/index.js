import { Router } from 'express';

import Hello from '../controller/hello'

const routes = new Router();

routes.get('/hello', Hello.main);

export default routes;