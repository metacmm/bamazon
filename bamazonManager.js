var inquirer = require("inquirer");
var dbUpdate = require("./updatedb");
var dbViewer = require("./viewdb");
var config = require("./config");
var conn = config.conn;

conn.connect(function (err) {
    if (err) throw err;
    console.log("connected as Id " + conn.threadId + "\n");
    managerOperation();
});

function managerOperation(){
    inquirer.prompt([
        {
            name: "operations",
            message: "Please select the operation you want to perform: ",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
        }
    ]).then(function(response){
        switch(response.operations){
            case "View Products for Sale":
                dbViewer.viewAll(managerOperation, true);
                break;
            case "View Low Inventory":
                dbViewer.viewLowInventory(managerOperation);
                break;
            case "Add to Inventory":
                addInventory(managerOperation);
                break;
            case "Add New Product":
                addNewProduct(managerOperation);
                break;
            case "Quit":
            default:
                conn.end();
        }
    });
}

function addNewProduct(func){
    inquirer.prompt([
        {
            name: "product_name",
            message: "Please input the product name: ",
            type: "input"
        },
        {
            name: "department_name",
            message: "Please input the department name: ",
            type: "input"
        },
        {
            name: "price",
            message: "Please input the price of this product: ",
            type: "input"
        },
        {
            name: "quantity",
            message: "Please input the quantity of the product: ",
            type: "input"
        }
    ]).then(function(inqRes){
        let newProduct = {
            product_name: inqRes.product_name,
            department_name: inqRes.department_name,
            price: parseFloat(inqRes.price).toFixed(2),
            stock_quantity: parseInt(inqRes.quantity)
        };
        dbUpdate.addNewProduct(newProduct,func);
    });
}

function addInventory(func){
    inquirer.prompt([
        {
            name: "product_id",
            message: "Please input the product id you want to add inventory: ",
            type: "input"
        },
        {
            name: "num_toadd",
            message: "Please input the quantity you add to inventory: ",
            type: "input"
        }
    ]).then(function(inqRes){
        dbUpdate.updateInventory(inqRes.product_id, parseInt(inqRes.num_toadd), func);
    });
}



