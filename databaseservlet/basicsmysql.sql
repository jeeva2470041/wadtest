-- ===================================================================
--                     BASIC MYSQL CHEAT SHEET / SCRIPT
-- ===================================================================

-- -------------------------------------------------------------------
-- 1. DATABASE OPERATIONS
-- -------------------------------------------------------------------

-- Show all existing databases
SHOW DATABASES;

-- Create a new database
CREATE DATABASE IF NOT EXISTS studentdb;

-- Select/Switch to the database
USE studentdb;

-- Delete a database (CAUTION: Deletes all tables & data)
-- DROP DATABASE IF EXISTS studentdb;


-- -------------------------------------------------------------------
-- 2. TABLE OPERATIONS (DDL - Data Definition Language)
-- -------------------------------------------------------------------

-- Create Table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- View list of tables in current database
SHOW TABLES;

-- View table structure / schema
DESCRIBE students;
-- OR: EXPLAIN students;

-- Alter table: Add a new column
ALTER TABLE students ADD COLUMN phone VARCHAR(15);

-- Alter table: Modify an existing column datatype
ALTER TABLE students MODIFY COLUMN phone VARCHAR(20);

-- Alter table: Drop a column
ALTER TABLE students DROP COLUMN phone;

-- Truncate Table (Removes ALL rows, resets auto-increment id to 1)
-- TRUNCATE TABLE students;

-- Drop Table (Deletes entire table definition & data)
-- DROP TABLE IF EXISTS students;


-- -------------------------------------------------------------------
-- 3. INSERT (CREATE DATA)
-- -------------------------------------------------------------------

-- Insert a single record
INSERT INTO students (name, department, email)
VALUES ('Arun', 'Computer Science', 'arun@example.com');

-- Insert multiple records at once
INSERT INTO students (name, department, email) VALUES
('Bala', 'Information Technology', 'bala@example.com'),
('Chitra', 'Electronics', 'chitra@example.com'),
('David', 'Mechanical', 'david@example.com'),
('Eswar', 'Computer Science', 'eswar@example.com');


-- -------------------------------------------------------------------
-- 4. SELECT (READ DATA)
-- -------------------------------------------------------------------

-- Select all columns and all records
SELECT * FROM students;

-- Select specific columns
SELECT id, name, department FROM students;

-- Filtering with WHERE condition
SELECT * FROM students WHERE department = 'Computer Science';

-- Filtering with AND / OR
SELECT * FROM students WHERE department = 'Computer Science' AND id > 1;

-- Search pattern using LIKE (% matches any sequence)
SELECT * FROM students WHERE name LIKE 'A%'; -- Names starting with 'A'
SELECT * FROM students WHERE name LIKE '%a%'; -- Names containing 'a'

-- Sorting results (ORDER BY ASC / DESC)
SELECT * FROM students ORDER BY name ASC;
SELECT * FROM students ORDER BY id DESC;

-- Limit number of results (useful for pagination)
SELECT * FROM students LIMIT 3;
SELECT * FROM students LIMIT 2 OFFSET 2; -- Skip first 2, get next 2

-- Count total records
SELECT COUNT(*) AS total_students FROM students;

-- Group by department with count
SELECT department, COUNT(*) AS count
FROM students
GROUP BY department;


-- -------------------------------------------------------------------
-- 5. UPDATE (MODIFY DATA)
-- -------------------------------------------------------------------

-- Update a single column for a specific record (ALWAYS use WHERE!)
UPDATE students
SET department = 'Artificial Intelligence'
WHERE id = 1;

-- Update multiple columns
UPDATE students
SET name = 'Arun Kumar', email = 'arunkumar@example.com'
WHERE id = 1;

-- Update with condition
UPDATE students
SET department = 'IT'
WHERE department = 'Information Technology';


-- -------------------------------------------------------------------
-- 6. DELETE (REMOVE DATA)
-- -------------------------------------------------------------------

-- Delete a specific record by ID (ALWAYS use WHERE!)
DELETE FROM students
WHERE id = 4;

-- Delete records matching a condition
DELETE FROM students
WHERE department = 'Mechanical';

-- Delete ALL records from table (Keeps table structure)
-- DELETE FROM students;


-- -------------------------------------------------------------------
-- 7. USER & PERMISSIONS (Useful for Ubuntu / Remote access)
-- -------------------------------------------------------------------

-- Allow root password login for JDBC / localhost
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootpassword';

-- Flush privileges to apply changes
-- FLUSH PRIVILEGES;
