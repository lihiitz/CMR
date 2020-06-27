use sql_intro;

-- CREATE TABLE Country(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(30)
-- );

-- CREATE TABLE Email_type(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     type VARCHAR(5)
-- );

-- CREATE TABLE Employee(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(20)
-- );

-- CREATE TABLE Client(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(20),
--     email_add VARCHAR(30),
--     email_type INT,
--     country INT,
--     employee INT,
--     sold BOOLEAN,
--     firstContact VARCHAR(50),

--     FOREIGN KEY(email_type) REFERENCES Email_type(id),
--     FOREIGN KEY(country) REFERENCES Country(id),
--     FOREIGN KEY(employee) REFERENCES Employee(id)
-- );

-- DELETE FROM Client;
-- DELETE FROM Employee;
-- DELETE FROM Email_type;
-- DELETE FROM Country;

-- SELECT * FROM Employee;
-- SELECT * FROM Client;
-- SELECT * FROM Country;
-- SELECT * FROM Email_type;

-- INSERT INTO Country VALUES(8, "Israel");
-- INSERT INTO Client VALUES(null, "Lihi Itzkovich", "lihiitz@gmail.com", 1, 8, 1, 1, "2020-06-27")
-- DELETE FROM Client WHERE name = "Lihi itzkovich";
-- SELECT * FROM Email_type;
-- SELECT * FROM Employee;
-- SELECT  country, COUNT(sold) FROM Client WHERE sold = 1 GROUP BY country;
-- SELECT country FROM Client GROUP BY country;

-- DELETE FROM Employee WHERE id = 30;
-- DELETE FROM Client WHERE name = "lihi itzkovich";
-- DELETE FROM Client WHERE name = "mai berlad";

-- DROP TABLE Client;
-- DROP TABLE Employee;
-- DROP TABLE Email_type;
-- DROP TABLE Country;