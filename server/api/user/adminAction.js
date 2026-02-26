import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Execute requested admin action
router.post('/adminAction', (req, res) => {
    try {

        // Get fetch data
        let args = req.body;

        // Define sql with empty string value
        let sql = "";

        // User block,
        // Invalidate user posts, communities, comments
        if(args.action == 'user'){

            // Set blocking sql
            sql = `
                UPDATE users
                SET blocked = 1
                WHERE id = ?`

            // Execute user block
            db.query(sql,[args.user_id],
                (err, res1) => {

                // If there's an error
                if (err)
                    return res.status(400)
                            .json({ error: err });
                
                // Set user posts invalidating sql
                sql = `
                    UPDATE posts
                    SET valid = 0
                    WHERE user_id = ?`

                // Execute user posts invalidating
                db.query(sql, [args.user_id],
                    (err, res2) => {

                        // If there's an error
                        if (err)
                            return res.status(400)
                                      .json({ error: err });

                        // Set user comments invalidating sql
                        sql = `
                            UPDATE comments
                            SET valid = 0
                            WHERE user_id = ?`

                        // Execute user comments invalidating
                        db.query(sql,[args.user_id],
                            (err, res3) => {

                                // If there's an error
                                if (err)
                                    return res.status(400)
                                              .json({ error: err });

                                // Return results to Frontend
                                res.json(res3)
                            }
                        )
                    }
                )
            });
        }

        // User posts invalidating
        else if(args.action == 'post'){

            // Set user posts invalidating sql
            sql = `
                UPDATE posts
                SET valid = 0
                WHERE id = ?`

            // Execute user posts invalidating
            db.query(sql, [args.post_id],
                (err, res1) => {

                    // If there's an error
                    if (err)
                        return res.status(400)
                                  .json({ error: err });

                    // Post comments invalidating sql
                    sql = `
                        UPDATE comments
                        SET valid = 0
                        WHERE post_id = ?`

                    // Execute post comments invalidating
                    db.query(sql, [args.post_id],
                        (err, res2) => {

                            // If there's an error
                            if (err)
                                return res.status(400)
                                          .json({ error: err });
                            
                            // Return results to Frontend     
                            res.json(res2);
                        }
                    )
                    
                }
            )
        }

        // Community invalidating
        else if(args.action == "community"){

            // Set community invalidating sql
            sql = `
                UPDATE communities
                SET valid = 0
                WHERE id = ?`

            // Execute communiti invalidating
            db.query(sql, [args.community_id],
                (err, res1) => {

                    // If there's an error
                    if (err)
                        return res.status(400)
                                .json({ error: err });

                    // Return results to Frontend  
                    res.json(res1);
                }
            )
        }

    }
    catch (err) {
        // Server error
        res.status(500).json("Szerver hiba!");
    }
});

export default router