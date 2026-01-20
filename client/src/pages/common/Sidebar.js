import React, { useEffect, useState } from 'react'

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const [backendData, setBackendData] = useState({ communities: [] })

    function getCommunity(community_id){
        localStorage.setItem('selectedCommunity', community_id);
        setIsSidebarOpen(false);
        window.location.reload(true);
    }

    // Fetch randomCommunities (10)
    useEffect(() => {
        fetch('/api/community/randomCommunities')
            .then(res => res.json())
            .then(data => {

                setBackendData({ communities: data })
            })
            .catch(err => console.error('Fetch /randomCommunities failed:', err))
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

                        {/* Make a small thing on the sidebar for 
                                the fetched communities */}
                        {backendData.communities.map(community => (

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
                        <li className="hover:bg-blue-900 rounded-md
                                       transition-colors overflow-hidden"
                            key={0}
                            onClick={() => getCommunity(0)}>
                            <a href="#"
                                className="flex items-center px-2 py-1.5 gap-2">
                                {/* Community icon for later */}
                                <div className="w-6 h-6 bg-white rounded-full" />
                                {/* Community name (Capitalized) */}
                                <span className="whitespace-nowrap overflow-hidden">
                                    Random Posts
                                </span>
                                {/* Right area */}
                                <span className="ml-auto flex items-center gap-1 text-xs">
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </aside>
    )
}

export default Sidebar