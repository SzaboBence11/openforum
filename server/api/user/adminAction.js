import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Get random communities (For Sidebar)
router.post('/adminAction', (req, res) => {
    try {

        // Get fetch data
        let args = req.body;
        let sql = "";

        console.log(args)
        if(args.action == 'user'){
            // Insert community join sql
            sql = `
                UPDATE users
                SET blocked = 1
                WHERE id = ?`

            db.query(sql,[args.user_id],
                (err, res1) => {

                // If there's an error
                if (err)
                    return res.status(400)
                            .json({ error: err });
                
                sql = `
                    UPDATE posts
                    SET valid = 0
                    WHERE user_id = ?`

                db.query(sql, [args.user_id],
                    (err, res2) => {
                        if (err)
                            return res.status(400)
                                      .json({ error: err });

                        sql = `
                            UPDATE comments
                            SET valid = 0
                            WHERE user_id = ?`

                        db.query(sql,[args.user_id],
                            (err, res3) => {
                                if (err)
                                    return res.status(400)
                                              .json({ error: err });

                                sql = `
                                    SELECT id
                                    FROM posts
                                    WHERE user_id = ?`
                        
                                db.query(sql, [args.user_id],
                                    (err, res4) => {
                                        if (err)
                                            return res.status(400)
                                                    .json({ error: err });

                                            for(let i = 0; i < res4.length; i++){
                                                sql = `
                                                    UPDATE comments
                                                    SET valid = 0
                                                    WHERE user_id = ?`
                                                
                                                db.query(sql, [res4[i].id],
                                                    (err, res5) => {
                                                        if (err)
                                                            return res.status(400)
                                                                      .json({ error: err });
                                                    }
                                                )
                                            }
                                            res.json({res3});
                                    }
                                )
                            }
                        )
                    }
                )
            });
        }

        else if(args.action == 'post'){
            sql = `
                UPDATE posts
                SET valid = 0
                WHERE id = ?`

            db.query(sql, [args.post_id],
                (err, res1) => {

                    if (err)
                        return res.status(400)
                                  .json({ error: err });

                    sql = `
                        UPDATE comments
                        SET valid = 0
                        WHERE post_id = ?`

                    db.query(sql, [args.post_id],
                        (err, res2) => {
                            if (err)
                                return res.status(400)
                                          .json({ error: err });
                            
                            res.json(res2);
                        }
                    )
                    
                }
            )
        }

        else if(args.action == "community"){
            sql = `
                UPDATE communities
                SET valid = 0
                WHERE id = ?`

            db.query(sql, [args.community_id],
                (err, res1) => {
                    if (err)
                        return res.status(400)
                                .json({ error: err });
                    res.json(res1);
                }
            )
        }

    }
    catch (err) {
        res.status(500).json("Szerver hiba!");
    }
});

export default router