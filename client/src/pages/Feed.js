import React, { useEffect, useState } from 'react'
import Sidebar from './common/Sidebar';
import FrontPage from './FrontPage';

function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <div className='bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 p-5 min-h-[920.5px]'>

            {/* Link sidebar and Frontpage together */}
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
            <FrontPage isSidebarOpen={isSidebarOpen}/>
        </div>
    )
}

export default Home