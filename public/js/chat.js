var socket = io();

var scrollDown = function(){
  var messageList = jQuery("#message-list");
  var lastMessage = messageList.children("li:last-child");
  var secondLastMessage = lastMessage.prev();
  var scrollHeight = messageList.prop("scrollHeight");
  var clientHeight = messageList.prop("clientHeight");
  var scrollTop = messageList.prop("scrollTop");

  if(scrollTop + clientHeight + lastMessage.innerHeight() + secondLastMessage.innerHeight()>=scrollHeight)
  {
    messageList.scrollTop(scrollHeight);
  }

};


socket.on("connect" , function()  {
  console.log("New user connected");
});

socket.on("disconnect" , function()  {
  console.log("User disconnected");
});


socket.on("newMessage" , function(message){
  console.log("Inside new message");
  var timeStamp = moment(message.createdAt).format("h:mm a");
 var template = jQuery("#message_template").html();
 var html = Mustache.render(template, {
   from : message.from,
   text : message.text,
   timeStamp : timeStamp
 });
 jQuery("#message-list").append(html);
scrollDown();
});

socket.on("newLocationMessage",function(message){

  var timeStamp = moment(message.createdAt).format("h:mm a");
 var template = jQuery("#locationmessage_template").html();
  var html = Mustache.render(template, {
    from : message.from,
    url : message.url,
    timeStamp : timeStamp
  });
  jQuery("#message-list").append(html);
  scrollDown();
});


jQuery("#message-form").on("submit" , function(e) {
  var messageTextBox = jQuery("[name = message]");
  e.preventDefault();
  socket.emit("createMessage", {from : "User" , text : messageTextBox.val()} , function(){
    messageTextBox.val('');
  });
});

var locationButton = jQuery("#send-location");
locationButton.on("click" , function() {
  locationButton.attr("disabled","disabled").text("Sending location...");
  if(!navigator.geolocation)
  {
    alert("Geoloaction fetching not possible.");
  }

  navigator.geolocation.getCurrentPosition(function (position){
    locationButton.removeAttr("disabled").text("Send Location");
    socket.emit("createGeolocationMessage",{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  } , function(error){
    locationButton.removeAttr("disabled").text("Send Location");
    alert("Unable to fetch location.");
  });
});
