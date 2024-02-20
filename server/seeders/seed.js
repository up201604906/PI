const { Pool } = require('pg');

// Import required packages and configure the pool (similar to index.js)
const pool = new Pool({
    connectionString: 'postgres://sitbrmbk:54YEHCvRrJldUB3g-rSeMBz2AJagBose@trumpet.db.elephantsql.com/sitbrmbk',
});

// Create the users table if it doesn't exist
pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    )
  `, (err, result) => {
    if (err) {
        console.error('Error creating the users table', err);
    } else {
        console.log('Users table created successfully');
    }
});

pool.query(`
    DELETE FROM users;
    ALTER SEQUENCE users_id_seq RESTART WITH 1;
  `, (err, result) => {
    if (err) {
        console.error('Error clearing the users table', err);
    } else {
        console.log('Data cleared successfully');
    }
});


pool.query(`
        INSERT INTO users (username, email)
        VALUES
        ('john_doe', 'john@example.com'),
        ('jane_smith', 'jane@example.com'),
        ('mike_jackson', 'mike@example.com');
  `, (err, result) => {
    if (err) {
        console.error('Error seeding the users table', err);
    } else {
        console.log('Data seeded successfully');
    }
});
