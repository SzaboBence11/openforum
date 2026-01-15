import db from '../../db.js';
import express from 'express';
import crypto from 'crypto';

const router = express.Router()

// Get random communities (For Sidebar)
router.post('/register', (req, res) => {
    try {

        // Get fetch data
        let { display_name, password, email } = req.body;

        // Search for user by email
        db.query("SELECT * FROM users WHERE email = ?",
                    [email], (err, email_check) => {

            // If there's an error
            if (err) return res.status(400).json({ error: err });
            // If email already exists

            if (email_check.length)
                return res.status(401).json("Ez az email már foglalt!");
            // Hash password
            let hashed_password = crypto.createHash('sha256')
                                        .update(password)
                                        .digest('base64');
            db.query("SELECT id FROM users", (err, users) => {
                if (err) return res.status(400).json({ error: err });
                let user_count = users.length;
                let name = `${display_name.replaceAll(' ', '').toLowerCase()}_${user_count + 1}`;
                

                let sql = `
                    INSERT INTO users (name,
                                       display_name,
                                       role,
                                       password,
                                       email,
                                       description,
                                       blocked)
                    VALUES (?, ?, 'U', ?, ?, '', 0)
                `
                // Insert new user
                db.query(sql,[name,
                              display_name,
                              hashed_password,
                              email],
                        (err) => {
                    // If there's an error
                    if (err) return res.status(400).json({ error: err });
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

export default router