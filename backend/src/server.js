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
createRoutes(app); 
 
server.listen(port, () => {
  console.log('Running server on localhost:' + port);
});
 
