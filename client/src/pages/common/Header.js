import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Searchbar from './Searchbar';

function Header() {
    return (

        // Main header element
        <header className="bg-blue-950 text-white py-4 px-6 flex top-0
                           sticky transition-all duration-300">
            <div className='flex flex-1 w-full'>

                {/* Home page link */}
                <Link to="/" className='text-xl font-bold pt-0.5'>
                    Openforum
                </Link>

                {/* Searchbar element */}
                <Searchbar />

                {/* Login btn */}
                <div className='ms-auto'>
                    <Link to="/login">
                        <button className="hover:bg-white hover:text-blue-950
                                           text-white font-bold py-2
                                           px-4 rounded-full transition-colors">
                            Login
                        </button>
                    </Link>
                </div>

                {/* User image */}
                <div className="min-w-10 max-w-10 h-10 bg-white rounded-full ms-3" />
            </div>
        </header>
    )
}

export default Header