import React, { use, useEffect, useState } from 'react'
import Notification from "./common/Notification.js";
import { BrowserRouter, Routes, Route, Link, Form } from 'react-router-dom';

function Login() {
    // Input variables
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailTouched, setEmailTouched] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationType, setNotificationType] = useState(false)
    const [loginDelay, setLoginDelay] = useState(false)

    // Email validation
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    // Form validation
    const isFormValid = isEmailValid &&
                        password.length > 0

    // Submit login
    function loginSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password })

        })
        .then(res => res.json())
        .then(data => {
            if (data.id) {
                localStorage.setItem('openforum_user', JSON.stringify({
                        id: data.id
                }))
                setNotificationType(true)
                setTimeout(() => {
                    window.location.assign("/");
                }, 600);
            }
            else {
                setNotificationType(false)
                setLoginDelay(true)
                setTimeout(() => {
                    setLoginDelay(false)
                }, 2400);
                setTimeout(() => {
                    setIsNotificationOpen(false)
                }, 3000);
            }
        })
        .catch(err => console.error('Fetch /login failed:', err))
    }

    function addNotification() {
        setTimeout(() => {
            setIsNotificationOpen(true);
        }, 300);
    }

    return (
        <div>
            <div className="flex flex-col justify-center
                            px-6 py-12 lg:px-8 mt-16 animate-fadeIn">

                {/* Top title */}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold
                                   tracking-tight text-white">
                        Sign in to your account
                    </h2>
                </div>

                {/* Form container */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white/10 p-5
                                rounded-2xl shadow-lg border border-white/15">
                    <form onSubmit={loginSubmit}
                          className="">

                        {/* Email */}
                        <div>

                            {/* Email label */}
                            <label htmlFor="email"
                                   className="block text-sm/6 font-medium
                                            text-white">
                                Email address
                            </label>

                            {/* Email input */}
                            <div className="mt-2">
                                <input type="email"
                                       className="px-3 py-2 rounded-lg border-white/15 text-white
                                                  w-full border shadow-sm text-sm bg-blue-950/60 backdrop-blur-xl"
                                       placeholder="john123@example.com"
                                       id="email"
                                       autoComplete='true'
                                       name="email"
                                       onChange={(e) => setEmail(e.target.value)}
                                       onBlur={() => setEmailTouched(true)}>
                                </input>
                            </div>

                            {/* Invalid email error */}
                            <div className={`${emailTouched && !isEmailValid ? "opacity-100": "opacity-0"}`}>
                                <small className="text-red-500">
                                    Invalid email!
                                </small>
                            </div>
                        </div>

                        {/* Password */}
                        <div className='mb-4'>

                            {/* Password label */}
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="block text-sm/6 font-medium
                                       text-white">
                                    Password
                                </label>
                            </div>

                            {/* Password input */}
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'}
                                       value={password}
                                       id='password'
                                       name='password'
                                       placeholder='Example123'
                                       autoComplete='true'
                                       onChange={(e) => setPassword(e.target.value)}
                                       className="px-3 py-2 rounded-lg border-white/15 text-white
                                                  w-full border shadow-sm text-sm bg-blue-950/60 backdrop-blur-xl"
                                />

                                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' 
                                                                       : 'fa-eye'}
                                               absolute right-3 top-1/2 -translate-y-1/2
                                               cursor-pointer text-gray-200
                                               hover:text-gray-300 transition-all duration-300`}
                                   onClick={() => setShowPassword(prev => !prev)}
                                />
                            </div>

                        </div>

                        {/* Login btn */}
                        <div className='justify-center mx-auto w-auto flex'>
                            <button className={`w-52 rounded-full font-bold group
                                                shadow-lg transition py-2 px-4 border border-white/15
                                                ${(isFormValid)
                                                ? 'bg-white/10 backdrop-blur-xl hover:bg-white/25 hover:bg-blue-900 text-white'
                                                : 'bg-white/5 backdrop-blur-xl cursor-not-allowed text-gray-400'}
                                              `}
                                    type="submit"
                                    disabled={!isFormValid || loginDelay}
                                    onClick={() => addNotification()}>
                                    Login
                                    <i className={`${isFormValid ? 'group-hover:ms-2': ''}
                                                  fa-solid fa-angles-right ms-1 transition-all`}/>
                            </button>
                        </div>
                    </form>

                    {/* Bottom text */}
                    <p className="mt-6 text-center text-sm/6 text-gray-300">
                        You don't have an account?
                        <Link to="/register"
                              className="font-semibold text-blue-400
                                       hover:text-indigo-500 ms-2">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
            
            <Notification
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
                title="Notification"
                bgColor={
                    notificationType ? 
                    "bg-green-700/50" :
                    "bg-red-700/20"
                }
            >
                <p className="text-gray-300">
                    {notificationType ?
                     "Successful login!" :
                     "Unsuccessful login!"}
                </p>
            </Notification>
        </div>
    )
}

export default Login