const express = require("express");
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgres://sitbrmbk:54YEHCvRrJldUB3g-rSeMBz2AJagBose@trumpet.db.elephantsql.com/sitbrmbk",
});

router.get("/", async (req, res, next) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users');
        const username = result.rows[0].username;
        client.release(); // release the client back to the pool
        res.send(username);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
