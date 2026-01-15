import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Form } from 'react-router-dom';

function Login() {
    // Input variables
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailTouched, setEmailTouched] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // Email validation
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    // Password validation
    const hasMinLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)

    const isPasswordValid = hasMinLength &&
                            hasUppercase &&
                            hasNumber &&
                            hasLowercase

    // Form validation
    const isFormValid = isEmailValid &&
                        isPasswordValid

    // Submit login
    function loginSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        // alert(`Logged in with ${email}`);

        fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password })

        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('user', JSON.stringify({
                        id: data.id,
                        name: data.name,
                        display_name: data.display_name,
                        email: data.email,
                        role: data.role,
                }))
                window.location.assign("/");
            })
            .catch(err => console.error('Fetch /login failed:', err))
    }

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

                {/* Form container */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={loginSubmit}
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
                                       placeholder="john123@example.com"
                                       id="email"
                                       autoComplete='true'
                                       name="email"
                                       onChange={(e) => setEmail(e.target.value)}
                                       onBlur={() => setEmailTouched(true)}>
                                </input>
                            </div>

                            {/* Invalid email error */}
                            {emailTouched && !isEmailValid && (
                                <div className="mt-1">
                                    <small className="text-red-500">
                                        Invalid email!
                                    </small>
                                </div>
                            )}
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
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'}
                                       value={password}
                                       id='password'
                                       name='password'
                                       placeholder='Example123'
                                       autoComplete='true'
                                       onChange={(e) => setPassword(e.target.value)}
                                       className="w-full px-3 pr-10 rounded-lg
                                                  border shadow-sm text-sm py-2"
                                />

                                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}
                                               absolute right-3 top-1/2 -translate-y-1/2
                                               cursor-pointer text-gray-500 hover:text-gray-700`}
                                   onClick={() => setShowPassword(prev => !prev)}
                                />
                            </div>

                        </div>

                        {/* Login btn */}
                        <div>
                            <button className={`w-full rounded-full font-bold
                                                shadow-lg transition py-2 px-4
                                                ${isFormValid
                                                ? 'bg-blue-950 text-white hover:bg-blue-900'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                                              `}
                                    type="submit"
                                    disabled={!isFormValid}>
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