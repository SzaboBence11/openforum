import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Searchbar() {
    return (
        <form class="max-w-2xl ms-6">
            <div class="flex shadow-xs rounded-base -space-x-0.5">
                <input type="search"
                       id="input-group-1"
                       class="px-3 py-1.5 rounded-lg bg-neutral-secondary-medium
                              border border-default-medium text-black text-sm
                              focus:ring-brand focus:border-brand block w-full
                              placeholder:text-body"
                       placeholder="Search for communities">
                </input>
            </div>
        </form>
    )
}

export default Searchbar