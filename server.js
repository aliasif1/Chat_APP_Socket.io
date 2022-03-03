const io = require('socket.io')(3000, { origins: '*:*'})

const users = {};

io.on('connection', socket => {
    // when a user connects (new connection)
    console.log('user connected')

    socket.on('user-joined', (user) => {
        users[socket.id] = user;
        socket.broadcast.emit('user-connected', user)
    }) 
    // socket.emit('user-connected', 'Connected to Server');

    // when a new message is received
    socket.on('user-message', (msg) => {
        console.log(socket.id);
        console.log(msg);

        // broadcast the message to other connected users 
        socket.broadcast.emit('new-message', {
            name: users[socket.id],
            contents: msg
        });
    });

});