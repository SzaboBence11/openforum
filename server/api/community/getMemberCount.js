import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.get('/getMemberCount/:community_id', (req, res) => {

    // Get params
    let community_id = parseInt(req.params.community_id);

    // Select all things of a given post
    let sql = `
        SELECT
            COUNT(*)
        FROM community_users
        WHERE community_id = ?;
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