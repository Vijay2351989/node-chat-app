var socket = io();
socket.on("connect" , function()  {
  console.log("New user connected");
});

socket.on("disconnect" , function()  {
  console.log("User disconnected");
});


socket.on("newMessage" , function(message){
  var li = jQuery("<li></li>");
  li.text(`${message.from} : ${message.text}`);
  jQuery("#message-list").append(li);
  console.log("New Message received "+JSON.stringify(message));
});


jQuery("#message-form").on("submit" , function(e) {
  e.preventDefault();
  socket.emit("createMessage", {from : "User" , text : jQuery("[name = message]").val()} , function(message){
    console.log(message);
  });
});
