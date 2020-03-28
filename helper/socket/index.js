var io = require('socket.io')(app);
var user_id = [];

io.on("connection", function(socket){
    socket.on("login", function(id, callback){
        //socket = io('http://localhost:3000/');

        if(!(id in user_id)){

            socket.id = id;
            user_id[id] = socket;

            io.sockets.emit("user_update", Object.keys(user_id));
            
            callback(true);
        }else{
            callback(false);
        }

    });
});