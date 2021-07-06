import { Server, Socket } from 'socket.io';

import { server } from './server';
import { server as serverConfig } from '../../config/constants';

interface ExtSocket extends Socket {
  username: string;
}

const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === 'development'
        ? serverConfig.devUrl
        : serverConfig.prodUrl,
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['lilo-chat-cors'],
  },
});

io.on('connection', (socket) => {
  console.log(`An user (${socket.id}) has connected`);

  socket.on('disconnect', () => {
    const extSocket = <ExtSocket>socket;
    console.log(
      `User ${extSocket.username} (${extSocket.id}) has disconnected`
    );
    extSocket.broadcast.emit('receiveMessage', {
      message: `${extSocket.username} saiu da sala!`,
      author: extSocket.username,
      type: 'system',
    });
  });

  socket.on('joinRoom', (message) => {
    const extSocket = <ExtSocket>socket;
    extSocket.username = message.author;
    extSocket.broadcast.emit('receiveMessage', message);
  });

  socket.on('sendMessage', (message) => {
    socket.broadcast.emit('receiveMessage', message);
  });
});
