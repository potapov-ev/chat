const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { readFileSync, writeFileSync } = require('fs');

router.post("/", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  const users = JSON.parse(readFileSync("Auth/users.json", "utf-8"));
  let hasThisLogin = false;

  users.forEach(({ login }) => {
    if (login === req.body.login) {
      console.log("ERROR", "Такой логин уже существует");
      res.status(409);
      res.send("Такой логин уже существует");
      hasThisLogin = true;
    }
  });

  if (!hasThisLogin) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    const newUser = {
      name: req.body.name,
      login: req.body.login,
      pass: bcrypt.hashSync(req.body.password, salt)
    };

    users.push(newUser);
    writeFileSync("Auth/users.json", JSON.stringify(users), "utf-8")
    res.status(200);
    res.end();
  }
});

module.exports = router;