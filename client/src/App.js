import React, { useEffect, useState } from 'react'

function App() {
  const [backendData, setBackendData] = useState({ users: [] })

  useEffect(() => {
    fetch('/users') 
      .then(res => res.json())
      .then(data => {
        
        setBackendData({ users: data })
      })
      .catch(err => console.error('Fetch /users failed:', err))
  }, [])

  return (
    <div>
      {backendData.users.length > 0 ? (
        backendData.users.map((user, i) => (
          <div key={i}>
            <h3>{user.name}</h3>
          </div>
        ))
      ) : (
        <p>Betöltés...</p>
      )}
    </div>
  )
}

export default App
