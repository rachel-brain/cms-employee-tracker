SELECT employee.last_name AS employee, department.name
FROM department
LEFT JOIN employee
ON department.department_id = employee.id
ORDER BY employee.last_name;


SELECT department.id
FROM department
LEFT JOIN roles
ON roles.department_name = department.id