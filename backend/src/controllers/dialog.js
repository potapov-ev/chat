
const { STATE } = require("../core/constants");
const { getSocketByUID } = require("../utils");
const {
  createDialog,
  getDialogs,
  deleteDialog,
} = require("../mysql/dialogs");

class DialogController {
  constructor(io) {
    this.io = io;
  }

  getAll = (req, res) => {
    getDialogs(req.body.uid)
      .then(result => {
        if (result.state === STATE.SUCCESS) {
          const socketId = getSocketByUID(this.io, req.body.partnerId);
          res.status(200).json(result.data);
        } else {
          console.log("Get dialogs", result.error);
          res.status(400).json(result.error);
        }
      })
      .catch(error => {
        console.log("Get dialogs", error);
        res.status(400).json(error);
      });
  };

  create = (req, res) => {
    createDialog({ ...req.body.data, authorId: req.user.uid })
      .then(result => {
        if (result.state === STATE.SUCCESS) {
          const socketId = getSocketIdByUID(this.io, req.body.partnerId);
          //this.io.sockets.socket(socketid).emit
          res.status(200);
        } else {
          console.log("Create dialog", result.error);
          res.status(400).json(result.error);
        }
      })
      .catch(error => {
        console.log("Create dialog", error);
        res.status(400).json(error);
      });
  };

  delete = (req, res) => {
    deleteDialog(req.body.dialogId)
      .then(result => {
        if (result.state === STATE.SUCCESS) {
          res.status(200);
        } else {
          console.log("Delete dialog", result.error);
          res.status(400).json(result.error);
        }
      })
      .catch(error => {
        console.log("Delete dialog", error);
        res.status(400).json(error);
      });
  };
}

module.exports = DialogController;