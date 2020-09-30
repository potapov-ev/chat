module.exports.getSocketByUID = (io, uid) => {
  console.log(11111111111111, io.sockets.clients(), io.sockets.clients().sockets, io.sockets.clients().connected)
};