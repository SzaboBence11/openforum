import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.get('/getCommunityData/:community_id', (req, res) => {
    let community_id = parseInt(req.params.community_id);
    let res1;
    let res2;

    let sql = `SELECT
                    users.name AS owner,
                    communities.description AS description,
                    communities.date AS date
               FROM communities
               INNER JOIN community_users
               ON communities.id = community_users.community_id
               INNER JOIN users
               ON users.id = community_users.user_id
               WHERE communities.id = ? AND community_users.role = 'O'`;
    
    let sql2 = `SELECT
                     COUNT(*) AS result_number
                FROM community_users
                WHERE community_id = ?`
    db.query(sql, [community_id], (err, result) => {
        if (err) return res.status(400).json({ error: err });
            res1 = result;
            console.log(community_id);
            db.query(sql2, [community_id], (err, result2) => {
        if (err) return res.status(400).json({ error: err });
            res2 = result2;
            res1[0].member_count = res2[0].result_number;
            res.json(res1);
        })
    })

});

export default router