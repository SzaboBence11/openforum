import dotenv from 'dotenv';
 express();
app.use(express.json());

do

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
import randomCommunitiuter from './apinity/randomCommunities.js';
app.use('/api/nity', randomCommunitiesRouter);

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
import ransRouter from './api/comity/randomPosts.js';
app.use('/api/comty', randomPostsRouter);

/*
    Fetches the data of a community by its ID

    In: int after the URL:
        http://localhost:4000/api/community/getCommunityData/int
    Out: [
         s ID

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

            date: date
          }
         ]
    Errors:
        400: SQL error
*/
import getCommentsRorom './apcommunity/getComments.js';
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
import loginRouter from '.i/user', loginRouter);

// Register API
import regi
// 

const PORT = 4000;
app