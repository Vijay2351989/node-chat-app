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

socket.on("newLocationMessage",function(message){
  console.log(JSON.stringify(message));
  var li = jQuery("<li></li>");
  var a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${message.from}: `);
  a.attr("href",`${message.url}`);
  li.append(a);
  jQuery("#message-list").append(li);
});


jQuery("#message-form").on("submit" , function(e) {
  e.preventDefault();
  socket.emit("createMessage", {from : "User" , text : jQuery("[name = message]").val()} , function(message){
    console.log(message);
  });
});

var locationButton = jQuery("#send-location");
locationButton.on("click" , function() {
  if(!navigator.geolocation)
  {
    alert("Geoloaction fetching not possible.");
  }

  navigator.geolocation.getCurrentPosition(function (position){
    console.log(position);
    socket.emit("createGeolocationMessage",{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  } , function(error){
    alert("Unable to fetch location.");
  });
});
