import React, { useEffect, useState } from 'react'
import FrontPage from '../FrontPage';

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const [randomCommunities, setRandomCommunities] = useState({ communities: [] })
    const [userCommunities, setUserCommunities] = useState({ communities: [] })

    function getCommunity(community_id){
        localStorage.setItem('selectedCommunity', community_id);
        setIsSidebarOpen(false);
        window.location.reload(true);
    }

    // Fetch randomCommunities (10)
    useEffect(() => {
        if(!localStorage.getItem('randomCommunities')){
            fetch('/api/community/randomCommunities')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                localStorage.setItem('randomCommunities', JSON.stringify(data))
                setRandomCommunities({ communities: data })
            })
            .catch(err => console.error('Fetch /randomCommunities failed:', err))
        } else{
            let data = JSON.parse(localStorage.getItem('randomCommunities'));
            setRandomCommunities({communities: data});
        }


        if (localStorage.getItem('user')) {
            fetch(`/api/user/getUserCommunities/${JSON.parse(localStorage.getItem('user')).id}`)
            .then(res => res.json())
            .then(data => {
                setUserCommunities({ communities: data })
            })
            .catch(err => console.error('Fetch /getUserCommunities failed:', err))
        }
    }, [])

    return (
        // Fix sidebar and change width based on isSidebarOpen
        <aside className={`fixed top-0 left-0 z-40 mt-16 h-full bg-blue-950
                               text-white transition-all duration-300
                               ${isSidebarOpen ? 'w-64' : 'w-14'}`}>

            {/* Toggle sidebar */}
            <button onClick={() => setIsSidebarOpen(prev => !prev)}
                className="m-2 p-2 rounded-md hover:bg-blue-900"
                aria-label="Toggle sidebar">
                <i className="fa-solid fa-bars"/>
            </button>

            {/* Only have these elements when sidebar is shown */}
            {isSidebarOpen && (
                <div className="px-3 py-2 overflow-y-auto">
                    <ul className="space-y-2 font-medium">

                        <li className="hover:bg-blue-900 rounded-md
                                       transition-colors overflow-hidden"
                            key={0}
                            onClick={() => getCommunity(0)}>
                            <a href="#"
                                className="flex items-center px-2 py-1.5 gap-2">
                                {/* Random icon */}
                                <i className="fa-solid fa-shuffle"/>

                                {/* Community name (Capitalized) */}
                                <span className="whitespace-nowrap overflow-hidden">
                                    Random Posts
                                </span>
                            </a>
                        </li>

                        <div className='border-2 border-t-white'/>

                        {localStorage.getItem('user') &&
                            <div>
                                <h1 className='mb-2'>
                                    <i className="fa-solid fa-users"/>
                                    <span className='ms-2'>
                                        Joined communities
                                    </span>
                                </h1>

                                { userCommunities.communities.length == 0 &&
                                    <ul>
                                        <li>
                                            <i className="fa-solid fa-caret-right"/>
                                            No communities joined!
                                        </li>
                                    </ul>
                                }
                                
                                <div className='border-2 border-t-white mt-2'/>
                            </div>
                        }

                        {/* Make a small thing on the sidebar for 
                                the fetched communities */}
                        {randomCommunities.communities.map(community => (

                            // Random Community on sidebar
                            <li className="hover:bg-blue-900 rounded-md
                                           transition-colors overflow-hidden"
                                key={community.id}
                                onClick={() => getCommunity(community.id)}>
                                <a href="#"
                                    className="flex items-center px-2 py-1.5 gap-2">

                                    {/* Community icon for later */}
                                    <div className="w-6 h-6 bg-white rounded-full" />

                                    {/* Community name (Capitalized) */}
                                    <span className="whitespace-nowrap overflow-hidden">
                                        {community.name.charAt(0).toUpperCase() +
                                         community.name.slice(1)}
                                    </span>

                                    {/* Right area */}
                                    <span className="ml-auto flex items-center gap-1
                                    text-xs">

                                        {/* User Count */}
                                        {community.member_count}

                                        {/* User Icon */}
                                        <i className="fa-solid fa-user"/>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </aside>
    )
}

export default Sidebar