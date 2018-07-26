const path = require("path");
const express = require("express");
const http = require("http");
const SocketIO = require("socket.io");
const {generateMessage} = require("./utils/message.js");
const publicPath = path.join(__dirname , "../public");


var app = express();
var port = process.env.PORT || 8888
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = SocketIO(server);

io.on("connection" , (socket)=>{
  console.log("New user connected");
  socket.on("disconnect" , () =>{
    console.log("User disconnected");
  });

 socket.emit("newMessage", generateMessage("Admin","Welcome Vijay"));

 socket.broadcast.emit("newMessage", generateMessage("Admin","Vijay Joined"));


  socket.on("createMessage" , (message) => {
      io.emit("newMessage", generateMessage(message.from,message.text));
});

});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
