var inquirer = require("inquirer");
var mysql = require("mysql");

var conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Lxj1982!",
    database: "bamazon"
});

inquirer.prompt([
    {
        name: "productId",
        message: "Please input the product id you want to buy: ",
        type: "input"
    },
    {
        name: "quantity",
        message: "Please input the quantity of items you want to buy: ",
        type: "input"
    }
])

function displayAll(){
    conn.query("SELECT * FROM products");
}