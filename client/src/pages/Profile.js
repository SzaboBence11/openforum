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

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) {
            navigate('/login')
            return
        }

        const id = JSON.parse(storedUser).id

        fetch(`/api/user/profile/${id}`)
            .then(res => res.json())
            .then(data => {
                const u = data[0]
                setUser(u)
                setFormData({
                    name: u.name,
                    display_name: u.display_name,
                    email: u.email,
                    description: u.description || '',
                    img: u.img
                })
            })
    }, [navigate])

    function handleChange(e) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function saveProfile() {
        fetch('/api/user/updateProfile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(() => {
            setUser(formData)
            setEditMode(false)
        })
    }

    if (!user) return null

    return (
        <div className="min-h-screen flex items-center justify-center
                        bg-gradient-to-br from-blue-950 via-indigo-900 to-black
                        px-4">

            {/* Glass Card */}
            <div className="relative max-w-4xl w-full rounded-3xl
                            bg-white/10 backdrop-blur-xl border
                            border-white/20 shadow-2xl
                            overflow-hidden">

                {/* Decorative gradient glow */}
                <div className="absolute -top-24 -right-24 w-96 h-96
                                bg-indigo-500 opacity-30 blur-3xl rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96
                                bg-blue-500 opacity-30 blur-3xl rounded-full" />

                <div className="relative p-10">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center
                                    gap-8 mb-10">

                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-36 h-36 rounded-full
                                            bg-gradient-to-tr from-blue-500
                                            to-indigo-500 p-1">
                                <img
                                    src={formData.img}
                                    className="w-full h-full rounded-full
                                               object-cover bg-white"
                                />
                            </div>
                            <span className="absolute bottom-2 right-2
                                             w-5 h-5 bg-green-400
                                             border-2 border-black
                                             rounded-full"/>
                        </div>

                        {/* Identity */}
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-extrabold text-white">
                                {user.display_name}
                            </h1>
                            <p className="text-blue-200 mt-1">
                                @{user.name}
                            </p>
                            <p className="text-sm text-gray-300 mt-3 max-w-md">
                                {user.description || "No bio yet — tell the world who you are."}
                            </p>
                        </div>

                        {/* Edit */}
                        <button
                            onClick={() => setEditMode(prev => !prev)}
                            className="md:ml-auto px-6 py-2 rounded-full
                                       bg-white/20 text-white font-semibold
                                       hover:bg-white/30 transition"
                        >
                            {editMode ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>

                    {/* Info Grid */}
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Username */}
                        <div>
                            <label className="text-sm text-blue-200">
                                Username
                            </label>
                            <input
                                name="name"
                                disabled={!editMode}
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 rounded-xl
                                           bg-black/30 text-white border
                                           border-white/10
                                           disabled:opacity-60"
                            />
                        </div>

                        {/* Display name */}
                        <div>
                            <label className="text-sm text-blue-200">
                                Display name
                            </label>
                            <input
                                name="display_name"
                                disabled={!editMode}
                                value={formData.display_name}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 rounded-xl
                                           bg-black/30 text-white border
                                           border-white/10
                                           disabled:opacity-60"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm text-blue-200">
                                Email
                            </label>
                            <input
                                value={formData.email}
                                disabled
                                className="mt-1 w-full px-4 py-2 rounded-xl
                                           bg-black/30 text-gray-400 border
                                           border-white/10"
                            />
                        </div>

                        {/* Avatar URL */}
                        {editMode && (
                            <div>
                                <label className="text-sm text-blue-200">
                                    Avatar URL
                                </label>
                                <input
                                    name="img"
                                    value={formData.img}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-2 rounded-xl
                                               bg-black/30 text-white border
                                               border-white/10"
                                />
                            </div>
                        )}

                        {/* Bio */}
                        <div className="md:col-span-2">
                            <label className="text-sm text-blue-200">
                                About you
                            </label>
                            <textarea
                                name="description"
                                rows="4"
                                disabled={!editMode}
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 w-full px-4 py-2 rounded-xl
                                           bg-black/30 text-white border
                                           border-white/10
                                           disabled:opacity-60"
                            />
                        </div>
                    </div>

                    {/* Save */}
                    {editMode && (
                        <div className="mt-8 text-right">
                            <button
                                onClick={saveProfile}
                                className="px-8 py-3 rounded-full
                                           bg-gradient-to-r from-blue-500
                                           to-indigo-600 text-white
                                           font-bold shadow-lg
                                           hover:scale-105 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
