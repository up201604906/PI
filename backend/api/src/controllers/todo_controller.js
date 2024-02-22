const pool = require('../models/database');

exports.getAllTodos = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await pool.query('SELECT title, description FROM todos WHERE created_by = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error retrieving todos.');
    console.error(err.message);
  }
};


exports.addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId;
    if (!title || !description) {
      return res.status(400).send('Title and description are required.');
    }

    const result = await pool.query(
      'INSERT INTO todos (title, description, created_by) VALUES ($1, $2, $3) RETURNING id',
      [title, description, userId]
    );

    res.send({
      success: true,
      todo_id: result.rows[0].id
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
};



