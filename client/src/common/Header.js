import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Searchbar from './Searchbar';

function Header() {
  return (
    <header className="bg-blue-950 text-white py-4 px-6 flex top-0 sticky">
      <Link to="/" className='text-xl font-bold pt-0.5'>Openforum</Link>
      <Searchbar />
    </header>
  )
}

export default Header