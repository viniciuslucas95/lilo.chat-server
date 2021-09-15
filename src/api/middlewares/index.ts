import express, { Express } from 'express';

import { __public } from '../../config/constants/path';

import { Server } from '../services';

export default class Middleware {
  static setMiddlewares() {
    if (process.env.NODE_ENV !== 'development')
      Server.app.use(express.static(__public));

    Server.app.use(express.json());
  }
}
