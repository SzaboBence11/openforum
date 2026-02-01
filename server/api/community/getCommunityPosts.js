import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.get('/getCommunityPosts/:community_id', (req, res) => {

    // Get params
    let community_id = parseInt(req.params.community_id);

    // Select all things of a given post
    let sql = `
        SELECT
            users.name AS poster_user,
            users.img AS poster_img,
            posts.title as post_title,
            posts.text as post_text,
            posts.date as post_date,
            communities.name AS community,
            communities.img AS community_img,
            communities.id AS community_id,
            posts.img
        FROM posts
        INNER JOIN users
        ON users.id = posts.user_id
        INNER JOIN communities
        ON posts.community_id = communities.id
        WHERE posts.community_id = ? AND posts.valid = 1
    `

    // Do the query
    db.query(sql, [community_id], (err, results) => {

        // If error
        if (err)
            return res.status(400).json({ error: err });
        
        // Return result
        res.json(results);
    })

});

export default router