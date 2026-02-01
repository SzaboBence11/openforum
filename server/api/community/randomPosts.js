import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.get('/randomPosts', (req, res) => {

    // Select all the things of a post
    let sql = `
        SELECT 
               users.id,
               users.name AS poster_user,
               users.img AS poster_img,
               posts.title AS post_title,
               posts.text AS
               post_text,
               posts.date AS post_date,
               communities.name AS community,
               communities.img AS community_img,
               communities.id AS community_id,
               posts.img
        FROM posts
        INNER JOIN communities ON posts.community_id = communities.id
        INNER JOIN users On users.id = posts.user_id
        WHERE posts.valid = 'y' AND users.blocked = 0
        ORDER BY rand()
        LIMIT 10; 
    `;

    // Do the query
    db.query(sql, (err, results) => {

        // If there's an error
        if (err) return res.status(400).json({ error: err });

        // Return results
        res.json(results);
    });
});

export default router