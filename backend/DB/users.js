const mysql = require("mysql2");

const DBconfig = require("./config.json");
const { ERRORS_MESSAGES, STATE, SQL_QUERYS } = require("./constants");

const {
  USERS_TABLE_COLUMNS_TYPES
} = SQL_QUERYS;
const {
  USER_NOT_FOUND
} = ERRORS_MESSAGES; // todo подумать как лучше поступпить с константами, куда перенести мб
const { SUCCESS } = STATE;
// todo подумать как лучше поступпить с константами, куда перенести мб

const createConnection = config => mysql.createConnection({ ...DBconfig, ...config });

const createDB = () => {
  const connection = createConnection();
  const sql = "CREATE DATABASE chat";

  connection.query(sql, error =>
    error ? console.error("Database creation error", error) : console.log("Database created")
  );
  connection.end();
};

const createUsersTable = () => {
  const connection = createConnection(DBconfig);
  const sql = `CREATE TABLE users (${USERS_TABLE_COLUMNS_TYPES})`;

  connection.query(sql, error =>
    error ? console.error("Table creation error", error) : console.log("Table created")
  );
  connection.end();
};

const clearUsersTable = () => {
  const connection = createConnection();
  const sql = "DELETE FROM users";

  connection.query(sql, error => error ? console.error("Error clearing the table", error) : console.log("Table cleared"));
  connection.end();
}

const getUsers = async () => {
  const connection = createConnection();
  const sql = "SELECT uid, name, login, pass FROM users";
  let users = [];

  await connection.promise().query(sql).then(res => users = [...res[0]])
  connection.end()

  return users;
};

const addUser = async user => {
  const connection = createConnection();
  const sql = "INSERT INTO users(name, login, pass) VALUES(?, ?, ?)"; // !!! 9 цифр в user.uid
  const userData = [user.name, user.login, user.pass];

  connection.query(sql, userData, error =>
    error ? console.error("Error adding user", error) : console.log("User added")
  );
  connection.end();
};

const deleteUser = uid => {
  const connection = createConnection();
  const sql = "DELETE FROM users WHERE uid = ?";

  connection.query(sql, [uid], error =>
    error ? console.log("User deletion error", error) : console.log("User deleted")
  );
  connection.end();
};

const getUser = async userLogin => {
  const users = await getUsers();
  const checkThisLogin = ({ login }) => login === userLogin;
  const getError = () => ({
    error: USER_NOT_FOUND
  });

  return users.find(checkThisLogin) || getError();
};

const hasUserLogin = async userLogin => {
  const users = await getUsers();
  const checkThisLogin = ({ login }) => login === userLogin;
  const hasThisUser = users.some(checkThisLogin);

  return hasThisUser;
};

module.exports = {
  createUsersTable,
  addUser,
  getUsers,
  deleteUser,
  getUser,
  hasUserLogin
};