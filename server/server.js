import dotenv from 'dotenv';
import express from 'express';

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
    Login API

    In: {
          email: string,
          password: string
        }
    Out: [
          {
            id: int,
            name: string,
            display_name: string,
            email: string,
            role: string
          }
         ]
    Errors:
        400: SQL error
        401: Unauthorized, incorrect login details
        500: Server error
*/
import loginRouter from './api/user/login.js';
app.use('/api/user', loginRouter);

/*
    Fetches the data of a comment by its ID

    In: {
          name: string,
          email: string,
          password: string
        }
    Out: [
          {
            message: string
          }
         ]
    Errors:
        400: SQL error
        401: Unauthorized, incorrect login details
        500: Server error
*/
import registerRouter from './api/user/register.js';
app.use('/api/user', registerRouter);

/*
    Fetches the data of a comment by its ID

    In: int after the URL:
        http://localhost:4000/api/user/profile/int
    Out: [
          {
            id: int,
            name: string,
            display_name: string,
            role: string,
            email: string,
            description: string
          }
         ]
    Errors:
        400: SQL error
        401: Unauthorized, incorrect login details
*/
import getProfileRouter from './api/user/getProfile.js';
app.use('/api/user', getProfileRouter);

/*
    Fetches the data of a comment by its ID

    In: int after the URL:
        http://localhost:4000/api/user/getUserCommunities/int
    Out: [
          {
            community_name: string,
            community_id: int
          },
            ...
         ]
    Errors:
        400: SQL error
        401: Unauthorized, incorrect login details
*/
import getUserCommunitiesRouter from './api/user/getUserCommunities.js';
app.use('/api/user', getUserCommunitiesRouter);

import getMemberCountRouter from './api/community/getMemberCount.js';
app.use('/api/community', getMemberCountRouter);

import updateAvatarRouter from './api/user/updateAvatar.js';
app.use('/api/user', updateAvatarRouter);

import addCommunityRouter from './api/community/addCommunity.js';
app.use('/api/community', addCommunityRouter);

import updateProfileRouter from './api/user/updateProfile.js';
app.use('/api/user', updateProfileRouter);

import getOwnedCommunitiesRouter from './api/user/getOwnedCommunities.js';
app.use('/api/user', getOwnedCommunitiesRouter);

import addCommentRouter from './api/community/addComment.js';
app.use('/api/community', addCommentRouter);

import communityActionRouter from './api/user/communityAction.js';
app.use('/api/user', communityActionRouter);

import getVoteCountRouter from './api/community/getVoteCount.js';
app.use('/api/community', getVoteCountRouter);

import getUserVotesRouter from './api/user/getUserVotes.js';
app.use('/api/user', getUserVotesRouter);

import voteRouter from './api/user/vote.js';
app.use('/api/user', voteRouter);

import searchCommunityRouter from './api/community/searchCommunity.js';
app.use('/api/community', searchCommunityRouter);

import addPostRouter from './api/community/addPost.js';
app.use('/api/community', addPostRouter);


const PORT = 4000;
app.listen(PORT, () => console.log(`Szerver fut a ${PORT} porton`));