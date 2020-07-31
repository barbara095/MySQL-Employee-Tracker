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
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startingPrompt();
});

// starting prompt
function startingPrompt() {
    inquirer.prompt({
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

    }).then(function (response) {
        switch (response) {
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

            case "Finished":
                console.log("You are all done!");
                connection.end();
                break;

            default:
                startingPrompt();

        }
    })
        .catch(function (err) {
            console.log(err);
        });
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "input",
            message: "What is the employee's role?"
        },
        {
            name: "manager",
            type: "input",
            message: "Who is the employee's manager?"
        },

    ]).then(function (response) {
        connection.query("INSERT INTO employee SET ? ",
            {
                first_name: response.first_name,
                last_name: response.last_name,
            }

        )
    })
};

function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of your role in the company"

        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?"

        },

    ]).then(function (response) {
        connection.query("INSERT INTO employee SET ? ",
            {
                title: response.title,
                salary: response.salary,
            }

        )
    })
}

function addDept() {
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "What is the name of your department?"

        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?"

        },

    ]).then(function (response) {
        connection.query("INSERT INTO employee SET ? ",
            {
                title: response.title,
                salary: response.salary,
            }

        )
    })
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

