import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';
import crypto from "crypto";

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

// Get random posts from different communities(For Home)
app.get('/randomPosts', (req, res) => {
  db.query('SELECT users.id, (SELECT name FROM users WHERE users.id = posts.user_id) AS poster_user, posts.title AS post_title, posts.text AS post_text, posts.date AS post_date, communities.name AS community FROM posts INNER JOIN communities ON posts.community_id = communities.id  INNER JOIN users On users.id = posts.user_id ORDER BY rand() LIMIT 10; ', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});


app.get('/getComments/:post_id', (req, res) => {
  let post_id = parseInt(req.params.post_id);

  if (isNaN(postId)) {
    return res.status(400).json({ error: 'Hibás post_id' });
  }

  const sql = `
    SELECT
      users.name AS commenter_user,
      comments.text,
      comments.date
    FROM comments
    INNER JOIN users ON comments.user_id = users.id
    WHERE comments.post_id = ?
    ORDER BY comments.date ASC
  `;

  db.query(sql, [post_id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post('/login', (req, res) => {
  let {email, password} = req.body
  current_password = createHash('sha256').update([password]).digest('base64'),
  current_email = [email];

  let current_user = db.execute(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  if(!current_user.length)
    return res.status(401).json("Nincs fiók ezzel az email címmel!");

  if(current_password != current_user.password)
    return res.status(401).json("Az email - jelszó párosítás nem megfelelő!")

  return json(current_user);

})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Szerver fut a ${PORT} porton`));
