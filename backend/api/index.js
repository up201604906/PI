require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/routes');

const app = express();
app.use(cors()); // This enables CORS for all routes and origins. TODO : ==============> THIS IS VERY BAD, SHOULD BE CHANGED BEFORE PRODUCTION !!!!!!!!!! <============
app.use(express.json());
app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});
