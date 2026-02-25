import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Searchbar from './Searchbar.js';
import Modal from "./Modal.js";

function Header() {
    const [userData, setUserData] = useState({ user: [] });
    const [isOpen, setIsOpen] = useState(false);

    // Current modal state
    const [modalState, setModalState] = useState("result");

    // Check modal open
    const [isModalOpen, setIsModalOpen] = useState(false);

    const storedUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (storedUser) {
            fetch(`/api/user/profile/${storedUser.id}`)
            .then(res => res.json())
            .then(data => {
                setUserData({ user: data[0] })
            })
        }
    }, [])

    function logout() {
        localStorage.removeItem('user');
        window.location.assign("/");
    }

    return (
        <>
            {/* Header section */}
            <header className="bg-blue-950 text-white py-3 px-6 min-h-[85px] sticky top-0 z-50">
                <div className="flex items-center w-full relative mt-2">

                    {/* LEFT */}
                    <Link to="/" className='text-xl font-bold mt-2 md:mt-0 items-center z-10'>
                        <i className="fa-solid fa-comments me-2"/>
                        Openforum
                    </Link>

                    {/* CENTER SEARCHBAR */}
                    <div
                        className="
                            absolute
                            left-1/3
                            lg:left-1/2
                            -translate-x-1/2
                            hidden md:block
                            px-4
                            mb-2
                            ms-2
                            w-[30vw]
                            lg:w-[37vw]
                            lg:ms-0
                            min-w-[180px]
                        "
                    >
                        <Searchbar />
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="ms-auto flex items-center z-10">

                        {/* Desktop */}
                        <div className="hidden md:flex items-center">

                            {storedUser &&
                                <Link to="/profile">
                                    <div className='flex items-center hover:bg-blue-900 px-2 py-1.5 transition-all rounded-full'>
                                        <div className='my-2 ms-3 me-3'>
                                            <h3 className='font-semibold whitespace-nowrap'>
                                                {userData.user.name}
                                            </h3>
                                        </div>
                                        <div className="w-10 h-10 rounded-full">
                                            <img
                                                className="rounded-full w-full h-full object-cover"
                                                src={userData.user.img}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </Link>
                            }

                            {!storedUser &&
                                <div>
                                    <Link to="/login">
                                        <button className="hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full transition-colors">
                                            <i class="fa-solid fa-right-to-bracket me-2 mt-0.5"></i>
                                            Login
                                        </button>
                                    </Link>

                                    <Link to="/register">
                                        <button className="hover:bg-gray-300 text-blue-950 bg-white py-2 px-4 rounded-full transition-colors ms-3 font-bold">
                                            <i class="fa-solid fa-user-plus me-2 mt-0.5"></i>
                                            Register
                                        </button>
                                    </Link>
                                </div>
                            }

                            {storedUser &&
                                <div className='ms-3'>
                                    
                                    <button
                                        className="hover:bg-blue-900 text-white font-bold py-2 px-4 flex rounded-full transition-colors"
                                        onClick={() => {
                                            setIsModalOpen(true)
                                        }}
                                    >
                                        <i className="fa-solid relative fa-arrow-right-from-bracket me-2 mt-[0.25rem]"></i>
                                            Logout
                                    </button>
                                </div>
                            }
                        </div>

                        {/* Hamburger */}
                        <button
                            className="md:hidden text-2xl px-3 mt-3"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>
                </div>

                {/* FLOATING MOBILE DROPDOWN */}
                <div
                    className={`
                        md:hidden
                        absolute
                        left-0
                        top-full
                        w-full
                        bg-blue-950
                        overflow-hidden
                        transition-all
                        duration-300
                        ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"}
                    `}
                >
                    <div className="flex flex-col items-center text-center px-6 pb-4">

                        <div className="w-full max-w-xl mt-3">
                            <Searchbar />
                        </div>

                        {storedUser &&
                            <Link to="/profile">
                                <div className='flex items-center hover:bg-blue-900 px-2 py-1.5 transition-all rounded-full mt-4'>
                                    <div className='my-2 me-3'>
                                        <h3 className='font-semibold'>
                                            {userData.user.name}
                                        </h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-full">
                                        <img
                                            className="rounded-full w-full h-full object-cover"
                                            src={userData.user.img}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </Link>
                        }

                        {!storedUser &&
                            <div className='flex flex-col items-center mt-4'>
                                <Link to="/login">
                                    <button className="hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full transition-colors">
                                        Login
                                    </button>
                                </Link>

                                <Link to="/register">
                                    <button className="hover:bg-gray-300 text-blue-950 bg-white py-2 px-4 rounded-full transition-colors mt-2 font-bold">
                                        Register
                                    </button>
                                </Link>
                            </div>
                        }

                        {storedUser &&
                            <button
                                className="hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full transition-colors mt-4"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        }
                    </div>
                </div>
            </header>

            {/* Logout confirmation */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
                title= {"Confirmation"}>
                <>
                    <div>
                        <div>
                            <p className='m-2 text-center text-lg'>Are you sure you want to log out?</p>
                        </div>
                        <div className='flex flex-col md:flex-row'>
                            <div className='m-2 mx-auto'>
                                <button className='w-52 rounded-full font-bold group
                                                shadow-lg transition py-2 px-4 border
                                                border-white/15 hover:bg-green-500/40
                                                hover:border-green-700/40'
                                        onClick={() => logout()}>
                                    Yes
                                </button>
                            </div>

                            <div className='m-2 mx-auto'>
                                <button className='w-52 rounded-full
                                                font-bold group shadow-lg transition
                                                py-2 px-4 border border-white/15
                                                hover:bg-red-500/40 hover:border-red-700/40'
                                        onClick={() => setIsModalOpen(false)}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            </Modal>
        </>
    )
}

export default Header
