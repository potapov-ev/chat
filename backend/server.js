const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const session = require('express-session');

const passport = require("./Auth/passport.js");

const port = 8989;

require("./Chat/index")(server)

// Настройки для запросов с других доменов
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {
    // allowed XHR methods  
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    res.send();
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: "very secret this is",
  resave: false,
  saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Мидлвара чтобы сервер мог отдавать статику
// http://localhost/assets/card.(png/css/...)
//app.use('/assets', express.static(path.resolve(__dirname,'../frontend/dist')));

// Подключение рутов для аутентификации
app.use("/auth", require("./Auth/regis"));
app.use("/auth", require("./Auth/login"));

/* app.get('/', (req, res) => { // todo Вернуть для prod 
    res.sendFile(__dirname + '/index.html');
}); */

server.listen(port, () => {
  console.log('Running server on localhost:' + port);
});
