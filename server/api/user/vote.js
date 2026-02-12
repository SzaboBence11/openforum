import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Apply Vote
router.post('/vote', (req, res) => {
    try {
        // Get fetch data
        let { user_id, post_id, action, state } = req.body;

        console.log(req.body)

        let sql;
        let type = action;

        if(state == action){
            sql = `DELETE FROM votes
                   WHERE user_id = ? AND
                         post_id = ? AND
                         type = ?`
        }
        else if(state == 'N'){
            sql = `
                INSERT INTO votes (user_id,
                                   post_id,
                                   type)
                VALUES (?, ?, ?)
            `
        }
        else if(state == 'U'){
            type = type == 'U' ? 'D' : 'U';
            sql = `UPDATE votes
                   SET type = 'D'
                   WHERE user_id = ? AND
                         post_id = ? AND
                         type = ?`
        }
        else if(state == 'D'){
            type = type == 'U' ? 'D' : 'U'
            sql = `UPDATE votes
                   SET type = 'U'
                   WHERE user_id = ? AND
                         post_id = ? AND
                         type = ?`
        }

        console.log('asd')

        db.query(sql,[user_id,
                      post_id,
                      type],
                (err) => {
                    
            // If there's an error
            if (err)
                return res.status(400)
                          .json({ error: err });
                          
            // Successful register!!
            return res.json({ message: "Siker!" });
        });

        
    }
    catch (err) {
        res.status(500).json("Szerver hiba!");
    }
});

export default router