import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Register() {

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center
                            px-6 py-12 lg:px-8">

                {/* Top title */}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-center text-2xl/9 font-bold
                                   tracking-tight text-gray-900">
                        Register your new account
                    </h2>
                </div>

                {/* Form container */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#"
                          method="POST"
                          className="space-y-6"
                          name="loginForm">

                        {/* Name */}
                        <div>

                            {/* Name input */}
                            <label htmlFor="name"
                                className="block text-sm/6 font-medium
                                           text-gray-900">
                                Név
                            </label>

                            {/* Name input */}
                            <div className="mt-2">
                                <input type="text"
                                       className="px-3 py-2 rounded-lg text-black
                                               w-full border shadow-sm text-sm"
                                       placeholder="John Doe"
                                       id="name"
                                       autoComplete='true'>
                                </input>
                            </div>
                        </div>

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
                                       placeholder="john123@example.com"
                                       id="email"
                                       autoComplete='true'>
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
                                       placeholder="Example_123"
                                       id="password">
                                </input>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>

                            {/* Confirm Password label */}
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmPassword"
                                    className="block text-sm/6 font-medium text-gray-900">
                                    Confirm Password
                                </label>
                            </div>

                            {/* Confirm Password input */}
                            <div className="mt-2">
                                <input type="password"
                                       className="px-3 py-2 rounded-lg text-black
                                               w-full border shadow-sm text-sm"
                                       placeholder="Example_123"
                                       id="confirmPassword">
                                </input>
                            </div>
                        </div>

                        {/* Register btn */}
                        <div>
                            <button className="hover:bg-gray-100 hover:text-blue-950
                                               text-white bg-blue-950 font-bold py-2
                                               px-4 rounded-full transition-colors w-full
                                               justify-center shadow-lg">
                                Register
                            </button>
                        </div>
                    </form>

                    {/* Bottom text */}
                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have an account?
                        <Link to="/login"
                            className="font-semibold text-indigo-600
                                       hover:text-indigo-500 ms-2">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register