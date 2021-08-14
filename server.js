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


// Array of questions for user input
const questions = [{
        type: 'checkbox',
        message: 'What would you like to do?',
        name: 'table',
        choices: ['Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee role'],
    },
    {
        type: 'checkbox',
        message: 'What is the name of the Department?',
        name: 'department',
        choices: ['Engineering', 'Finance', 'HR', 'Legal', 'Marketing', 'Operations', 'Sales'],
    },
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'role',
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary',
    },
    {
        type: 'input',
        message: 'Which department does the role belong to?',
        name: 'departmentrole',
    },
    {
        type: 'input',
        message: 'What is the first name of the Employee?',
        name: 'firstname',
    },
    {
        type: 'input',
        message: 'What is the last name of the Employee?',
        name: 'lastname',
    },
    {
        type: 'input',
        message: 'What is the role of the Employee?',
        name: 'employeerole',
    },
    {
        type: 'input',
        message: 'Who does this Employee report to?',
        name: 'employeemanager',
    },
    {
        type: 'input',
        message: 'Which Employee would you like to update?',
        name: 'employeeupdate',
    },
    {
        type: 'input',
        message: 'What is the updated role of this Employee?',
        name: 'roleupdate',
    }
];

// Create a function to initialize app
function init() {
    inquirer.prompt(questions)
        .then((answers) => {
            console.log(answers);
            // const fileName = 'README.md';
            // const readmePageContent = generateMarkdown(answers);

            // Create a function to write README file
            // fs.writeFile(fileName, readmePageContent, (err) => {
            //     err ? console.log(err) : console.log('Successfully created README')
            // });
            // console.log(chosenLicense);
        });
}

// Call the function to initialize app
init();






// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        // MySQL Username
        user: 'root',
        // TODO: Add MySQL Password
        password: '89K2BXgFgE',
        database: 'company-employees_db'
    },
    console.log(`Connected to the company-employees_db database.`)
);