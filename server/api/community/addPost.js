import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Add Post
router.post('/addPost', (req, res) => {

    // Get arquments
    let { title, text, community_id, user_id} = req.body

    // Set SQL
    let sql = `
        INSERT INTO posts(
                        title,
                        text,
                        community_id,
                        user_id)
               VALUES (?, ?, ?, ?)
    `;
    console.log(sql)

    // Do query
    db.query(sql, [title, text, community_id, user_id], (err, results) => {

        // If there's an error
        if (err) return res.status(400).json({ error: err });

        // Return results
        res.json(results);
    });
});

export default router