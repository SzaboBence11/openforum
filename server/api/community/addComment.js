import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.post('/addComment', (req, res) => {

    // Turn post_id to int
    let { post_id, user_id, text } = req.body

    // Select comments by post
    let sql = `
        INSERT INTO comments(post_id,
                                user_id,
                                text,
                                valid)
               VALUES (?, ?, ?, 1)
    `;

    // Do query
    db.query(sql, [post_id, user_id, text], (err, results) => {

        // If there's an error
        if (err) return res.status(400).json({ error: err });

        // Return results
        res.json(results);
    });
});

export default router