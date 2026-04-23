import React, { useState, useEffect } from 'react'
import Sidebar from './common/Sidebar'
import FrontPage from './FrontPage'
import { Link } from 'react-router-dom'

function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [randomCommunities, setRandomCommunities] = useState({ communities: [] })

    useEffect(() => {
        fetch('/api/community/randomCommunities/3')
        .then(res => res.json())
        .then(data => {
            setRandomCommunities({ communities: data })
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div className='bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 
                        text-white p-5 min-h-screen select-none'>

            {/* Title */}
            <div className='mt-12 animate-fadeIn'>
                <h1 className='font-bold text-7xl text-center'>
                    <i className="fa-solid fa-people-group"></i>
                    <span className='ms-4'>About us</span>
                </h1>
            </div>

            {/* Img */}
            <div className='mt-12 animate-fadeIn flex justify-center gap-8'>
                <div className='flex flex-col items-center'>
                    <img src='/assets/about/berta_barnabas.jpg' width="300" className='rounded-md' />
                    <h1 className='text-center text-3xl mt-2'>Berta Barnabás</h1>
                    <h1 className='text-center text-xl mt-1 text-gray-300'>Programmer</h1>
                    <h1 className='text-center text-xl mt-1 w-80'>Lead programmer of the project, specializing in C#, Express and SQL</h1>
                </div>

                <div className='flex flex-col items-center'>
                    <img src='/assets/about/szabo_bence.jpg' width="300" className='rounded-md' />
                    <h1 className='text-center text-3xl mt-2'>Szabó Bence</h1>
                    <h1 className='text-center text-xl mt-1 text-gray-300'>Project Leader</h1>
                    <h1 className='text-center text-xl mt-1 w-80'>Project organizer, specializing in React, C# and Express</h1>
                </div>
            </div>

            {/* Community preview */}
            <div className='mt-28 max-w-6xl mx-auto animate-fadeIn'>
                <h2 className='text-4xl font-bold text-center mb-10'>
                    <i className="fa-solid fa-fire me-2" />
                    Trending Communities
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {randomCommunities.communities.map((community, i) => (
                        <Link to='/feed'
                              onClick={() => localStorage.setItem('openforum_selectedCommunity', community.id)}
                              key={i}>
                            <div className='bg-white/10 border border-white/15 rounded-xl
                                            p-5 hover:bg-white/20 transition cursor-pointer min-h-32'>
                                <h3 className='text-xl font-bold flex'>
                                    <img src={community.img} className='rounded-full w-6 h-6 mt-0.5' />
                                    <label className='ms-2'>
                                        {community.name.charAt(0).toUpperCase() +
                                         community.name.slice(1)}
                                    </label>
                                </h3>
                                <p className='text-gray-300 mt-2'>
                                    {community.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Get started */}
            <div className='mt-32 text-center pb-20'>
                <h2 className='text-4xl font-bold mb-12'>
                    Ready to join the conversation?
                </h2>
                <Link to='/feed'>
                    <button className="bg-white/10 backdrop-blur-xl hover:bg-white/25
                                       border border-white/15 font-bold w-80 group
                                       px-4 py-4 rounded-full transition text-xl duration-300">
                        Get Started
                        <i className="fa-solid fa-angles-right ms-2 group-hover:ms-4 transition-all"/>
                    </button>
                </Link>
            </div>

            {/*
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
            <FrontPage isSidebarOpen={isSidebarOpen}/>
            */}
        </div>
    )
}

export default Home
