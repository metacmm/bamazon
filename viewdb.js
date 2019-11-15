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
        if (func !== undefined) {
            func();
        }
    })
}

function display(dbRows, isManager) {
    console.log(divider);
    console.log("item_id | product name | product price" + (isManager ? " | stock quantity" : ""));
    dbRows.forEach(function (row) {
        console.log(row.item_id + " | " + row.product_name + " | $" + row.price + (isManager ? " | " + row.stock_quantity : ""));
    });
    console.log(divider);
}

function viewProductsByDepartment(func) {
    var sql =
            `SELECT 
                d.department_id AS department_id,
                d.department_name AS department_name,
                d.over_head_costs AS over_head_costs,
                p.total_sales AS product_sales,
                p.total_sales - d.over_head_costs AS total_profit
            FROM 
                departments AS d
            LEFT JOIN
                (SELECT
                    products.department_name AS department_name,
                    SUM(products.product_sales) AS total_sales
                FROM products
                GROUP BY department_name
                ) AS p
            ON d.department_name = p.department_name;`;

    conn.query(sql, function (err, dbRes) {
        if (err) throw err;
        console.table(dbRes);
        func();
    });
}
module.exports =
    {
        viewAll: viewAll,
        viewLowInventory: viewLowInventory,
        viewProductsByDepartment: viewProductsByDepartment
    }