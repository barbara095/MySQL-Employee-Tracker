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
        switch (response.add) {
            case "Add department":
                addDept();
                break;
                
            case "Add employee":
                addEmployee();
                break;

            case "Add role":
                addRole();
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


function roleId(id) {
    let role = [];
    connection.query("SELECT title FROM roles", function (err, res) {
        for (let i = 0; i < res.length; i++) {
            role.push(res[i].title);
        }

        inquirer.prompt([
            {
                type: "List",
                name: "roleId",
                message: "What is the employee's role?",
                choices: role
            }
        ]).then(function (response) {
            connection.query(`SELECT id from role WHERE title = '${res[0].id}'`, function (err, res) {
                console.log(res[0].id);

                connection.query(`UPDATE employee SET role_id = '${res[0].id}' WHERE employee.id = '${id}'`, function (err, res) {
                    if (err) throw err;
                });
            });
            managerId(id);
        });
    });
}

// function managerId() {
//     connection.query("SELECT title FROM roles", function(err,res) {
//         for (let i = 0; i< res.length; i++) {
//             role.push(res[i].title);
//         }

//         inquirer.prompt([
//             {
//                 type: "List",
//                 name: "roleId",
//                 message: "What is the employee's role?",
//                 choices: role
//             }
//         ]).then(function(response) {
//             connection.query(`SELECT id from role WHERE title = '${res[0].id}'`, function(err,res) {
//                 console.log(res[0].id);

//                 connection.query(`UPDATE employee SET role_id = '${res[0].id}' WHERE employee.id = '${id}'`, function(err,res) {
//                     if (err) throw err;
//                 });
//             });
//             managerId(id);
//         });
//     });
// }
function addDept() {
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "What is the name of your department?"

        },

    ]).then(function (response) {
        connection.query("INSERT INTO department SET ? ",
            {
                name: response.deptName,
            },
            function (err, res) {
                if (err) throw err;
            })
        console.log(res.affectedRows + " added!\n");
        startingPrompt();
    });
}

function addRole() {
    let department = [];
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            department.push(data[i].name);
        }
    })
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
        {
            name: "departmentId",
            type: "list",
            message: "What department does your role fall under?",
            choices: department

        },

    ]).then(function (response) {
        connection.query("INSERT INTO role SET ? ",
            {
                title: response.title,
                salary: response.salary,
                department_id: department
            },
            function (err, res) {
                if (err) throw err;
            })
        console.log("Role Added!");
        startingPrompt();
    })
}

function addEmployee() {
    let roles = [];
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roles.push(res[i].title);
        }

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
                type: "list",
                message: "What is the employee's role?",
                choices: roles
            },

        ]).then(function (response) {
            connection.query("INSERT INTO employee SET ? ",
                {
                    first_name: response.first_name,
                    last_name: response.last_name,
                    role_id: response.roleId
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " added!\n");
                    const id = res.insertId;
                    roleId(id);
                    startingPrompt();
                });
        })
    })

};


function viewEmployees() {
    connection.query("SELECT * from employee", function(err,data) {
        if (err) throw err;
    })
    console.table(data);
    startingPrompt();
}

function viewRoles() {
    connection.query("SELECT * from role", function(err,data) {
        if (err) throw err;
        console.table(data);
    })
    
    startingPrompt();

}

function viewDepts() {
    connection.query("SELECT * from department", function(err,data) {
        if (err) throw err;
        console.table(data);
    })
    startingPrompt();

}

function updateRoles() {
    connection.query("SELECT * FROM employee", function(err,res) {
        if (err) throw err;
        
    })

}

