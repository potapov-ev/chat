const express = require('express');
const app = express();
const server = require('http').Server(app);

const {
  useMiddlewares,
  //socketIO, 
  createRoutes,  
} = require("./core");

const port = 8989;
  /* require("./mysql/users").createUsersTable();
  require("./mysql/dialogs").createDialogsTable();
  require("./mysql/messages").createMessagesTable();  */
useMiddlewares(app);
//const io = socketIO(server);
createRoutes(app/* , io */); 
 
server.listen(port, () => {
  console.log('Running server on localhost:' + port);
});
 
// todo добавить мидлвару для проверк авторизации пользователя 
// и придумать, как выкидыать его, если не авторезирован