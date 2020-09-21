const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { addUser, hasUserLogin } = require("../DB");
// todo переименовать login и regis на signin и signUp

const LOGIN_ALREADY_EXISTS = "Такой логин уже существует";
router.post("/regis", (req, res) => {
  hasUserLogin(req.body.login).then(has => {
    if (has) {
      console.log("SignUp", LOGIN_ALREADY_EXISTS);
      res.status(409);
      res.send(LOGIN_ALREADY_EXISTS);
    } else {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);

      const newUser = {
        uid: req.body.uid,
        name: req.body.name,
        login: req.body.login,
        pass: bcrypt.hashSync(req.body.password, salt)
      };

      addUser(newUser);

      req.logIn(newUser, function (err) {
        if (err) {
          return res.status(400).json({ errors: err });
        }
        return res.status(200).json({ name: newUser.name, uid: newUser.uid });
      });
    }
  }).catch(error => console.log("regis", error));
});

module.exports = router;