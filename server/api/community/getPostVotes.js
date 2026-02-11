import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.get('/getComments/:post_id', (req, res) => {

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
            users.img AS commenter_img,
            comments.text,
            comments.date
        FROM comments
        INNER JOIN users ON users.id = comments.user_id
        WHERE comments.post_id = ? AND comments.valid = 1
        ORDER BY comments.date ASC
    `;


    // Do query
    db.query(sql, [post_id], (err, results) => {

        // If there's an error
        if (err) return res.status(400).json({ error: err });

        // Return results
        res.json(results);
    });
});

export default router