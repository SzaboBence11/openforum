import React, { useEffect, useState } from 'react'
import Sidebar from './common/Sidebar';
import FrontPage from './FrontPage';

function Home() {

    return (
        <div>

            {/* Link sidebar and Frontpage together */}
            <Sidebar />
            <FrontPage />
        </div>
    )
}

export default Home