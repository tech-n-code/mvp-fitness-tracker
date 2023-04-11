DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS test;

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    gender CHAR(1),
    age INT
);

CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    pushup_score INT,
    situp_score INT,
    date TIMESTAMP,
    person_id INT,
    CONSTRAINT fk_person
        FOREIGN KEY(person_id)
        REFERENCES person(id)
        ON DELETE CASCADE
);