const stream = (socket) => {
    socket.on('subscribe', (data) => {
        socket.join(data.room);
        socket.join(data.socketId);

        if (socket.adapter.rooms[data.room].length > 1) {
            socket.to(data.room).emit('new user', { socketId: data.socketId });
            console.log("User " + data.socketId + " connected " + "room :" + data.room);

        }
        socket.on('disconnect', () => {
            console.log("user " + socket.id + ' disconnect room :' + data.room);
        });
    });




    socket.on('newUserStart', (data) => {
        socket.to(data.to).emit('newUserStart', { sender: data.sender });
    });

    socket.on('listuser', (data) => {
        console.log(data);
    });

    socket.on('sdp', (data) => {
        socket.to(data.to).emit('sdp', { description: data.description, sender: data.sender });
    });


    socket.on('ice candidates', (data) => {
        socket.to(data.to).emit('ice candidates', { candidate: data.candidate, sender: data.sender });
    });


    socket.on('chat', (data) => {
        socket.to(data.room).emit('chat', { sender: data.sender, msg: data.msg });
    });
};

module.exports = stream;
