import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Sidebar() {
    const [backendData, setBackendData] = useState({ communities: [] })

    useEffect(() => {
        fetch('/randomCommunities')
            .then(res => res.json())
            .then(data => {

                setBackendData({ communities: data })
            })
            .catch(err => console.error('Fetch /randomCommunities failed:', err))
    }, [])

    return (
        <div className='border-white'>
            <button data-drawer-target="default-sidebar"
                    data-drawer-toggle="default-sidebar"
                    aria-controls="default-sidebar"
                    type="button"
                    class="text-heading bg-transparent box-border border
                           border-transparent hover:bg-neutral-secondary-medium
                           focus:ring-4 focus:ring-neutral-tertiary font-medium
                           leading-5 rounded-base ms-3 mt-3 text-sm p-2
                           focus:outline-none inline-flex sm:hidden">
                <svg class="w-6 h-6"
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     fill="none"
                     viewBox="0 0 24 24">
                    <path stroke="currentColor"
                          stroke-linecap="round"
                          stroke-width="2"
                          d="M5 7h14M5 12h14M5 17h10" />
                </svg>
            </button>

            <aside id="default-sidebar" class="bg-blue-950 text-white mt-16 fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
                    <ul class="space-y-2 font-medium">
                        {backendData.communities.length > 0 ? (
                            backendData.communities.map((community, i) => (
                                <li className='hover:bg-blue-900 rounded-md'>
                                    <a href="#" class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                                        <svg class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9M9 7h6m-7 3h8" /></svg>
                                        <span class="flex-1 ms-3 whitespace-nowrap">{community.name}</span>
                                        <span class="inline-flex items-center justify-center w-4.5 h-4.5 ms-2 text-xs font-medium text-fg-danger-strong rounded-full">2</span>
                                    </a>
                                </li>
                            ))
                        ) : (
                            <p>Betöltés...</p>
                        )}
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar