import express from "express";
import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;
import { scoreNumBased, scoreTimeBased } from "./src/score_calc.js";

const app = express();
app.use(express.static("public"));

dotenv.config();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5
});

app.use(express.json());

app.get('/api/acft/person', function(req, res) {
    console.log(req.query);
    if (req.query.name) {
        const name = req.query.name;  //<- /api/acft/person?name=Bob
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
        const id = req.query.id;  //<- /api/acft/person?id=2
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

app.get('/api/acft/test', (req, res) => {
    console.log(req.query);
    if (req.query.personID) {  //<- /api/acft/test?personID=2
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
        const name = req.query.name;  //<- /api/acft/test?name=Kyle
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
        const id = req.query.testID;  //<- /api/acft/test?testID=2
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

app.post('/api/acft/person', function(req, res) {
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

app.put('/api/acft/person/:id', function(req, res) {
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

app.patch('/api/acft/person/:id', function(req, res) {
    const id = req.params.id;
    const data = req.body;
    const query = 'UPDATE person SET name = COALESCE($1, name), gender = COALESCE($2, gender), age = COALESCE($3, age) WHERE id = $4 RETURNING *';
    const values = [data.name || null, data.gender || null, data.age || null, id];
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

app.delete('/api/acft/person/:id', function(req, res) {
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

app.post('/api/acft/test', function(req, res) {
    const { mdl, spt, hrp, sdc, plk, two_mr, date, person_id } = req.body;
    pool.query('INSERT INTO test (mdl, spt, hrp, sdc, plk, two_mr, date, person_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [mdl, spt, hrp, sdc, plk, two_mr, date, person_id], function(err, result) {
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

app.put('/api/acft/test/:id', function(req, res) {
    const id = req.params.id;
    const { mdl, spt, hrp, sdc, plk, two_mr, date, person_id } = req.body;
      pool.query('UPDATE test SET mdl=$1, spt=$2, hrp=$3, sdc=$4, plk=$5, two_mr=$6, date=$7, person_id=$8 WHERE id=$9', [mdl, spt, hrp, sdc, plk, two_mr, date, person_id, id], function(err, result) {
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

app.patch('/api/acft/test/:id', function(req, res) {
    const id = req.params.id;
    const data = req.body;
    const query = 'UPDATE test SET mdl = COALESCE($1, mdl), spt = COALESCE($2, spt), hrp = COALESCE($3, hrp), sdc = COALESCE($4, sdc), plk = COALESCE($5, plk), two_mr = COALESCE($6, two_mr), date = COALESCE($7, date) WHERE id=$8 RETURNING *';
    pool.query('UPDATE test SET mdl=$1, spt=$2, hrp=$3, sdc=$4, plk=$5, two_mr=$6, date=$7, person_id=$8 WHERE id=$9', [mdl, spt, hrp, sdc, plk, two_mr, date, id], function(err, result) {
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

app.delete('/api/acft/test/:id', function(req, res) {
    const id = req.params.id;
    pool.query('DELETE FROM test WHERE id = $1', [id], function(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting test");
        } else {
            console.log(result.rows);
            console.log("Test deleted successfully");
            res.status(204).send("Test deleted successfully");
        }
    });
});

app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server started on port ${port}`);
    }
});