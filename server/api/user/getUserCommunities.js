import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.get("/getUserCommunities/:user_id", (req, res) => {
    let user_id = req.params.user_id;

    if(isNaN(parseInt(user_id)))
        res.status(400).json("Érvénytelen paraméter!");

    let sql = `SELECT
                    communities.name AS community_name,
                    community_users.community_id AS community_id,
                    communities.img
                FROM community_users
                INNER JOIN users ON users.id = community_users.user_id
                INNER JOIN communities ON communities.id = community_users.community_id
                WHERE community_users.user_id = ?`

    // Community member count
    let sql2 = `SELECT
                     COUNT(*) AS result_number
                FROM community_users
                WHERE community_id = ?`;

    db.query(sql, [user_id], (err, res1) => {
        if(err) res.status(401).json("Érvénytelen Paraméter!")

        db.query(sql2, [res1.community_id], (err, res2) => {

            // In case of an error
            if (err)
                return res.status(400).json({ error: err });

            // Combine the 2 results
            // console.log(res2[0].result_number, res1[0])

            console.log(res1.community_id, res2.result_number)
            console.log(res1.community_id)

            res1[0].member_count = res2[0].result_number;

            // Go back with the result
            res.json(res1);
        });
    })
})

export default router