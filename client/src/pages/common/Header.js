import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Searchbar from './Searchbar';

function Header() {
    function logout() {
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('user');
            window.location.assign("/");
        }
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
                { JSON.parse(localStorage.getItem('user')) &&
                    <div className='ms-auto flex'>
                        <div className='my-2 ms-3 me-5'>
                            <h3 className='font-semibold'>
                                {JSON.parse(localStorage.getItem('user')).name}
                            </h3>
                        </div>
                        <div className="w-10 h-10 bg-white rounded-full" />
                    </div>
                }

                {/* Login btn */}
                {
                    !JSON.parse(localStorage.getItem('user')) && 
                    <div className='ms-auto'>
                        <Link to="/login">
                            <button className="hover:bg-blue-900 text-white font-bold py-2
                                               px-4 rounded-full transition-colors ms-auto">
                                Login
                            </button>
                        </Link>

                        <Link to="/register">
                            <button className="hover:bg-gray-300 text-blue-950 bg-white py-2
                                               px-4 rounded-full transition-colors ms-3 font-bold">
                                Register
                            </button>
                        </Link>
                    </div>
                }

                {/* Logout btn */}
                {
                    JSON.parse(localStorage.getItem('user')) && 
                    <div className='ms-3'>
                        <button className="hover:bg-blue-900 text-white font-bold py-2
                                           px-4 rounded-full transition-colors ms-auto"
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