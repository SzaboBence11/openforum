import db from '../../db.js';
import express from 'express';

const router = express.Router();

// Simple Promise wrapper for db.query
// Makes async/await possible
const query = (sql, params = []) =>
	new Promise((resolve, reject) => {
		db.query(sql, params, (err, results) => {
			if (err) reject(err);
			else resolve(results);
		});
	});

// Get communities for a user (sidebar)
router.get('/getOwnedCommunities/:user_id', async (req, res) => {
	const user_id = parseInt(req.params.user_id, 10);

	// Invalid user id
	if (isNaN(user_id)) {
		return res.status(400).json({ error: 'Invalid parameter' });
	}

	// Fetch user's communities
	const sql = `
		SELECT
			communities.name AS community_name,
			community_users.community_id,
			communities.img,
			community_users.role
		FROM community_users
		INNER JOIN communities ON communities.id = community_users.community_id
		WHERE community_users.user_id = ?
		AND community_users.role = 'O'
	`;

	// Count members in a community
	const sql2 = `
		SELECT COUNT(*) AS result_number
		FROM community_users
		WHERE community_id = ?
  	`;

	try {
		const communities = await query(sql, [user_id]);

		// Add member count to each community
		const communitiesWithCount = await Promise.all(
			communities.map(async (community) => {
				const countResult = await query(sql2, [community.community_id]);
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

export default router;
