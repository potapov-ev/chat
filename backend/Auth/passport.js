const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUser } = require("../DB/users");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(err, user);
});

const WRONG_PASSWORD = "Неверный пароль";

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "password"
    },
    (userLogin, password, done) => {
      getUser(userLogin).then(result => {
        if (result.error) {
          console.error("LogIn", result.error);
          return done(null, false, { message: result.error });
        } else {
          if (bcrypt.compareSync(password, result.pass)) {
            console.log("\x1b[32m", "LogIn:", "WELL DONE", "\x1b[37m");
            return done(null, result);
          } else {
            console.error("LogIn", WRONG_PASSWORD);
            return done(null, false, { message: WRONG_PASSWORD });
          }
        }
      });
    }
  )
); /* todo подумать почему такое разделение нужно и полезно */

module.exports = passport;
