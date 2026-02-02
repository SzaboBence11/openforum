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
                                id: data.id
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
            <div className="flex flex-col justify-center
                            px-6 py-12 lg:px-8 mt-20 animate-fadeIn">

                {/* Top title */}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-center text-2xl/9 font-bold
                                   tracking-tight text-white">
                        Register your new account
                    </h2>
                </div>

                {/* Form container */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white/10 p-5
                                rounded-2xl shadow-lg border border-white/15">
                    <form onSubmit={loginSubmit}
                          className="">

                        {/* Name */}
                        <div>

                            {/* Name input */}
                            <label htmlFor="name"
                                className="block text-sm/6 font-medium
                                         text-white">
                                Name
                            </label>

                            {/* Name input */}
                            <div className="mt-2">
                                <input type="text" 
                                       className="px-3 py-2 rounded-lg border-white/15 text-white
                                                  w-full border shadow-sm text-sm bg-blue-950/60 backdrop-blur-xl"
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
                                                text-white">
                                    Password
                                </label>

                                <i className="fa-solid fa-circle-info me-auto ms-1 tooltip relative text-white">
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
                                       className="w-full px-3 pr-10 rounded-lg bg-blue-950/60 backdrop-blur-xl
                                                  border shadow-sm text-sm py-2 border-white/15 text-white"
                                />

                                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' 
                                                                       : 'fa-eye'}
                                               absolute right-3 top-1/2 -translate-y-1/2
                                               cursor-pointer text-gray-200
                                               hover:text-gray-300 transition-all duration-300`}
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
                                                text-white">
                                    Confirm Password
                                </label>
                            </div>

                            {/* Confirm Password input */}
                            <div className="mt-2">
                                <input type={showPassword ? 'text' : 'password'}
                                       className="w-full px-3 py-2 pr-10 rounded-lg border-white/15 text-white
                                                  border shadow-sm text-sm bg-blue-950/60 backdrop-blur-xl"
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
                        <div className='mt-4 justify-center mx-auto w-auto flex'>
                            <button className={`w-52 rounded-full font-bold group
                                                shadow-lg transition py-2 px-4 border border-white/15
                                                ${isFormValid
                                                ? 'bg-white/10 backdrop-blur-xl hover:bg-white/25 hover:bg-blue-900 text-white'
                                                : 'bg-white/5 backdrop-blur-xl cursor-not-allowed text-gray-400'}
                                              `}
                                type="submit"
                                disabled={!isFormValid}>
                                Register
                                <i className={`${isFormValid ? 'group-hover:ms-2': ''}
                                                  fa-solid fa-angles-right ms-1 transition-all`}/>
                            </button>
                        </div>
                    </form>

                    {/* Bottom text */}
                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have an account?
                        <Link to="/login"
                            className="font-semibold text-blue-400
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