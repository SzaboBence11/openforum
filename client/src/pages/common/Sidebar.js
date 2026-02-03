import React, { useEffect, useState } from 'react'
import FrontPage from '../FrontPage';

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const [randomCommunities, setRandomCommunities] = useState({ communities: [] })
    const [userCommunities, setUserCommunities] = useState({ communities: [] })
    const [showUserCommunities, setShowUserCommunities] = useState(true)
    const [showPopular, setShowPopular] = useState(true)

    function changeSidebar(state) {

    }

    function getCommunity(community_id) {
        localStorage.setItem('selectedCommunity', community_id);
        setIsSidebarOpen(false);
        window.location.reload(true);
    }

    // Fetch randomCommunities (10)
    useEffect(() => {

        // If random communities are already stored
        if (!localStorage.getItem('randomCommunities')) {
            fetch('/api/community/randomCommunities/10')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                localStorage.setItem('randomCommunities', JSON.stringify(data))
                setRandomCommunities({ communities: data })
            })
            .catch(err => console.error('Fetch /randomCommunities failed:', err))
        } 
        
        // If random communities aren't stored
        else {
            let data = JSON.parse(localStorage.getItem('randomCommunities'));
            setRandomCommunities({communities: data});
        }

        // Fetch user communities if logged in
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
                         text-white transition-all duration-300 select-none
                           ${isSidebarOpen ? 'w-72' : 'w-14'}`}>

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
                        {localStorage.getItem('user') && (
                            <>
                                {/* Create Community */}
                                <li className="hover:bg-blue-900 rounded-md
                                               transition-colors overflow-hidden">
                                    <a href="#"
                                        className="flex items-center px-2 py-1.5 gap-2">
                                        {/* Plus icon */}
                                        <i className="fa-solid fa-plus"/>

                                        {/* Create Community (Capitalized) */}
                                        <span className="whitespace-nowrap overflow-hidden">
                                            Create Community
                                        </span>
                                    </a>
                                </li>

                                {/* My Communities */}
                                <li className="hover:bg-blue-900 rounded-md
                                               transition-colors overflow-hidden">
                                    <a href="#"
                                        className="flex items-center px-2 py-1.5 gap-2">
                                        {/* Folder Icon */}
                                        <i className="fa-solid fa-folder"/>

                                        {/* My Communities (Capitalized) */}
                                        <span className="whitespace-nowrap overflow-hidden">
                                            My Communities
                                        </span>
                                    </a>
                                </li>

                                {/* Divider */}
                                <div className='border-2 border-t-white'/>
                            </>
                        )}

                        {/* Get random posts */}
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

                        {/* Divider */}
                        <div className='border-2 border-t-white'/>

                        {/* User's joined communities */}
                        {localStorage.getItem('user') &&
                            <div>
                                <h1 className='mb-2 ms-1.5'>
                                    <i className="fa-solid fa-users"/>
                                    <span className='ms-2'>
                                        Joined Communities
                                    </span>
                                    <i className={`fa-solid ms-9 hover:bg-blue-900
                                                  transition-all rounded-full p-3 w-10 h-10 cursor-pointer
                                                  ${showUserCommunities ? "fa-angle-down": "fa-angle-up"}`}
                                       onClick={() => setShowUserCommunities(prev => !prev)}/>
                                </h1>

                                {/* If user has no communities */}
                                { userCommunities.communities.length == 0 &&
                                  showUserCommunities &&
                                    <ul>
                                        <li>
                                            <i className="fa-solid fa-caret-right"/>
                                            No communities joined!
                                        </li>
                                    </ul>
                                }

                                {/* If user has communities */}
                                { userCommunities.communities.length &&
                                  showUserCommunities &&
                                    <ul>
                                        {userCommunities.communities.map((community, i) => (
                                            // Random Community on sidebar
                                            <li key={i}
                                                className="hover:bg-blue-900 rounded-md
                                                           transition-colors overflow-hidden"
                                                onClick={() => getCommunity(community.community_id)}>
                                                <a href="#"
                                                   className="flex items-center px-2 py-1.5 gap-2">
                                                    
                                                    {/* Community icon for later */}
                                                    <div className="w-6 h-6">
                                                        <img src={community.img} className='rounded-full' />
                                                    </div>

                                                    {/* Community name (Capitalized) */}
                                                    <span className="whitespace-nowrap overflow-hidden">
                                                        {community.community_name.charAt(0).toUpperCase() +
                                                         community.community_name.slice(1)}
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
                                }
                                
                                <div className='border-2 border-t-white mt-2'/>
                            </div>
                        }

                        {/* Popular Communities */}
                        <h1 className='ms-1.5'>
                            <i className="fa-solid fa-fire"/>
                            <span className='ms-2'>
                                Popular Communities
                            </span>
                            <i className={`fa-solid ms-7 hover:bg-blue-900
                                                  transition-all rounded-full p-3 w-10 h-10 cursor-pointer
                                                  ${showPopular ? "fa-angle-down": "fa-angle-up"}`}
                               onClick={() => setShowPopular(prev => !prev)}/>
                        </h1>

                        
                        {/* Show popular communities */}
                        { showPopular && randomCommunities.communities.map(community => (

                            // Random Community on sidebar
                            <li className="hover:bg-blue-900 rounded-md
                                           transition-colors overflow-hidden"
                                key={community.id}
                                onClick={() => getCommunity(community.id)}>
                                <a href="#"
                                    className="flex items-center px-2 py-1.5 gap-2">

                                    {/* Community icon for later */}
                                    <div className="w-6 h-6">
                                        <img src={community.img} className='rounded-full' />
                                    </div>

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