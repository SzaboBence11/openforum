import React, { act, useEffect, useState } from 'react'
import Modal from "./common/Modal.js";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function FrontPage({ isSidebarOpen }) {

    const [formData, setFormData] = useState({
        title: '',
        text: '',
        img: ''
    });

    const isFormValid = formData.title !== '' &&
                        formData.text !== '' &&
                        formData.img !== ''

    const [posts, setPosts] = useState({ posts: [] })
    const [communityData, setCommunityData] = useState({ community: [] })
    const [comments, setComments] = useState({})
    const [joinedCommunities, setJoinedCommunities] = useState()
    const [modalState, setModalState] = useState("result");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userRole, setUserRole] = useState("");


    const [votes, setVotes] = useState({})
    const [userVotes, setUserVotes] = useState({})

    const postPictureInput = {
        backgroundImage: `url(${formData.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        outline: 'none',
        textIndent: '-999em',
    };


    function handleChange(e) {

    }

    function addPost(){

    }

    useEffect(() => {
        if(localStorage.getItem("user")){
            fetch(`/api/user/getUserRole/${JSON.parse(localStorage.getItem("user")).id}`)
            .then(res => res.json())
            .then(res => {
                setUserRole(res[0].role);
            })
            .catch(err => console.error('Fetch /getUserRole failed:', err))
        }
    }, [userRole])

    // On page load
    useEffect(() => {

        // If no selected community
        if (localStorage.getItem("selectedCommunity") == 0 ||
           !localStorage.getItem('selectedCommunity')) {

            // Fetch 10 random posts 
            fetch('/api/community/randomPosts/10')
            .then(res => res.json())
            .then(data => {

                // Set posts data
                setPosts({ posts: data })
            })
            .catch(err => console.error('Fetch /randomPosts failed:', err));
        }

        // If there's a selected community
        else {

            // Fetch the selected community posts
            fetch(`/api/community/getCommunityPosts/${localStorage
                                                .getItem('selectedCommunity')}`)
            .then(res => res.json())
            .then(data => {

                // Set posts data
                setPosts({ posts: data })
            })
            .catch(err => console.error('Fetch /getCommunityPosts failed:', err))

            // Fetch the selected community's data
            fetch(`/api/community/getCommunityData/${localStorage
                                                .getItem('selectedCommunity')}`)
            .then(res => res.json())
            .then(data => {

                // Set community data
                console.log(data)
                setCommunityData({ community : data[0] })
            })
            .catch(err => console.error('Fetch /getCommunityData failed:', err))
        }

        // Get the user's joined communities if logged in
        if (localStorage.getItem('user')) {
            getUserCommunities()
        }
    }, [])

    useEffect(() => {
        
        // Go through each post
        posts.posts.forEach(post => {
            fetch(`/api/community/getComments/${post.post_id}`)
            .then(res => res.json())
            .then(data => {
                setComments(prev => ({
                    ...prev,
                    [post.post_id]: data
                }));
            })
            .catch(err => console.error(err));
        });

        // Get all post vote counts
        getAllPostVotes();

        // If user logged in
        if (localStorage.getItem('user')) {

            // Get user's votes
            getUserVotes(JSON.parse(localStorage.getItem('user')).id)
        }
    }, [posts.posts]);

    function getAllPostVotes() {
        posts.posts.forEach(post => {
            fetch(`/api/community/getVoteCount/${post.post_id}`)
            .then(res => res.json())
            .then(data => {
                setVotes(prev => ({
                    ...prev,
                    [post.post_id]: data[0].vote_count
                }));
            })
            .catch(err => console.log(err));
        });
    }

    function getUserVotes(user_id) {
        fetch(`/api/user/getUserVotes/${user_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(e => {
                setUserVotes(prev => ({
                    ...prev,
                    [e.post_id]: e.type
                }))
            })
        })
        .catch(err => console.log(err))
    }

    // Go to clicked community
    function goToCommunity(id) {
        localStorage.setItem('selectedCommunity', id)
        window.location.reload(true)
    }

    // Convert datetime to readable string
    function timeAgo(dateString) {
        const now = new Date()
        const date = new Date(dateString)
        const seconds = Math.floor((now - date) / 1000)

        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 },
        ]

        for (const interval of intervals) {
            const count = Math.floor(seconds / interval.seconds)
            if (count >= 1) {
                return new Intl.RelativeTimeFormat('en', {
                    numeric: 'auto',
                }).format(-count, interval.label)
            }
        }

        return 'just now'
    }

    function getComments(post_id) {
        fetch(`/api/community/getComments/${post_id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(post_id)
            // console.log(data)
            setComments(prev => ({
              ...prev,
              [post_id]: data
            }));
        })
        .catch(err => console.log(err))
    }

    function communityAction(cMehtod, community_id) {
        let user_id = JSON.parse(localStorage.getItem('user')).id;

        fetch('api/user/communityAction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    community_id: communityData.community.id,
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

    function vote(post_id, action, state) {

        if (!localStorage.getItem('user')) return;

        fetch(`/api/user/vote`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: JSON.parse(localStorage.getItem('user')).id,
                post_id: post_id,
                action: action,
                state: state
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                alert(res.error)
            }
        })
        .catch(err => console.log(err))

        setUserVotes({})
        getUserVotes(JSON.parse(localStorage.getItem('user')).id);

        setVotes({})
        getAllPostVotes();
    }
    
    function addPost(community){
        setModalState("addPost");
        setIsModalOpen(true);
        setTimeout(() => {
            const textarea = document.querySelector("#postText");
            const bar = document.querySelector("#bar");
            const count = document.querySelector("#count");
            const max = textarea.maxLength;
            textarea.addEventListener("input", () => {
                const value = textarea.value.length;
                const percent = (value / max) * 100;
                count.textContent = `${value} / ${max}`;
                bar.style.width = percent + "%";
                bar.classList.toggle("danger", value == max);
            })
        }, "100")
    }
    

    return (

        // The whole frontpage area
        <div className={`p-4`}>
            <div className="p-4 border-1 rounded-base">

                {/* Community details */}
                {localStorage.getItem('selectedCommunity') !== "0" &&
                 localStorage.getItem('selectedCommunity') && (
                    <div className='text-white text-center'>
                        {communityData.community && communityData.community.name ? (
                            <div className='mb-8 justify-center animate-fadeIn'>
                                <h1 className='text-4xl flex items-center justify-center'>
                                    <img src={communityData.community.img} className='w-20 h-20 me-4 rounded-full object-cover' />
                                    {communityData.community.name.charAt(0).toUpperCase() + 
                                     communityData.community.name.slice(1)}
                                </h1>

                                <div className='flex justify-center gap-5'>
                                    <h1 className='mt-4 font-xl justify-center'>
                                        <i className="fa-solid fa-user me-1" />
                                        {communityData.community.member_count} Members
                                    </h1>
                                    
                                    {joinedCommunities != undefined ? (
                                        <>
                                            {/* Leave community button, if user is joined */}
                                            {joinedCommunities.includes(communityData.community.id) &&
                                            localStorage.getItem("user") &&
                                            (
                                                <div className='flex gap-3'>
                                                    <button className="mt-1.5 px-6 py-2 rounded-full
                                                        bg-white/15 text-white font-semibold
                                                        hover:bg-white/25 border border-white/20
                                                        hover:scale-105
                                                        active:scale-95
                                                        transition-all duration-300"
                                                            onClick={() => communityAction('leave', communityData.community.id)}>Leave</button>
                                                    <button className="mt-1.5 px-6 py-2 rounded-full
                                                        bg-gradient-to-r
                                                        from-blue-500 to-indigo-500
                                                        text-white font-bold
                                                        shadow-lg
                                                        hover:shadow-xl
                                                        hover:scale-105
                                                        active:scale-95
                                                        transition-all duration-300"
                                                        onClick={() => addPost(communityData.community.id)}>
                                                                Add Post
                                                        </button>
                                                </div>
                                            )
                                            }

                                            {/* Join community button, if user is not joined */}
                                            {!joinedCommunities.includes(communityData.community.id) &&
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
                                                        onClick={() => communityAction('join', communityData.community.id)}>Join</button>
                                            )

                                            }
                                        </>
                                    ) : (
                                        <div>Loading...</div>
                                    )}
                                </div>

                                <h1 className='mt-4 font-xl text-gray-300'>
                                    {communityData.community.description}
                                </h1>

                                <hr className='w-3/6 mt-4 mx-auto border-t-1 border-gray-400 rounded-full' />
                            </div>
                        ) : (
                            <span>Loading...</span>
                        )}
                    </div>
                )}

                {/* Each post */}
                {posts.posts.length > 0 ? (
                 posts.posts.map((post, i) => (

                    // Post card
                    <div key={post.post_id} wawa={post.post_id}>
                        <div className="flex flex-col border shadow-md mx-auto
                                        mb-12 rounded-3xl p-3 border-white/15 animate-fadeIn
                                        min-h-52 bg-white/10 backdrop-blur-xl w-4/6">
                            
                            {/* Post text content */}
                            <div className='flex flex-1'>
                                <button className='max-w-fit hover:bg-white/20 px-2 py-2 rounded-full
                                                transition-all duration-300'
                                        onClick={() => goToCommunity(post.community_id)}>
                                    <p className='text-white text-xl text-left flex'>
                                        <img src={post.community_img} className='rounded-full w-8 h-8 me-2 object-cover' />
                                        {post.community.charAt(0).toUpperCase() +
                                        post.community.slice(1)}
                                    </p>
                                </button>
                                <p className='text-white ms-auto'>
                                    {timeAgo(post.post_date)}
                                </p>
                                {userRole != "" &&
                                    <>
                                        {(userRole == "A" || userRole == "M") &&
                                            <i className="fa-solid fa-ellipsis fa-2xl mt-3.5"
                                               style={{color: "rgba(255, 255, 255, 1.00)", minWidth:"50px"}}></i>
                                        }
                                    </>
                                }                           
                            </div>

                            {/* Post title */}
                            <p className='text-white text-3xl text-center'>
                                {post.post_title}
                            </p>

                            {/* Poster user img */}
                            <p className='text-white flex mx-auto mt-1.5'>
                                <img src={post.poster_img} className='rounded-full w-6 h-6 me-2 object-cover' />
                                {post.poster_user}
                            </p>

                            {/* Post text */}
                            <p className='text-white mt-3 overflow-hidden w-5/6 ms-3 mb-4'>
                                {post.post_text}
                            </p>

                            {/* Each comment */}
                            {comments[`${post.post_id}`] ? (
                             comments[`${post.post_id}`].map((comment, j) => (

                                // Comment card
                                <div className='flex flex-col border shadow-md ms-4 mb-4
                                                rounded-3xl p-3 border-white/10 animate-fadeIn
                                                min-h-20 bg-white/5 backdrop-blur-xl w-4/6'
                                    key={j}>

                                    {/* User img and name */}
                                    <p className='text-white flex mt-1.5'>
                                        <img src={comment.commenter_img} className='rounded-full w-6 h-6 me-2 object-cover' />
                                        {comment.commenter_user}
                                    </p>

                                    {/* Comment text */}
                                    <p className="text-gray-300 text-sm mt-2">
                                    {comment.text}
                                    </p>

                                    {/* Comment date */}
                                    <p className='text-white ms-auto mt-auto'>
                                        {timeAgo(comment.date)}
                                    </p>
                                </div>
                            ))
                            ) : (
                                <p className="text-gray-500 text-sm">Loading comments...</p>
                            )}

                            <div className='text-white ms-auto me-1 bg-white/20 px-2 py-1 rounded-full
                                            border border-white/15'>
                                <div className='flex'>
                                    <div className={`flex flex-1 align-middle justify-center p-2 hover:bg-white/25
                                                    rounded-full hover:cursor-pointer`}>
                                        {
                                            Object.keys(userVotes).includes(`${post.post_id}`) ?
                                            (
                                                <>
                                                    {userVotes[`${post.post_id}`] == 'U' ? (
                                                        <i className="fa-solid fa-arrow-up text-white mt-0.5"
                                                           onClick={() => vote(post.post_id, 'U', 'U')} />
                                                    ) : (
                                                        <i className="fa-solid fa-arrow-up text-gray-400 mt-0.5"
                                                           onClick={() => vote(post.post_id, 'U', 'D')} />
                                                    )}
                                                </>
                                            ) : (
                                                <i className="fa-solid fa-arrow-up text-gray-400 mt-0.5"
                                                   onClick={() => vote(post.post_id, 'U', 'N')} />
                                            )
                                        }
                                    </div>

                                    <p className='mx-1 mt-1.5'>
                                        {
                                            votes[`${post.post_id}`] ?? 0
                                        }
                                    </p>

                                    <div className={`flex flex-1 align-middle justify-center p-2 hover:bg-white/25
                                                    rounded-full hover:cursor-pointer`}>
                                        {
                                            Object.keys(userVotes).includes(`${post.post_id}`) ?
                                            (
                                                <>
                                                    {userVotes[`${post.post_id}`] == 'D' ? (
                                                        <i className="fa-solid fa-arrow-down text-white mt-0.5"
                                                           onClick={() => vote(post.post_id, 'D', 'D')} />
                                                    ) : (
                                                        <i className="fa-solid fa-arrow-down text-gray-400 mt-0.5"
                                                           onClick={() => vote(post.post_id, 'D', 'U')} />
                                                    )}
                                                </>
                                            ) : (
                                                <i className="fa-solid fa-arrow-down text-gray-400 mt-0.5"
                                                   onClick={() => vote(post.post_id, 'D', 'N')} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
            </div>

            {modalState == "addPost" &&
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title= {"Poszt létrehozása a(z) " + communityData.community.name + " közösségbe"}
                >
                    {/* Form */}
                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label className="text-sm text-blue-200">
                                Post Title
                            </label>
                            <input
                                placeholder='Footballers'
                                name='name'
                                value={formData['name']}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 rounded-xl
                                           bg-blue-950/60 text-white
                                           border border-white/15
                                           focus:ring-2 focus:ring-blue-400/40
                                           transition-all duration-300
                                           disabled:opacity-60"
                            />
                        </div>

                        {/* Bio */}
                        <div className="md:col-span-2">
                            <label className="text-sm text-blue-200">
                                Post Content
                            </label>
                            <textarea
                                placeholder='Description of the community'
                                name="text"
                                id='postText'
                                rows="4"
                                maxLength='300'
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 rounded-xl
                                           bg-blue-950/60 text-white
                                           border border-white/15
                                           focus:ring-2 focus:ring-blue-400/40
                                           transition-all duration-300
                                           disabled:opacity-60 resize-none
                                           overflow-y-auto"
                            />
                            <progress id='bar'
                                      ></progress>
                            <p id="count">0 / 300</p>
                        </div>
                        <div className="w-36 h-36 rounded-full
                                        bg-gradient-to-tr
                                        from-blue-400 to-indigo-400
                                        p-[3px]
                                        group-hover:scale-105
                                        transition-transform duration-500">
                            <input
                                type='file'
                                accept='image/*'
                                style={postPictureInput}
                                src={formData.img || null}
                                size={64 * 1024}
                                onChange={handleChange}
                                className="w-full h-full rounded-full
                                           object-cover bg-blue-950"
                        />
                        </div>
                    </div>

                    <div className='mt-4 justify-center mx-auto w-auto flex'>
                        <button className={`w-52 rounded-full font-bold group
                                            shadow-lg transition py-2 px-4 border border-white/15
                                            ${isFormValid
                                            ? 'bg-white/10 backdrop-blur-xl hover:bg-white/25 hover:bg-blue-900 text-white'
                                            : 'bg-white/5 backdrop-blur-xl cursor-not-allowed text-gray-400'}
                                            `}
                            type="submit"
                            onClick={addPost}
                            disabled={!isFormValid}>
                            Create
                            <i className={`${isFormValid ? 'group-hover:ms-2': ''}
                                                fa-solid fa-angles-right ms-1 transition-all`}/>
                        </button>
                    </div>
                </Modal>
            }

        </div>
    )
}

export default FrontPage