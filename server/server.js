import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config();

const app = express();
app.use(express.json());

// Get random communities (For Sidebar)
app.get('/randomCommunities', (req, res) => {
  db.query('SELECT communities.name, COUNT(community_users.user_id) as member_count FROM communities LEFT JOIN community_users ON community_users.community_id = communities.id GROUP BY communities.id ORDER BY rand() LIMIT 10; ', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
    console.log(results)
  });
});

// Get random posts (For Home)
app.get('/randomCommunities', (req, res) => {
  db.query('SELECT comments.text, posts.text, communities.name FROM comments INNER JOIN posts ON comments.post_id = posts.id INNER JOIN communities ON posts.community_id = communities.id ORDER BY rand() LIMIT 10; ', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Szerver fut a ${PORT} porton`));
