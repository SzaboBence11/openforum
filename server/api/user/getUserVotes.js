import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.get('/getComments/:user_id', (req, res) => {

    // Turn post_id to int
    let user_id = parseInt(req.params.user_id);

    // Check if parsing failed
    if (isNaN(user_id)) {
        return res.status(400).json({ error: 'Hibás user_id' });
    }

    // Select comments by post
    let sql = `
        SELECT
            post_id,
            type
        FROM votes
        WHERE user_id = ?
    `;


    // Do query
    db.query(sql, [user_id], (err, results) => {

        // If there's an error
        if (err) return res.status(400).json({ error: err });

        // Return results
        res.json(results);
    });
});

export default router