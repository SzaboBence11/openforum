import React from 'react'

function Searchbar() {
    return (
        <form className="ms-6">
            <div className="shadow-md rounded-md">
                <input type="search"
                       className="px-3 py-1.5 rounded-lg text-black text-sm w-full"
                       placeholder="Search for communities">
                </input>
            </div>
        </form>
    )
}

export default Searchbar