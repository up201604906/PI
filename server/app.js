var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
const { Pool } = require('pg');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testServerRouter = require('./routes/testServer');

var app = express();

app.use(bodyParser.json());

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: 'postgres://sitbrmbk:54YEHCvRrJldUB3g-rSeMBz2AJagBose@trumpet.db.elephantsql.com/sitbrmbk',
});

// Test the database connection
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the database');
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testServer', testServerRouter);


app.post('/users', (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: 'Both username and email are required' });
  }

  pool.query('INSERT INTO users (username, email) VALUES ($1, $2)', [username, email], (err, result) => {
    if (err) {
      console.error('Error inserting user into the database', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'User created successfully' });
    }
  });
});


app.get('/users', (req, res) => {
  // Use COUNT() to get the total number of users
  pool.query('SELECT COUNT(*) as total_users FROM users; SELECT * FROM users;', (err, result) => {
    if (err) {
      console.error('Error executing SQL query', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Extract the count from the first query result
      const totalUsers = result[0].rows[0].total_users;

      // Extract user data from the second query result
      const users = result[1].rows;

      // Create a response object with both the count and user data
      const response = {
        total_users: totalUsers,
        users: users,
      };

      res.json(response);
    }
  });
});

app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: 'Both username and email are required' });
  }

  pool.query('UPDATE users SET username = $1, email = $2 WHERE id = $3', [username, email, userId], (err, result) => {
    if (err) {
      console.error('Error updating user in the database', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'User updated successfully' });
    }
  });
});


app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  pool.query('DELETE FROM users WHERE id = $1', [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user from the database', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
