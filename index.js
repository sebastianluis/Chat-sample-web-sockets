var express = require('express');
var socket = require('socket.io');
//set up app
var app = express();
var server = app.listen(4000, function(req, res){
    console.log("Server is listening at port 4000!");
})
//serving a static file
app.use(express.static(__dirname + '/public/'));

//set up socket
var io = socket(server);

io.on('connection', function(socket){
    console.log('Made a socket connection:'+socket.id);

   // Handle chat event
   socket.on('chat', function(data){
    io.sockets.emit('chat', data);
});

// Handle typing event
socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
});

})
