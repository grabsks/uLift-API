var io = require('socket.io')(app);
var user_id = [];

io.on("connection", function(socket){
    socket.on("login", function(id, callback){
        if(!(id in user_id)){
            socket.id = id;
            user_id[id] = socket;
            callback(true);
        }else callback(false);
    });
});