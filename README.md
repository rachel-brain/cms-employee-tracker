# cms-employee-tracker
A CLI application to manage a company's employee database, using Node.js, Inquirer and MySQL.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Description

    
## Motivation


## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Video Instructions


## Installation
The application will be invoked by typing the following command in the terminal to install 'Inquirer':

```bash
npm i inquirer
```

Then, typing the following command in the terminal to initiate the prompts to collate the information required in the database:

```bash
node server.js
```

How to install MySQL (2?)


## Usage
The user will be presented with a series of prompts about their Team Members which s/he will answer until the information is complete for each Employee.  A message will be seen in the terminal saying "Successfully created HTML webpage".  The user will then open the index.html file in their browser to see their team profile page.

## License
MIT

## GitHub Url