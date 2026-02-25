import React, { act, useEffect, useState } from 'react'
import Notification from "./common/Notification.js";
import Modal from "./common/Modal.js";
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function FrontPage({ isSidebarOpen , refreshSidebar}) {

    // Navigation
    // Use as navigate('/path')
    const navigate = useNavigate();

    // Create post form details
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        img: ''
    });
    const [addPostImage, setAddPostImage] = useState()

    // Form validation
    const isFormValid = formData.title !== '' &&
                        formData.text !== ''

    // Store posts
    const [posts, setPosts] = useState({ posts: [] })

    // Store current community details
    const [communityData, setCommunityData] = useState({ community: [] })

    // Store comments per post
    const [comments, setComments] = useState({})

    // Store joined communities of current user
    const [joinedCommunities, setJoinedCommunities] = useState()

    // Current modal state
    const [modalState, setModalState] = useState("result");

    // Check modal open
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Current Post for Modal
    const [currentPost, setCurrentPost] = useState();

    // Current user role
    const [userRole, setUserRole] = useState("");

    // Confirmation
    const [askSure, setAskSure] = useState(false);

    // Current action that the admin is doing
    // user, post, community
    const [currentAdminAction, setCurrentAdminAction] = useState("");

    // Set Admin details, who did what
    const [adminDetails, setAdminDetails] = useState({community: null,
                                                      user: null,
                                                      post: null});

    // Get current votes for all posts
    const [votes, setVotes] = useState({})

    // Get user's votes
    const [userVotes, setUserVotes] = useState({})

    // Notif variables
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationType, setNotificationType] = useState(false);
    const [notificationText, setNotificationText] = useState('');

    // Leave confirmation
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmMode, setConfirmMode] = useState(false);

    // Post picture input styling
    const postPictureInput = {
        backgroundImage: `url(${formData.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        outline: 'none',
        textIndent: '-999em',
    };

    // Open Post Modal & Set Post
    function postModalOpen(){
        setIsModalOpen(true);
        setModalState("postModal");
    }

    // Admin confirmation for change
    function sure() {
        adminAction(currentAdminAction);
        setAskSure(false);
        setIsModalOpen(false);
    }

    // Admin not sure for change
    function unSure() {
        setAskSure(false);
        setCurrentAdminAction("");
    }

    // Set sure and admin action
    function setIsSure(action) {
        setCurrentAdminAction(action);
        setAskSure(true);
    }

    useEffect(() => {
        console.log(comments);
    }, comments)

    // Add post form data change detection
    function handleChange(e) {
        if(e.target.type != 'file'){
            setFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value }
            ));
            return;
        }

        let file = e.target.files[0];
        setAddPostImage(file);

        let reader = new FileReader();

        if(file.size > 64 * 1024){
            alert("Túl nagy fájl!");
            return;
        }
        
        reader.onload = function() {
            let profileBase64 = reader.result;
            setFormData(prev => ({
                ...prev,
                img: profileBase64
            }));
        }

        let readerUrl = reader.readAsDataURL(file);

        console.log(formData);
    }

    // Open modal and get admin details
    function openAdminCommunity(community_id) {
        setAdminDetails({community: community_id,
                         post: adminDetails.post,
                         user: adminDetails.user
        });
        setIsModalOpen(true);
        setModalState("communityAdmin");
    }

    // Open modal and get admin details
    function openAdminPost(user_id, post_id) {
        setAdminDetails({community: adminDetails.community,
                         user: user_id,
                         post: post_id
                        });
        setIsModalOpen(true);
        setModalState("postAdmin");
    }

    // Do admin action
    function adminAction(action) {

        // Save admin details as data
        let data = adminDetails;

        // If community selected as action
        if (data.community != null && action == "community") {

            // Fetch adminAction
            fetch('/api/user/adminAction', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    community_id: data.community,
                    action: action
                })
            })
            .then(res => res.json())
            .then(res => {

                // Reset everything
                localStorage.setItem("selectedCommunity", 0);
                localStorage.removeItem("randomCommunities");
                window.location.reload();

                // Return
                return;
            })
            .catch(err => console.error('Fetch /adminAction failed:', err))
        }

        // If admin action user and user in data
        else if (action == "user" && data.user != null) {

            // Fetch admin action
            fetch('/api/user/adminAction', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: data.user,
                    action: action
                })
            })
            .then(res => res.json())
            .then(res => {

                // Get posts
                getPosts();

                // Return
                return;
            })
            .catch(err => console.error('Fetch /adminAction failed:', err))
        }

        // If action is post and post and user in data
        else if(action == "post" &&
                data.post != null &&
                data.user != null) {

            // Fetch admin action
            fetch('/api/user/adminAction', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: data.user,
                    post_id: data.post,
                    action: action
                })
            })
            .then(res => res.json())
            .then(res => {

                // Get posts again
                getPosts()

                // Return
                return;
            })
            .catch(err => console.error('Fetch /adminAction failed:', err))
        }
    }

    // On user role change
    useEffect(() => {

        // If there's a user
        if (localStorage.getItem("user")) {

            // Get user role from id
            fetch(`/api/user/getUserRole/${JSON.parse(localStorage.getItem("user")).id}`)
            .then(res => res.json())
            .then(res => {

                // Set user's role
                setUserRole(res[0].role);
            })
            .catch(err => console.error('Fetch /getUserRole failed:', err))
        }
    }, [userRole])

    // Get posts
    function getPosts() {

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
                setCommunityData({ community : data[0] })
            })
            .catch(err => console.error('Fetch /getCommunityData failed:', err))
        }

        // Get the user's joined communities if logged in
        if (localStorage.getItem('user')) {
            getUserCommunities()
        }
    }

    // On page load
    useEffect(() => {

        // Get posts
        getPosts()
    }, [])

    // Get all comments for all posts
    function getAllPostComments(){
                
        // Go through each post
        posts.posts.forEach(post => {
            fetch(`/api/community/getComments/${post.post_id}`)
            .then(res => res.json())
            .then(data => {

                // Set comments
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
    }
    
    // On posts change
    useEffect(() => {
        getAllPostComments();
    }, [posts.posts]);

    // Get all votes for a post
    function getAllPostVotes() {

        // For each post
        posts.posts.forEach(post => {

            // Get the post vote count
            fetch(`/api/community/getVoteCount/${post.post_id}`)
            .then(res => res.json())
            .then(data => {

                // Set the votes for each post
                setVotes(prev => ({
                    ...prev,
                    [post.post_id]: data[0].vote_count
                }));
            })
            .catch(err => console.log(err));
        });
    }

    // Get the user's votes
    function getUserVotes(user_id) {

        // Get the user's votes
        fetch(`/api/user/getUserVotes/${user_id}`)
        .then(res => res.json())
        .then(data => {

            setUserVotes({})

            // For each vote the user has
            data.forEach(e => {

                // Set user's votes
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

    // Leave or join community
    function communityAction(cMehtod, community_id) {

        // Get cur user id
        let user_id = JSON.parse(localStorage.getItem('user')).id;

        // Fetch community action path
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

            // Get user's communities
            getUserCommunities();

            refreshSidebar()

            // If error
            if (!res.error) {

                // On successful join/leave
                setNotificationType(true)
                if (cMehtod == 'leave') {
                    setNotificationText('Successfuly left community!')
                }
                else {
                    setNotificationText('Successfully joined community')
                }
                addNotification();
                getPosts();
                return;
            }

            // Else error
            setNotificationType(false)
            if (cMehtod == 'leave') {
                setNotificationText('Something went wrong!')
            }
            addNotification();
        })
        .catch(err => alert(err))

    }

    // Get user's communities
    function getUserCommunities() {

        // Get user's communities
        fetch(`/api/user/getUserCommunities/${JSON.parse(localStorage.getItem('user')).id}`)
        .then(res => res.json())
        .then(res => {

            // Array of ids
            let idArray = [];

            // Go through all of user's communities
            for (let i = 0; i < res.length; i++) {

                // Get each id
                idArray.push(res[i].community_id);
            }

            // Set joined communities with the ids
            setJoinedCommunities(idArray);
        })
    }

    // Vote function
    function vote(post_id, action, state) {

        // If user not logged in, return
        if (!localStorage.getItem('user')) return;

        // Call vote with the data
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

            // If error alert data
            if (res.error) {
                alert(res.error)
            }
        })
        .catch(err => console.log(err))

        // Get all user votes again
        getUserVotes(JSON.parse(localStorage.getItem('user')).id);

        // Get all votes again
        getAllPostVotes();
    }
    
    // Set add post's state
    function setAddPost() {

        // Open modal
        setIsModalOpen(true);
        setModalState("addPost");

        // Timeout 100ms
        setTimeout(() => {

            // Get data required
            const textarea = document.querySelector("#postText");
            const bar = document.querySelector("#bar");
            const count = document.querySelector("#count");
            const max = textarea.maxLength;

            // On textarea change
            textarea.addEventListener("input", () => {

                // Progress bar stuff
                const value = textarea.value.length;
                const ratio = (value / max);
                count.textContent = `${value} / ${max}`;
                bar.style.width = ratio * 448 + "px";
            })
        }, 100)
    }

    // Add post
    function addPost(community) {

        // Add post api fetch
        fetch('/api/community/addPost', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: formData.title,
                text: formData.text,
                img: formData.img,
                community_id: community,
                user_id: JSON.parse(localStorage.getItem('user')).id
            })
        })
        .then(res => res.json())
        .then(data => {
            const postPictureData = new FormData();
            
            postPictureData.append("image", addPostImage);

            console.log(data);

            setIsModalOpen(false);
            fetch(`/api/community/addPostPicture/${data.insertId}`, {
                method: 'post',
                body: postPictureData
            })
            .then(res2 => res2.json())
            .then(res2 => {
                console.log(res2);
                setFormData({title: '',
                             text: '',
                             img: ''});
            })
        })
        .catch(err => console.log(err))
    }

    function addNotification() {
        setTimeout(() => {
            setIsNotificationOpen(true);
        }, 300);
        setTimeout(() => {
            setIsNotificationOpen(false);
        }, 3000);
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
                                    <img src={communityData.community.img}
                                         className='w-20 h-20 me-4 rounded-full object-cover' />
                                    {communityData.community.name.charAt(0).toUpperCase() +
                                     communityData.community.name.slice(1)}
                                </h1>

                                <h1 className='mt-4 font-xl justify-center'>
                                    <i className="fa-solid fa-user me-1" />
                                    {communityData.community.member_count} Members
                                </h1>

                                <div className='flex justify-center gap-5 mt-5 mb-5'>
                                    
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
                                                            onClick={() => {
                                                                setIsConfirmOpen(true)
                                                                setConfirmMode('leave')
                                                            }}>
                                                        Leave
                                                    </button>
                                                    <button className="mt-1.5 px-6 py-2 rounded-full
                                                                       bg-gradient-to-r
                                                                       from-blue-500 to-indigo-500
                                                                       text-white font-bold
                                                                       shadow-lg
                                                                       hover:shadow-xl
                                                                       hover:scale-105
                                                                       active:scale-95
                                                                       transition-all duration-300"
                                                        onClick={() => setAddPost()}>
                                                            Add Post
                                                    </button>
                                                    {userRole != "" &&
                                                        <>
                                                            {(userRole == "A" || userRole == "M") &&
                                                                <i className="fa-solid fa-ban fa-2xl
                                                                              hover:text-[rgb(204,26,26)]
                                                                              hover:cursor-pointer mt-7"
                                                                onClick={() => openAdminCommunity(communityData.community.id)}>
                                                                </i>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                            )}

                                            {/* Join community button, if user is not joined */}
                                            {!joinedCommunities.includes(communityData.community.id) &&
                                             localStorage.getItem("user") &&
                                            (
                                                <div className='flex flex-col'>
                                                    <button className="mt-1.5 px-6 py-2 rounded-full
                                                                    bg-gradient-to-r mb-1
                                                                    from-blue-500 to-indigo-500
                                                                    text-white font-bold
                                                                    shadow-lg
                                                                    hover:shadow-xl
                                                                    hover:scale-105
                                                                    active:scale-95
                                                                    transition-all duration-300"
                                                            onClick={() => {
                                                                communityAction('join', communityData.community.id)
                                                            }}>
                                                        Join
                                                    </button>
                                                    To start posting
                                                </div>
                                            )

                                            }
                                        </>
                                    ) : (
                                        <>
                                            <div className='flex flex-col'>
                                                <button className="mt-1.5 px-6 py-2 rounded-full
                                                                    bg-white/15 text-white font-semibold
                                                                    hover:bg-white/25 border border-white/20
                                                                    hover:scale-105
                                                                    active:scale-95
                                                                    transition-all duration-300"
                                                        onClick={() => {
                                                            navigate('/login')
                                                        }}>
                                                    Login!
                                                </button>
                                                <p className='m-2 text-gray-100'>
                                                    To start posting and voting!
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <h1 className='font-xl text-gray-300'>
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
                    <div key={post.post_id}>
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
                                            <div className='mt-0.5 ms-2'>
                                                <i className="fa-solid fa-ellipsis
                                                              fa-2xl hover:cursor-pointer
                                                              text-gray-400
                                                            hover:text-white"
                                                   onClick={() => openAdminPost(post.poster_id, post.post_id)}></i>
                                            </div>
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

                            {/* Two comments & Show More */}
                            {comments[`${post.post_id}`] ? (
                             comments[`${post.post_id}`].map((comment, j) => (

                                <>
                                    {/* Comment Card */}
                                    <div className='flex flex-col border shadow-md ms-4 mb-4
                                                    rounded-3xl p-3 border-white/10 animate-fadeIn
                                                    min-h-20 bg-white/5 backdrop-blur-xl w-4/6'
                                        key={j}>

                                        {/* User img and name */}
                                        <p className='text-white flex mt-1.5 max-w-[50%]'>
                                            <img src={comment.commenter_img} className='rounded-full w-6 h-6 me-2 object-cover' />
                                            {comment.commenter_user}
                                        </p>
                                        {userRole != "" &&
                                            <>
                                                {(userRole == "A" || userRole == "M") &&
                                                        <i className="fa-solid fa-ellipsis
                                                                    fa-2xl hover:cursor-pointer
                                                                    ms-auto mt-0
                                                                    text-gray-400
                                                                    hover:text-white"
                                                        onClick={() => openAdminPost(post.poster_id, post.post_id)}></i>
                                                }
                                            </>
                                        }    

                                        {/* Comment text */}
                                        <p className="text-gray-300 text-sm mt-2">
                                        {comment.text}
                                        </p>

                                        {/* Comment date */}
                                        <p className='text-white ms-auto mt-auto'>
                                            {timeAgo(comment.date)}
                                        </p>
                                    </div>


                                </>
                                
                            ))
                            ) : (
                                <p className="text-gray-500 text-sm">Loading comments...</p>
                            )}
                            {localStorage.getItem("user") && joinedCommunities ?
                                (
                                    joinedCommunities.includes(communityData.community.id) && (
                                        <div>
                                            <input type='text'></input>
                                        </div>
                                )
                                ) : (
                                    <p>Loading...</p>
                                )
                            }
                            
                            {comments[`${post.post_id}`] ? (
                                <>
                                    {comments[`${post.post_id}`].length > 0 ? (
                                        <div>
                                            <button className='bg-white/15 text-white px-4 py-2 ms-4 rounded-2xl
                                                                border border-white/20 shadow-md hover:bg-white/25
                                                               transition-all'>
                                                Show more
                                            </button>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ) : (
                                <p>Loading...</p>
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
                    onClose={() => {
                        setIsModalOpen(false);
                        setFormData({title: '',
                                     text: '',
                                     img: ''});
                    }}
                    title= {"Poszt létrehozása a(z) " + communityData.community.name + " közösségbe"}
                >
                    {/* Form */}
                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label className="text-sm text-gray-300"
                                   htmlFor='postTitle'>
                                Post Title
                            </label>
                            <input
                                id='postTitle'
                                placeholder='Title'
                                name='title'
                                value={formData['title']}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 rounded-xl
                                           bg-white/5 text-white
                                           border border-white/15
                                           transition-all duration-300
                                           disabled:opacity-60"
                            />
                        </div>

                        {/* Bio */}
                        <div className="md:col-span-2">
                            <label className="text-sm text-gray-300"
                                   htmlFor='postText'>
                                Post Content
                            </label>
                            <textarea
                                placeholder='Text'
                                name="text"
                                id='postText'
                                rows="4"
                                maxLength='300'
                                value={formData["text"]}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 rounded-xl
                                           bg-white/5 text-white
                                           border border-white/15
                                           transition-all duration-300
                                           disabled:opacity-60 resize-none
                                           overflow-y-auto sidebar-scroll"
                            />
                            <div className='h-2 bg-gray-500 rounded-full shadow-md mt-1'
                                 style={{width: '448px'}}>
                                <div id='bar'
                                    className='h-2 bg-white rounded-full'
                                    style={{width: '0px'}}>
                                </div>
                            </div>
                            <p id="count" className='mt-1 text-center text-lg'>0 / 300</p>
                        </div>
                        <div className='mx-auto'>
                            {formData.img &&
                                <div className="w-72 h-48 rounded-md
                                                p-[3px]
                                                transition-transform duration-500">
                                    <img className='w-full h-full rounded-md
                                                    object-cover'
                                         src={formData.img}>
                                    </img>
                                </div>
                            }
                            <div className='mt-2'>
                                <label className="text-sm text-gray-300"
                                       htmlFor='postFileInput'>
                                    Add Image
                                </label>
                                <button className='border border-dotted border-white rounded-full flex mt-1
                                                   transition-all hover:cursor-pointer hover:bg-white/10'>
                                    <div className='text-center flex absolute ms-[20%] hover:cursor-pointer'>Upload Image</div>
                                    <input
                                        className='opacity-0 hover:cursor-pointer'
                                        id='postFileInput'
                                        type='file'
                                        accept='image/*'
                                        src={formData.img || null}
                                        size={64 * 1024}
                                        onChange={handleChange} />
                                </button>
                            </div>
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
                            onClick={() => addPost(communityData.community.id)}
                            disabled={!isFormValid}>
                            Create
                            <i className={`${isFormValid ? 'group-hover:ms-2': ''}
                                                fa-solid fa-angles-right ms-1 transition-all`}/>
                        </button>
                    </div>
                </Modal>
            }

            {modalState == "postAdmin" && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setAskSure(false);
                    }}
                    title= {"Poszt Adminisztáció"}>
                    {askSure == false &&
                        <div className='sm:flex sm:gap-[10%]'>
                            <div>
                                <button className='w-52 rounded-full font-bold group
                                                shadow-lg transition py-2 px-4 border
                                                border-white/15 hover:bg-red-500
                                                hover:border-red-700'
                                        onClick={() => setIsSure("user")}>
                                    Felhasználó Kitiltása
                                </button>
                            </div>

                            <div>
                                <button className='sm:mt-0 mt-2 w-52 rounded-full
                                                font-bold group shadow-lg transition
                                                py-2 px-4 border border-white/15
                                                hover:bg-red-500 hover:border-red-700'
                                        onClick={() => setIsSure("post")}>
                                    Poszt Törlése
                                </button>
                            </div>
                        </div>
                    }

                    {askSure == true &&
                        <>
                            <div>
                                <div>
                                    <p className='m-2 text-center text-lg'>Are you sure?</p>
                                </div>
                                <div className='flex flex-col md:flex-row'>
                                    <div className='m-2 mx-auto'>
                                        <button className='w-52 rounded-full font-bold group
                                                        shadow-lg transition py-2 px-4 border
                                                        border-white/15 hover:bg-red-500
                                                        hover:border-red-700'
                                                onClick={() => sure(true)}>
                                            Yes
                                        </button>
                                    </div>

                                    <div className='m-2 mx-auto'>
                                        <button className='w-52 rounded-full
                                                        font-bold group shadow-lg transition
                                                        py-2 px-4 border border-white/15
                                                        hover:bg-red-500 hover:border-red-700'
                                                onClick={() => unSure()}>
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                
                </Modal>)
            }

            {modalState == "communityAdmin" && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setAskSure(false);
                    }}
                    title= {"Közösség Adminisztáció"}>
                    {askSure == false &&
                        <>
                            <div className='flex'>
                                <button className='w-52 rounded-full font-bold group
                                                shadow-lg transition py-2 px-4 border
                                                border-white/15 hover:bg-red-500
                                                hover:border-red-700 mx-auto'
                                        onClick={() => setIsSure("community")}>
                                    Közösség Deaktiválása
                                </button>
                            </div>
                        </>
                    }

                    {askSure == true &&
                        <>
                            <div>
                                <div>
                                    <p className='m-2 text-center text-lg'>Are you sure?</p>
                                </div>
                                <div className='flex flex-col md:flex-row'>
                                    <div className='m-2 mx-auto'>
                                        <button className='w-52 rounded-full font-bold group
                                                        shadow-lg transition py-2 px-4 border
                                                        border-white/15 hover:bg-red-500
                                                        hover:border-red-700'
                                                onClick={() => sure(true)}>
                                            Yes
                                        </button>
                                    </div>

                                    <div className='m-2 mx-auto'>
                                        <button className='w-52 rounded-full
                                                        font-bold group shadow-lg transition
                                                        py-2 px-4 border border-white/15
                                                        hover:bg-red-500 hover:border-red-700'
                                                onClick={() => unSure()}>
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                
                </Modal>)
            }

            <Notification
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
                title="Notification"
                bgColor={
                    notificationType ? 
                    "bg-green-700/50" :
                    "bg-red-700/20"
                }
            >
                <p className="text-gray-300">
                    {notificationText}
                </p>
            </Notification>

            <Modal
                isOpen={isConfirmOpen}
                onClose={() => {
                    setIsConfirmOpen(false);
                }}
                title= {"Confirmation"}>
                <>
                    <div>
                        <div>
                            <p className='m-2 text-center text-lg'>
                                {`Are you sure you want to ${confirmMode}?`}
                            </p>
                        </div>
                        <div className='flex flex-col md:flex-row'>
                            <div className='m-2 mx-auto'>
                                <button className='w-52 rounded-full font-bold group
                                                shadow-lg transition py-2 px-4 border
                                                border-white/15 hover:bg-green-500/40
                                                hover:border-green-700/40'
                                        onClick={() => {
                                            setIsConfirmOpen(false)
                                            if (confirmMode == 'leave') {
                                                communityAction('leave', communityData.community.id)
                                            }
                                            else {
                                            }
                                        }}>
                                    Yes
                                </button>
                            </div>

                            <div className='m-2 mx-auto'>
                                <button className='w-52 rounded-full
                                                font-bold group shadow-lg transition
                                                py-2 px-4 border border-white/15
                                                hover:bg-red-500/40 hover:border-red-700/40'
                                        onClick={() => {
                                            setIsConfirmOpen(false)}
                                        }>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            </Modal>

            {modalState == "postModal" &&
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setModalState("");
                        setCurrentPost(null);
                    }}
                    title= {currentPost}>

                </Modal>
            }

        </div>
    )
}

export default FrontPage