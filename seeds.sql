INSERT INTO department (id, name);
VALUES 
("Marketing"),
("Finance"),
("Sales"),
("Information Technology"),
("Operations"),
("Human Resources"),
("Research & Development");

INSERT INTO role (id, title, salary, department_id) 
VALUES 
("Marketing Director", 120000, 1),
("Marketing Manager", 85000, 1),
("Finance Director", 118000, 2),
("Finance Manager", 92000, 2),
("Sales Director", 95000, 3),
("Sales lead", 65000, 3),
("Junion Developer", 69000, 4),
("Full Stack Developer", 130000, 4),
("Operations Lead", 87000, 5),
("Operations Analyst", 108000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
("Jacob", "Samsonite", 4, 2),
("Mia", "Thorne", 6, 1),
("JP", "Morgan", 3, NULL),
("Barbara", "Potiriadis", 6, NULL),
("Joel", "Anderson", 7, 2),
("Kobe", "Johnston", 8, NULL),
("Amanda", "Burns", 1, 3),
("Jayden", "Marshall", 6, 4),

SELECT employee.role_id INNER JOIN 