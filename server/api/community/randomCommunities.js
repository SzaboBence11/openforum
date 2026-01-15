import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.get('/randomCommunities', (req, res) => {

    // Select 10 random communities
    let sql = `
        SELECT
               communities.id,
               communities.name,
               COUNT(community_users.user_id) as member_count
        FROM communities
        LEFT JOIN community_users ON community_users.community_id = communities.id
        WHERE communities.valid = 1
        GROUP BY communities.id
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