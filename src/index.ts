import 'dotenv/config';
import express from 'express';
import doggo from './router';

const app = express();

app.use(express.json());

app.use('/', doggo);

app.use((req, res) => {
  res.status(404).send(`Route ${req.path} not found`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running with routes:`);
  console.log(`POST /new-message`);
  console.log(`GET  /debug-test`);
});