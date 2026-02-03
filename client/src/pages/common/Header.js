import React, {useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Searchbar from './Searchbar';

function Header() {
    const [userData, setUserData] = useState({ user: [] });

    useEffect(() => {
        if (localStorage.getItem('user')) {
            fetch(`/api/user/profile/${JSON.parse(localStorage.getItem('user')).id}`)
            .then(res => res.json())
            .then(data => {
                setUserData({ user: data[0] })
            })
        }
    }, [])

    function logout() {
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('user');
            window.location.assign("/");
        }
    }
    
    return (

        // Main header element
        <header className="bg-blue-950 text-white py-3 px-6 flex top-0
                           sticky transition-all duration-300 z-40">
            <div className='flex flex-1 w-full'>

                {/* Home page link */}
                <Link to="/" className='text-xl font-bold pt-0.5 mt-2'>
                    <i className="fa-solid fa-comments me-2"/>
                    Openforum
                </Link>

                {/* Searchbar element */}
                <Searchbar  />

                <button className='hover:bg-blue-900 px-2 py-1.5 transition-all ms-auto rounded-full'>
                    {/* User image and name */}
                    { JSON.parse(localStorage.getItem('user')) &&
                        <Link to="/profile">
                            <div className='ms-auto flex'>
                                <div className='my-2 ms-3 me-3'>
                                    <h3 className='font-semibold'>
                                        {userData.user.name}
                                    </h3>
                                </div>
                                <div className="w-10 h-10 rounded-full justify-center">
                                    <img id='headerAvatarPicture' className="rounded-full w-full h-full " src={userData.user.img}></img>
                                </div>
                            </div>
                        </Link>
                    }
                </button>

                {/* Login btn */}
                {
                    !JSON.parse(localStorage.getItem('user')) && 
                    <div className='ms-auto mt-1.5'>
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
                    <div className='ms-3 mt-1.5'>
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