var inquirer = require("inquirer");
var dbUpdate = require("./updatedb");
var dbViewer = require("./viewdb");
var config = require("./config");
var conn = config.conn;

conn.connect(function (err) {
    if (err) throw err;
    console.log("connected as Id " + conn.threadId + "\n");
    supervisorOperation();
});

function supervisorOperation(){
    inquirer.prompt([
        {
            name: "operation",
            message: "Please select the operation you would like to preform: ",
            type: "list",
            choices: ["View Product Sales by Department", "Create New Department", "Quit"]
        },
    ]).then(function(inqRes){
        switch(inqRes.operation){
            case "View Product Sales by Department":
                dbViewer.viewProductsByDepartment(supervisorOperation);
                break;
            case "Create New Department":
            default:
                conn.end();
        }
    });
}

