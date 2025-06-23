import express from 'express';
import config from './config/config';
import cors from 'cors';
import doggo from './router';

const app = express();

app.use(express.json());
app.use(cors())

app.use('/', doggo)

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`)
})


