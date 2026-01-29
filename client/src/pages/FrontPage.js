import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function FrontPage({ isSidebarOpen }) {
    const [backendData, setBackendData] = useState({ posts: [] })

    // Fetch random posts for the home page
    useEffect(() => {
        if(localStorage.getItem("selectedCommunity") == 0 ||
           !localStorage.getItem('selectedCommunity')) {
            fetch('/api/community/randomPosts')
            .then(res => res.json())
            .then(data => {
                setBackendData({ posts: data });
            })
            .catch(err => console.error('Fetch /randomPosts failed:', err));
            
            return;
        }
        fetch(`/api/community/getCommunityPosts/${localStorage
                                                .getItem('selectedCommunity')}`)
            .then(res => res.json())
            .then(data => {
                setBackendData({ posts: data })
            })
            .catch(err => console.error('Fetch /getCommunityPosts failed:', err))
    }, [])

    function getCommunityData(id) {
        if (id == 0)
            return "Random posts"
        fetch(`/api/community/getCommunityPosts/${localStorage
                                                .getItem('selectedCommunity')}`)
        .then()
    }

    return (

        // The whole frontpage area
        <div className={`p-4 ${isSidebarOpen ? "ml-16": "ml-16"}`}>
            <div className="p-4 border-1 rounded-base">
                {/* Make space for each post */}
                {backendData.posts.length > 0 ? (
                    backendData.posts.map((post, i) => (

                        // Post card
                        <div className="flex flex-col items-center border shadow-md
                                        mb-4 rounded-lg border-gray-400 p-3 max-h-100
                                        min-h-52"
                             key={i}>
                            
                            {/* Post text content */}
                            <p className='text-blue-950 text-3xl'>
                                {post.post_title}
                            </p>
                            <p className='text-blue-950 text-2x1'>
                                by: {post.poster_user} in {post.community}
                            </p>
                            <p className='text-blue-950 mt-3 overflow-hidden'>
                                {post.post_text}
                            </p>
                            <p className='text-blue-950 mt-auto'>
                                Posted at: {post.post_date}
                            </p>
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