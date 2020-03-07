import { Router } from 'express';

import Hello from '../handler/hello'

const routes = new Router();

routes.get('/hello', Hello.main);

export default routes;