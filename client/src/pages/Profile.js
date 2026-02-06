import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [editMode, setEditMode] = useState(false)

    const [formData, setFormData] = useState({
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
    const storedUser = JSON.parse(localStorage.getItem('user')).id;
    
    useEffect(() => {

        if (!storedUser) {
            navigate('/login')
            return
        }

        const id = JSON.parse(storedUser);

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
            })
            .catch(err => console.log(err))
    }, [navigate])

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
                let avatarHeader = document.querySelector("#headerAvatarPicture");
                avatarHeader.src = profileBase64;
            })
        }

        let readerUrl = reader.readAsDataURL(file);

        
    }

    function saveProfile() {
        let isConfirmed = window.confirm("Biztos Módosítod az adataid?");

        if(!isConfirmed){
            alert("Folyamat megszakytva!");
            return;
        }

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
        }).then(() => {
            setUser(formData)
            setEditMode(false)
        })
    }

    // if (!user) return null

    return (
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

                {/* Soft glow */}
                <div className="absolute inset-0 rounded-3xl
                                bg-gradient-to-tr from-blue-500/10
                                via-transparent to-indigo-500/10
                                pointer-events-none" />

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
                                onClick={() => setEditMode(prev => !prev)}
                                className="md:ml-auto px-6 py-2 rounded-full
                                           bg-white/15 text-white font-semibold
                                           hover:bg-white/25 border border-white/20
                                           hover:scale-105
                                           active:scale-95
                                           transition-all duration-300">
                                {editMode ? 'Mégse' : 'Adatok szerkesztése'}
                            </button>
                            {/* Save */}
                            {editMode &&
                                <button
                                    onClick={saveProfile}
                                    className="px-6 py-2 rounded-full
                                               bg-gradient-to-r
                                               from-blue-500 to-indigo-500
                                               text-white font-bold
                                               shadow-lg
                                               hover:shadow-xl
                                               hover:scale-105
                                               active:scale-95
                                               transition-all duration-300">
                                    Mentés
                                </button>
                            }
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grid md:grid-cols-2 gap-6">

                        {[
                            ['Felhasználónév', 'name'],
                            ['Megjelenített név', 'display_name']
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
                        <div className='md:col-span-2 sm:text-center'>
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
                                Bemutatkozás
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
    )
}

export default Profile
