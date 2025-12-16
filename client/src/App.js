import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Header from './common/Header';

function App() {

  // const [backendData, setBackendData] = useState({ communities: [] })

  // useEffect(() => {
  //   fetch('/randomCommunities')
  //     .then(res => res.json())
  //     .then(data => {

  //       setBackendData({ communities: data })
  //     })
  //     .catch(err => console.error('Fetch /randomCommunities failed:', err))
  // }, [])

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    // <div>
    //   <Header />

    //   <div className="mt-5">
    //     {backendData.communities.length > 0 ? (
    //       backendData.communities.map((community, i) => (
    //         <div key={i} className="border-2 w-32 p-1 ms-2
    //                           bg-blue-600 border-blue-600
    //                             rounded-lg mb-1 shadow-lg">
    //           <h3 className="text-center text-white">{community.name}</h3>
    //         </div>
    //       ))
    //     ) : (
    //       <p>Betöltés...</p>
    //     )}
    //   </div>
    // </div>
  )
}

export default App