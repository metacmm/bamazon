var inquirer = require("inquirer");
var mysql = require("mysql");

var conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mySQLPass1",
    database: "bamazon"
});

conn.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + conn.threadId + "\n");
    displayAll();
});
// inquirer.prompt([
//     {
//         name: "productId",
//         message: "Please input the product id you want to buy: ",
//         type: "input"
//     },
//     {
//         name: "quantity",
//         message: "Please input the quantity of items you want to buy: ",
//         type: "input"
//     }
// ])

function displayAll(){
    conn.query("SELECT * FROM products",function(err, response){
        if (err) throw err;
        console.log("item_id | product name | product price");
        response.forEach(function(row){
            console.log(row.item_id + " | " + row.product_name + " | $" + row.price);
        });
    });
    conn.end();
}

