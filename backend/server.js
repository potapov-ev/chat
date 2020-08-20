const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const port = 8989;

require("./Chat/index")(server)

// Настройки для предварительных запросов с дургих доменов
app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.send('ok');
});

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: "TOP_SECRET",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// Мидлвара? чтобы сервер мог отдавать статику
// http://localhost/assets/card.(png/css/...)
app.use('/assets', express.static(__dirname + '/dist'));
// Подключение рутов для аутентификации
app.use("/regis", require("./Auth/regis"));
app.use("/login", require("./Auth/login"));

/* app.get('/', (req, res) => { // todo Вернуть для prod 
    res.sendFile(__dirname + '/index.html');
}); */

server.listen(port, () => {
  console.log('Running server on localhost:' + port);
});
