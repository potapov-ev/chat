const { STATE } = require("../core/constants");
const {
  addMessage, // todo create
  updateStatus,
  getMessages,
  deleteMessage
} = require("../mysql/messages");
const { getUser } = require("../mysql/users");

class MessageController {
  constructor(io) {
    this.io = io;
  }

  create = (req, res) => {
    addMessage({ ...req.body.data, authorId: req.user.uid })
      .then(result => {
        if (result.state === STATE.SUCCESS) {
          const message = result.data;
          // Добавим поле partnerName для отображения имени пользователя в списках диалогов
          getUser({ _uid: message.authorId })
            .then(result => {
              if (result.state === STATE.SUCCESS) {
                const data = { ...message, authorName: result.data.name };
                res.status(200).json(data);
              } else {
                console.log("message.create -> getUser.then", result.error); // todo везде навести такую красоту dialog.create -> getUser.then
                res.status(400).json(result.error);
              }
            })
            .catch(error => {
              console.log("message.create -> getUser(_uid)", error);
              res.status(400).json(error);
            })
        } else {
          console.log(321,"Create message", result.error);
          res.status(400).json(result.error);
        }
      })
      .catch(error => {
        console.log("Create message", error);
        res.status(400).json(error);
      })
  };

  updateStatus = (req, res) => {
    updateStatus(req.body.info) // {id, isReaded}
      .then(result => {
        if (result.state === STATE.SUCCESS) {
          res.status(200);
        } else {
          console.log("updateStatus", result.error);
          res.status(400).json(result.error);
        }
      })
      .catch(error => {
        console.log("updateStatus", error);
        res.status(400).json(error);
      });
  };

  getAll = (req, res) => {
    getMessages(req.query.dialogId)
      .then(result => {
        if (result.state === STATE.SUCCESS) {
          const promises = result.data.map(message => (
            getUser({ _uid: message.authorId })
              .then(result => {
                if (result.state === STATE.SUCCESS) {
                  return { ...message, authorName: result.data.name };
                } else {
                  console.log("message.getall -> getUser.then", result.error);
                  res.status(400).json(result.error);
                }
              })
              .catch(error => {
                console.log("message.getall -> getUser(_uid)", error);
                res.status(400).json(error);
              })
          ));

          Promise.all(promises)
            .then(results => {
              res.status(200).json(results);
            })
            .catch(error => {
              console.log("message.getall -> Promise.all", error);
              res.status(400).json(error);
            })
        } else {
          console.log("Get messages", result.error);
          res.status(400).json(result.error);
        }
      })
      .catch(error => {
        console.log("Get messages", error);
        res.status(400).json(error);
      });
  };

  delete = (req, res) => {
    deleteMessage(req.body.messageId)
      .then(result => {
        if (result.state === STATE.SUCCESS) {
          res.status(200);
        } else {
          console.log("Delete message", result.error);
          res.status(400).json(result.error);
        }
      })
      .catch(error => {
        console.log("Delete message", error);
        res.status(400).json(error);
      });
  };
}

module.exports = MessageController;