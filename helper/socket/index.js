var io = require('socket.io')(4000);
var user_id = [];
console.log("test")


io.on("connection", function(socket){
    socket.on("login", function(id, callback){

        if(!(id in user_id)){

            socket.id = id;
            user_id[id] = socket;

            console.log(id);

            io.sockets.emit("user_update", Object.keys(user_id));
            
            callback(true);
        }else{
            callback(false);
        }

    });
    socket.on("send_message", function(message, callback){
        socket.emit("chat_update", message);
        user_id[message.To_id].emit("chat_update", message);
        callback();        
    });
    socket.on("send_location", function(location, callback){
        io.sockets.emit("location_update", location);
        callback();
    });
    socket.on("lift_request", function(request, callback){
        
    });
	
});