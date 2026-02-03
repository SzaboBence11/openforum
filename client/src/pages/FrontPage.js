import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function FrontPage({ isSidebarOpen }) {
    const [posts, setPosts] = useState({ posts: [] })
    const [communityData, setCommunityData] = useState({ community: [] })
    const [comments, setComments] = useState({})

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

    return (

        // The whole frontpage area
        <div className={`p-4`}>
            <div className="p-4 border-1 rounded-base">
                {localStorage.getItem('selectedCommunity') !== "0" && localStorage.getItem('selectedCommunity') && (
                    <div className='text-white text-center'>
                        {communityData.community && communityData.community.name ? (
                            <div className='mb-8 justify-center animate-fadeIn'>
                                <h1 className='text-4xl flex items-center justify-center'>
                                    <img src={communityData.community.img} className='w-20 h-20 me-4 rounded-full' />
                                    {communityData.community.name.charAt(0).toUpperCase() + 
                                     communityData.community.name.slice(1)}
                                </h1>

                                <h1 className='mt-4 font-xl justify-center'>
                                    <i className="fa-solid fa-user me-1" />
                                    {communityData.community.member_count} Members
                                </h1>

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

                {/* Make space for each post */}
                {posts.posts.length > 0 ? (
                    posts.posts.map((post, i) => (

                        // Post card
                        <div>
                            <div className="flex flex-col border shadow-md mx-auto
                                            mb-4 rounded-3xl p-3 border-white/15 animate-fadeIn
                                            min-h-52 bg-white/10 backdrop-blur-xl w-4/6"
                                 key={i}>
                                
                                {/* Post text content */}
                                <button className='max-w-fit hover:bg-white/20 px-2 py-2 rounded-full
                                                   transition-all duration-300'
                                        onClick={() => goToCommunity(post.community_id)}>
                                    <p className='text-white text-xl text-left flex'>
                                        <img src={post.community_img} className='rounded-full w-8 h-8 me-2' />
                                        {post.community.charAt(0).toUpperCase() +
                                         post.community.slice(1)}
                                    </p>
                                </button>
                                <p className='text-white text-3xl text-center'>
                                    {post.post_title}
                                </p>
                                <p className='text-white flex mx-auto mt-1.5'>
                                    <img src={post.poster_img} className='rounded-full w-6 h-6 me-2' />
                                    {post.poster_user}
                                </p>
                                <p className='text-white mt-3 overflow-hidden w-5/6 ms-3'>
                                    {post.post_text}
                                </p>
                                <p className='text-white ms-auto mt-auto'>
                                    {timeAgo(post.post_date)}
                                </p>
                            </div>

                            {comments[post.id] ? (
                              comments[post.id].map((comment, j) => (
                                <div className='flex flex-col border shadow-md ms-[18vw]
                                            mb-4 rounded-3xl p-3 border-white/10 animate-fadeIn
                                            min-h-20 bg-white/5 backdrop-blur-xl w-3/6'
                                     key={j}>
                                    <p className='text-white flex mt-1.5'>
                                        <img src={comment.commenter_img} className='rounded-full w-6 h-6 me-2' />
                                        {comment.commenter_user}
                                    </p>
                                    <p className="text-gray-300 text-sm mt-2">
                                      {comment.text}
                                    </p>
                                    <p className='text-white ms-auto mt-auto'>
                                        {timeAgo(comment.date)}
                                    </p>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500 text-sm">Loading comments...</p>
                            )}

                            <input type="text"
                                   className="px-3 py-2 rounded-lg border-white/15 text-white ms-[18vw] mb-8 w-3/6
                                              border shadow-sm text-sm bg-blue-950/60 backdrop-blur-xl animate-fadeIn"
                                   placeholder='Comment...'
                                   autoComplete='true'>
                            </input>
                        </div>
                    ))
                ) : (
                    <p>Betöltés...</p>
                )}
            </div>
        </div>
    )
}

export default FrontPage