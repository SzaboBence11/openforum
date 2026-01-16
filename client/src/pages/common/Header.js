import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Searchbar from './Searchbar';

function Header() {
    function logout(){
        console.log("ASD")
        localStorage.removeItem('user');
        window.location.assign("/");
    }
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

                {/* User image */}
                {
                    <div className={`${JSON.parse(localStorage.getItem('user'))
                                       ? "opacity-100"
                                       : "opacity-0"}
                                    min-w-10 max-w-10 h-10 bg-white rounded-full
                                    ms-auto me-0`} />
                }

                
                {
                    /* Login btn */
                    !JSON.parse(localStorage.getItem('user')) && 
                    <div className='ms-3'>
                        <Link to="/login">
                            <button className="hover:bg-white hover:text-blue-950
                                               text-white font-bold py-2
                                               px-4 rounded-full transition-colors
                                               ms-auto me-0">
                                Login
                            </button>
                        </Link>
                    </div>
                }

                {
                    JSON.parse(localStorage.getItem('user')) && 
                    <div className='ms-3'>
                            <button className="hover:bg-white hover:text-blue-950
                                               text-white font-bold py-2
                                               px-4 rounded-full transition-colors"
                                               onClick={() => logout()}>
                                Logout
                                    
                            </button>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header