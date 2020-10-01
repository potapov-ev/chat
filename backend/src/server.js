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
  require("./mysql/messages").createMessagesTable()
  */
  //require("./mysql/messages").addMessage({ authorId: 9, dialogId: 2, time: "14:13", type: "TEXT", text: "Здарова, у тебя пропущенный", isReaded: false });  
useMiddlewares(app);
//const io = socketIO(server);
createRoutes(app/* , io */); 
 
server.listen(port, () => {
  console.log('Running server on localhost:' + port);
});
 
// todo добавить мидлвару для проверк авторизации пользователя 
// и придумать, как выкидыать его, если не авторезирован