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
        <div className='border-white'>

            {/* Make space for each post */}
            {backendData.posts.length > 0 ? (
                backendData.posts.map((post, i) => (
                    <div>
                        {post.community}
                        {post.text}
                    </div>
                ))
            ) : (
                <p>Betöltés...</p>
            )}
        </div>
    )
}

export default FrontPage