import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/api', (_req, res) => {
  res.json({ message: 'Octofit Tracker API' });
});

app.listen(PORT, () => {
  console.log(`Octofit Tracker API listening on port ${PORT}`);
});
