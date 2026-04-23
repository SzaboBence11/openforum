import React, { useState, useEffect } from 'react'
import Sidebar from './common/Sidebar'
import FrontPage from './FrontPage'
import { Link } from 'react-router-dom'

function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [randomCommunities, setRandomCommunities] = useState({ communities: [] })

    const features = [
        {
            icon: "fa-heart",
            title: "Safe Discussions",
            desc: "Express freely in moderated, respectful communities!"
        },
        {
            icon: "fa-users",
            title: "Meet New People",
            desc: "Join topics that actually match your interests!"
        },
        {
            icon: "fa-bolt",
            title: "Instant Engagement",
            desc: "Jump into conversations insantly!"
        }
    ]

    const start = [
        "Create an account",
        "Discover and join communities",
        "Start chatting with others"
    ]

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
                    <i className="fa-solid fa-comments"/>
                    <span className='ms-4'>Openforum</span>
                </h1>
                <p className='text-gray-300 text-xl font-semibold text-center ms-12 mt-[-12px]'>
                    Discuss to de-stress
                </p>
            </div>

            {/* Discover button */}
            <div className='mt-4 text-center animate-fadeIn'
                 id='discover'>
                <Link to='/about'>
                    <button className="bg-white/10 backdrop-blur-xl hover:bg-white/25
                                       border border-white/15 font-bold w-80 group
                                       px-4 py-4 rounded-full transition text-xl duration-300">
                        <i className="fa-solid fa-people-group me-1"></i>
                        About us
                        <i className="fa-solid fa-angles-right ms-2 group-hover:ms-4 transition-all"/>
                    </button>
                </Link>
            </div>

            {/* Discover button */}
            <div className='mt-20 text-center animate-fadeIn'
                 id='discover'>
                <Link to='/feed'>
                    <button className="bg-white/10 backdrop-blur-xl hover:bg-white/25
                                       border border-white/15 font-bold w-80 group
                                       px-4 py-4 rounded-full transition text-xl duration-300">
                        <i class="fa-solid fa-map-location-dot me-1"></i>
                        Discover Communities
                        <i className="fa-solid fa-angles-right ms-2 group-hover:ms-4 transition-all"/>
                    </button>
                </Link>
            </div>

            {/* Feature cards */}
            <div className='mt-20 grid grid-cols-1 md:grid-cols-3 gap-8
                            max-w-6xl mx-auto animate-fadeIn'>
                {features.map((item, i) => (
                    <div key={i}
                         className='bg-white/10 border border-white/15 backdrop-blur-xl
                                    rounded-2xl p-6 text-center hover:bg-white/15 transition-all h-48 duration-300
                                    md:mt-4 md:hover:mt-0'>
                        <i className={`fa-solid ${item.icon} text-4xl mb-4 text-white`} />
                        <h3 className='text-xl font-bold mb-2'>
                            {item.title}
                        </h3>
                        <p className='text-gray-300'>
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* How to start */}
            <div className='mt-24 max-w-5xl mx-auto animate-fadeIn'>
                <h2 className='text-4xl font-bold text-center mb-12'>
                    <i className="fa-solid fa-book me-2" />
                    How to start
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-10 text-center'>
                    {start.map((step, i) => (
                        <div key={i} className='flex flex-col items-center'>
                            <div className='w-14 h-14 rounded-full bg-white/10 border border-white/15 backdrop-blur-xl
                                            flex items-center justify-center hover:bg-white/15 transition-all
                                            text-2xl font-bold mb-4'>
                                {i + 1}
                            </div>
                            <p className='text-lg text-gray-200'>{step}</p>
                        </div>
                    ))}
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
                        <i class="fa-solid fa-fire me-1"></i>
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
