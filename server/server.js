import dotenv from 'dotenv';
import express from 'express';

const app = express();
app.use(express.json());

dotenv.config();

// Get random communities for frontpage
import randomCommunitiesRouter from './api/community/randomCommunities.js';
app.use('/api/communities', randomCommunitiesRouter);

// Get random posts from different communities (For Frontpage)
import randomPostsRouter from './api/community/randomPosts.js';
app.use('/api/communities', randomPostsRouter);

// Get community data
import getCommunityDataRouter from './api/community/getCommunityData.js';
app.use('/api/communities', getCommunityDataRouter);

// Get community posts
import getCommunityPostsRouter from './api/community/getCommunityPosts.js';
app.use('/api/communities', getCommunityPostsRouter);

// Get comments API (for posts on the frontpage)
import getCommentsRouter from './api/community/getComments.js';
app.use('/api/communities', getCommentsRouter);

// Login API
import loginRouter from './api/user/login.js';
app.use('/api/user', loginRouter);

// Register API
import registerRouter from './api/user/register.js';
app.use('/api/user', registerRouter);

import getProfileRouter from './api/user/getProfile.js';
app.use('/api/user', getProfileRouter);

import getUserCommunitiesRouter from './api/user/getUserCommunities.js';
app.use('/api/user', getUserCommunitiesRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Szerver fut a ${PORT} porton`));


