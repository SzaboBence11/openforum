import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';
import crypto from "crypto";

dotenv.config();

const app = express();
app.use(express.json());

// Get random communities (For Sidebar)
app.get('/randomCommunities', (req, res) => {

    let sql = `
        SELECT
               communities.id,
               communities.name,
               COUNT(community_users.user_id) as member_count
        FROM communities
        LEFT JOIN community_users ON community_users.community_id = communities.id
        WHERE communities.valid = 'y'
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
        SELECT 
               users.id,
               users.name AS poster_user,
               posts.title AS post_title,
               posts.text AS
               post_text,
               posts.date AS post_date,
               communities.name AS community
        FROM posts
        INNER JOIN communities ON posts.community_id = communities.id
        INNER JOIN users On users.id = posts.user_id
        WHERE posts.valid = 'y' AND users.blocked = 0
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

// Get community data
app.get('/getCommunityData/:community_id', (req, res) => {
    let community_id = parseInt(req.params.community_id);
    let res1;
    let res2;

    let sql = `SELECT
                    users.name AS owner,
                    communities.description AS description,
                    communities.date AS date
               FROM communities
               INNER JOIN community_users
               ON communities.id = community_users.community_id
               INNER JOIN users
               ON users.id = community_users.user_id
               WHERE communities.id = ? AND community_users.role = 'O'`;
    
    let sql2 = `SELECT
                     COUNT(*) AS result_number
                FROM community_users
                WHERE community_id = ?`
    db.query(sql, [community_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res1 = result;
        console.log(community_id);

        db.query(sql2, [community_id], (err, result2) => {
        if (err) return res.status(500).json({ error: err });
        res2 = result2;

        res1[0].member_count = res2[0].result_number;
        res.json(res1);
    })
    })

});

// Get community posts
app.get('/getCommunityPosts/:community_id', (req, res) => {
    let community_id = parseInt(req.params.community_id);

    let sql = `
        SELECT
            users.name AS username,
            posts.title,
            posts.text,
            posts.date
        FROM posts
        INNER JOIN users
        ON users.id = posts.user_id
        WHERE posts.community_id = ? AND posts.valid = "y"
    `
});

// Get comments API (for posts on the frontpage)
app.get('/getComments/:post_id', (req, res) => {

    // Turn post_id to int
    let post_id = parseInt(req.params.post_id);

    // Check if parsing failed
    if (isNaN(post_id)) {
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
        WHERE comments.post_id = ? AND comments.valid = 'y'
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
        password = crypto.createHash('sha256')
                         .update(password)
                         .digest('base64');

        // Look for user by email
        db.query("SELECT * FROM users WHERE email = ? LIMIT 1",
                 [email], (err, rows) => {

            // If there's an error
            if (err) return res.status(500).json("Szerver Hiba!");

            // If there's no account with that email
            if (!rows.length)
                return res.status(400).json("Nincs fiók ezzel az email címmel!");

            // Save current user
            let current_user = rows[0];

            // Check password compatibility
            if (password != current_user.password)
                return res.status(400)
                          .json("Az email - jelszó párosítás nem megfelelő!");

            // Remove password from the dict
            delete current_user.password;

            // Return user data
            if(current_user.blocked == "0")
                return res.json(current_user);
            return res.status(400).json("A fiók blokkolva van!");
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
        db.query(`SELECT * FROM users WHERE name = ?`,
                    [name], (err, name_check) => {

            // If there's an error
            if (err) return res.status(500).json("Szerver hiba!");

            // Check if username already exists
            if (name_check.length)
                return res.status(400).json("Ez a felhasználónév már foglalt!");

            // Search for user by email
            db.query("SELECT * FROM users WHERE email = ?",
                        [email], (err, email_check) => {

                // If there's an error
                if (err) return res.status(500).json("Szerver hiba!");

                // If email already exists
                if (email_check.length)
                    return res.status(400).json("Ez az email már foglalt!");

                // Hash password
                let hashed_password = crypto.createHash('sha256')
                                            .update(password)
                                            .digest('base64');

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
                db.query(sql,[name,
                              display_name,
                              hashed_password,
                              email,
                              description],
                        (err) => {

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


