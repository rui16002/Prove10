CREATE DATABASE expensetracker;
\c expensetracker;

CREATE TABLE movements
(
	movementID SERIAL PRIMARY KEY NOT NULL,
	typeID INT REFERENCES types(typeID) NOT NULL,
	name VARCHAR(50) NOT NULL,
	movementDate date NOT NULL,
	amount float NOT NULL
);

INSERT INTO movements(typeID, name, movementDate, amount) VALUES
  (1, 'Salary', '1878-08-28',1850.0),
  (2, 'Tithings', '1849-08-06',185.0),
  (2, 'Offering', '1849-08-06',18.5),
  (3, 'BYU', '1849-08-06',18.5);
  
 CREATE TABLE types
 (
	typeID SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(50) NOT NULL
);
	
INSERT INTO types(name) VALUES
('Income'),
('Donations'),
('Education'),
('Transportation'),
('Loans'),
('Credit cards'),
('Health'),
('Home');

CREATE USER rui16002 WITH PASSWORD 'rui16002';
GRANT SELECT, INSERT, UPDATE ON movement TO rui16002;
GRANT USAGE, SELECT ON SEQUENCE movement_id_seq TO rui16002;

GRANT SELECT, INSERT, UPDATE ON type TO rui16002;
GRANT USAGE, SELECT ON SEQUENCE type_id_seq TO rui16002;