import React from 'react'

function Searchbar() {
    return (

        // Form for the input
        <form className="ms-6">
            <div className="shadow-md rounded-md">

                {/* Basic search element, used in header */}
                <input type="search"
                       className="px-3 py-2 rounded-lg text-black text-sm w-full"
                       placeholder="Search for communities">
                </input>
            </div>
        </form>
    )
}

export default Searchbar