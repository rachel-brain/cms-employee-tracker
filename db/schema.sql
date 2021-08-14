DROP DATABASE IF EXISTS companyemployees_db;
CREATE DATABASE companyemployees_db;

USE companyemployees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_title VARCHAR(30) NOT NULL,
  role_salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id),
  REFERENCES department(id),
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id),
  REFERENCES role(id),
  ON DELETE SET NULL,
  manager_id INT,
  FOREIGN KEY (manager_id),
  REFERENCES manager(id),
  ON DELETE SET NULL
);