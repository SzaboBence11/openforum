import React, { useEffect, useState } from 'react'
import Sidebar from './common/Sidebar';
import FrontPage from './FrontPage';

function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <div>

            {/* Link sidebar and Frontpage together */}
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
            <FrontPage isSidebarOpen={isSidebarOpen}/>
        </div>
    )
}

export default Home