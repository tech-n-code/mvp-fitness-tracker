import express from "express";
import dotenv from "dotenv";
import pg from "pg";
const { Client } = pg;
const { Pool } = pg;

const app = express();
app.use(express.static("public"));

dotenv.config();
const port = process.env.PORT || 3000;

const client = new Client(process.env.DATABASE_URL);
client.connect();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5
});

app.use(express.json());

app.get("/", function(req, res) {   
    res.send("Hello, world!");
});

app.get('/api/fitness/all-persons', function(req, res) {
    pool.query(`SELECT * FROM person`, function(err, response) {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading person table');
        } else if (response.rows.length === 0) {
            console.log('Person table not found');
            res.status(404).send('Person table not found');
        } else {
            console.log(`Returned ${response.rows.length} records`);
            res.json(response.rows);
        }
    })
})

app.get('/api/fitness/all-tests', function(req, res) {
    pool.query(`SELECT * FROM test`, function(err, response) {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading test table');
        } else if (response.rows.length === 0) {
            console.log('Test table not found');
            res.status(404).send('Test table not found');
        } else {
            console.log(`Returned ${response.rows.length} records`);
            res.json(response.rows);
        }
    })
})
//api/people/name="person"

app.get('/api/people', function(req, res) {
    // const person = req.params.person;
    console.log(req.query);
});

// app.get('/api/fitness/person-by-name/:person', function(req, res) {
//     const person = req.params.person;
//     pool.query(`SELECT * FROM person WHERE name = $1`, [person], function(err, response) {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Error reading person');
//         } else if (response.rows.length === 0) {
//             console.log(`Person with id ${person} not found`);
//             res.status(404).send(`Person with id ${person} not found`);
//         } else {
//             console.log(response.rows);
//             res.json(response.rows);
//         }
//     })
// })

// api/people/id
app.get('/api/fitness/person-by-id/:id', function(req, res) {
    const id = req.params.id;
    pool.query(`SELECT * FROM person WHERE id = $1`, [id], function(err, response) {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading person');
        } else if (response.rows.length === 0) {
            console.log(`Person with id ${id} not found`);
            res.status(404).send(`Person with id ${id} not found`);
        } else {
            console.log(response.rows);
            res.json(response.rows);
        }
    })
})

app.get('/api/fitness/person-tests/:id', function(req, res) {
    const id = req.params.id;
    pool.query(`SELECT * FROM person LEFT JOIN test ON person.id = test.person_id WHERE person.id = $1`, [id], function(err, response) {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading person-tests join table');
        } else if (response.rows.length === 0) {
            console.log('Person-tests join table not found');
            res.status(404).send('Person-tests join table not found');
        } else {
            console.log(`Returned ${response.rows.length} records`);
            res.json(response.rows);
        }
    })
})

app.post('/api/fitness/create-person', function(req, res) {
    const { name, gender, age } = req.body;
    pool.query(`INSERT INTO person (name, gender, age) VALUES ($1, $2, $3)`, [name, gender, age], function(err, response) {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating person');
        } else {
            console.log(response.rows);
            res.status(201).send("Person created successfully");
        }
    })
})

app.put('/api/fitness/update-person/:id', function(req, res) {
    const id = req.params.id;
    const { name, gender, age } = req.body;
    client.query('UPDATE person SET name=$1, gender=$2, age=$3 WHERE id=$4', [name, gender, age, id], function(err, response) {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating person');
        } else {
            console.log(response);
            res.status(200).send('Person updated successfully');
        }
    });
});

app.delete('/api/fitness/delete-person/:id', function(req, res) {
    const id = req.params.id;
    pool.query('DELETE FROM person WHERE id = $1', [id], function(err, response) {
        if (err) {
            console.error(err);
            res.status(500).send("Error deleting person");
        } else {
            console.log(response.rows);
            res.status(204).send("Person deleted successfully");
        }
    });
});

app.post('/api/fitness/create-test', function(req, res) {
    const { pushup_score, situp_score, date, person_id } = req.body;
    pool.query('INSERT INTO test (pushup_score, situp_score, date, person_id) VALUES ($1, $2, $3, $4)', [pushup_score, situp_score, date, person_id], function(err, response) {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating test');
        } else {
            console.log(response);
            res.status(200).send('Test created successfully');
        }
    });
});

app.put('/api/fitness/update-test/:id', function(req, res) {
    const id = req.params.id;
    const { pushup_score, situp_score, date, person_id } = req.body;
  
    client.query('UPDATE test SET pushup_score=$1, situp_score=$2, date=$3, person_id=$4 WHERE id=$5', [pushup_score, situp_score, date, person_id, id], function(err, response) {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating test');
        } else {
            console.log(response);
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