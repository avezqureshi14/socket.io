const express = require("express")
const { Server } = require('socket.io')
const { createServer } = require("http")
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.get('/', (req, res) => {
    res.send({ message: "Hello World" })
})

io.on("connection", (socket) => {
    //send by one being received by everyone , except the sender
    // socket.on("message", (data) => {
    //     socket.broadcast.emit("receive-message", data);
    // })



    //join a particular room : so here we are creating our own room and allowing user to enter there 
    socket.on("join-room", (roomName) => {
        socket.join(roomName);
        console.log(`User joined room ${roomName}`)
    })


    //send by one and received by another particular one
    //even it can be sent to group of people
    socket.on("message", ({ message, receiverRoomId }) => {
        socket.to(receiverRoomId).emit("receive-message", message);
    })
})

server.listen(8000, () => {
    console.log("Server is listening on PORT 8000")
})


// emit is usually done from frontend

// https://www.youtube.com/watch?v=-MlXwb42nKo => decuople ur nest js code 