// Access packages needed for the application
const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

const database = [];

// Array of questions for user input
const askQuestions = () => {
    inquirer.prompt([{
            type: 'checkbox',
            message: 'What would you like to do?',
            name: 'table',
            choices: ['Add a Department', 'Add a Role', 'Add an Employee', 'Remove an Employee', 'Update an Employee role', 'Update an Employee Manager', 'View ALL Employees', 'View Employees by Department', 'View Employees by Manager', 'Quit']
        },
        {
            type: 'checkbox',
            message: 'What is the name of the Department?',
            name: 'department',
            choices: ['Engineering', 'Finance', 'HR', 'Legal', 'Marketing', 'Operations', 'Sales'],
            when: (answers) => answers.table === 'Add a Department'
        },
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'role',
            when: (answers) => answers.table === 'Add a Role'
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'salary',
            when: (answers) => answers.role !== null
        },
        {
            type: 'input',
            message: 'Which department does the role belong to?',
            name: 'departmentrole',
            when: (answers) => answers.salary > 0
        },
        {
            type: 'input',
            message: 'What is the first name of the Employee?',
            name: 'firstname',
            when: (answers) => answers.table === 'Add an Employee'
        },
        {
            type: 'input',
            message: 'What is the last name of the Employee?',
            name: 'lastname',
            when: (answers) => answers.firstname !== null
        },
        {
            type: 'input',
            message: 'What is the role of the Employee?',
            name: 'employeerole',
            when: (answers) => answers.lastname !== null
        },
        {
            type: 'input',
            message: 'Who does this Employee report to?',
            name: 'employeemanager',
            when: (answers) => answers.employeerole !== null
        },
        {
            type: 'input',
            message: 'Which Employee would you like to remove?',
            name: 'remove',
            when: (answers) => answers.table === 'Remove an Employee'
        },
        {
            type: 'confirm',
            message: 'Are you sure you want to remove this Employee?',
            name: 'confirmremoval',
            when: (answers) => answers.remove === true
        },
        {
            type: 'input',
            message: 'Which Employee would you like to update?',
            name: 'employeeupdate',
            when: (answers) => answers.table === 'Update an Employee'
        },
        {
            type: 'input',
            message: 'What is the updated role of this Employee?',
            name: 'roleupdate',
            when: (answers) => answers.employeeupdate !== null
        },
        {
            type: 'input',
            message: 'Which Manager would you like to update?',
            name: 'managerupdate',
            when: (answers) => answers.table === 'Update an Employee Manager'
        },
        {
            type: 'input',
            message: 'What is the first name of the updated Manager?',
            name: 'managerfirstname',
            when: (answers) => answers.managerupdate !== null
        },
        {
            type: 'input',
            message: 'What is the last name of the updated Manager?',
            name: 'managerlastname',
            when: (answers) => answers.managerfirstname !== null
        },
        {
            type: 'confirm',
            message: 'Are you sure you want to view ALL Employees?',
            name: 'confirmviewemployees',
            when: (answers) => answers.table === 'View ALL Employees'
        },
        {
            type: 'confirm',
            message: 'Are you sure you want to view Employees by Department?',
            name: 'confirmviewemployeesbydept',
            when: (answers) => answers.table === 'View Employees by Department'
        },
        {
            type: 'confirm',
            message: 'Are you sure you want to view Employees by Manager?',
            name: 'confirmviewemployeesbymgr',
            when: (answers) => answers.table === 'View Employees by Manager'
        },
        {
            type: 'confirm',
            message: 'Are you sure you want to quit?',
            name: 'confirmquit',
            when: (answers) => answers.table === 'Quit'
        }
    ]).then(answers => {
        database.push(answers);
    })
};

// Create a function to initialize app
// function init() {
//     inquirer.prompt(askQuestions)
//         .then((answers) => {
//             console.log(answers);
// const fileName = 'README.md';
// const readmePageContent = generateMarkdown(answers);

// Create a function to write README file
// fs.writeFile(fileName, readmePageContent, (err) => {
//     err ? console.log(err) : console.log('Successfully created README')
// });
// console.log(chosenLicense);
//         });
// }

// Call the function to initialize app
// init();

askQuestions();




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