import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/randomCommunities', (req, res) => {
  db.query('SELECT * FROM `communities` ORDER BY rand() LIMIT 10; ', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Szerver fut a ${PORT} porton`));
