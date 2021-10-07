# cms-employee-tracker
A CLI application to manage a company's employee database, using Node.js, Inquirer and MySQL.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Description
A command-line interface (CLI) application built from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.  This application will allow non-developers to easily view and interact with information stored in this employee database. An interface such as this is called a **content management system (CMS)** and these are very important in businesses and organisations for data integrity.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles and employees in my company
SO THAT I can organize and plan my business
```

## Video Instructions
The walkthrough video (link below) shows the set-up and functionality of this Employee Tracker using a command-line interface:

https://watch.screencastify.com/v/jW9RUrtBxmlTFxjaFQR7

## Installation
Initially, the application will be set up by typing the following commands in the terminal to install required modules:

```bash
npm install inquirer
npm install express
npm install mysql
npm install mysql2
npm install console.table --save
```

Then, typing the following command in the terminal to initiate the prompts to collate the information required in the database:

```bash
npm start
```

## Usage
1. Once the Employee Tracker is running, the user will be presented with a series of questions about the next task they want to perform, including:
- Add a Department
- Add a Role
- Add an Employee
- Remove an Employee
- Update an Employee role
- Remove a Department
- View ALL Employees
- View ALL Roles
- Exit
2. When the user chooses one of these options, they are presented with a number of questions relating to that option.
3. When these questions are answered, the data is added to/removed from/updated in the database and the user is presented with the original list of task options again.
4. This process is continued until the user chooses the Exit option & they exit the Tracker.

## GitHub Repository Url
https://github.com/rachel-brain/cms-employee-tracker

## Contact
https://github.com/rachel-brain

rachel.brain@internode.on.net