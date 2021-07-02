const socket = io();

const sendButton = document.getElementById('button');
const messageInput = document.getElementById('input');
const messageBox = document.getElementById('msgBox');

sendButton.addEventListener('click', () => {
  event.preventDefault();

  const messageObj = {
    message: messageInput.value,
  };

  socket.emit('sendMessage', messageObj);
});

socket.on('receiveYourMessage', ({ message }) => {
  const messageElement = document.createElement('span');
  messageElement.className = 'yourMsg';
  messageElement.innerHTML = message;
  messageBox.append(messageElement);
});

socket.on('receiveOtherMessage', ({ message }) => {
  const messageElement = document.createElement('span');
  messageElement.className = 'otherMsg';
  messageElement.innerHTML = message;
  messageBox.append(messageElement);
});
