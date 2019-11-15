var inquirer = require("inquirer");
var dbUpdate = require("./updatedb");
var dbViewer = require("./viewdb");
var config = require("./config");
var conn = config.conn;

conn.connect(function (err) {
    if (err) throw err;
    console.log("connected as Id " + conn.threadId + "\n");
    customerOperations();
});

function customerOperations(){
    inquirer.prompt([
        {
            name: "operation",
            message: "Please select the operation you would like to perform: ",
            type: "list",
            choices: ["View all items","Place an order", "Quit"]
        }
    ]).then(function(inqRes){
        switch(inqRes.operation){
            case "View all items":
                dbViewer.viewAll(customerOperations);
                break;
            case "Place an order":
                placeOrder(customerOperations);
                break;
            case "Quit":
            default:
                conn.end();
                break;
        }
    });
}

function placeOrder(func) {
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
        const req_num_tobuy = parseInt(response.quantity);

        /**
         * SELECT price, stock_quantity
         * FROM products
         * WHERE item_id = req_item_id;
         */
        conn.query("SELECT price, stock_quantity FROM products WHERE item_id = ?", [req_item_id], function (err, dbRes) {
            if (err) throw err;
            if (dbRes.length == 0) {
                console.log("Product Not Found!");
            } else {
                let price = dbRes[0].price;
                let stock = dbRes[0].stock_quantity;
                if (stock < req_num_tobuy) {
                    console.log("Insufficient quantity!");
                    func();
                } else {
                    dbUpdate.updateInventory(req_item_id, -req_num_tobuy, func);
                    let totalPrice = price * req_num_tobuy;
                    console.log("Your total price is " + totalPrice);
                }
            }
        });
    });
}

