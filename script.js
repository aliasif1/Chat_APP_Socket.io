const socket = io('http://localhost:3000', { transports : ['websocket'] });
const messageform = document.getElementById('messageForm');
const messageText = document.getElementById('textInput');
const messageContainer = document.getElementById('messages');

let user = prompt('enter your name');
while (user === '' || user === null){
    user = prompt('enter a valid username');
}
socket.emit('user-joined', user);
appendToMessages('You Joined');

messageform.addEventListener('submit', e => {
    e.preventDefault();
    message = messageText.value;
    messageText.value = '';
    appendToMessages(`you: ${message}`);
    sendMessage(message);
});

// When a new user joins
socket.on('user-connected', data => {
    console.log(`${data} connected`);
});

// When a new message is received
socket.on('new-message', data => {
    let formattedMessage = `${data.name}: ${data.contents}`;
    appendToMessages(formattedMessage);
});

// send a new message
function sendMessage(message){
    socket.emit('user-message', message);
}

// Append to the messages container 
function appendToMessages(data){
    var element = document.createElement('div');
    element.innerText = data;
    messageContainer.append(element);
}

