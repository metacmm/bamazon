var config = require("./config");
var conn = config.conn;

function updateInventory(req_item_id, quantity_tochange, func) {
    // //connect to db
    // conn.connect(function (err) {
    //     if (err) throw err;
    //     console.log("connected as Id " + conn.threadId + "\n");
    // });

    /**
     * SELECT stock_quantity 
     * FROM products 
     * WHERE item_id = req_item_id;
     */
    conn.query("SELECT stock_quantity FROM products WHERE item_id = ?", [req_item_id], function (err, dbRes) {
        if (err) throw err;
        let new_stock = dbRes[0].stock_quantity + quantity_tochange;
        /** 
         *  UPDATE products
         *  SET stock_quantity = stock_quantity + quantity_tochange
         *  WHERE item_id = item_id
         */

        conn.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [new_stock, req_item_id], function (err, result) {
            if (func !== undefined){
                func();
            }
            if (err) throw err;
            console.log("Number of records updated: " + result.affectedRows);
        });
    });
}

function addNewProduct(newProduct, func) {
    // //connect to db
    // conn.connect(function (err) {
    //     if (err) throw err;
    //     console.log("connected as Id " + conn.threadId + "\n");
    // });

    /** 
     * INSERT INTO products(product_name, department_name, price, stock_quantity)
     * VALUES(newProduct.product_name, newProduct.department_name, newProduct.price, newProduct.stock_quantity);
    */
    conn.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)", [
        newProduct.product_name, newProduct.department_name, newProduct.price, newProduct.stock_quantity
    ], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        if (func !== undefined){
            func();
        }
    })
}

module.exports = 
{
    updateInventory: updateInventory,
    addNewProduct: addNewProduct
};

// addNewProduct({product_name: "Lancome eye cream",department_name: "Beauty & Health", price: 38.98, stock_quantity: 10});