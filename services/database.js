const mysql = require("mysql");
const KEYS = require("../config");

/**
 * MySQL FSU iSensor Server
 * Development: Localhost
 * Production: .59
 */
const connection = mysql.createConnection({
  host: KEYS.MYSQL_HOST,
  database: KEYS.MYSQL_DB_NAME,
  user: KEYS.MYSQL_USER,
  password: KEYS.MYSQL_PASSWORD
});
module.exports = connection;
