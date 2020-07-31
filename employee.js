var mysql = require("mysql");
const inquirer = require("inquirer");
const conTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Snoopy123!",
  database: "employee_DB"
});

// Establish connection
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startingPrompt();
  });

// starting prompt
function startingPrompt() {
    inquirer.prompt ({
        name: "add",
        type: "list",
        message: "Welcome to Employee Tracker. What would you like to do?",
        choices: [
            "Add employee", 
            "Add role",
            "Add department", 
            "View all employees",
            "View roles",
            "View departments",
            "Update Employee roles",
            "Finished"
        ]

    }).then(function(response) {
        switch(response) {
            case "Add employee":
                addEmployee();
            break;

            case "Add role":
                addRole();
            break;

            case "Add department":
                addDept();
            break;

            case "View all employees":
                viewEmployees();
            break;

            case "View roles":
                viewRoles();
            break;

            case "View departments":
                viewDepts();
            break;

            case "Update Employee roles":
                updateRoles();
            break;

        }
    })
}

function addEmployee() {
    inquirer.prompt([{

    }])
}

function addRole() {
    inquirer.prompt([{

    }])
}

function addDept() {
    inquirer.prompt([{

    }])
}

function viewEmployees() {
    inquirer.prompt([{

    }])
}

function viewRoles() {
    inquirer.prompt([{

    }])
}

function viewDepts() {
    inquirer.prompt([{

    }])
}

function updateRoles() {
    inquirer.prompt([{

    }])
}

