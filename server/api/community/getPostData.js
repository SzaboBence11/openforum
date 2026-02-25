import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.get('/getPostData/:post_id', (req, res) => {

    // Get input variable
    let post_id = parseInt(req.params.post_id);

    // Community details
    let sql = `SELECT
                    posts.id AS id,
                    users.name AS poster_user,
                    posts.title AS title,
                    posts.text AS text
               FROM posts
               INNER JOIN users
               ON users.id = posts.user_id
               WHERE posts.id = ?
               LIMIT 1`;
    

    // Do SQL command
    db.query(sql, [post_id], (err, result) => {

        // In case of error
        if (err)
            return res.status(400).json({ error: err });

        res.json(result);
    });
});

export default router