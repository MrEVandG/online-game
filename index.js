const express = require("express")
const socket = require("socket.io")

const app = express()
const port = 3000
app.use(express.static("public"))
const server = app.listen(port,()=>console.log("Started on Port "+port))
let messages = []
// socket.io
const io = new socket.Server(server)
io.on("connection",stream=>{
    for (const msg of messages) {
        stream.emit("message",msg)
    }
    stream.on("clear",user=>{
        messages = []
        io.sockets.emit("clear",user)
    })
    stream.on("message", data=>{
        messages.push({content:data})
        io.sockets.emit("message",{content:data})
    })
})