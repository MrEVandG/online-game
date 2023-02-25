const socket = io("/")
const message = document.getElementById("message")
const send = document.getElementById("send-message")
const name = document.getElementById("name")
const messages = document.getElementById("messages")
const clear = document.getElementById("clear")
let shiftDown = false
send.onclick = function () {
    if (message.value !== "" && name.value !== "") {
        socket.emit("message", `${name.value}: ${message.value}<br>`)
        message.value = ""
    }
}
clear.onclick=()=>{
    socket.emit("clear",name.value)
}
message.onkeydown=e=>{
    if (e.key=="Shift") shiftDown = true;
    if (e.key=="Enter") {
        if (shiftDown) {
            message.value+='\n'
        } else {
            send.onclick()
        }
    }
}
message.onkeyup=e=>{
    if (e.key=="Shift") shiftDown = false;
}
socket.on("message", data => {
    messages.innerHTML += data.content
})
socket.on("clear",user=>{
    messages.innerHTML = `${user} cleared the chat.<br>`
})