// Access packages needed for the application
const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');
const Connection = require('mysql2/typings/mysql/lib/Connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

const database = [];

// First question for selection by user
const mainMenu = async () => {
    const {
        selection
    } = await inquirer.prompt([{
        type: 'checkbox',
        message: 'What would you like to do?',
        name: 'selection',
        choices: [{
                name: 'Add a Department',
                value: 'ADD_DEPT'
            },
            {
                name: 'Add a Role',
                value: 'ADD_ROLE'
            },
            {
                name: 'Add an Employee',
                value: 'ADD_EMPLOYEE'
            },
            {
                name: 'Remove an Employee',
                value: 'REMOVE_EMPLOYEE'
            },
            {
                name: 'Update an Employee role',
                value: 'UPDATE_ROLE'
            },
            {
                name: 'Update a Manager',
                value: 'UPDATE_MANAGER'
            },
            {
                name: 'View ALL Employees',
                value: 'VIEW_EMPLOYEES'
            },
            {
                name: 'View Employees by Department',
                value: 'VIEW_BYDEPT'
            },
            {
                name: 'View Employees by Manager',
                value: 'VIEW_BYMGR'
            },
            {
                name: 'Exit',
                value: 'EXIT'
            }
        ]
    }]);

    switch (selection) {
        case 'ADD_DEPT': {
            await addDepartment();
            break;
        }
        case 'ADD_ROLE': {
            await addRole();
            break;
        }
        case 'ADD_EMPLOYEE': {
            await addEmployee();
            break;
        }
        case 'REMOVE_EMPLOYEE': {
            await removeEmployee();
            break;
        }
        case 'UPDATE_ROLE': {
            await updateRole();
            break;
        }
        case 'UPDATE_MANAGER': {
            await updateManager();
            break;
        }
        case 'VIEW_EMPLOYEES': {
            await viewEmployees();
            break;
        }
        case 'VIEW_BYDEPT': {
            await viewByDepartment();
            break;
        }
        case 'VIEW_BYMGR': {
            await viewByManager();
            break;
        }
        default: {
            process.exit();
        }
    }
    mainMenu();
}


// Individual functions to add data to database in response to arrays of questions for each selction
// Add Department
const addDepartmentToDB = async (department) => {
    const result = await Connection.promise().query("INSERT INTO departments set ?", department);
    console.log(result);
}

const addDepartment = async () => {
    const department = await inquirer.prompt([{
        type: 'checkbox',
        message: 'What is the name of the Department?',
        name: 'department',
        choices: ['Engineering', 'Finance', 'HR', 'Legal', 'Marketing', 'Operations', 'Sales']
    }]);
    await addDepartmentToDB(department);
}

// Add Role
const addRoleToDB = async (role) => {
    const result = await connection.promise().query("INSERT INTO roles set ?", role);
    console.log(result);
}

const addRole = async () => {
    const role = await inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the role?',
            name: 'rolename'
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Which department does the role belong to?',
            name: 'departmentrole'
        }
    ]);
    await addRoleToDB(role);
}

// Add Employee
const addEmployeeToDB = async (employee) => {
    const result = await connection.promise().query("INSERT INTO employees set ?", employee);
    console.log(result);
}

const addEmployee = async () => {
    const employee = await inquirer.prompt([{
            type: 'input',
            message: 'What is the first name of the Employee?',
            name: 'firstname'
        },
        {
            type: 'input',
            message: 'What is the last name of the Employee?',
            name: 'lastname'
        },
        {
            type: 'input',
            message: 'What is the role of the Employee?',
            name: 'employeerole'
        },
        {
            type: 'input',
            message: 'Who does this Employee report to?',
            name: 'employeemanager'
        }
    ]);
    await addEmployeeToDB(employee);
}

// Remove Employee - CHECK THIS FUNCTION - DIFFERENT FOR DELETE???
const removeEmployeefromDB = async (employee) => {
    const result = await connection.promise().query("DELETE FROM employees set ?", employee);
    console.log(result);
}

const removeEmployee = async () => {
    const employee = await inquirer.prompt([{
            type: 'input',
            message: 'Which Employee would you like to remove?',
            name: 'remove'
        },
        {
            type: 'confirm',
            message: 'Are you sure you want to remove this Employee?',
            name: 'confirmremoval'
        }
    ]);
    await removeEmployeefromDB(employee);
}

// Update Role
const updateRoleToDB = async (role) => {
    const result = await connection.promise().query("UPDATE INTO roles set ?", role);
    console.log(result);
}

const updateRole = async () => {
    const role = await inquirer.prompt([{
            type: 'input',
            message: 'Which Employee would you like to update?',
            name: 'employeeupdate'
        },
        {
            type: 'input',
            message: 'What is the updated role of this Employee?',
            name: 'roleupdate'
        }
    ]);
    await updateRoleToDB(role);
}

// Update Manager
const updateManagerToDB = async (role) => {
    const result = await connection.promise().query("UPDATE INTO employees set ?", employee);
    console.log(result);
}

const updateManager = async () => {
    const employee = await inquirer.prompt([{
            type: 'input',
            message: 'Which Manager would you like to update?',
            name: 'managerupdate'
        },
        {
            type: 'input',
            message: 'What is the first name of the updated Manager?',
            name: 'managerfirstname'
        },
        {
            type: 'input',
            message: 'What is the last name of the updated Manager?',
            name: 'managerlastname'
        }
    ]);
    await updateManagerToDB(employee);
}

// View ALL Employees
const viewEmployeesInDB = async (role) => {
    const result = await connection.promise().query("SELECT * FROM employees set ?", employee);
    console.log(result);
}

const viewEmployees = async () => {
    const employee = await inquirer.prompt([{
        type: 'confirm',
        message: 'Are you sure you want to view ALL Employees?',
        name: 'confirmviewemployees'
    }]);
    await viewEmployeesInDB(employee);
}

// View Employees by Department
const viewEmployeesByDept = async (employee) => {
    const result = await connection.promise().query("SELECT * FROM employees set ?", employee);
    console.log(result);
}

const viewByDepartment = async () => {
    const employee = await inquirer.prompt([{
        type: 'confirm',
        message: 'Are you sure you want to view Employees by Department?',
        name: 'confirmviewemployeesbydept'
    }]);
    await viewEmployeesByDept(employee);
}

// View Employees by Manager
const viewEmployeesByMgr = async (employee) => {
    const result = await connection.promise().query("SELECT * FROM employees set ?", employee);
    console.log(result);
}

const viewByManager = async () => {
    const employee = await inquirer.prompt([{
        type: 'confirm',
        message: 'Are you sure you want to view Employees by Department?',
        name: 'confirmviewemployeesbydept'
    }]);
    await viewEmployeesByMgr(employee);
}


// Exit?
// {
//     type: 'confirm',
//     message: 'Are you sure you want to quit?',
//     name: 'confirmquit'
// }


// Call the function to initialize app
// askQuestions();


// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        // MySQL Username
        user: 'root',
        // TODO: Add MySQL Password
        password: '89K2BXgFgE',
        database: 'companyemployees_db'
    },
    console.log(`Connected to the companyemployees_db database.`)
);