const pool = require('../models/database');

exports.getHome = async (req, res) => {
    try {
        res.send("Hello, World!");
    } catch (err) {
        res.status(500).send('Error retrieving Home.');
        console.error(err.message);
    }
};

exports.getUsers = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM users`);
        res.send(`${res.json(result.rows)}`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Error retrieving Home.');
        console.error(err.message);
    }
};