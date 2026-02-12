import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Search() {
    const [foundCommunities, setFoundCommunities] = useState({ foundCommunities: [] })
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()
    
    const [joinedCommunities, setJoinedCommunities] = useState()

    useEffect(() => {

        // If search term saved
        if (localStorage.getItem('searchTerm').length > 0) {
            setSearchTerm(localStorage.getItem('searchTerm'))
        }

        // Get the user's joined communities if logged in
        if (localStorage.getItem('user')) {
            getUserCommunities()
        }
    }, [])

    useEffect(() => {
        // Fetch communities based on search term
        fetch(`/api/community/searchCommunity/${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setFoundCommunities({ foundCommunities: data })
        })
        .catch(err => console.log(err))
    }, [searchTerm])

    function getUserCommunities() {
        fetch(`/api/user/getUserCommunities/${JSON.parse(localStorage.getItem('user')).id}`)
        .then(res => res.json())
        .then(res => {
            let idArray = [];
            for(let i = 0; i < res.length; i++){
                idArray.push(res[i].community_id);
            }
            setJoinedCommunities(idArray);
        })
    }

    function onSubmit(search) {
        localStorage.setItem('searchTerm', searchTerm)
        navigate('/search');
    }

    function communityAction(cMehtod, community_id) {
        let user_id = JSON.parse(localStorage.getItem('user')).id;

        fetch('api/user/communityAction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    community_id: community_id,
                    user_id: user_id,
                    method: cMehtod
            })
        })
        .then(res => res.json())
        .then(res => {

            getUserCommunities();

            if (!res.error) {
                alert("Sikeres");
                
                return;
            }
            alert("Sikertelen")
        })
        .catch(err => alert(err))

    }

    return (
        <div className="mt-20 flex items-center justify-center animate-fadeIn
                        px-4 transition-colors duration-700 flex-col">
            
            {/* Top title */}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-5 text-center text-2xl/9 font-bold
                               tracking-tight text-white">
                    Look for communities
                </h2>
            </div>

            <form className="mt-6 w-96"
                name="searchBar"
                id="searchBar"
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }}>
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

            {foundCommunities.foundCommunities ? (
                <>
                    {
                        foundCommunities.foundCommunities.map((community, i) => (
                            <div key={i}
                                 className="relative max-w-4xl animate-fadeIn w-full rounded-3xl
                                            bg-white/10 backdrop-blur-xl p-4
                                            border border-white/15 mt-8
                                            shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                                            hover:shadow-[0_40px_100px_rgba(0,0,0,0.55)]
                                            transition-all duration-500">
                                <div className='text-white text-center'>
                                    {community && community.name ? (
                                        <div className='mb-8 justify-center animate-fadeIn'>
                                            <h1 className='text-4xl flex items-center justify-center'>
                                                <img src={community.img} className='w-20 h-20 me-4 rounded-full object-cover' />
                                                {community.name.charAt(0).toUpperCase() + 
                                                community.name.slice(1)}
                                            </h1>

                                            <div className='flex justify-center gap-5'>
                                                <h1 className='mt-4 font-xl justify-center'>
                                                    <i className="fa-solid fa-user me-1" />
                                                    {community.member_count} Members
                                                </h1>
                                                
                                                {joinedCommunities != undefined ? (
                                                    <>
                                                        {/* Leave community button, if user is joined */}
                                                        {joinedCommunities.includes(community.id) &&
                                                        localStorage.getItem("user") &&
                                                        (
                                                            <button className="mt-1.5 px-6 py-2 rounded-full
                                                                bg-white/15 text-white font-semibold
                                                                hover:bg-white/25 border border-white/20
                                                                hover:scale-105
                                                                active:scale-95
                                                                transition-all duration-300"
                                                                    onClick={() => communityAction('leave', community.id)}>Leave</button>
                                                        )
                                                        }

                                                        {/* Join community button, if user is not joined */}
                                                        {!joinedCommunities.includes(community.id) &&
                                                        localStorage.getItem("user") &&

                                                        (
                                                            <button className="mt-1.5 px-6 py-2 rounded-full
                                                                    bg-gradient-to-r
                                                                    from-blue-500 to-indigo-500
                                                                    text-white font-bold
                                                                    shadow-lg
                                                                    hover:shadow-xl
                                                                    hover:scale-105
                                                                    active:scale-95
                                                                    transition-all duration-300"
                                                                    onClick={() => communityAction('join', community.id)}>Join</button>
                                                        )

                                                        }
                                                    </>
                                                ) : (
                                                    <div>Loading...</div>
                                                )}
                                            </div>

                                            <h1 className='mt-4 font-xl text-gray-300'>
                                                {community.description}
                                            </h1>
                                        </div>
                                    ) : (
                                        <span>Loading...</span>
                                    )}
                                </div>
                            </div>
                        ))
                    }
                </>
            ) : (
                <div>
                    Loading...
                </div>
            )}
        </div>
    )
}

export default Search
