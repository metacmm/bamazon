var mysql = require("mysql");
var config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mySQLPass1",
    database: "bamazon"
};

var conn = mysql.createConnection(config);

module.exports = 
{
    conn: conn,
}