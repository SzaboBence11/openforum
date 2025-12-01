import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config();

const app = express();
app.use(express.json());

// --- Routes --- //

// 1. User-ek lekérése
app.get('/users', (req, res) => {
  db.query('SELECT * FROM `users`; ', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 2. Community-k lekérése
app.get('/communities', (req, res) => {
  db.query('SELECT * FROM `communities`; ', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 3. Post-ek lekérése
app.get('/posts', (req, res) => {
  db.query('SELECT * FROM `posts`; ', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 4. Comment-ek lekérése
app.get('/comments', (req, res) => {
  db.query('SELECT * FROM `comments`; ', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 5. Community User-ek lekérése
app.get('/community_users', (req, res) => {
  db.query('SELECT * FROM `community_users`; ', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 6. Blocked User-ek lekérése
app.get('/blocked_users', (req, res) => {
  db.query('SELECT * FROM `blocked_users`; ', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 7. Report-ok lekérése
app.get('/reports', (req, res) => {
  db.query('SELECT * FROM `reports`; ', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 8. Vote-ok lekérése
app.get('/votes', (req, res) => {
  db.query('SELECT * FROM `votes`; ', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// . 10 Random Community Lekérése
app.get('/randomCommunities', (req, res) => {
  db.query('SELECT * FROM `communities` ORDER BY rand() LIMIT 10; ', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 11. Új user hozzáadása
app.post('/insertUsers', (req, res) => {
  const { name, email, password } = req.body;
  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, name, email });
    }
  );
});

// --- Indítás --- //
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Szerver fut a ${PORT} porton`));
