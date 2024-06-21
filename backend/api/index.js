require('dotenv').config();
const express = require('express');
const cors = require('cors');
const projectRoutes = require('./src/routes/projects');
const routes = require('./src/routes/routes');

const app = express();
app.use(cors()); // This enables CORS for all routes and origins. TODO: Change before production.
app.use(express.json());
app.use('/', routes);
app.use('/projects', projectRoutes);

const port = process.env.PORT || 3000;

let server;

if (require.main === module) {
  server = app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`);
  });
} else {
  server = app.listen();
}

app.get('/notifications', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  clients.push(res);

  const heartbeat = setInterval(() => {
    res.write(':heartbeat\n\n');
  }, 60000);

  res.write(`data: ${JSON.stringify({ message: "Connected to notification stream" })}\n\n`);

  req.on('close', () => {
    clearInterval(heartbeat);
    clients.splice(clients.indexOf(res), 1);
    res.end();
  });
});

const sendNotification = (data) => {
  clients.forEach(client => 
    client.write(`data: ${JSON.stringify(data)}\n\n`)
  );
};

module.exports = { app, server, sendNotification };
