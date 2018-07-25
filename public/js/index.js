var socket = io();
socket.on("connect" , function()  {
  console.log("New user connected");
  socket.emit("createMessage",{to:"Vikaram", text:"Create message" , createdAt : 123});
});

socket.on("disconnect" , function()  {
  console.log("User disconnected");
});


socket.on("newMessage" , function(message){
  console.log("New Message received "+JSON.stringify(message));
});
