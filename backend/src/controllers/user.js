const bcrypt = require('bcrypt');
const passport = require("passport");
const { STATE } = require('../core/constants');
const {
  addUser,
  getUsers,
  deleteUser,
  getUser,
  hasUserLogin
} = require("../mysql/users");

class UserController {
  constructor(io) {
    this.io = io;
  }

  getAll = (req, res) => {
    console.log("getAll", req.user)
    getUsers(req.user && req.user.uid)
      .then(result => {
        if (result.state === STATE.SUCCESS) {
          res.status(200).json(result.data);
        } else {
          console.log("users getAll", result.error);
          res.status(400).json(result.error);
        }
      })
      .catch(error => {
        console.log("users getAll", error);
        res.status(400).json(error);
      })
  };

  login = (req, res, next) => {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return res.status(400).json(info);
      }
      if (!user) {
        return res.status(400).json(info);
      }
      req.logIn(user, function (err) {
        if (err) {
          return res.status(400).json({ errors: err });
        }
        return res.status(200).json({ name: user.name, uid: user.uid });
      });
    })(req, res, next);
  };

  regis = (req, res) => { // todo имя функций 
    const LOGIN_ALREADY_EXISTS = "Такой логин уже существует";
    hasUserLogin(req.body.login)
      .then(has => {
        if (has) { // Если уже сущестует
          const info = {
            message: LOGIN_ALREADY_EXISTS
          };

          console.log("SignUp", info);
          return res.status(400).json(info);
        } else {
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);

          const newUser = {
            uid: req.body.uid,
            name: req.body.name,
            login: req.body.login,
            pass: bcrypt.hashSync(req.body.password, salt),
          };

          addUser(newUser)
            .then(result => {
              if (result.state === STATE.SUCCESS) {
                req.logIn(newUser, function (error) {
                  if (error) {
                    console.log("SignUp -> logIn", error)
                    res.status(400).json(error);
                  }
                  res.status(200).json({ name: newUser.name, uid: newUser.uid });
                });
              } else {
                console.log("SignUp -> logIn", result.error);
                res.status(400).json(result.error);
              }
            })
            .catch(error => {
              console.log("SignUp -> logIn", error);
              res.status(400).json(error);
            });
        }
      })
      .catch(error => {
        console.log("Regis", error);
        res.status(400).json(error);
      })
  };
}

module.exports = UserController;