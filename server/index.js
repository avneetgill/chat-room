const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require("./router");
const { callback } = require('util');
const port = process.env.PORT || 5000

const app = express();
const server = http.createServer(app);
const io = socketio(server);



io.on('connection', (socket) =>{
    console.log("new connection!")
    socket.on('disconnect', () => {
        console.log("user bye bye")
    })
    socket.on('join', ({name,room})=>{
        console.log(name, room);

        // const error = true;
        // if(error){
        //     callback({error: 'error'});
        // }
        
    })
});



app.use(router)

server.listen(port,() => console.log("server started on port", port))