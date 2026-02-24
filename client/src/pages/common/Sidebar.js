import React, { useEffect, useState } from 'react'
import FrontPage from '../FrontPage';
import { Link } from 'react-router-dom';

function Sidebar({ isSidebarOpen, setIsSidebarOpen, refreshKey }) {
    const [randomCommunities, setRandomCommunities] = useState({ communities: [] })
    const [userCommunities, setUserCommunities] = useState({ communities: [] })
    const [ownedCommunities, setOwnedCommunities] = useState({ communities: [] })
    const [showUserCommunities, setShowUserCommunities] = useState(true)
    const [showPopular, setShowPopular] = useState(true)
    const [showOwnedCommunities, setShowOwnedCommunities] = useState(true)
    
    useEffect(() => {
        // Fetch user communities if logged in
        if (localStorage.getItem('user')) {
            getUserCommunities(JSON.parse(localStorage.getItem('user')).id)

            getOwnedCommunities(JSON.parse(localStorage.getItem('user')).id)
        }
    }, [refreshKey])

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
            getUserCommunities(JSON.parse(localStorage.getItem('user')).id)

            getOwnedCommunities(JSON.parse(localStorage.getItem('user')).id)
        }
    }, [])

    function getUserCommunities(user_id) {
        fetch(`/api/user/getUserCommunities/${user_id}`)
        .then(res => res.json())
        .then(data => {
            setUserCommunities({ communities: data })
        })
        .catch(err => console.error('Fetch /getUserCommunities failed:', err))
    }

    function getOwnedCommunities(user_id) {
        fetch(`/api/user/getOwnedCommunities/${user_id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setOwnedCommunities({ communities: data })
        })
        .catch(err => console.error('Fetch /getOwnedCommunities falied:', err))
    }

    return (
        
        // Fix sidebar and change width based on isSidebarOpen
        <aside className={`fixed top-0 left-0 z-40 h-[calc(100vh-85px)] mt-[85px] bg-blue-950
                         text-white transition-all duration-300 select-none overflow-y-auto
                           ${isSidebarOpen ?
                            'w-80 overflow-y-scroll' :
                            'w-14'}
                           sidebar-scroll`}>
            {/* Toggle sidebar */}
            <button onClick={() => setIsSidebarOpen(prev => !prev)}
                    className="m-2 p-2 rounded-md hover:bg-blue-900"
                    aria-label="Toggle sidebar">
                <i className="fa-solid fa-bars"/>
            </button>

            {/* Only have these elements when sidebar is shown */}
            {isSidebarOpen && (
                <div className="px-3 py-2 overflow-y-auto">

                    {/* Create community */}
                    {localStorage.getItem('user') && (
                        <div>
                            {/* Create Community */}
                            <div className="hover:bg-blue-900 rounded-md
                                            transition-colors overflow-hidden">
                                <Link to='/newcommunity'
                                    className="flex items-center px-2 py-1.5 gap-2">
                                    {/* Plus icon */}
                                    <i className="fa-solid fa-plus"/>

                                    {/* Create Community */}

                                    <span className="whitespace-nowrap overflow-hidden">
                                        Create Community
                                    </span>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Divider */}
                    <div className={`border-2 border-t-white my-2
                                    ${localStorage.getItem('user') ? "" : "hidden"}`}/>

                    {/* Random posts */}
                    <div className="hover:bg-blue-900 rounded-md
                                    transition-colors overflow-hidden"
                        key={0}
                        onClick={() => getCommunity(0)}>
                        <a href="#"
                            className="flex items-center px-2 py-1.5 gap-2">
                            {/* Random icon */}
                            <i className="fa-solid fa-shuffle"/>

                            {/* Community name */}
                            <span className="whitespace-nowrap overflow-hidden">
                                Random Posts
                            </span>
                        </a>
                    </div>

                    {/* Divider */}
                    <div className={`border-2 border-t-white my-2
                                    ${localStorage.getItem('user') ? "" : "hidden"}`}/>

                    {/* Get owned communities */}
                    {localStorage.getItem('user') && (
                        <div>
                            <div>
                                <h1 className='mb-2 ms-1.5'>
                                    <i className="fa-solid fa-crown"/>
                                    <span className='ms-2'>
                                        Owned Communities
                                    </span>
                                    <i className={`fa-solid ms-8 hover:bg-blue-900
                                                transition-all rounded-full p-3 w-10 h-10 cursor-pointer
                                                ${showOwnedCommunities ? "fa-angle-down": "fa-angle-up"}`}
                                    onClick={() => setShowOwnedCommunities(prev => !prev)}/>
                                </h1>

                                {/* If user has no communities */}
                                { ownedCommunities.communities.length == 0 &&
                                    showOwnedCommunities && (
                                    <ul>
                                        <li>
                                            <i className="fa-solid fa-caret-right"/>
                                            No communities owned!
                                        </li>
                                    </ul>)
                                }

                                {/* If user has communities */}
                                { ownedCommunities.communities.length > 0 &&
                                showOwnedCommunities &&
                                    <ul>
                                        {ownedCommunities.communities.map((community, i) => (
                                            // Random Community on sidebar
                                            <li key={i}
                                                className="hover:bg-blue-900 rounded-md
                                                        transition-colors overflow-hidden"
                                                onClick={() => getCommunity(community.community_id)}>
                                                <a href="#"
                                                className="flex items-center px-2 py-1.5 gap-2">
                                                    
                                                    {/* Community icon for later */}
                                                    <div className="w-6 h-6">
                                                        <img src={community.img} className='rounded-full w-full h-full' />
                                                    </div>

                                                    {/* Community name */}
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
                            </div>
                        </div>
                    )}

                    {/* Divider */}
                    <div className={`border-2 border-t-white my-2
                                    ${localStorage.getItem('user') ? "" : "hidden"}`}/>

                    {/* Joined communities */}
                    {localStorage.getItem('user') && (
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
                            { userCommunities.communities.length > 0 &&
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
                                                    <img src={community.img} className='rounded-full w-full h-full' />
                                                </div>

                                                {/* Community name */}
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
                        </div>
                    )}

                    {/* Divider */}
                    <div className='border-2 border-t-white my-2'/>

                    {/* Popular communities */}
                    <div className="space-y-2 font-medium">

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
                                        <img src={community.img} className='rounded-full w-full h-full' />
                                    </div>

                                    {/* Community name */}
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
                    </div>
                </div>
            )}
        </aside>
    )
}

export default Sidebar