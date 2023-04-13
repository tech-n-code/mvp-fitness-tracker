import express from "express";
import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;

const app = express();
app.use(express.static("public"));

dotenv.config();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5
});

app.use(express.json());

app.get('/api/fitness/person', function(req, res) {
    console.log(req.query);
    if (req.query.name) {
        const name = req.query.name;  //<- /api/fitness/person?name=Bob
        pool.query(`SELECT * FROM person WHERE name = $1`, [name], function(err, result) {
            if (err) {
                console.error(err);
                res.status(500).send('Error reading person');
            } else if (result.rows.length === 0) {
                console.log(`Person with name ${name} was not found`);
                res.status(404).send(`Person with name ${name} was not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    } else if (req.query.id) {
        const id = req.query.id;  //<- /api/fitness/person?id=2
        pool.query(`SELECT * FROM person WHERE id = $1`, [id], function(err, result) {
            if (err) {
                console.error(err);
                res.status(500).send('Error reading person');
            } else if (result.rows.length === 0) {
                console.log(`Person with id ${id} was not found`);
                res.status(404).send(`Person with id ${id} was not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    } else {
        pool.query(`SELECT * FROM person`, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error reading person table');
            } else if (result.rows.length === 0) {
                console.log('Person table not found');
                res.status(404).send('Person table not found');
            } else {
                console.log(`Returned ${result.rows.length} records`);
                res.json(result.rows);
            }
        });
    }
});

app.get('/api/fitness/test', (req, res) => {
    console.log(req.query);
    if (req.query.personID) {  //<- /api/fitness/test?personID=2
        const id = req.query.personID;
        pool.query(`SELECT * FROM person LEFT JOIN test ON person.id = test.person_id WHERE person.id = $1`, [id], function(err, result) {
            if (err) {
                console.error(err);
                res.status(500).send('Error reading person-tests join table');
            } else if (result.rows.length === 0) {
                console.log('No tests found');
                res.status(404).send('No tests found');
            } else {
                console.log(`Returned ${result.rows.length} records`);
                res.json(result.rows);
            }
        });
    } else if (req.query.name) {
        const name = req.query.name;  //<- /api/fitness/test?name=Kyle
        pool.query(`SELECT * FROM person LEFT JOIN test ON person.id = test.person_id WHERE person.name = $1`, [name], function(err, result) {
            if (err) {
                console.error(err);
                res.status(500).send('Error reading person-tests join table');
            } else if (result.rows.length === 0) {
                console.log('No tests found');
                res.status(404).send('No tests found');
            } else {
                console.log(`Returned ${result.rows.length} records`);
                res.json(result.rows);
            }
        });
    } else if (req.query.testID) {
        const id = req.query.testID;  //<- /api/fitness/test?testID=2
        pool.query(`SELECT * FROM test WHERE id = $1`, [id], function(err, result) {
            if (err) {
                console.error(err);
                res.status(500).send('Error reading person');
            } else if (result.rows.length === 0) {
                console.log(`Test id ${id} not found`);
                res.status(404).send(`Test id ${id} not found`);
            } else {
                console.log(result.rows);
                res.json(result.rows);
            }
        });
    } else {
        pool.query(`SELECT * FROM test`, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error reading test table');
            } else if (results.rows.length === 0) {
                console.log('Test table not found');
                res.status(404).send('Test table not found');
            } else {
                console.log(`Returned ${results.rows.length} records`);
                res.json(results.rows);
            }
        })
    }
})

app.post('/api/fitness/person/create', function(req, res) {
    const { name, gender, age } = req.body;
    pool.query(`INSERT INTO person (name, gender, age) VALUES ($1, $2, $3)`, [name, gender, age], function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating person');
        } else {
            console.log(result.rows);
            console.log("Person created successfully");
            res.status(201).send("Person created successfully");
        }
    })
})

app.put('/api/fitness/person/update/:id', function(req, res) {
    const id = req.params.id;
    const { name, gender, age } = req.body;
    pool.query('UPDATE person SET name=$1, gender=$2, age=$3 WHERE id=$4', [name, gender, age, id], function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating person');
        } else {
            console.log(result);
            console.log('Person updated successfully');
            res.status(200).send('Person updated successfully');
        }
    });
});

app.patch('/api/fitness/person/update/:id', function(req, res) {
    const id = req.params.id;
    let data = req.body;
    let query = 'UPDATE person SET name = COALESCE($1, name), gender = COALESCE($2, gender), age = COALESCE($3, age) WHERE id = $4 RETURNING *';
    let values = [data.name || null, data.gender || null, data.age || null, id];
    pool.query(query, values, function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating person');
        } else {
            console.log(result);
            console.log('Person updated successfully');
            res.status(200).send('Person updated successfully');
        }
    });
});

app.delete('/api/fitness/person/delete/:id', function(req, res) {
    const id = req.params.id;
    pool.query('DELETE FROM person WHERE id = $1', [id], function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting person");
        } else {
            console.log(result.rows);
            console.log("Person deleted successfully");
            res.status(204).send("Person deleted successfully");
        }
    });
});

app.post('/api/fitness/test/create', function(req, res) {
    const { pushup_score, situp_score, date, person_id } = req.body;
    pool.query('INSERT INTO test (pushup_score, situp_score, date, person_id) VALUES ($1, $2, $3, $4)', [pushup_score, situp_score, date, person_id], function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error creating test");
        } else {
            console.log(result);
            console.log("Test created successfully");
            res.status(200).send("Test created successfully");
        }
    });
});

app.put('/api/fitness/test/update/:id', function(req, res) {
    const id = req.params.id;
    const { pushup_score, situp_score, date, person_id } = req.body;
      pool.query('UPDATE test SET pushup_score=$1, situp_score=$2, date=$3, person_id=$4 WHERE id=$5', [pushup_score, situp_score, date, person_id, id], function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating test');
        } else {
            console.log(result);
            console.log('Test updated successfully');
            res.status(200).send('Test updated successfully');
        }
    });
});

app.listen(port, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server started on port ${port}`);
    }
});