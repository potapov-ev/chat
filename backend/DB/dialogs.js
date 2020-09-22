const mysql = require("mysql2");

const DBconfig = require("./config.json");
const { SQL_QUERYS } = require("./constants");


const { DIALOGS_TABLE_COLUMNS_TYPES } = SQL_QUERYS;

const createConnection = config => mysql.createConnection({ ...DBconfig, ...config });

const createDB = () => { // todo эта функция везде не нужна, придумать чо-нить
  const connection = createConnection();
  const sql = "CREATE DATABASE chat";

  connection.query(sql, error =>
    error ? console.error("Database creation error", error) : console.log("Database created")
  );
  connection.end();
};

const createTable = config => {
  const connection = createConnection(connectionConfig);
  const sql = `CREATE TABLE dialogs (${DIALOGS_TABLE_COLUMNS_TYPES})`;

  connection.query(sql, error =>
    error ? console.error("Table creation error", error) : console.log("Table created")
  );
  connection.end();
};

module.exports = {
  createTable
};