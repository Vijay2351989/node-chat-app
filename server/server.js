const path = require("path");
const express = require("express");
const http = require("http");
const SocketIO = require("socket.io");
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


  socket.on("createMessage" , (message) => {
      io.emit("newMessage", {
        from : message.from,
        text : message.text,
        createdAt : new Date().getTime()
      });
  });
});



server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
