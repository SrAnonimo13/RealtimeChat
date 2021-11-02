const express = require('express');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');

const Lobby = require('./db/models/Lobby');
const User = require('./db/models/User');

const app = express();
const httpServer = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use('/web', express.static('./web'));

app.get('/', async (req, res) => {
    let servers = await Lobby.find({});

    res.render('home', { servers });
})

app.use('/auth', require('./routers/auth'));
app.use('/lobby', require('./routers/lobby'));

// app.listen(PORT, () => console.log('Started'));
httpServer.listen(PORT, () => console.log('Started'));

//////////////////////////////////////////////////////////////////////////
let io = new Server(httpServer);

io.on('connection', socket => {
    
    socket.on('lobbyId', async id => {
        try{
            const lobby = await Lobby.findById(id);

            socket.join(lobby.name);
            socket.emit('getAllMessage', lobby.chat)
            socket.emit('getLobby', lobby);
        }catch(err){
            console.log(err);
        }
    })

    socket.on('message', async data => {
        try{
            const user = await User.findById(data.userId);
            const message = {
                user: {
                    name: user.username,
                    id: data.userId
                },
                text: data.message
            }

            const lobby = await Lobby.findById(data.id);
            await Lobby.findByIdAndUpdate(data.id, {chat: [...lobby.chat, message ]});
            io.to(lobby.name).emit('message', message);
        } catch(err) {
            console.log(err);
        }
    })
});