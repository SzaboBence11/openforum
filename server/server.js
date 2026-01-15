import dotenv from 'dotenv';
import express from 'express';

const app = express();
app.use(express.json());

dotenv.config();

/*
    Fetches 10 randomly selected communities

    In: -
    Out: [
          {
            id: int,
            name: string,
            member_count: int
          },
            ...
         ]
    Errors:
        400: SQL error
*/
import randomCommunitiesRouter from './api/community/randomCommunities.js';
app.use('/api/community', randomCommunitiesRouter);

/*
    Fetches 10 randomly selected posts

    In: -
    Out: [
          {
            id: int,
            poster_user: string,
            post_title: string,
            post_text: string,
            post_date: date,
            community: string
          },
            ...
         ]
    Errors:
        400: SQL error
*/
import randomPostsRouter from './api/community/randomPosts.js';
app.use('/api/community', randomPostsRouter);

/*
    Fetches the data of a community by its ID

    In: int after the URL:
        http://localhost:4000/api/community/getCommunityData/int
    Out: [
          {
            owner: string,
            description: string,
            date: date,
            member_count: int
          }
         ]
    Errors:
        400: SQL error
*/
import getCommunityDataRouter from './api/community/getCommunityData.js';
app.use('/api/community', getCommunityDataRouter);

/*
    Fetches the data of a post by its ID

    In: int after the URL:
        http://localhost:4000/api/community/getCommunityPosts/int
    Out: [
          {
            username: string,
            title: string,
            text: string,
            date: date,
            post_count: int
          }
         ]
    Errors:
        400: SQL error
*/
import getCommunityPostsRouter from './api/community/getCommunityPosts.js';
app.use('/api/community', getCommunityPostsRouter);

/*
    Fetches the data of a comment by its ID

    In: int after the URL:
        http://localhost:4000/api/community/getComments/int
    Out: [
          {
            commenter_user: string,
            text: string,
            date: date
          }
         ]
    Errors:
        400: SQL error
*/
import getCommentsRouter from './api/community/getComments.js';
app.use('/api/community', getCommentsRouter);

/*
    Fetches the data of a comment by its ID

    In: {
          email: string,
          password: string
        }
    Out: [
          {
            
          }
         ]
    Errors:
        400: SQL error
        401: Unauthorized, incorrect login details
        500: Server error
*/
import loginRouter from './api/user/login.js';
app.use('/api/user', loginRouter);

// Register API
import registerRouter from './api/user/register.js';
app.use('/api/user', registerRouter);

// 
import getProfileRouter from './api/user/getProfile.js';
app.use('/api/user', getProfileRouter);

import getUserCommunitiesRouter from './api/user/getUserCommunities.js';
app.use('/api/user', getUserCommunitiesRouter);

const PORT = 4000;
app.listen(PORT, () => console.log(`Szerver fut a ${PORT} porton`));