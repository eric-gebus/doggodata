import 'dotenv/config';
import express from 'express';
import doggo from './router';

const app = express();

app.use(express.json());

app.use('/', doggo);

app.use((req, res) => {
  res.status(404).send(`Route ${req.path} not found`);
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}
export default app;