import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.get("/profile/:user_id", (req, res) => {
    
    // Get params
    let user_id = req.params.user_id;

    // Check if user_id is invalid
    if(isNaN(parseInt(user_id)))
        res.status(400)
           .json("Érvénytelen paraméter!");

    let sql = `SELECT
                    id,
                    name,
                    display_name,
                    role,
                    email,
                    description
                FROM usersó
                WHERE id = ?
                LIMIT 1`

    db.query(sql, [user_id], (err, result) => {
        if(err) res.status(400).json({ error: err });

        res.json(result)
    })
})

export default router