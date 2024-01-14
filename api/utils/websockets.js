
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

    socket.on('join_room', (data) => {
        socket.join(data.room)
    })

    socket.on('new_message', (data) => {
        teamChat.to(data.room).emit("update_feed", data.chat)
    })

    socket.on('disconnect', (data) => {
        socket.broadcast.to(data.room).emit('offline', `User as left the chat.`)
    });
})


server.listen(3030, () => {
    console.log('Listening on port 3030');
});
