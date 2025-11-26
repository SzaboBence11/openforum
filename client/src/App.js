import React, { useEffect, useState } from 'react'

function App() {

  const [backendData, setBackendData] = useState({ communities: [] })

  useEffect(() => {
    fetch('/randomCommunities') 
      .then(res => res.json())
      .then(data => {
        
        setBackendData({ communities: data })
      })
      .catch(err => console.error('Fetch /randomCommunities failed:', err))
  }, [])

  return (
    <div class="flex-col mt-5">
      {backendData.communities.length > 0 ? (
        backendData.communities.map((community, i) => (
          <div key={i} class="mx-auto border-blue-300 border-2 w-32 p-1 bg-slate-600 rounded-lg mb-1">
            <h3 class="text-center text-blue-200">{community.name}</h3>
          </div>
        ))
      ) : (
        <p>Betöltés...</p>
      )}
    </div>
  )
}

export default App
