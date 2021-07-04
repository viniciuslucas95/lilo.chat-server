import express from 'express';
import http from 'http';

import { __public } from '../../config/constants/path';
import { port } from '../../config/constants/server';

const app = express();
export const server = http.createServer(app);

app.use(express.static(__public));
app.use(express.json());

server.listen(port, () => {
  console.log('Server started...');
});
