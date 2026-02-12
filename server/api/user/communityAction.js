import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.post('/communityAction', (req, res) => {
    try {

        // Get fetch data
        let { community_id, user_id, method } = req.body;
        console.log(req.body)
        let sql = "";

        if(method == 'join'){
            // Insert community join sql
            sql = `
                INSERT INTO community_users (
                                   community_id,
                                   user_id,
                                   role)
                VALUES (?, ?, 'U')`
        } else{
            sql = `
                DELETE FROM community_users 
                WHERE community_id = ? AND
                       user_id = ?`
        }

        // Insert new user
        db.query(sql,[community_id,
                      user_id],
                (err) => {
            // If there's an error
            if (err)
                return res.status(400)
                          .json({ error: err });
                          
            // Successful
            return res.json({ message: "Siker " });
        });

    }
    catch (err) {
        res.status(500).json("Szerver hiba!");
    }
});

export default router