var config = require("./config");
var conn = config.conn;

function updateInventory(req_item_id, quantity_tochange, func) {
    /*
      SELECT stock_quantity 
      FROM products 
      WHERE item_id = req_item_id;
     */
    conn.query("SELECT stock_quantity, product_sales, price FROM products WHERE item_id = ?", [req_item_id], function (err, dbRes) {
        if (err) throw err;
        let new_stock = dbRes[0].stock_quantity + quantity_tochange;
        //if just adding new inventory (quantity_tochange > 0), then product sales not change, 
        //otherwise, increment by the total sales this time 
        let new_sales = quantity_tochange > 0? dbRes[0].product_sales : dbRes[0].product_sales - quantity_tochange * dbRes[0].price;
        /*
            UPDATE products
            SET stock_quantity = stock_quantity + quantity_tochange
            WHERE item_id = item_id
        */
        conn.query("UPDATE products SET stock_quantity = ?, product_sales = ? WHERE item_id = ?", [
            new_stock, new_sales, req_item_id], function (err, result) {
            if (func !== undefined){
                func();
            }
            if (err) throw err;
            console.log("Number of records updated: " + result.affectedRows);
        });
    });
}

function addNewProduct(newProduct, func) {
    /*
      INSERT INTO products(product_name, department_name, price, stock_quantity)
      VALUES(newProduct.product_name, newProduct.department_name, newProduct.price, newProduct.stock_quantity);
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

function addNewDepartment(newDepartment, func){
    conn.query("INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)", [
        newDepartment.department_name, newDepartment.over_head_costs
    ], function(err, result){
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
    addNewProduct: addNewProduct,
    addNewDepartment: addNewDepartment
};
