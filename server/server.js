import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config();

const app = express();
app.use(express.json());

// --- Routes --- //

app.get('/communities', (req, res) => {
  db.query('SELECT * FROM `communities` ORDER BY rand() LIMIT 10; ', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 2. Új user hozzáadása
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, name, email });
    }
  );
});

// --- Indítás --- //
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Szerver fut a ${PORT} porton`));
