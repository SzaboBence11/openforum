import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function FrontPage() {
    const [backendData, setBackendData] = useState({ posts: [] })

    // Fetch random posts for the home page
    useEffect(() => {
        fetch('/randomPosts')
            .then(res => res.json())
            .then(data => {

                setBackendData({ posts: data })
            })
            .catch(err => console.error('Fetch /randomPosts failed:', err))
    }, [])

    return (

        // The whole frontpage area
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-1 rounded-base">
                {/* Make space for each post */}
                {backendData.posts.length > 0 ? (
                    backendData.posts.map((post, i) => (

                        // Post card
                        <div className="flex flex-col items-center h-52 border shadow-md
                                        mb-4 rounded-lg border-gray-400 p-3"
                             key={i}>
                            
                            {/* Post text content */}
                            <p className='text-blue-950 text-3xl'>
                                {post.post_title}
                            </p>
                            <p className='text-blue-950 text-2x1'>
                                by: {post.poster_user} in {post.community}
                            </p>
                            <p className='text-blue-950 mt-3'>
                                {post.post_text}
                            </p>
                            <p className='text-blue-950 mt-3'>
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