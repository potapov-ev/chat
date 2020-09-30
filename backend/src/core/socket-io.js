/* const socket = require('socket.io');

let users = {};

const getUsers = () => Object.keys(users).map(key => users[key].name);

const _createSocket = user => {
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
      name: user.name,
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

const createSocket = server => {
  const io = socket(server);

  io.on('connection', socket => {
    // При обновлении страны будет новый socket.id
    const query = socket.request._query,
      user = {
        name: query.name,
        uid: query.uid,
        socket_id: socket.id 
      };

    if (users[user.uid]) {
      _createSocket(user);
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
  
  return io;
};

module.exports = createSocket; */

const socket = require('socket.io');

module.exports = server => {
  const io = socket(server);

  io.on('connection', function(socket) {
    /* socket.on('DIALOGS:JOIN', (dialogId) => {
      socket.dialogId = dialogId;
      socket.join(dialogId); // join ???
    }); */
    /* socket.on('DIALOGS:TYPING', (obj) => {
      socket.broadcast.emit('DIALOGS:TYPING', obj);
    }); */

    /* socket.on('disconnect', () => {
      io.emit('updateUsersList', getUsers()); todo оазобрать с разницей io.emit socket.emit
    }); */
  });

  return io;
};
