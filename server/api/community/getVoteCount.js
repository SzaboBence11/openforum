import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.get('/getVoteCount/:post_id', (req, res) => {

    // Turn post_id to int
    let post_id = parseInt(req.params.post_id);

    // Check if parsing failed
    if (isNaN(post_id)) {
        return res.status(400).json({ error: 'Hibás community_id' });
    }

    // Select comments by post
    let sql = `
        SELECT (SELECT COUNT(id) FROM votes WHERE post_id = ? AND votes.type = 'U') -
               (SELECT COUNT(id) FROM votes WHERE post_id = ? AND votes.type = 'D') AS vote_count
        FROM votes
        LIMIT 1
    `;


    // Do query
    db.query(sql, [post_id, post_id], (err, results) => {

        // If there's an error
        if (err) return res.status(400).json({ error: err });

        // Return results
        res.json(results);
    });
});

export default router