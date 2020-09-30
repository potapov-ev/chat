const { 
  UserController,
  DialogController,
  MessageController
} = require("../controllers");

const createRoutes = (app, io) => {
  const userController = new UserController(io);
  const dialogController = new DialogController(io);
  const messageController = new MessageController(io);
 
  app.get("/user/all", userController.getAll);
  app.post("/user/regis", userController.regis);
  app.post("/user/login", userController.login);
 
  app.get("/dialog/all", dialogController.getAll);
  app.post("/dialog/create", dialogController.create);
  app.delete("/dialog/delete", dialogController.delete);

  app.get("/message/all", messageController.getAll);
  app.post("/message/create", messageController.create);
  app.put("/message/updatestatus", messageController.updateStatus);
  app.delete("/message/delete", messageController.delete);

  /* app.get('/', (req, res) => { // todo Вернуть для prod 
    res.sendFile(__dirname + '/index.html');
}); */
};

module.exports = createRoutes;