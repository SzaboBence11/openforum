import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';
import crypto from "crypto";
import { queryObjects } from 'v8';

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

app.post('/login', async(req, res) => {
  try{
    let {email, password} = req.body
    password = createHash('sha256').update(password).digest('base64');

    let [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if(!rows.length)
      return res.status(401).json("Nincs fiók ezzel az email címmel!");

    let current_user = rows[0];

    if(password != current_user.password)
      return res.status(401).json("Az email - jelszó párosítás nem megfelelő!")

    delete current_user.password;

    return res.json(current_user);
  }
  catch(err){
    res.status(500).json("Szerver hiba!");
  }
})

app.post('/register', async(req, res) => {
  try{
    let {name, display_name, password, email, description} = req.body,
    name_check = await db.query("SELECT * FROM users WHERE name = ?", [name]),
    email_check = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if(name_check.length)
      return res.status(401).json("Ez a felhasználónév már foglalt!");

    if(email_check.length)
      return res.status(401).json("Ez az email már foglalt!");
    
  }
  catch(err){
    res.status(500).json("Szerver hiba!");
  }
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Szerver fut a ${PORT} porton`));
