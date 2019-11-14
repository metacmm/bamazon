var inquirer = require("inquirer");
var mysql = require("mysql");

var conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mySQLPass1",
    database: "bamazon"
});

const divider = "+---------------------------------------------------------------------------------+";

conn.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + conn.threadId + "\n");
    displayAll();
});

function placeOrder() {
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
    ]).then(function (response) {
        const req_item_id = response.productId;
        const req_num_tobuy = response.quantity;
        conn.query("SELECT DISTINCT price, stock_quantity FROM products WHERE ? ",
            {
                item_id: req_item_id
            }, function (err, dbRes) {
                if (err) throw err;
                const rows = JSON.parse(JSON.stringify(dbRes));
                if (rows.length == 0){
                    console.log("Product Not Found!");
                } else {
                    const row = rows[0];
                    processOrder(req_item_id, req_num_tobuy, row.stock_quantity, row.price);
                }
                conn.end();
            });
    });
}

function processOrder(req_item_id, req_num_tobuy, db_stock_quantity, db_item_price) {
    //insufficient quantity
    if (db_stock_quantity < req_num_tobuy) {
        console.log("Insufficient quantity!");
    } else {
        conn.query("UPDATE products SET ? WHERE ?", [
            {
                stock_quantity: db_stock_quantity - req_num_tobuy
            },
            {
                item_id: req_item_id
            }
        ], function (err, res) {
            if (err) throw err;
        });
        let totalPrice = db_item_price * req_num_tobuy;
        console.log("Your total price is " + totalPrice);
    }
}
function displayAll() {
    conn.query("SELECT * FROM products", function (err, response) {
        if (err) throw err;
        console.log(divider);
        console.log("item_id    | product name | product price");
        response.forEach(function (row) {
            console.log(row.item_id + " | " + row.product_name + " | $" + row.price);
        });
        console.log(divider);
        placeOrder();
    });
}

