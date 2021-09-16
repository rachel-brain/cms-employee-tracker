INSERT INTO departments (department_name, id)
VALUES 
("Engineering", 1),
("Finance", 2),
("HR", 3),
("Legal", 4),
("Marketing", 5),
("Operations", 6),
("Sales", 7);


INSERT INTO roles (role_title, role_salary, is_manager, department_id)
VALUES 
("Lead Engineer", 75000, true, 1),
("Software Engineer", 75000, false, 1),
("Salesperson", 115000, false, 7),
("Business Manager", 95000, true, 7),
("Finance Manager", 85000, true, 2),
("Accountant", 90000, false, 2),
("Lawyer", 150000, true, 4),
("Product Manager", 80000, true, 5),
("Legal Team Assistant", 55000, false, 4),
("HR Manager", 100000, true, 3),
("Production Leading Hand", 70000, true, 6),
("Machine Operator", 38000, false, 6),
("Accounts Payable Clerk", 45000, false, 2),
("Accounts Receivable Clerk", 45000, false, 2);


INSERT INTO employees (first_name, last_name)
VALUES 
("Mike", "Chan"),
("Abby", "Road"),
("Ashley", "Garcia"),
("Rachel", "Maddow"),
("Brian", "Williams"),
("Steve", "Jobs"),
("Elon", "Musk"),
("Nicole", "Wallace"),
("Richard", "Branson");
("Chris", "Hayes"),
("Sanjaya", "Singh"),
("Tran", "Ngyuen"),
("Leah", "Muscat"),
("Bianca", "Vanderlinde"),
("Joanna", "Haslam"),
("Ramesh", "Weerasinghe"),
("Mary", "Kim"),
("Josh", "Kumari");