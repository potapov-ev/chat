const express = require("express");
const router = express.Router();
const passport = require('passport');

router.post('/login', function (req, res, next) {
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
});

module.exports = router;