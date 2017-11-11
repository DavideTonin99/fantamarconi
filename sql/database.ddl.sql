USE dbname;

CREATE TABLE organogram (
	id INT PRIMARY KEY,
	name VARCHAR(20) NOT NULL,
	surname VARCHAR(20) NOT NULL,
	email VARCHAR(30),
	sector VARCHAR(50),
	role VARCHAR(50),
	parent_level NOT NULL,
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
	id_referent INT NOT NULL,
	CONSTRAINT FOREIGN KEY (id_referent)
		REFERENCES people_processes(id)
);

CREATE TABLE timeline (
	process VARCHAR(20),
	id_person INT,
	start_date DATE,
	end_date DATE,
	job VARCHAR(100) NOT NULL,
	CONSTRAINT PRIMARY KEY (id_process,id_person,start_date),
	CONSTRAINT FOREIGN KEY (process) REFERENCES processes(process),
	CONSTRAINT FOREIGN KEY (id_person) REFERENCES people_processes(id)
);