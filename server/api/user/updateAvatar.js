import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.post('/updateAvatar', (req, res) => {
    try {

        // Get fetch data
        console.log(req.body)
        let { imgBase64, id } = req.body;

        let sql = `UPDATE users
                   SET img = ?
                   WHERE id = ?`;



        // Search for user by email
        db.query(sql,
                    [imgBase64, id], (err, result) => {

            // If there's an error
            if (err) return res.status(400)
                               .json({ error: err });

                              
                // Successful register!!
            return res.json({ message: "Sikeres Módosítás!" });
        });
    }
    catch (err) {
        res.status(500).json("Szerver hiba!");
    }
});

export default router