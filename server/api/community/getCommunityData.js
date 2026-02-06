import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.get('/getCommunityData/:community_id', (req, res) => {

    // Get input variable
    let community_id = parseInt(req.params.community_id);

    // Community details
    let sql = `SELECT
                    users.name AS owner,
                    communities.description AS description,
                    communities.date AS date,
                    communities.name AS name,
                    communities.img AS img
               FROM communities
               INNER JOIN community_users
               ON communities.id = community_users.community_id
               INNER JOIN users
               ON users.id = community_users.user_id
               WHERE communities.id = ? AND community_users.role = 'O'
               LIMIT 1`;
    
    // Community member count
    let sql2 = `SELECT
                     COUNT(*) AS result_number
                FROM community_users
                WHERE community_id = ?`;

    // Do first SQL command
    db.query(sql, [community_id], (err, res1) => {

        // In case of error
        if (err)
            return res.status(400).json({ error: err });

        // Do the second query
        db.query(sql2, [community_id], (err, res2) => {

            // In case of an error
            if (err)
                return res.status(400).json({ error: err });

            // Combine the 2 results
            // console.log(res2[0].result_number, res1[0])

            res1[0].member_count = res2[0].result_number;

            // Go back with the result
            res.json(res1);
        });
    });
});

export default router