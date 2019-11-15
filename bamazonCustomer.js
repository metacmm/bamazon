var inquirer = require("inquirer");
var dbUpdate = require("./updatedb");
var dbViewer = require("./viewdb");
var config = require("./config");
var conn = config.conn;

conn.connect(function (err) {
    if (err) throw err;
    console.log("connected as Id " + conn.threadId + "\n");
    dbViewer.viewAll(placeOrder);
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

        /**
         * 
         */
        conn.query("SELECT price, stock_quantity FROM products WHERE item_id = ?", [req_item_id], function (err, dbRes) {
            if (err) throw err;
            const rows = JSON.parse(JSON.stringify(dbRes));
            if (rows.length == 0) {
                console.log("Product Not Found!");
            } else {
                const row = rows[0];
                if (row.stock_quantity < req_num_tobuy) {
                    console.log("Insufficient quantity!");
                    conn.end();
                } else {
                    dbUpdate.updateInventory(req_item_id, row.stock_quantity - req_num_tobuy, ()=>{conn.end()});
                    let totalPrice = row.price * req_num_tobuy;
                    console.log("Your total price is " + totalPrice);
                }
            }
        });
    });
}

