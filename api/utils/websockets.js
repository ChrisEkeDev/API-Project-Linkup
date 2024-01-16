
const http = require('http');
const { Server } = require('socket.io');
const app = require('../app');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

const teamChat = io.of('/team');
const sessionChat = io.of('/session');

teamChat.on('connection', (socket) => {
    console.log(`User online - ${socket.id}`)

    socket.on('join_room', (room) => {
        socket.join(room)
    })

    socket.on('new_message', (room) => {
        teamChat.to(room).emit("update_feed")
    })

    socket.on('update_message', (room) => {
        teamChat.to(room).emit("update_feed")
    })

    socket.on('delete_message', (room) => {
        teamChat.to(room).emit("update_feed")
    })

    socket.on('disconnect', (room) => {
        socket.broadcast.to(room).emit('offline')
    });
})


server.listen(3030, () => {
    console.log('Listening on port 3030');
});
