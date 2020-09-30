const { STATE } = require("../core/constants");
const {
  addMessage,
  updateStatus,
  getMessages,
  deleteMessage
} = require("../mysql/dialogs");

class MessageController {
  constructor(io) {
    this.io = io;
  }

  create = (req, res) => {
    addMessage(req.body.message)
      .then(result => {
        if (result.state === STATE.SUCCESS) {
          res.status(200);
        } else {
          console.log("Create message", result.error);
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
          console.log("Create message", result.error);
          res.status(400).json(result.error);
        }
      })
      .catch(error => {
        console.log("Create message", error);
        res.status(400).json(error);
      });
  };

  getAll = (req, res) => {
    getMessages()
      .then(result => {
        if (result.state === STATE.SUCCESS) {
          res.status(200).json(result.data);
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