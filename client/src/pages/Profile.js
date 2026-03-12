import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from "./common/Modal.js";

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    // Current modal state
    const [modalState, setModalState] = useState("result");

    // Check modal open
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [confirmCancel, setConfirmCancel] = useState(false);
    const [confirmSave, setConfirmSave] = useState(false);

    // Either 'save' or 'cancel'
    const [confirmMode, setConfirmMode] = useState('');

    const storedUser = JSON.parse(localStorage.getItem('openforum_user')).id;

    const [formData, setFormData] = useState({
        name: '',
        display_name: '',
        email: '',
        description: '',
        img: ''
    })

    const [oldFormData, setOldFormData] = useState({
        name: '',
        display_name: '',
        email: '',
        description: '',
        img: ''
    })

    const profilePictureStyleInput = {
        backgroundImage: `url(${formData.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        outline: 'none',
        textIndent: '-999em',
    };
    
    useEffect(() => {

        if (!storedUser) {
            navigate('/login')
            return
        }

        const id = storedUser;

        fetch(`/api/user/profile/${id}`)
        .then(res => res.json())
        .then(data => {

            const user = data[0]
            setUser(user)

            setFormData({
                name: user.name,
                display_name: user.display_name,
                email: user.email,
                description: user.description || '',
                img: user.img
            })

            setOldFormData({
                name: user.name,
                display_name: user.display_name,
                email: user.email,
                description: user.description || '',
                img: user.img
            })
        })
        .catch(err => console.log(err))
    }, [])

    function handleChange(e) {
        if(e.target.type != 'file'){
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
            return;
        }
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onload = function() {
            let profileBase64 = reader.result;
            console.log(profileBase64);
            setFormData(prev => ({
                ...prev,
                img: profileBase64
            }));

            let isConfirmed = window.confirm("Biztos Módosítod a profilképed?");

            if(!isConfirmed){
                alert("Folyamat megszakytva!");
                return;
            }
            fetch('/api/user/updateAvatar', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    imgBase64: profileBase64,
                    id: storedUser
                })
            })
            .then(() => {
                setUser(prev => ({ ...prev, img: profileBase64 }));
                let avatarHeader = document.querySelector("#avatarHeader");
                avatarHeader.src = profileBase64;
            })
        }

        let readerUrl = reader.readAsDataURL(file);

        
    }

    function saveProfile() {
        fetch('/api/user/updateProfile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.name,
                display_name: formData.display_name,
                email: formData.email,
                description: formData.description,
                id: storedUser
            })
        })
        .then(res => res.json())
        .then(data => {
            setUser(formData)
            setEditMode(false)
        })
        .catch(err => console.log(err))
    }

    // if (!user) return null

    return (
        <>
            <div className="mt-32 flex items-center justify-center
                            px-4 transition-colors duration-700 flex-col">

                { !user ? (
                    <div className='text-xl text-white'>Loading...</div>
                ) : (
                    <div className="relative max-w-4xl animate-fadeIn w-full rounded-3xl
                                bg-white/10 backdrop-blur-xl
                                border border-white/15
                                shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                                hover:shadow-[0_40px_100px_rgba(0,0,0,0.55)]
                                transition-all duration-500">

                        <div className="relative p-10">

                            {/* Header */}
                            <div className="flex flex-col md:flex-row items-center
                                            gap-6 mb-10">

                                {/* Avatar */}
                                
                                <div className="relative group">
                                    <div className="w-36 h-36 rounded-full
                                                    bg-gradient-to-tr
                                                    from-blue-400 to-indigo-400
                                                    p-[3px]
                                                    group-hover:scale-105
                                                    transition-transform duration-500">
                                        <input
                                            type='file'
                                            accept='image/*'
                                            style={profilePictureStyleInput}
                                            src={formData.img}
                                            size={4 * 1024 * 1024}
                                            onChange={handleChange}
                                            className="w-full h-full rounded-full
                                                    object-cover bg-blue-950"
                                        />
                                    </div>

                                    {/* Status */}
                                    <span className="absolute bottom-3 right-3
                                                    w-4 h-4 bg-emerald-400
                                                    border-2 border-blue-950
                                                    rounded-full"/>
                                </div>

                                {/* Identity */}
                                <div className="text-center md:text-left">
                                    <h1 className="text-4xl font-extrabold
                                                text-white tracking-tight">
                                        {user.display_name}
                                    </h1>
                                    <p className="text-blue-300 mt-1">
                                        @{user.name}
                                    </p>
                                    <p className="text-blue-100/80 mt-3 max-w-md
                                                leading-relaxed">
                                        {user.description || "Még nincs bemutatkozásod."}
                                    </p>
                                </div>

                                <div className='flex gap-4 md:ms-auto'>
                                    {/* Edit button */}
                                    <button
                                        onClick={() => {
                                            if (editMode) {
                                                setConfirmMode('cancel')
                                                setIsModalOpen(true)
                                            }
                                            else {
                                                setEditMode(prev => !prev)
                                            }
                                        }}
                                        className={`
                                            md:ml-auto px-6 py-2 rounded-full
                                            text-white font-semibold border
                                            transition-all duration-300
                                            ${
                                                editMode ?
                                                'bg-red-500/30 hover:bg-red-500/40 border-red-500/50' :
                                                'bg-white/15 hover:bg-white/25 border-white/20'
                                            }
                                        `}>
                                        {editMode ? 'Cancel' : 'Modify details'}
                                    </button>
                                    {/* Save */}
                                    {editMode &&
                                        <button
                                            onClick={() => {
                                                setConfirmMode('save')
                                                setIsModalOpen(true)
                                            }}
                                            className="px-6 py-2 rounded-full bg-green-500/30
                                                    text-white font-bold border border-green-500/40
                                                    shadow-lg hover:shadow-xl hover:bg-green-500/50
                                                    hover:from-blue-400 hover:to-indigo-400
                                                    transition-colors duration-300">
                                            Save
                                        </button>
                                    }
                                </div>
                            </div>

                            {/* Form */}
                            <div className="grid md:grid-cols-2 gap-6">

                                {[
                                    ['User name', 'name'],
                                    ['Display name', 'display_name']
                                ].map(([label, field]) => (
                                    <div key={field}>
                                        <label className="text-sm text-blue-200">
                                            {label}
                                        </label>
                                        <input
                                            name={field}
                                            disabled={!editMode}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            className="mt-1 w-full px-4 py-2 rounded-xl
                                                    bg-blue-950/60 text-white
                                                    border border-white/15
                                                    focus:ring-2 focus:ring-blue-400/40
                                                    transition-all duration-300
                                                    disabled:opacity-60"
                                        />
                                    </div>
                                ))}

                                {/* Email */}
                                <div className='md:col-span-2'>
                                    <label className="text-sm text-blue-200">
                                        Email
                                    </label>
                                    <input
                                        disabled
                                        value={formData.email}
                                        className="mt-1 w-full px-4 py-2 rounded-xl
                                                bg-blue-950/40 text-blue-200
                                                border border-white/10"
                                    />
                                </div>

                                {/* Bio */}
                                <div className="md:col-span-2">
                                    <label className="text-sm text-blue-200">
                                        Bio
                                    </label>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        disabled={!editMode}
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
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Change confirmation */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
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
                                            setEditMode(prev => !prev)
                                            setIsModalOpen(false)
                                            if (confirmMode == 'cancel') {
                                                setFormData(oldFormData);
                                            }
                                            else {
                                                saveProfile();
                                                setOldFormData(formData)
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
                                            setIsModalOpen(false)}
                                        }>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            </Modal>
        </>
    )
}

export default Profile
