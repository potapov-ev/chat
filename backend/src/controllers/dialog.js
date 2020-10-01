
const { STATE } = require("../core/constants");
const {
  createDialog,
  getDialogs,
  deleteDialog,
} = require("../mysql/dialogs");
const { getUser } = require("../mysql/users");

class DialogController {
  constructor(io) {
    this.io = io;
  }

  getAll = (req, res) => {
    getDialogs(req.query.uid)
      .then(result => {
        if (result.state === STATE.SUCCESS) {
          // Добавим поле partnerName для отображения имени пользователя в списках диалогов
          const promises = result.data.map(dialog => (
            getUser({ _uid: req.user.uid === dialog.authorId ? dialog.partnerId : dialog.authorId })
              .then(result => {
                if (result.state === STATE.SUCCESS) {
                  return { ...dialog, partnerName: result.data.name };
                } else {
                  console.log("dialog.getall -> getUser.then", result.error);
                  res.status(400).json(result.error);
                }
              })
              .catch(error => {
                console.log("dialog.getall -> getUser(_uid)", error);
                res.status(400).json(error);
              })
          ));

          Promise.all(promises)
            .then(results => {
              /* const socketId = getSocketIdByUID(2); */
              //this.io.emit('hey', 'I just met you');

              res.status(200).json(results);
            })
            .catch(error => {
              console.log("dialog.getall -> Promise.all", error);
              res.status(400).json(error);
            })
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
          const dialog = result.data;
          // Добавим поле partnerName для отображения имени пользователя в списках диалогов
          getUser({ _uid: req.user.uid === dialog.authorId ? dialog.partnerId : dialog.authorId })
            .then(result => {
              if (result.state === STATE.SUCCESS) {
                const data = { ...dialog, partnerName: result.data.name };
                res.status(200).json(data);
              } else {
                console.log("dialog.create -> getUser.then", result.error); // todo везде навести такую красоту dialog.create -> getUser.then
                res.status(400).json(result.error);
              }
            })
            .catch(error => {
              console.log("dialog.create -> getUser(_uid)", error);
              res.status(400).json(error);
            })
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