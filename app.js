const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Connected');
    
    // Handle events with the socket here if needed, for example:
    // socket.on('message', (data) => { console.log(data); });
    socket.on("send-location", (location) => {
        console.log("Location received: ", socket.id);
        // Broadcast the location to all connected clients
        io.emit("receive-location", {id:socket.id,...location});
    });
    socket.on("disconnected",function(){
        io.emit("user-disconnected",socket.id);
    });
});

app.get('/', (req, res) => {
    res.render('index'); 
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
