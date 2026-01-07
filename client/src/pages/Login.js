import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Login() {

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center
                            px-6 py-12 lg:px-8">
                
                {/* Top title */}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold
                                   tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                {/*  */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#"
                          method="POST"
                          className="space-y-6">

                        {/* Email */}
                        <div>

                            {/* Email label */}
                            <label htmlFor="email"
                                   className="block text-sm/6 font-medium
                                            text-gray-900">
                                Email address
                            </label>

                            {/* Email input */}
                            <div className="mt-2">
                                <input type="email"
                                       className="px-3 py-2 rounded-lg text-black
                                                  w-full border shadow-sm text-sm"
                                       placeholder="john123@example.com">
                                </input>
                            </div>
                        </div>

                        {/* Password */}
                        <div>

                            {/* Password label */}
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>

                            {/* Password input */}
                            <div className="mt-2">
                                <input type="email"
                                       className="px-3 py-2 rounded-lg text-black
                                                  w-full border shadow-sm text-sm"
                                       placeholder="Example_123">
                                </input>
                            </div>
                        </div>

                        {/* Login btn */}
                        <div>
                            <button className="hover:bg-gray-100 hover:text-blue-950
                                               text-white bg-blue-950 font-bold py-2
                                               px-4 rounded-full transition-colors w-full
                                               justify-center shadow-lg">
                                Login
                            </button>
                        </div>
                    </form>

                    {/* Bottom text */}
                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        You don't have an account?
                        <Link to="/register"
                              className="font-semibold text-indigo-600
                                       hover:text-indigo-500 ms-2">
                                Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login