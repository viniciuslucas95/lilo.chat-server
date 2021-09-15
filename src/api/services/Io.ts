import { Server as IoServer, Socket } from 'socket.io';

import { devUrl, prodUrl } from '../../config/constants/server';
import { Server } from '.';

interface ExtSocket extends Socket {
  username: string;
}

interface IMessage {
  message: string;
  author: string;
  type: Type;
}

enum Type {
  system = 'system',
  author = 'author',
  self = 'self',
}

export class Io {
  static server = new IoServer(Server.httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'development' ? devUrl : prodUrl,
      methods: ['GET', 'POST'],
      credentials: true,
      allowedHeaders: ['lilo-chat-cors'],
    },
  });

  static start() {
    Io.server.on('connection', (socket) => {
      const extSocket = <ExtSocket>socket;
      console.log(`An user (${extSocket.id}) has connected`);

      extSocket.on('joinRoom', (message: IMessage) => {
        extSocket.username = message.author;
        extSocket.broadcast.emit('receiveMessage', message);
      });

      extSocket.on('sendMessage', (message: IMessage) => {
        extSocket.broadcast.emit('receiveMessage', message);
      });

      extSocket.on('disconnect', () => {
        console.log(
          `User ${extSocket.username} (${extSocket.id}) has disconnected`
        );

        extSocket.broadcast.emit('receiveMessage', {
          message: `${extSocket.username} saiu da sala!`,
          author: extSocket.username,
          type: Type.system,
        });
      });
    });
  }
}
