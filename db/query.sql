SELECT employee.last_name 
AS employee, department.name
FROM department
LEFT JOIN employee
ON department.department_id = employee.id
ORDER BY employee.last_name


SELECT department.id
FROM department
LEFT JOIN roles
ON roles.department_name = department.id


SELECT roles.id, role_title, role_salary, department_name
FROM roles
LEFT JOIN departments
ON roles.department_id = department.id


SELECT employees.id, first_name, last_name, role_title 
FROM employees 
LEFT JOIN roles 
ON employees.role_id = role_id 
ORDER BY employees.last_name