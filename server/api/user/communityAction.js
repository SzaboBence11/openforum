import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.post('/communityAction', (req, res) => {
    try {

        // Get fetch data
        // 12, 4, 'leave'
        let { community_id, user_id, method } = req.body;
        let deletion = false;
        let sql = "";
        let isInsert = false;

        if(method == 'join'){
            // Insert community join sql
            sql = `
                INSERT INTO community_users (
                                   community_id,
                                   user_id,
                                   role)
                VALUES (?, ?, 'U')`

            isInsert = true;
        }
        
        else {
            sql = `
                DELETE FROM community_users 
                WHERE community_id = ? AND
                       user_id = ?`
            
            deletion = true;
        }

        if (deletion) {
            let sql2 = `
                SELECT user_id
                FROM community_users
                WHERE user_id = ? AND
                    community_id = ? AND
                    role = 'O'
                LIMIT 1`
            db.query(sql2, [user_id, community_id], (err, res1) => {
                if (err)
                    return res.status(400)
                              .json({ error: err });

                console.log("res1:", res1);

                                
                if(res1.length){
                    let sql3 = `
                        UPDATE communities
                        SET valid = 0
                        WHERE id = ?`

                    console.log(community_id)
                    
                    db.query(sql3, [community_id], (err, res2) => {
                        console.log(res2)
                        if (err)
                            return res.status(400)
                                        .json({ error: err });

                        db.query(sql, [community_id, user_id], (err, res3) => {
                            console.log("res3:", res3);
                            return res.json(res3);
                                
                        })
                    })
                } else{
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
            })
        }

        if (isInsert) {

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

    }
    catch (err) {
        return res.status(500).json("Szerver hiba!");
    }
});

export default router