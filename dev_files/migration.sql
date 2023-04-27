DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS acft;

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25),
    gender CHAR(1),
    age INT
);

CREATE TABLE acft (
    id SERIAL PRIMARY KEY,
    age INT,
    mdl INT,
    spt NUMERIC(4,1),
    hrp INT,
    sdc INTERVAL MINUTE TO SECOND,
    plk INTERVAL MINUTE TO SECOND,
    run INTERVAL MINUTE TO SECOND,
    walk INTERVAL MINUTE TO SECOND,
    bike INTERVAL MINUTE TO SECOND,
    swim INTERVAL MINUTE TO SECOND,
    kmrow INTERVAL MINUTE TO SECOND,
    date DATE,
    person_id INT,
    CONSTRAINT fk_person
        FOREIGN KEY(person_id)
        REFERENCES person(id)
        ON DELETE CASCADE
);