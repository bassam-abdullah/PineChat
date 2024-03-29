const express = require("express")
const socketio = require("socket.io")
const http = require("http")
const cors = require("cors")
const {addUser, removeUser, getUser, getUsersInRoom} = require("./users.js")
const router = require("./router")

const PORT = process.env.PORT || 4000

const app = express()
const server = http.createServer(app)
const io = socketio(server, { cors: { origin: '*' } })

app.use(router)
app.use(cors())


io.on('connection', (socket) => {
    console.log("New connection");

    socket.on('join', ({name, room}, callBack) => {
        console.log("Name: " + name + "\nRoom: " + room);

        const {error, user} = addUser({id: socket.id, name, room})

        if(error) return callBack(error)

        socket.join(user.room)

        // Admin generated messages
        socket.emit('message', {user: "🤖", text: `${user.name}, welcome to ${user.room}`})
        socket.broadcast.to(user.room).emit('message', { user: "🤖", text: `${user.name} has joined!` });

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
        callBack()
    })


    socket.on('sendMessage', (message, callBack) => {
        let user = getUser(socket.id)  

        io.to(user.room).emit('message', {user: user.name, text: message})

        callBack()
    })


    socket.on('disconnect', () => {
        let user = removeUser(socket.id)
        
        if(user) {
            io.to(user.room).emit('message', {user: "🤖", text: `${user.name} has left.`})
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
})


server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

