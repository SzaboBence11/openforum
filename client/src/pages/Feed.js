import React, { useEffect, useState } from 'react'
import Sidebar from './common/Sidebar';
import FrontPage from './FrontPage';

function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [sidebarRefreshKey, setSidebarRefreshKey] = useState(0)

    const refreshSidebar = () => {
        setSidebarRefreshKey(prev => prev + 1)
    }

    return (
        <div>
            {/* Link sidebar and Frontpage together */}
            <Sidebar isSidebarOpen={isSidebarOpen}
                     setIsSidebarOpen={setIsSidebarOpen}
                     refreshKey={sidebarRefreshKey}/>
            <FrontPage isSidebarOpen={isSidebarOpen}
                       refreshSidebar={refreshSidebar}/>
        </div>
    )
}

export default Home