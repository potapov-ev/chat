const express = require('express');
const app = express();
const server = require('http').Server(app);

const {
  useMiddlewares,
  createSocket, 
  createRoutes,  
} = require("./core");

const port = 8989;
  
useMiddlewares(app);
const io = createSocket(server);
createRoutes(app, io); 
 
server.listen(port, () => {
  console.log('Running server on localhost:' + port);
});
 
// todo добавить мидлвару для проверк авторизации пользователя 
// и придумать, как выкидыать его, если не авторезирован