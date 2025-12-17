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

    let sql = `
        SELECT communities.name,
               COUNT(community_users.user_id) as member_count
        FROM communities
        LEFT JOIN community_users ON community_users.community_id = communities.id
        GROUP BY communities.id
        ORDER BY rand()
        LIMIT 10;
    `;

    db.query(sql, (err, results) => {

        // If there's an error
        if (err) return res.status(500).json({ error: err });

        // Return results
        res.json(results);
    });
});

// Get random posts from different communities (For Frontpage)
app.get('/randomPosts', (req, res) => {

    let sql = `
        SELECT users.id,
               (SELECT name FROM users WHERE users.id = posts.user_id) AS poster_user,
               posts.title AS post_title,
               posts.text AS
               post_text,
               posts.date AS post_date,
               communities.name AS community
        FROM posts
        INNER JOIN communities ON posts.community_id = communities.id
        INNER JOIN users On users.id = posts.user_id
        ORDER BY rand()
        LIMIT 10; 
    `;

    db.query(sql, (err, results) => {

        // If there's an error
        if (err) return res.status(500).json({ error: err });

        // Return results
        res.json(results);
    });
});

// Get comments API (for posts on the frontpage)
app.get('/getComments/:post_id', (req, res) => {

    // Turn post_id to int
    let post_id = parseInt(req.params.post_id);

    // Check if parsing failed
    if (isNaN(postId)) {
        return res.status(400).json({ error: 'Hibás post_id' });
    }

    // Select comments by post
    let sql = `
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

        // If there's an error
        if (err) return res.status(500).json({ error: err });

        // Return results
        res.json(results);
    });
});

// Login API
app.post('/login', (req, res) => {
    try {

        // Get fetch data
        let { email, password } = req.body;
        password = crypto.createHash('sha256').update(password).digest('base64');

        // Look for user by email
        db.query("SELECT * FROM users WHERE email = ? LIMIT 1",
                 [email], (err, rows) => {

            // If there's an error
            if (err) return res.status(500).json("Szerver Hiba!");

            // If there's no account with that email
            if (!rows.length)
                return res.status(401).json("Nincs fiók ezzel az email címmel!");

            // Save current user
            let current_user = rows[0];

            // Check password compatibility
            if (password != current_user.password)
                return res.status(401).json("Az email - jelszó párosítás nem megfelelő!")

            // Remove password from the dict
            delete current_user.password;

            // Return user data
            return res.json(current_user);
        });
    }
    catch (err) {
        res.status(500).json("Szerver hiba!");
    }
})

// Register API
app.post('/register', (req, res) => {
    try {

        // Get fetch data
        let { name, display_name, password, email, description } = req.body;

        // Search for user by name
        db.query(`SELECT * FROM users WHERE name = ?`, [name], (err, name_check) => {

            // If there's an error
            if (err) return res.status(500).json("Szerver hiba!");

            // Check if username already exists
            if (name_check.length)
                return res.status(401).json("Ez a felhasználónév már foglalt!");

            // Search for user by email
            db.query("SELECT * FROM users WHERE email = ?", [email], (err, email_check) => {

                // If there's an error
                if (err) return res.status(500).json("Szerver hiba!");

                // If email already exists
                if (email_check.length)
                    return res.status(401).json("Ez az email már foglalt!");

                // Hash password
                let hashed_password = crypto.createHash('sha256').update(password).digest('base64');

                let sql = `
                    INSERT INTO users (name,
                                       display_name,
                                       role,
                                       password,
                                       email,
                                       description,
                                       blocked)
                    VALUES (?, ?, 'U', ?, ?, ?, 0)
                `

                // Insert new user
                db.query(sql, [name, display_name, hashed_password, email, description], (err) => {

                    // If there's an error
                    if (err) return res.status(500).json("Szerver hiba!");

                    // Successful register!!
                    return res.json({ message: "Sikeres Regisztráció!" });
                });
            });
        });
    }
    catch (err) {
        res.status(500).json("Szerver hiba!");
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Szerver fut a ${PORT} porton`));
