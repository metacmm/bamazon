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
                addNewDepartment(supervisorOperation);
                break;
            default:
                conn.end();
        }
    });
}

function addNewDepartment(func){
    inquirer.prompt([
        {
            name: "department_name",
            message: "Please input the new department name: ",
            type: "input"
        },
        {
            name: "over_head_costs",
            message: "Please input the overhead cost of this deparment: ",
            type: "input"
        }
    ]).then(function(inqRes){
        let newDepartment = {
            department_name: inqRes.department_name,
            over_head_costs: parseFloat(inqRes.over_head_costs).toFixed(2)
        }
        dbUpdate.addNewDepartment(newDepartment, func);
    });
}

