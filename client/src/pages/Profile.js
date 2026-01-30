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
        }).then(() => {
            setUser(formData)
            setEditMode(false)
        })
    }

    if (!user) return null

    return (
        <div className="min-h-screen flex items-center justify-center
                        px-4 transition-colors duration-700
                        bg-gradient-to-br from-blue-950
                        via-blue-900 to-indigo-950">

            {/* Main Card */}
            <div className="relative max-w-4xl w-full rounded-3xl
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
                                    gap-8 mb-10 animate-fadeIn">

                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-36 h-36 rounded-full
                                            bg-gradient-to-tr
                                            from-blue-400 to-indigo-400
                                            p-[3px]
                                            group-hover:scale-105
                                            transition-transform duration-500">
                                <img
                                    src={formData.img}
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

                        {/* Edit button */}
                        <button
                            onClick={() => setEditMode(prev => !prev)}
                            className="md:ml-auto px-6 py-2 rounded-full
                                       bg-white/15 text-white font-semibold
                                       hover:bg-white/25
                                       hover:scale-105
                                       active:scale-95
                                       transition-all duration-300">
                            {editMode ? 'Mégse' : 'Profil szerkesztése'}
                        </button>
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
                        <div>
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

                        {/* Avatar URL */}
                        {editMode && (
                            <div>
                                <label className="text-sm text-blue-200">
                                    Profilkép URL
                                </label>
                                <input
                                    name="img"
                                    value={formData.img}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-2 rounded-xl
                                               bg-blue-950/60 text-white
                                               border border-white/15
                                               focus:ring-2 focus:ring-blue-400/40
                                               transition-all duration-300"
                                />
                            </div>
                        )}

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
                                           disabled:opacity-60"
                            />
                        </div>
                    </div>

                    {/* Save */}
                    {editMode && (
                        <div className="mt-8 text-right animate-slideUp">
                            <button
                                onClick={saveProfile}
                                className="px-8 py-3 rounded-full
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
