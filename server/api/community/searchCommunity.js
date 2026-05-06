import db from '../../db.js';
import express from 'express';

const router = express.Router()

// Simple Promise wrapper for db.query
// Makes async/await possible
const query = (sql, params = []) =>
	new Promise((resolve, reject) => {
		db.query(sql, params, (err, results) => {
			if (err) reject(err);
			else resolve(results);
		});
	});

// Get random communities (For Sidebar)
router.get('/searchCommunity/:search', async (req, res) => {

  // Get input variable
  let search = req.params.search;

  // Community details
  let sql = `SELECT
                  communities.id AS id,
                  users.name AS owner,
                  communities.description AS description,
                  communities.date AS date,
                  communities.name AS name,
                  communities.img AS img
              FROM communities
              INNER JOIN community_users
              ON communities.id = community_users.community_id
              INNER JOIN users
              ON users.id = community_users.user_id
              WHERE community_users.role = 'O'
              AND communities.name LIKE ?`;
  
  // Community member count
  let sql2 = `SELECT
                  COUNT(*) AS result_number
              FROM community_users
              WHERE community_id = ?`;

  try {
    const communities = await query(sql, [`%${search}%`]);

    // Add member count to each community
    const communitiesWithCount = await Promise.all(
      communities.map(async (community) => {
        const countResult = await query(sql2, [community.id]);
        return {
          ...community,
          member_count: countResult[0].result_number
        };
      })
    );
    
    res.json(communitiesWithCount);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Search for community
router.get('/searchCommunity', async (req, res) => {

    // Community details
    let sql = `SELECT
                    communities.id AS id,
                    users.name AS owner,
                    communities.description AS description,
                    communities.date AS date,
                    communities.name AS name,
                    communities.img AS img
               FROM communities
               INNER JOIN community_users
               ON communities.id = community_users.community_id
               INNER JOIN users
               ON users.id = community_users.user_id
               WHERE community_users.role = 'O'`;
    
    // Community member count
    let sql2 = `SELECT
                     COUNT(*) AS result_number
                FROM community_users
                WHERE community_id = ?`;

    try {
		const communities = await query(sql);

		// Add member count to each community
		const communitiesWithCount = await Promise.all(
			communities.map(async (community) => {
				const countResult = await query(sql2, [community.id]);
				return {
					...community,
					member_count: countResult[0].result_number
				};
			})
		);

		res.json(communitiesWithCount);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Database error' });
	}
});

export default router