import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Header from './pages/common/Header';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

    
    return (

        // Router
        <BrowserRouter>

            {/* Link header */}
            <Header />

            {/* Define routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App