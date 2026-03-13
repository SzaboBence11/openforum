import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get popular communities (For Sidebar)
router.get('/popularCommunities/:limit', (req, res) => {

    console.log("aaa");

    // Turn community_id to int
    let limit = parseInt(req.params.limit);


    // Check if parsing failed
    if (isNaN(limit)) {
        return res.status(400).json({ error: 'Hibás limit' });
    }

    // Select most popular communities
    let sql = `
        SELECT
               communities.id,
               communities.name,
               COUNT(community_users.user_id) as member_count,
               communities.img,
               communities.description
        FROM communities
        LEFT JOIN community_users ON community_users.community_id = communities.id
        WHERE communities.valid = 1
        GROUP BY communities.id
        ORDER BY member_count DESC
        LIMIT ?;
    `;


    // Do the query
    db.query(sql, [limit], (err, results) => {

        // If there's an error
        if (err) return res.status(400).json({ error: err });

        // Return results
        res.json(results);
    });
});

export default router