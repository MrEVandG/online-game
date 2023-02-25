const express = require("express")
const socket = require("socket.io")

const app = express()
const port = 3000
app.use(express.static("public"))
const server = app.listen(port,()=>console.log("Started on Port "+port))

// socket.io
const io = new socket.Server(server)
io.on("connection",stream=>{
    stream.on("message", data=>{
        io.streams.emit("message",data)
    })
})