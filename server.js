// Access packages needed for the application
const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');

const cTable = require('console.table');

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '89K2BXgFgE',
    database: 'companyemployees_db'
});

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
                name: 'View ALL Departments',
                value: 'VIEW_DEPARTMENTS'
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

    console.log(selection[0]);

    // Switch to set of questions relevant to the answer of the selection by the user
    switch (selection[0]) {
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
        case 'VIEW_DEPARTMENTS': {
            await viewDepartments();
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
}

// Individual functions to add data to database in response to questions asked, dependent on answer to first selection
// Add Department
const addDepartmentToDB = async (department) => {
    const result = await connection.promise().query("INSERT INTO departments set ?", department);
    console.log(department);
}

const addDepartment = async () => {
    const department = await inquirer.prompt([{
        type: 'input',
        message: 'What is the name of the Department?',
        name: 'department_name'
    }]);
    await addDepartmentToDB(department);
    mainMenu();
}

// Add Role
const addRoleToDB = async (role) => {
    console.log(role);
    const result = await connection.promise().query("INSERT INTO roles set ?", role);
}

const addRole = async () => {
    const departments = await connection.promise().query("SELECT * FROM departments");
    const departmentOptions = departments[0].map(department => ({
        name: department.department_name,
        value: department.id
    }));
    // remove some of these tests departments!
    console.table(departmentOptions);

    const role = await inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the role?',
            name: 'role_title'
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'role_salary'
        },
        {
            type: 'confirm',
            message: 'Is this role a manager?',
            name: 'is_manager'
        },
        {
            type: 'list',
            message: 'Which department does the role belong to?',
            name: 'department_id',
            choices: departmentOptions
        }
    ]);

    await addRoleToDB(role);
    mainMenu();
}

// Add Employee
const addEmployeeToDB = async (employee) => {
    const result = await connection.promise().query("INSERT INTO employees set ?", employee);
    console.log(employee);
}

const addEmployee = async () => {
    const employee = await inquirer.prompt([{
            type: 'input',
            message: 'What is the first name of the Employee?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is the last name of the Employee?',
            name: 'last_name'
        },
        // {
        //     type: 'input',
        //     message: 'What is the role of the Employee?',
        //     name: 'role_title'
        // },
        // {
        //     type: 'input',
        //     message: 'Who does this Employee report to?',
        //     name: 'employeemanager'
        // }
    ]);
    await addEmployeeToDB(employee);
    mainMenu();
}

// Remove Employee
const removeEmployeefromDB = async (employee_id) => {
    // const employees = await connection.promise().query("DELETE FROM employees WHERE employee_id ?", employee_id);

    const employeeOptions = employees[0].map(employee => ({
        name: employee.first_name + ' ' + employee.last_name,
        value: employee.id
    }));

    // console.log(employeeOptions);
    // console.table(employeeOptions);
    // console.log(employee_id + "has been deleted");
}

const removeEmployee = async () => {
    console.table(employeeOptions);
    const employee_id = await inquirer.prompt([{
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
    await removeEmployeefromDB(employee_id);
    mainMenu();
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
    mainMenu();
}

// Update Manager
const updateManagerToDB = async (employee) => {
    const result = await connection.promise().query("UPDATE * INTO employees set ?", employee);
    console.log(result);
}

const updateManager = async () => {
    const employee = await inquirer.prompt([{
            type: 'input',
            message: 'What is the first name of the updated Manager?',
            name: 'managerfirstname'
        },
        {
            type: 'input',
            message: 'What is the last name of the updated Manager?',
            name: 'managerlastname'
        },

        {
            type: 'input',
            message: 'Which Manager would you like to update?',
            name: 'managerupdate'
        },

    ]);
    await updateManagerToDB(employee);
    mainMenu();
}

// View ALL Employees
const viewEmployees = async () => {
    const result = await connection.promise().query("SELECT first_name, last_name FROM employees");
    console.table(JSON.parse(JSON.stringify(result[0])));
    mainMenu();
}

// View ALL Departments
const viewDepartments = async () => {
    const result = await connection.promise().query("SELECT * FROM departments");
    console.table(JSON.parse(JSON.stringify(result[0])));
    mainMenu();
}

// View Employees by Department
const viewByDepartment = async () => {
    const result = await connection.promise().query("SELECT first_name, last_name FROM employees WHERE department = department[0]");
    console.table(JSON.parse(JSON.stringify(result[0])));
    mainMenu();
}

// View Employees by Manager
const viewByManager = async () => {
    const result = await connection.promise().query("SELECT first_name, last_name FROM is_manager=true ?", employee);
    console.table(JSON.parse(JSON.stringify(result[0])));
    mainMenu();
}

// Initialize interface
const init = async () => {
    try {
        console.log('\n', "------------------------------------------", '\n');
        console.log('\n', "   *** Welcome to Employee Tracker! ***   ", '\n');
        console.log('\n', "------------------------------------------", '\n');

        mainMenu();

    } catch (err) {
        console.log(err);
    }
};

init();