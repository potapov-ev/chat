const socket = require('socket.io');

const dictionary = {}; // dictionary[uid] = socketId

const getSocketIdByUID = uid => {
  console.log(111, uid, dictionary);
  return dictionary[uid]
};

const createSocket = server => {
  const io = socket(server);

  io.on('connection', socket => {
    // При обновлении страницы будет новый socket.id

    socket.on("CLIENT:LOG_IN", uid => dictionary[uid] = socket.id);
    
 
    socket.on('disconnect', () => {
      console.log("disconnect", socket.id);
    });
  });
  
  return io;
};

module.exports.getSocketIdByUID = getSocketIdByUID; 
module.exports.createSocket = createSocket; 



