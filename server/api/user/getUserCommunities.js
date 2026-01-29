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

    db.query(sql, [user_id], (err, result) => {
        if(err) res.status(401).json("Érvénytelen Paraméter!")
        res.json(result);
    })
})

export default router