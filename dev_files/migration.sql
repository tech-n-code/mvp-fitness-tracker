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
    mdl INT,
    spt NUMERIC(4,1),
    hrp INT,
    sdc INTERVAL MINUTE TO SECOND,
    plk INTERVAL MINUTE TO SECOND,
    two_mr INTERVAL MINUTE TO SECOND,
    date DATE,
    person_id INT,
    CONSTRAINT fk_person
        FOREIGN KEY(person_id)
        REFERENCES person(id)
        ON DELETE CASCADE
);