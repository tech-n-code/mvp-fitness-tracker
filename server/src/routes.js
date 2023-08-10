import express from "express";
import { pool } from "./dbPool.js";
import { insertScoresToJson } from "./insert_scores.js";

const router = express.Router();

router.get("/acft/person", (req, res) => {
  console.log(req.query); //dev tool
  /* Person by ID */
  if (req.query.id) {
    const id = req.query.id; //<- ex. /api/acft/person?id=2
    pool.query(`SELECT * FROM person WHERE id = $1`, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error reading person");
      } else if (result.rows.length === 0) {
        console.log(`Person with id ${id} was not found`);
        res.status(404).send(`Person with id ${id} was not found`);
      } else {
        console.log(result.rows);
        res.json(result.rows);
      }
    });
    /* All persons ordered by name */
  } else {
    pool.query(`SELECT * FROM person ORDER BY name`, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error reading person table");
      } else if (result.rows.length === 0) {
        console.log("Person table not found");
        res.status(404).send("Person table not found");
      } else {
        console.log(result.rows);
        res.json(result.rows);
      }
    });
  }
});

router.get("/acft/test", (req, res) => {
  console.log(req.query);
  /* Latest test for person by ID */
  if (req.query.personID && req.query.latest) {
    const id = req.query.personID; //<- /api/acft/test?personID=2&latest=true;
    pool.query(
      `SELECT person.id, person.name, person.gender, person.age, acft.id as acft_id, acft.age as acft_age, acft.mdl, acft.spt, acft.hrp, acft.sdc, acft.plk, acft.run, acft.walk, acft.bike, acft.swim, acft.kmrow, acft.date, acft.person_id FROM person LEFT JOIN acft ON person.id = acft.person_id WHERE person.id = $1 ORDER BY acft.date DESC LIMIT 1`,
      [id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error reading person-acft join table");
        } else if (result.rows.length === 0) {
          console.log(`No tests found for person with id ${id}`);
          res.status(404).send(`No tests found for person with id ${id}`);
        } else {
          console.log(result.rows);
          if (result.rows[0].person_id !== null) {
            const resultsWithScores = insertScoresToJson(result.rows); //beta middleware
            console.log("Calculated scores");
            console.log(
              `Returned ${resultsWithScores.length} records for person with id ${id}`
            );
            res.json(resultsWithScores);
          } else {
            res.json(result.rows);
            console.log(
              `Returned ${result.rows.length} records for person with id ${id}`
            );
          }
        }
      }
    );
    /* ACFT by test ID */
  } else if (req.query.id) {
    const id = req.query.id; //<- ex. /api/acft/test?id=2
    pool.query(`SELECT * FROM acft WHERE id = $1`, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error reading acft table");
      } else if (result.rows.length === 0) {
        console.log(`ACFT id ${id} not found`);
        res.status(404).send(`ACFT id ${id} not found`);
      } else {
        console.log(result.rows);
        res.json(result.rows);
      }
    });
    /* All tests for person by ID */
  } else if (req.query.personID) { //<- /api/acft/test?personID=2
    const id = req.query.personID;
    pool.query(
      `SELECT person.id, person.name, person.gender, person.age, acft.id as acft_id, acft.age as acft_age, acft.mdl, acft.spt, acft.hrp, acft.sdc, acft.plk, acft.run, acft.walk, acft.bike, acft.swim, acft.kmrow, acft.date, acft.person_id FROM person LEFT JOIN acft ON person.id = acft.person_id WHERE person.id = $1 ORDER BY acft.date DESC`,
      [id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error reading person-acft join table");
        } else if (result.rows.length === 0) {
          console.log(`No tests found for person with id ${id}`);
          res.status(404).send(`No tests found for person with id ${id}`);
        } else {
          if (result.rows[0].acft_id !== null) {
            const resultsWithScores = insertScoresToJson(result.rows); //beta middleware
            console.log("Calculated scores");
            console.log(
              `Returned ${resultsWithScores.length} records for person with id ${id}`
            );
            res.json(resultsWithScores);
          } else {
            console.log("No tests on record");
            console.log(
              `Returned ${result.rows.length} records for person with id ${id}`
            ); //may need update
            res.json(result.rows);
          }
        }
      }
    );
    /* All tests */
  } else {
    pool.query(`SELECT * FROM acft`, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error reading test table");
      } else if (results.rows.length === 0) {
        console.log("Test table not found");
        res.status(404).send("Test table not found");
      } else {
        console.log(`Returned ${results.rows.length} records`);
        res.json(results.rows);
      }
    });
  }
});

/* Create a person */
router.post("/acft/person", (req, res) => {
  const { name, gender, age } = req.body;
  pool.query(
    `INSERT INTO person (name, gender, age) VALUES ($1, $2, $3) RETURNING *`,
    [name, gender, age],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error creating user");
      } else {
        const id = result.rows[0].id;
        console.log(result.rows);
        console.log(`User ${name} with id ${id} created successfully`);
        res.status(201).json(result.rows);
      }
    }
  );
});

/* Update person by ID (all fields) */
router.put("/acft/person/:id", (req, res) => {
  const id = req.params.id;
  const { name, gender, age } = req.body;
  pool.query(
    "UPDATE person SET name=$1, gender=$2, age=$3 WHERE id=$4 RETURNING *",
    [name, gender, age, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating person");
      } else {
        console.log(result.rows);
        console.log("Person updated successfully");
        res.status(200).json(result.rows);
      }
    }
  );
});

/* Update person by ID (misc fields) */
router.patch("/acft/person/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const query =
    "UPDATE person SET name = COALESCE($1, name), gender = COALESCE($2, gender), age = COALESCE($3, age) WHERE id = $4 RETURNING *";
  const values = [data.name || null, data.gender || null, data.age || null, id];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating person");
    } else {
      console.log(result.rows);
      console.log("Person updated successfully");
      res.status(200).json(result.rows);
    }
  });
});

/* Delete person by id */
router.delete("/acft/person/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "DELETE FROM person WHERE id = $1 RETURNING *",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deleting person");
      } else {
        console.log(result.rows);
        console.log(`Person with id ${result.rows[0].id} deleted successfully`);
        res.status(200).json(result.rows);
      }
    }
  );
});

/* Create test */
router.post("/acft/test", (req, res) => {
  const { age, mdl, spt, hrp, sdc, plk, run, date, person_id } = req.body;
  pool.query(
    "INSERT INTO acft (age, mdl, spt, hrp, sdc, plk, run, date, person_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    [age, mdl, spt, hrp, sdc, plk, run, date, person_id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error creating test");
      } else {
        console.log(result.rows);
        console.log("Test created successfully");
        res.status(200).json(result.rows);
      }
    }
  );
});

/* Update test by id (all fields) */
router.put("/acft/test/:id", (req, res) => {
  const id = req.params.id;
  const { age, mdl, spt, hrp, sdc, plk, run, date, person_id } = req.body;
  pool.query(
    "UPDATE acft SET age=$1, mdl=$2, spt=$3, hrp=$4, sdc=$5, plk=$6, run=$7, date=$8, person_id=$9 WHERE id=$10 RETURNING *",
    [age, mdl, spt, hrp, sdc, plk, run, date, person_id, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating test");
      } else {
        console.log(result.rows);
        console.log("Test updated successfully");
        res.status(200).json(result.rows);
      }
    }
  );
});

/* Update test by ID (misc fields) */
router.patch("/acft/test/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const query =
    "UPDATE acft SET age = COALESCE($1, age), mdl = COALESCE($2, mdl), spt = COALESCE($3, spt), hrp = COALESCE($4, hrp), sdc = COALESCE($5, sdc), plk = COALESCE($6, plk), run = COALESCE($7, run), date = COALESCE($8, date) WHERE id=$9 RETURNING *";
  const values = [
    data.age || null,
    data.mdl || null,
    data.spt || null,
    data.hrp || null,
    data.sdc || null,
    data.plk || null,
    data.run || null,
    data.date || null,
    id,
  ];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating test");
    } else {
      console.log(result.rows);
      console.log(`Test id ${result.rows[0].id} deleted successfully`);
      res.status(200).json(result.rows);
    }
  });
});

/* Delete test by ID */
router.delete("/acft/test/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "DELETE FROM acft WHERE id = $1 RETURNING *",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deleting test");
      } else {
        console.log(result.rows);
        console.log(`Test id ${result.rows[0].id} deleted successfully`);
        res.status(204).json(result.rows);
      }
    }
  );
});

export { router };