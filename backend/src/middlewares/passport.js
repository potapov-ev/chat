const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUser } = require("../mysql/users");

const WRONG_PASSWORD = "Неверный пароль";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "password"
    },
    (userLogin, password, done) => {
      getUser(userLogin)
        .then(result => {
          if (Object.keys(result.error).length) {
            console.error("LogIn", result.error);
            return done(null, false, { message: result.error });
          } else {
            if (bcrypt.compareSync(password, result.data.pass)) {
              console.log("\x1b[32m", "LogIn:", "WELL DONE", "\x1b[37m");
              return done(null, result.data);
            } else {
              console.error("LogIn", WRONG_PASSWORD);
              return done(null, false, { message: WRONG_PASSWORD });
            }
          }
        })
        .catch(error => console.log("Passport", error));
    }
  )
); /* todo подумать почему такое разделение нужно и полезно */

module.exports = passport;
