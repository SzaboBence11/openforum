import React, { act, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function FrontPage({ isSidebarOpen }) {
    const [posts, setPosts] = useState({ posts: [] })
    const [communityData, setCommunityData] = useState({ community: [] })
    const [comments, setComments] = useState({})
    const [joinedCommunities, setJoinedCommunities] = useState()

    const [votes, setVotes] = useState({})
    const [userVotes, setUserVotes] = useState({})

    // Fetch random posts for the home page
    useEffect(() => {
        if (localStorage.getItem("selectedCommunity") == 0 ||
           !localStorage.getItem('selectedCommunity')) {
            fetch('/api/community/randomPosts/10')
            .then(res => res.json())
            .then(data => {
                setPosts({ posts: data });
            })
            .catch(err => console.error('Fetch /randomPosts failed:', err));
            
            return;
        }

        else {
            fetch(`/api/community/getCommunityPosts/${localStorage
                                                .getItem('selectedCommunity')}`)
            .then(res => res.json())
            .then(data => {
                setPosts({ posts: data })
            })
            .catch(err => console.error('Fetch /getCommunityPosts failed:', err))

            fetch(`/api/community/getCommunityData/${localStorage
                                                .getItem('selectedCommunity')}`)
            .then(res => res.json())
            .then(data => {
                setCommunityData({ community: data[0] })
            })
            .catch(err => console.error('Fetch /getCommunityData failed:', err))
        }
    }, [])

    useEffect(() => {
        getUserJoins()
    }, [])

    useEffect(() => {
      if (posts.posts.length === 0) return;
        
      posts.posts.forEach(post => {
        if (!comments[post.id]) {
          fetch(`/api/community/getComments/${post.id}`)
            .then(res => res.json())
            .then(data => {
              setComments(prev => ({
                ...prev,
                [post.id]: data
              }));
            })
            .catch(err => console.error(err));
        }
      });
    }, [posts.posts]);

    useEffect(() => {
        if (posts.posts.length === 0) return;

        getAllPostVotes();
    }, [posts.posts]);

    function getAllPostVotes() {
        setVotes({})
        posts.posts.forEach(post => {
            if (!votes[post.id]) {
                fetch(`/api/community/getVoteCount/${post.id}`)
                .then(res => res.json())
                .then(data => {
                    setVotes(prev => ({
                        ...prev,
                        [post.id]: data[0].vote_count
                    }));
                })
                .catch(err => console.log(err));
            }
        });
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            getUserVotes(JSON.parse(localStorage.getItem('user')).id)
        }
    }, [posts.posts])

    function getUserVotes(user_id) {
        setUserVotes({})
        fetch(`/api/user/getUserVotes/${user_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(e => {
                setUserVotes(prev => ({
                    ...prev,
                    [e.post_id]: e.type
                }))
            })
        })
        .catch(err => console.log(err))
    }

    function goToCommunity(id) {
        localStorage.setItem('selectedCommunity', id)
        window.location.reload(true)
    }

    function timeAgo(dateString) {
        const now = new Date()
        const date = new Date(dateString)
        const seconds = Math.floor((now - date) / 1000)

        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 },
        ]

        for (const interval of intervals) {
            const count = Math.floor(seconds / interval.seconds)
            if (count >= 1) {
                return new Intl.RelativeTimeFormat('en', {
                    numeric: 'auto',
                }).format(-count, interval.label)
            }
        }

        return 'just now'
    }

    function getComments(post_id) {
        fetch(`/api/community/getComments/${post_id}`)
        .then(res => res.json())
        .then(data => {
            console.log(post_id)
            console.log(data)
            setComments(prev => ({
              ...prev,
              [post_id]: data
            }));
        })
        .catch(err => console.log(err))
    }

    function communityAction(cMehtod, community_id) {
        let user_id = JSON.parse(localStorage.getItem('user')).id;

        fetch('api/user/communityAction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    community_id: communityData.community.id,
                    user_id: user_id,
                    method: cMehtod
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res){
                alert("Sikeres");
                getUserJoins();
                return;
            }
            alert("Sikertelen")
            getUserJoins();
        })
        .catch(err => alert(err))

    }

    function getUserJoins() {
        if(localStorage.getItem('user')){
            fetch(`/api/user/getUserCommunities/${JSON.parse(localStorage.getItem('user')).id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                let idArray = [];
                for(let i = 0; i < res.length; i++){
                    idArray.push(res[i].community_id);
                }
                setJoinedCommunities(idArray);
            })
        }
    }

    function vote(post_id, action, state) {

        console.log({
            post: post_id,
            user: JSON.parse(localStorage.getItem('user')).id,
            action: action,
            state: state
        })
        if (!localStorage.getItem('user')) return;

        fetch(`/api/user/vote`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: JSON.parse(localStorage.getItem('user')).id,
                post_id: post_id,
                action: action,
                state: state
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                alert(res.error)
            }
        })
        .catch(err => console.log(err))

        getUserVotes(JSON.parse(localStorage.getItem('user')).id);
        getAllPostVotes();
    }

    return (

        // The whole frontpage area
        <div className={`p-4`}>
            <div className="p-4 border-1 rounded-base">

                {/* Community details */}
                {localStorage.getItem('selectedCommunity') !== "0" &&
                 localStorage.getItem('selectedCommunity') && (
                    <div className='text-white text-center'>
                        {communityData.community && communityData.community.name ? (
                            <div className='mb-8 justify-center animate-fadeIn'>
                                <h1 className='text-4xl flex items-center justify-center'>
                                    <img src={communityData.community.img} className='w-20 h-20 me-4 rounded-full object-cover' />
                                    {communityData.community.name.charAt(0).toUpperCase() + 
                                     communityData.community.name.slice(1)}
                                </h1>

                                <div className='flex justify-center gap-5'>
                                    <h1 className='mt-4 font-xl justify-center'>
                                        <i className="fa-solid fa-user me-1" />
                                        {communityData.community.member_count} Members
                                    </h1>
                                    
                                    {joinedCommunities != undefined ? (
                                        <>
                                            {/* Leave community button, if user is joined */}
                                            {joinedCommunities.includes(communityData.community.id) &&
                                            localStorage.getItem("user") &&
                                            (
                                                <button className="mt-1.5 px-6 py-2 rounded-full
                                                    bg-white/15 text-white font-semibold
                                                    hover:bg-white/25 border border-white/20
                                                    hover:scale-105
                                                    active:scale-95
                                                    transition-all duration-300"
                                                        onClick={() => communityAction('leave', communityData.community.id)}>Leave</button>
                                            )
                                            }

                                            {/* Join community button, if user is not joined */}
                                            {!joinedCommunities.includes(communityData.community.id) &&
                                            localStorage.getItem("user") &&

                                            (
                                                <button className="mt-1.5 px-6 py-2 rounded-full
                                                        bg-gradient-to-r
                                                        from-blue-500 to-indigo-500
                                                        text-white font-bold
                                                        shadow-lg
                                                        hover:shadow-xl
                                                        hover:scale-105
                                                        active:scale-95
                                                        transition-all duration-300"
                                                        onClick={() => communityAction('join', communityData.community.id)}>Join</button>
                                            )

                                            }
                                        </>
                                    ) : (
                                        <div>Betöltés</div>
                                    )}
                                </div>

                                <h1 className='mt-4 font-xl text-gray-300'>
                                    {communityData.community.description}
                                </h1>

                                <hr className='w-3/6 mt-4 mx-auto border-t-1 border-gray-400 rounded-full' />
                            </div>
                        ) : (
                            <span>Loading...</span>
                        )}
                    </div>
                )}

                {/* Each post */}
                {posts.posts.length > 0 ? (
                    posts.posts.map((post, i) => (

                        // Post card
                        <div key={i}>
                            <div className="flex flex-col border shadow-md mx-auto
                                            mb-12 rounded-3xl p-3 border-white/15 animate-fadeIn
                                            min-h-52 bg-white/10 backdrop-blur-xl w-4/6">
                                
                                {/* Post text content */}
                                <div className='flex flex-1'>
                                    <button className='max-w-fit hover:bg-white/20 px-2 py-2 rounded-full
                                                    transition-all duration-300'
                                            onClick={() => goToCommunity(post.community_id)}>
                                        <p className='text-white text-xl text-left flex'>
                                            <img src={post.community_img} className='rounded-full w-8 h-8 me-2 object-cover' />
                                            {post.community.charAt(0).toUpperCase() +
                                            post.community.slice(1)}
                                        </p>
                                    </button>
                                    <p className='text-white ms-auto'>
                                        {timeAgo(post.post_date)}
                                    </p>
                                </div>

                                {/* Post title */}
                                <p className='text-white text-3xl text-center'>
                                    {post.post_title}
                                </p>

                                {/* Poster user img */}
                                <p className='text-white flex mx-auto mt-1.5'>
                                    <img src={post.poster_img} className='rounded-full w-6 h-6 me-2 object-cover' />
                                    {post.poster_user}
                                </p>

                                {/* Post text */}
                                <p className='text-white mt-3 overflow-hidden w-5/6 ms-3 mb-4'>
                                    {post.post_text}
                                </p>

                                {/* Each comment */}
                                {comments[post.id] ? (
                                 comments[post.id].map((comment, j) => (

                                    // Comment card
                                    <div className='flex flex-col border shadow-md ms-4 mb-4
                                                    rounded-3xl p-3 border-white/10 animate-fadeIn
                                                    min-h-20 bg-white/5 backdrop-blur-xl w-4/6'
                                        key={j}>

                                        {/* User img and name */}
                                        <p className='text-white flex mt-1.5'>
                                            <img src={comment.commenter_img} className='rounded-full w-6 h-6 me-2 object-cover' />
                                            {comment.commenter_user}
                                        </p>

                                        {/* Comment text */}
                                        <p className="text-gray-300 text-sm mt-2">
                                        {comment.text}
                                        </p>

                                        {/* Comment date */}
                                        <p className='text-white ms-auto mt-auto'>
                                            {timeAgo(comment.date)}
                                        </p>
                                    </div>
                                ))
                                ) : (
                                <p className="text-gray-500 text-sm">Loading comments...</p>
                                )}

                                <div className='text-white ms-auto me-1 bg-white/20 px-2 py-1 rounded-full
                                                border border-white/15'>
                                    <div className='flex'>
                                        <div className={`flex flex-1 align-middle justify-center p-2 hover:bg-white/25
                                                        rounded-full hover:cursor-pointer`}>
                                            {
                                                Object.keys(userVotes).includes(String(post.id)) ?
                                                (
                                                    <>
                                                        {userVotes[`${post.id}`] == 'U' ? (
                                                            <i className="fa-solid fa-arrow-up text-white mt-0.5"
                                                               onClick={() => vote(post.id, 'U', 'U')} />
                                                        ) : (
                                                            <i className="fa-solid fa-arrow-up text-gray-400 mt-0.5"
                                                               onClick={() => vote(post.id, 'U', 'D')} />
                                                        )}
                                                    </>
                                                ) : (
                                                    <i className="fa-solid fa-arrow-up text-gray-400 mt-0.5"
                                                       onClick={() => vote(post.id, 'U', 'N')} />
                                                )
                                            }
                                        </div>
                                        <p className='mx-1 mt-1.5'>
                                            {votes[post.id] ?? 0}
                                        </p>
                                        <div className={`flex flex-1 align-middle justify-center p-2 hover:bg-white/25
                                                        rounded-full hover:cursor-pointer`}>
                                            {
                                                Object.keys(userVotes).includes(String(post.id)) ?
                                                (
                                                    <>
                                                        {userVotes[post.id] == 'D' ? (
                                                            <i className="fa-solid fa-arrow-down text-white mt-0.5"
                                                               onClick={() => vote(post.id, 'D', 'D')} />
                                                        ) : (
                                                            <i className="fa-solid fa-arrow-down text-gray-400 mt-0.5"
                                                               onClick={() => vote(post.id, 'D', 'U')} />
                                                        )}
                                                    </>
                                                ) : (
                                                    <i className="fa-solid fa-arrow-down text-gray-400 mt-0.5"
                                                       onClick={() => vote(post.id, 'D', 'N')} />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* <input type="text"
                                    className="px-3 py-1 rounded-lg border-white/15 text-white ms-[18vw] mb-4 w-3/6
                                                border shadow-sm text-sm bg-blue-950/60 backdrop-blur-xl animate-fadeIn"
                                    placeholder='Comment...'
                                    autoComplete='true'>
                                </input> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default FrontPage