USE dbname;

CREATE TABLE organogram (
	id INT PRIMARY KEY,
	name VARCHAR(20) NOT NULL,
	surname VARCHAR(20) NOT NULL,
	email VARCHAR(30),
	role VARCHAR(20),
	parent_level INT,
	CONSTRAINT FOREIGN KEY (parent_level)
		REFERENCES organogram(id)
);

CREATE TABLE people_processes (
	id INT PRIMARY KEY,
	name VARCHAR(20) NOT NULL,
	surname VARCHAR(20) NOT NULL,
	email VARCHAR(30)
);

CREATE TABLE processes (
	name VARCHAR(20) PRIMARY KEY,
	start_date DATE,
	end_date DATE,
	id_referent INT,
	CONSTRAINT FOREIGN KEY (id_referent)
		REFERENCES people_processes(id)
);
