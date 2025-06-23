import express from 'express';
import config from './config/config';
import cors from 'cors';
import doggo from './router';

const app = express();

app.use(express.json());
app.use(cors())

app.use('/', doggo);
app.use((req, res) => {
  res.status(404).send('Route not found');
});

export default app;