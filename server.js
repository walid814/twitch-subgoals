const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let subs = 0;

io.on('connection', (socket) => {
    console.log('Client connecté');

    // envoyer la valeur actuelle
    socket.emit('updateSubs', subs);

    socket.on('addSubs', (value) => {
        subs += value;
        io.emit('updateSubs', subs);
    });

    socket.on('resetSubs', () => {
        subs = 0;
        io.emit('updateSubs', subs);
    });
});

app.use(express.static(__dirname));

http.listen(3000, () => {
    console.log('http://localhost:3000');
});