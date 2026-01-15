import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.get('/getCommunityPosts/:community_id', (req, res) => {
    let community_id = parseInt(req.params.community_id);

    let sql = `
        SELECT
            users.name AS username,
            posts.title,
            posts.text,
            posts.date,
            COUNT(*) AS posts_count
        FROM posts
        INNER JOIN users
        ON users.id = posts.user_id
        WHERE posts.community_id = ? AND posts.valid = 1
    `

    db.query(sql, [community_id], (err, results) => {
        if (err) return res.status(400).json({ error: err });
        res.json(results);
    })

});

export default router