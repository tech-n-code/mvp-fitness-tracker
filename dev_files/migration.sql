DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS acft;

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25),
    gender CHAR(1),
    age INT
);

-- Current table; truncates seconds when value is zero causing errors calculating 'undefined' scores; needs rework.
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

-- New table; side effects not worked out yet!
-- CREATE TABLE acft (
--     id SERIAL PRIMARY KEY,
--     age INT,
--     mdl INT,
--     spt NUMERIC(4,1),
--     hrp INT,
--     sdc TIME,
--     plk TIME,
--     run TIME,
--     walk TIME,
--     bike TIME,
--     swim TIME,
--     kmrow TIME,
--     date DATE,
--     person_id INT,
--     CONSTRAINT fk_person
--         FOREIGN KEY(person_id)
--         REFERENCES person(id)
--         ON DELETE CASCADE
-- );