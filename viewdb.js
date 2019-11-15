var config = require("./config");
var conn = config.conn;

const lowInvent_threshold = 5;

function viewAll(func, isManager = false) {
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
    /**
     * SELECT * 
     * FROM products
     * WHERE stock_quantity < lowInvet_threshold;
     */
    conn.query("SELECT * FROM products WHERE stock_quantity < ?", [lowInvent_threshold], function (err, dbRes) {
        if (err) throw err;
        // only manager can view low inventory
        display(dbRes, true);
        if (func !== undefined) {
            func();
        }
    })
}

function display(dbRows, isManager) {
    if (isManager){
        console.table(dbRows);
    } else {
        console.table(dbRows, ["item_id", "product_name", "department_name", "price"]);
    }
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