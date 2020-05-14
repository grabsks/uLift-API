import app from '../../app';
var server = require('http').Server(app);
console.log('teste2');

var io = require('socket.io')(4000);
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('news', function (data) {
    console.log(data);
  });
});
