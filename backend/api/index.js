require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Include CORS
const pool = require('./src/models/database');
const routes = require('./src/routes/routes');
const auth = require('./src/middlewares/auth');

const app = express();
app.use(cors()); // This enables CORS for all routes and origins. TODO : ==============> THIS IS VERY BAD, SHOULD BE CHANGED BEFORE PRODUCTION !!!!!!!!!! <============
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/', routes);

app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});
