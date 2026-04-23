import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Header from './pages/common/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import CommunityAdd from './pages/CommunityAdd';
import Search from './pages/Search';
import About from './pages/About';

function App() {
    return (

        // Router
        <BrowserRouter>

            <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-950
                            via-blue-900 to-indigo-950">
                <Header />

                {/* Main content */}
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/newcommunity" element={<CommunityAdd />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App