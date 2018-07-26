const path = require("path");
const express = require("express");
const http = require("http");
const SocketIO = require("socket.io");
const {generateMessage,generateLocationMessage} = require("./utils/message.js");
const publicPath = path.join(__dirname , "../public");


var app = express();
var port = process.env.PORT || 5555
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = SocketIO(server);

io.on("connection" , (socket)=>{
  console.log("New user connected");
  socket.on("disconnect" , () =>{
    console.log("User disconnected");
  });

socket.emit("newMessage", generateMessage("Admin","Welcome to the chat app"));

 socket.broadcast.emit("newMessage", generateMessage("Admin","User Joined"));


  socket.on("createMessage" , (message , callback) => {
      io.emit("newMessage", generateMessage(message.from,message.text));
      callback("Event acknowledged");
});

socket.on("createGeolocationMessage" ,(position) => {
  console.log("Server ",position);
  io.emit("newLocationMessage",generateLocationMessage("Admin",`${position.latitude}` , `${position.longitude}`));
});

});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
