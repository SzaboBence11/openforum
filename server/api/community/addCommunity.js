import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.post('/addCommunity', (req, res) => {

    // Turn post_id to int
    let { name, description, img, user_id } = req.body

    // Select comments by post
    let sql = `
        INSERT INTO communities(name,
                                description,
                                valid
                                ${img ? ', img' : ''})
               VALUES (?, ?, 1 ${img ? ', ?' : ''})
    `;

    // Do query
    db.query(sql, [name, description, img.length>0 ? img : ''], (err, results) => {

        // If there's an error
        if (err) return res.status(400).json({ error: err });

        sql = `
            INSERT INTO community_users(community_id,
                                    user_id,
                                    role)
                   VALUES (?, ?, 'O')
        `;

        db.query(sql, [results.insertId, user_id], (err, results) => {
            // If there's an error
            if (err) return res.status(400).json({ error: err });
        })

        // Return results
        res.json(results);
    });
});

export default router