import express, { Express } from 'express';
import http from 'http';
import dotenv from 'dotenv';

import { port } from '../../config/constants/server';
import Router from '../routes';
import Middleware from '../middlewares';

export class Server {
  static app: Express = express();
  static httpServer: http.Server = http
    .createServer(Server.app)
    .listen(port, () => {
      console.log('Server started...');
    });

  static start() {
    dotenv.config();

    Middleware.setMiddlewares();
    Router.setRoutes();
  }
}
