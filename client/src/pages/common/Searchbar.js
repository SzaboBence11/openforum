import React from 'react'

function Searchbar() {
    return (

        // Form for the input
        <form className="ms-6 mt-2"
              name="searchBar"
              id="searchBar">
            <div className="relative">
                <input type='text'
                       id='password'
                       name='password'
                       placeholder='Search communities...'
                       autoComplete='true'
                       className="w-full px-3 pr-10 rounded-lg bg-blue-950/60 backdrop-blur-xl
                                  border shadow-sm text-sm py-2 border-white/15 text-white"
                />
                <i className={`fa-solid fa-magnifying-glass
                               absolute right-3 top-1/2 -translate-y-1/2
                               cursor-pointer text-gray-200
                               hover:text-gray-300 transition-all duration-300`}
                />
            </div>
        </form>
    )
}

export default Searchbar