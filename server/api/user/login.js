import db from '../../db.js';
import express from 'express';
import crypto from 'crypto';

const router = express.Router()

// Get random communities (For Sidebar)
router.post('/login', (req, res) => {
    try {

        // Get fetch data
        let { email, password } = req.body;

        // Hash password
        password = crypto.createHash('sha256')
                         .update(password)
                         .digest('base64');

        // Look for user by email
        db.query("SELECT * FROM users WHERE email = ? LIMIT 1",
                 [email], (err, rows) => {

            // If there's an error
<<<<<<< HEAD
            if (err) return res.status(400)
                               .json({ error: err });

=======
            if (err) return res.status(400).json({ a: "fasz" });
>>>>>>> 6be60b31d38ab9737a2f5d6076b60a414f41aea5
            // If there's no account with that email
            if (!rows.length)
                return res.status(401)
                          .json("Nincs fiók ezzel az email címmel!");

            // Save current user
            let current_user = rows[0];

            // Check password compatibility
            if (password != current_user.password)
                return res.status(401)
                          .json("Az email - jelszó párosítás nem megfelelő!");

            // Remove password from the dict
            delete current_user.password;

            // Return user data
            if(current_user.blocked == "0")
                return res.json(current_user);
            return res.status(401)
                      .json("A fiók blokkolva van!");
        });
    }
    catch (err) {
        res.status(500)
           .json("Szerver hiba!");
    }
})

export default router