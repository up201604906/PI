const pool = require('../models/database');

exports.getHome = async (req, res) => {
    try {
        res.send("Hello, World!");
    } catch (err) {
        res.status(500).send('Error retrieving Home.');
        console.error(err.message);
    }
};
