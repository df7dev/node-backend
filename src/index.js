const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const socketIo = require('socket.io')(server);

app.use(cors());

app.use((req, res, next) => {
    req.io = socketIo;

    next();
});

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

mongoose.connect('https://mongodb+srv://semana:semana@cluster0-jiaxz.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error with database: "));
db.once("open", () => {
  console.log("mongoDB run");
});

server.listen(process.env.PORT || 3333);