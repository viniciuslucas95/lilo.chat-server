import { Server } from 'socket.io';

import { server } from './server';

const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`An user (${socket.id}) has connected`);

  socket.on('disconnect', () => {
    console.log(`An user (${socket.id}) has disconnected`);
  });

  socket.on('sendMessage', (message) => {
    socket.emit('receiveYourMessage', message);
    socket.broadcast.emit('receiveOtherMessage', message);
  });
});
