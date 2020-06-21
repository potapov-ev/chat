const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8989;

// Мидлвара? чтобы сервер мог отдавать статику
// http://localhost/assets/card.(png/css/...)
app.use('/assets', express.static(__dirname + '/dist'));

let users = {};

// todo Вынести серв в отдельный файл и вынести функции
const getUsers = () => Object.keys(users).map(key => users[key].userName);

const createSocket = user => {
    const cur_user = users[user.uid],
        updated_user = {
            [user.uid]: { ...cur_user, sockets: [...cur_user.sockets, user.socket_id] }
        };
    users = { ...users, ...updated_user };
};

const createUser = user => {
    users =
    {
        [user.uid]: {
            userName: user.userName,
            uid: user.uid,
            sockets: [user.socket_id]
        }
        , ...users
    };
};

const removeSocket = socketId => {
    let uid = '';

    Object.keys(users).map(key => {
        let sockets = users[key].sockets;
        if (sockets.indexOf(socketId) !== -1) {
            uid = key;
        }
    });

    const user = users[uid];

    if (user.sockets.length > 1) {
        // Remove socket only
        const updated_user = {
            [uid]: {
                ...user,
                sockets: user.sockets.filter(id => id !== socketId)
            }
        };
        users = { ...users, ...updated_user };
    } else {
        // Remove user
        const usersClone = { ...users };
        delete usersClone[uid];
        users = usersClone;
    }
};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
    console.log('Running server on localhost:' + port);
});

io.on('connection', socket => {
    // При обновлении страны будет новый socket.id
    const query = socket.request._query,
        user = {
            userName: query.userName,
            uid: query.uid,
            socket_id: socket.id
        };

    if (users[user.uid]) {
        createSocket(user);
        socket.emit('updateUsersList', getUsers());
    } else {
        createUser(user);
        io.emit('updateUsersList', getUsers());
    }

    socket.on('message', data => {
        socket.broadcast.emit('message', data);
    });

    socket.on('disconnect', () => {
        removeSocket(socket.id);
        io.emit('updateUsersList', getUsers());
    });
});
