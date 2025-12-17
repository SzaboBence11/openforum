import React, { useEffect, useState } from 'react'

function Sidebar() {
    const [backendData, setBackendData] = useState({ communities: [] })
    const [isOpen, setIsOpen] = useState(true);

    // Fetch randomCommunities (10)
    useEffect(() => {
        fetch('/randomCommunities')
            .then(res => res.json())
            .then(data => {

                setBackendData({ communities: data })
            })
            .catch(err => console.error('Fetch /randomCommunities failed:', err))
    }, [])

    return (
        <div>

            {/* Fix sidebar and change width based on isOpen */}
            <aside className={`fixed top-0 left-0 z-40 mt-16 h-full bg-blue-950
                               text-white transition-all duration-300
                               ${isOpen ? 'w-64' : 'w-14'}`}>

                {/* Toggle sidebar */}
                <button onClick={() => setIsOpen(prev => !prev)}
                        className="m-2 p-2 rounded-md hover:bg-blue-900"
                        aria-label="Toggle sidebar">
                    <svg className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                        <path d="M5 7h14M5 12h14M5 17h10" />
                    </svg>
                </button>

                {/* Only have these elements when sidebar is shown */}
                {isOpen && (
                    <div className="px-3 py-2 overflow-y-auto">
                        <ul className="space-y-2 font-medium">

                            {/* Make a small thing on the sidebar for 
                                the fetched communities */}
                            {backendData.communities.map(community => (
                                
                                // Random Community on sidebar
                                <li className="hover:bg-blue-900 rounded-md transition-colors overflow-hidden"
                                    key={community.name}
                                    onClick={() => setIsOpen(false)}>
                                    <a href="#"
                                        className="flex items-center px-2 py-1.5 gap-2">

                                        {/* Community icon for later */}
                                        <div className="w-6 h-6 bg-white rounded-full" />

                                        {/* Community name (Capitalized) */}
                                        <span className="whitespace-nowrap overflow-hidden">
                                            {community.name.charAt(0).toUpperCase() + community.name.slice(1)}
                                        </span>

                                        {/* Right area */}
                                        <span className="ml-auto flex items-center gap-1 text-xs">

                                            {/* User Count */}
                                            {community.member_count}

                                            {/* User Icon */}
                                            <svg width="18"
                                                height="18">
                                                <path
                                                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                />
                                                <path
                                                    d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                />
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </aside>
        </div>
    )
}

export default Sidebar