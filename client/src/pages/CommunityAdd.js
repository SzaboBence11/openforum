import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function CommunityAdd() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        img: ''
    })
    const isFormValid = formData.name !== '' &&
                        formData.description !== '' &&
                        formData.img !== ''

    const profilePictureStyleInput = {
        backgroundImage: `url(${formData.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        outline: 'none',
        textIndent: '-999em',
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user')

        if (!storedUser) {
            navigate('/login')
            return
        }
    }, [navigate])

    function handleChange(e) {
        if(e.target.type != 'file'){
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
            console.log(formData);
            return;
        }
        let file = e.target.files[0];
        let reader = new FileReader();
        
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

    function addCommunity() {
        fetch('/api/community/addCommunity', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.name,
                description: formData.description,
                img: formData.img,
                user_id: JSON.parse(localStorage.getItem('user')).id
            })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.error) {
                setTimeout(() => {
                    alert('Community created successfully!');
                    goToCommunity(data.insertId);
                }, 5);
            }
            else {
                alert(data.error);
            }
            // goToCommunity()
        })
        .catch(err => console.log(err))
    }

    function goToCommunity(id) {
        localStorage.setItem('selectedCommunity', id);
        navigate('/feed');
    }

    return (
        <div className="mt-20 flex items-center justify-center animate-fadeIn
                        px-4 transition-colors duration-700 flex-col">
            
            {/* Top title */}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-5 text-center text-2xl/9 font-bold
                               tracking-tight text-white">
                    Create new community
                </h2>
            </div>

            <div className="relative max-w-4xl animate-fadeIn w-full rounded-3xl
                            bg-white/10 backdrop-blur-xl
                            border border-white/15 mt-10
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
                                    src={formData.img || null}
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
                    </div>

                    {/* Form */}
                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label className="text-sm text-blue-200">
                                Community Name
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
                                Description
                            </label>
                            <textarea
                                placeholder='Description of the community'
                                name="description"
                                rows="4"
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

                    <div className='mt-4 justify-center mx-auto w-auto flex'>
                        <button className={`w-52 rounded-full font-bold group
                                            shadow-lg transition py-2 px-4 border border-white/15
                                            ${isFormValid
                                            ? 'bg-white/10 backdrop-blur-xl hover:bg-white/25 hover:bg-blue-900 text-white'
                                            : 'bg-white/5 backdrop-blur-xl cursor-not-allowed text-gray-400'}
                                            `}
                            type="submit"
                            onClick={addCommunity}
                            disabled={!isFormValid}>
                            Create
                            <i className={`${isFormValid ? 'group-hover:ms-2': ''}
                                                fa-solid fa-angles-right ms-1 transition-all`}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityAdd
