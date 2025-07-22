import React, { useEffect, useRef, useState } from 'react'
import user2 from '../../assets/user-default-image.png';

import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../Components/UserContext';

function AdminProfile() {


    // const {user} = useUser();

    const { id } = useParams();

    const navigate = useNavigate();

    // variables 
    const [previewUrl, setPreviewUrl] = useState(user2);

    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [skillname, setskillname] = useState('');
    const [skills, setSkills] = useState([]);
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleDeleteSkill = (skillsToDelete) => {
        const updatedskills = skills.filter(skill => skill !== skillsToDelete);
        setSkills(updatedskills);
    };

    useEffect(() => {
        axios.get('https://your-api-url.com/api/Events/${id}')
            .then(res => {
                setName(res.data.name)
                setEmail(res.data.email)
                previewUrl(res.data.previewUrl)
            })
    }, [id, navigate])

    const handleAddSkill = (e) => {

        if (skillname.trim() === '') {
            alert('Skill Name is required');
            return;
        }


        e.preventDefault();
        if (skillname.trim() !== '' && !skills.includes(skillname.trim())) {
            setSkills([...skills, skillname.trim()]);
            setskillname(''); // clear input
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validations
        if (Name.trim() === '') {
            alert('Name is required');
        }

        if (Email.trim() === '') {
            alert('Email is required');
        }

        // if (previewUrl === defaultimage) {
        //     alert('Event Image is required');
        // }


        try {

            const response = await axios.post('https://your-api-url.com/api/Articles', {
                Name,
                Email,
                previewUrl,
                skills
            })

            if (response.status === 201 || response.status === 200) {
                alert('User Update successfully!');
                // navigate('/dashbord');
                navigate('/User');
            }
            // console.log('Name - ' , Name)
            // console.log('Email - ' , Email)
            // console.log('Password - ' , Password)
            // console.log('Confi Password - ' , ConfirmPassword)
            // console.log('Skils- ', skills)
        }
        catch (error) {
            console.error('Error Update User : ', error);
            alert('Failed to Update User ');
        }

    }

    return (
        <div className='border bg-white rounded-2' >
            <div className="py-5 bg-dark rounded-top"></div>

            <form className='mt-5' onSubmit={handleSubmit}>
                <div className="admin-image-change mx-5"
                    style={{ marginTop: '-100px' }}>


                    <img src={previewUrl} className='rounded-circle  shadow-sms' />

                </div>
                <div className="p-5">
                    {/* <h4>Hello {user.userName} , </h4> */}
                    <h4>Hello Jigsha  , </h4>

                    <div className="row gap-3 gap-md-0 mb-3 mt-4">
                        <div className="col-md-6">
                            <label className="pb-1">Name</label>

                            <input type="text"
                                className="form-control"
                                name="name"
                                value={Name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Name' />
                        </div>
                        <div className="col-md-6">
                            <label className="pb-1">Email</label>

                            <input type="text"
                                className="form-control"
                                name="email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email' />
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-12">
                            <label className="pb-1">Upload Image</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-xl-8">
                                    <label className="pb-1">Add Skill</label>

                                    <input type="text"
                                        className="form-control"
                                        name="skill"
                                        value={skillname}
                                        onChange={(e) => setskillname(e.target.value)}
                                        placeholder='Skill' />
                                </div>

                                <div className="col-xl-4">
                                    <button className='border btn custom-btn mb-3 mb-md-0' onClick={handleAddSkill} type="button" style={{ marginTop: '28px' }}>Add Skill</button>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="dynamic-skills-section">
                                {skills.map((skill, index) => (
                                    <span key={index} >
                                        {skill}
                                        <i
                                            className="bi bi-x-circle-fill ms-1"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleDeleteSkill(skill)}
                                        ></i>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4 gap-3 gap-md-0 mb-3">
                        <div className="d-flex gap-2 align-items-center">
                            <button type="submit" className="btn section-btn btn-custom">
                                Update
                            </button>
                            <Link
                                className="btn btn-custom section-btn"
                                to="/dashboard"
                                style={{ background: '#333', color: 'white' }}
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>

                </div>
            </form>

        </div>
    )
}

export default AdminProfile