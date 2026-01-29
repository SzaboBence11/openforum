import { useState } from 'react'
import { Link } from 'react-router-dom';

function Register() {
    // Input variables
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [nameTouched, setNameTouched] = useState(false)
    const [emailTouched, setEmailTouched] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)
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
    
    const isPasswordValid = hasMinLength &&
                            hasUppercase &&
                            hasNumber &&
                            hasLowercase

    // Confirm Password validation
    const isConfirmPasswordValid = confirmPassword == password
    
    // Form validation
    const isFormValid = isEmailValid &&
                        isPasswordValid &&
                        isConfirmPasswordValid &&
                        isNameValid
    
    // Submit login
    function loginSubmit(e) {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        console.log(JSON.stringify({ display_name: name, email: email, password: password }))
    
        // alert(`Logged in with ${email}`);
    
        fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ display_name: name, password: password, email: email })
    
        })
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                alert('Successful register!')
                fetch('/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, password: password })
                
                })
                .then(res => res.json())
                .then(data => {
                    if(data.id){
                        localStorage.setItem('user', JSON.stringify({
                                id: data.id,
                                name: data.name,
                                display_name: data.display_name,
                                email: data.email,
                                role: data.role,
                        }))
                        window.location.assign("/");
                    }
                })
                .catch(err => console.error('Fetch /login failed:', err))
            }
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
                          className="">

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

                            <div className={`${nameTouched && !isNameValid ? "opacity-100": "opacity-0"}`}>
                                <small className="text-red-500">
                                    Name has to be at least 4 characters!
                                </small>
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
                                       name='email'
                                       autoComplete='true'
                                       onBlur={() => setEmailTouched(true)}
                                       onChange={(e) => setEmail(e.target.value)}>
                                </input>
                            </div>

                            <div className={`${emailTouched && !isEmailValid ? "opacity-100": "opacity-0"}`}>
                                <small className="text-red-500">
                                    Invalid email!
                                </small>
                            </div>
                        </div>

                        {/* Password */}
                        <div>

                            {/* Password label */}
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="text-sm/6 font-medium
                                                text-gray-900">
                                    Password
                                </label>

                                <i className="fa-solid fa-circle-info me-auto ms-1 tooltip relative">
                                    <span className="tooltiptext bg-white text-gray-500 font-light py-3 px-4 text-start
                                                 border border-gray-200 transition shadow-md rounded-lg ms-1">
                                        At least 8 characters.<br/>
                                        At least 1 number.<br/>
                                        At least 1 uppercase letter.<br/>
                                        At least 1 lowercase letter.
                                    </span>
                                </i>
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
                                       onBlur={() => setPasswordTouched(true)}
                                       className="w-full px-3 pr-10 rounded-lg
                                                  border shadow-sm text-sm py-2"
                                />

                                <i className={`${showPassword
                                               ? 'fa-eye-slash'
                                               : 'fa-eye'}
                                               fa-solid absolute right-3 top-1/2
                                               -translate-y-1/2 cursor-pointer
                                             text-gray-500 hover:text-gray-700`}
                                   onClick={() => setShowPassword(prev => !prev)}
                                />
                            </div>

                            <div className={`${passwordTouched && !isPasswordValid ? "opacity-100": "opacity-0"}`}>
                                <small className="text-red-500">
                                    Invalid password!
                                </small>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>

                            {/* Confirm Password label */}
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmPassword"
                                       className="block text-sm/6 font-medium
                                                text-gray-900">
                                    Confirm Password
                                </label>
                            </div>

                            {/* Confirm Password input */}
                            <div className="mt-2">
                                <input type={showPassword ? 'text' : 'password'}
                                       className="w-full px-3 py-2 pr-10 rounded-lg
                                                  border shadow-sm text-sm"
                                       placeholder="Example_123"
                                       name='confirmPassword'
                                       id="confirmPassword"
                                       autoComplete='true'
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                       onBlur={() => setConfirmPasswordTouched(true)}>
                                </input>
                            </div>

                            {/* Incorrect password confirmation */}
                            <div className={`${confirmPasswordTouched && !isConfirmPasswordValid ? "opacity-100": "opacity-0"}`}>
                                <small className="text-red-500">
                                    Passwords don't match!
                                </small>
                            </div>
                        </div>

                        {/* Register btn */}
                        <div className='mt-4'>
                            <button className={`w-full py-2 px-4 rounded-full
                                                font-bold shadow-lg transition
                                                ${isFormValid
                                                ? 'bg-blue-950 text-white hover:bg-blue-900'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                                              `}
                                type="submit"
                                disabled={!isFormValid}>
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