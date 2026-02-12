import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';

function Searchbar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    function onSubmit(search) {
        localStorage.setItem('searchTerm', searchTerm)
        navigate('/search');
    }

    return (

        // Form for the input
        <form className="ms-6 mt-2"
              name="searchBar"
              id="searchBar"
              onSubmit={() => onSubmit()}>
            <div className="relative">
                <input type='text'
                       required
                       id='search'
                       name='search'
                       placeholder='Search communities...'
                       autoComplete='true'
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.currentTarget.value)}
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