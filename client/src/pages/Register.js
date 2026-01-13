import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Register() {
    // Input variables
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [nameTouched, setNameTouched] = useState(false)
    const [emailTouched, setEmailTouched] = useState(false)
    const [passwordTouch, setPasswordTouched] = useState(false)
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    
    // Name validation
    const isNameValid = name.length >= 4

    // Email validation
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    
    // Password validation
    const hasMinLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    
    const isPasswordValid = hasMinLength && hasUppercase && hasNumber && hasLowercase

    // Confirm Password validation
    const isConfirmPasswordValid = confirmPassword == password
    
    // Form validation
    const isFormValid = isEmailValid && isPasswordValid && isConfirmPasswordValid && isNameValid
    
    // Submit login
    function loginSubmit(e) {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
    
        // alert(`Logged in with ${email}`);
    
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, email: email, password: password })
    
        })
        .then(res => res.json())
        .then(data => {
    
            console.log(data)
        })
        .catch(err => console.error('Fetch /register failed:', err))
    }

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
                    <form onSubmit={loginSubmit}
                        className="space-y-6">

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
                                       placeholder='John Doe'
                                       id='name'
                                       name='name'
                                       autoComplete='true'
                                       onChange={(e) => setName(e.target.value)}
                                       onBlur={() => setNameTouched(true)}>
                                </input>
                            </div>

                            {/* Invalid name error */}
                            {nameTouched && !isNameValid && (
                                <div className="mt-1">
                                    <small className="text-red-500">
                                        Name has to be at least 4 characters!
                                    </small>
                                </div>
                            )}
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
                                       name='email'
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
                                       name='password'
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
                                       name='confirmPassword'
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