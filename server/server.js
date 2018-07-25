const path = require("path");
const express = require("express");
const http = require("http");
const SocketIO = require("socket.io");
const publicPath = path.join(__dirname , "../public");


var app = express();
var port = process.env.PORT || 2000
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = SocketIO(server);

io.on("connection" , (socket)=>{
  console.log("New user connected");
  socket.on("disconnect" , () =>{
    console.log("User disconnected");
  });


  socket.emit("newMessage", {
    from : "Vijay",
    text : "Received a new message",
    createdAt : 123
  });

  socket.on("createMessage" , (message) => {
    console.log("Create message ",message);
  });
});

// io.on("disconnection" , (socket)=>{
//   console.log("User disconnected");
// });



server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
