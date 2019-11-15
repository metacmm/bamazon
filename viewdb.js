var config = require("./config");
var conn = config.conn;

const divider = "+---------------------------------------------------------------------------------+";
const lowInvent_threshold = 5;

function viewAll(func, isManager = false) {
    // //connect db
    // conn.connect(function (err) {
    //     if (err) throw err;
    //     console.log("connected as id " + conn.threadId + "\n");
    // });

    /**
     * SELECT * 
     * FROM products;
     */
    conn.query("SELECT * FROM products", function (err, dbRes) {
        if (err) throw err;
        display(dbRes, isManager);
        // conn.end();
        if (func !== undefined) {
            func();
        }
    });
}

function viewLowInventory(func) {
    // //connect db
    // conn.connect(function (err) {
    //     if (err) throw err;
    //     console.log("connected as id " + conn.threadId + "\n");
    // });

    /**
     * SELECT * 
     * FROM products
     * WHERE stock_quantity < lowInvet_threshold;
     */
    conn.query("SELECT * FROM products WHERE stock_quantity < ?", [lowInvent_threshold], function (err, dbRes) {
        // conn.end();
        if (err) throw err;
        // only manager can view low inventory
        display(dbRes, true);
        if (func !== undefined){
            func();
        }
    })
}

function display(dbRows, isManager) {
    console.log(divider);
    console.log("item_id | product name | product price" + (isManager? " | stock quantity" : ""));
    dbRows.forEach(function (row) {
        console.log(row.item_id + " | " + row.product_name + " | $" + row.price + (isManager? " | " + row.stock_quantity : ""));
    });
    console.log(divider);
}

module.exports =
    {
        viewAll: viewAll,
        viewLowInventory: viewLowInventory
    }