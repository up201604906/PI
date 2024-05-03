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

app.get('/notifications', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Add client to the list of clients
  clients.push(res);

  // Function to send a heartbeat every minute to keep the connection alive
  const heartbeat = setInterval(() => {
      res.write(':heartbeat\n\n');
  }, 60000);

  // Send a welcome message upon connection
  res.write(`data: ${JSON.stringify({ message: "Connected to notification stream" })}\n\n`);

  // Remove client and clear heartbeat when connection is closed
  req.on('close', () => {
      clearInterval(heartbeat);
      clients.splice(clients.indexOf(res), 1);
      res.end();
  });
});

// Function to send notifications to all connected clients
const sendNotification = (data) => {
  clients.forEach(client => 
      client.write(`data: ${JSON.stringify(data)}\n\n`)
  );
};

