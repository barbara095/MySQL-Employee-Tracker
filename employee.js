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
            "Add department",
            "Add role",
            "Add employee",
            "View employees",
            "View managers",
            "View roles",
            "View departments",
            "Update Employee roles",
            "Delete Roles",
            "Delete Employees",
            "Finished"
        ]

    }).then(function (response) {
        switch (response.add) {
            case "Add department":
                addDept();
                break;

            case "Add role":
                addRole();
                break;

            case "Add employee":
                addEmployee();
                break;

            case "View employees":
                viewEmployees();
                break;

            case "View managers":
                viewManagers();
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

            case "Delete Roles":
                deleteRoles();
                break;
            
            case "Delete Employees":
                deleteEmps();
                break;

            case "Finished":
                console.log("You are all done!");
                connection.end();
                break;

        }
    })
        .catch(function (err) {
            console.log(err);
        });
}

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
                console.log(res.affectedRows + " added!\n");
            });
        startingPrompt();
    });

}

function addRole() {
    let department = [];
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            department.push({
                name: data[i].name,
                value: data[i].id
            });
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
                department_id: response.departmentId
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
    let manager_Id = [];
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roles.push({
                name: res[i].title,
                value: res[i].id
            });
        }
        connection.query("SELECT * FROM employee", function (err, res2) {
            if (err) throw err;
            for (let i = 0; i < res2.length; i++) {
                manager_Id.push({
                    name: res2[i].first_name,
                    value: res2[i].role_id
                });
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
                {
                    name: "managerId",
                    type: "list",
                    message: "Please select a manager for this employee",
                    choices: manager_Id
                },

            ]).then(function (response) {
                connection.query("INSERT INTO employee SET ? ",
                    {
                        first_name: response.first_name,
                        last_name: response.last_name,
                        role_id: response.role,
                        manager_id: response.managerId
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " added!\n");
                        startingPrompt();
                    });
            })
        })
    })

};

function viewEmployees() {
    connection.query("SELECT * from employee", function (err, data) {
        if (err) throw err;
        console.table(data);
        startingPrompt();
    })

}

function viewManagers() {
    connection.query("SELECT * from employee WHERE manager_id IS NULL", function (err, data) {
        if (err) throw err;
        console.table(data);

        startingPrompt();
    })

}

function viewRoles() {
    connection.query("SELECT * from role", function (err, data) {
        if (err) throw err;
        console.table(data);
        startingPrompt();
    })
}

function viewDepts() {
    connection.query("SELECT * from department", function (err, data) {
        if (err) throw err;
        console.table(data);
        startingPrompt();
    })
}

function updateRoles() {
    let employee = [];
    let new_role = [];

    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            employee.push({
                name: res[i].first_name,
                value: res[i].id
            })
        }
        connection.query("SELECT * FROM role", function (err, res2) {
            if (err) throw err;
            for (let i = 0; i < res2.length; i++) {
                new_role.push({
                    name: res2[i].title,
                    value: res2[i].id
                })
            }

            inquirer.prompt([
                {
                    name: "empUpdate",
                    type: "list",
                    message: "Please select the employee you want to update",
                    choices: employee
                },
                {
                    name: "roleUpdate",
                    type: "list",
                    message: "Please select the new role for the employee",
                    choices: new_role
                },


            ]).then(function (response) {
                connection.query("UPDATE employee SET ? WHERE ?", [
                    {
                        role_id: response.roleUpdate,
                    },
                    {
                        id: response.empUpdate
                    }
                ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " updated!\n");
                        startingPrompt();
                    });
            })
        })
    })
}

function deleteRoles() {
    let roles = [];
    connection.query("SELECT * from role", function (err, data) {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            roles.push({
                name: data[i].title,
                value: data[i].id
            })
        }

        inquirer.prompt([
            {
                name: "delRole",
                type: "list",
                message: "Please select the role you wish to delete",
                choices: roles
            },

        ]).then(function (response) {
            connection.query("DELETE FROM role WHERE ? ", [
                {
                    id: response.delRole,
                },
            ],
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " deleted!\n");
                    startingPrompt();
                });
        })

    })
}

function deleteEmps() {
    let employees = [];

    connection.query("SELECT * from employee", function (err, data) {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            employees.push({
                name: data[i].first_name,
                value: data[i].id
            })
        }

        inquirer.prompt([
            {
                name: "delEmp",
                type: "list",
                message: "Please select the employee you wish to remove",
                choices: employees
            },

        ]).then(function (response) {
            connection.query("DELETE FROM employee WHERE ? ", [
                {
                    id: response.delEmp,
                },
            ],
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " deleted!\n");
                    startingPrompt();
                });
        })

    })
}
