var mysql = require("mysql");
const inquirer = require("inquirer");

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
            "Add a department", 
            "Add a role",
            "Add an employee"
        ]
    }).then(function(response) {
        if(response.add === "Add a department") {
            addDept();
        } else {
            bidItem();
        }
    })
}

function addDept() {
    inquirer.prompt([{
        
    }])
}