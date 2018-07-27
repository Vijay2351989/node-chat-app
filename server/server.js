const path = require("path");
const express = require("express");
const http = require("http");
const SocketIO = require("socket.io");
const {generateMessage,generateLocationMessage} = require("./utils/message.js");
const {isValidString} = require("./utils/validation.js");
const {Users} = require("./utils/users.js");
const publicPath = path.join(__dirname , "../public");

var users = new Users();
var app = express();
var port = process.env.PORT || 4567
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = SocketIO(server);

io.on("connection" , (socket)=>{
  console.log("New user connected");
  socket.on("disconnect" , () =>{
    var user = users.removeUser(socket.id);
    io.to(user.room).emit("updateUserList" , users.getUserList(user.room));
    io.to(user.room).emit("newMessage" , generateMessage('Admin',`${user.name} has left.`));
  });

  socket.on("join" , (params,callback) => {
      if(!(isValidString(params.name) && isValidString(params.room)))
      {
        callback("Name and room is required.");
      }
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id,params.name,params.room);
      io.to(params.room).emit("updateUserList" , users.getUserList(params.room));
      socket.emit("newMessage", generateMessage("Admin","Welcome to the chat app"));
      socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin",`${params.name} has joined.`));
      callback();
  });

  socket.on("createMessage" , (message , callback) => {
      var user = users.getUser(socket.id);
      io.to(user.room).emit("newMessage", generateMessage(message.from,message.text));
      callback("Event acknowledged");
});

socket.on("createGeolocationMessage" ,(position) => {
  var user = users.getUser(socket.id);
  io.to(user.room).emit("newLocationMessage",generateLocationMessage("Admin",`${position.latitude}` , `${position.longitude}`));
});

});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
