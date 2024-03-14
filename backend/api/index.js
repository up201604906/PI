require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Include CORS
const pool = require('./src/models/database');
const userRoutes = require('./src/routes/user_routes');
const todoRoutes = require('./src/routes/todo_routes');
const auth = require('./src/middlewares/auth');

const app = express();
app.use(cors()); // This enables CORS for all routes and origins. TODO : ==============> THIS IS VERY BAD, SHOULD BE CHANGED BEFORE PRODUCTION !!!!!!!!!! <============
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.send(`Database says the time is: ${result.rows[0].now}`);
});

app.use('/api/users', userRoutes);
app.use('/api/todos', auth, todoRoutes);

app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});
