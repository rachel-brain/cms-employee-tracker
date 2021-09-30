// Access packages needed for the application
const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');

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
    // console.log("a role");
    // const deptID = await connection.promise().query("SELECT departments.id FROM departments LEFT JOIN roles ON ? = departments.department_name", role.department_name);
    // SELECT departments, roles FROM departments LEFT JOIN roles ON Finance = departments.department_name
    // SELECT departments FROM departments LEFT JOIN roles ON Finance = departments.department_name

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
    console.log(departmentOptions)
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
            // change to ids! test
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
    console.log(result);
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
        {
            type: 'input',
            message: 'What is the role of the Employee?',
            name: 'role_title'
        },
        {
            type: 'input',
            message: 'Who does this Employee report to?',
            name: 'employeemanager'
        }
    ]);
    await addEmployeeToDB(employee);
    mainMenu();
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
    mainMenu();
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
    mainMenu();
}

// View Employees by Department
const viewEmployeesByDept = async (employee) => {
    const result = await connection.promise().query("SELECT * FROM employees set ?", employee.department);
    console.log(result);
}

const viewByDepartment = async () => {
    const employee = await inquirer.prompt([{
        type: 'confirm',
        message: 'Are you sure you want to view Employees by Department?',
        name: 'confirmviewemployeesbydept'
    }]);
    await viewEmployeesByDept(employee);
    mainMenu();
}

// View Employees by Manager
const viewEmployeesByMgr = async (employee) => {
    const result = await connection.promise().query("SELECT * FROM employees set ?", employee.manager);
    console.log(result);
}

const viewByManager = async () => {
    const employee = await inquirer.prompt([{
        type: 'confirm',
        message: 'Are you sure you want to view Employees by Department?',
        name: 'confirmviewemployeesbydept'
    }]);
    await viewEmployeesByMgr(employee);
    mainMenu();
}

// Initialize interface
const init = async () => {
    try {
        console.log('\n', "----------------------------------------", '\n');
        console.log('\n', "       Welcome to Employee Tracker!     ", '\n');
        console.log('\n', "----------------------------------------", '\n');

        mainMenu();

    } catch (err) {
        console.log(err);
    }
};

init();