const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require("../middlewares/passport");

const useMiddlewares = app => {
  // Настройки для запросов с других доменов
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
    
    app.options('*', (req, res) => {
      // allowed XHR methods  
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Credentials', 'true')
      res.send();
    });
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser()); // todo попробовать удалить 

  app.use(session({
    secret: "very secret this is",
    resave: true,
    saveUninitialized: true,
  }));

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Мидлвара чтобы сервер мог отдавать статику
  // http://localhost/assets/card.(png/css/...)
  //app.use('/assets', express.static(path.resolve(__dirname,'../frontend/dist')));
};

module.exports = useMiddlewares;