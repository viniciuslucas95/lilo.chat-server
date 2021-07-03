import { Server } from 'socket.io';

import { server } from './server';

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['lilo-chat-cors'],
  },
});

io.on('connection', (socket) => {
  console.log(`An user (${socket.id}) has connected`);

  socket.on('disconnect', () => {
    console.log(`An user (${socket.id}) has disconnected`);
  });

  socket.on('sendMessage', (message) => {
    socket.broadcast.emit('receiveMessage', message);
  });
});
