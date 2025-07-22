import React, { useEffect, useRef, useState } from 'react'
import user2 from '../../assets/user-default-image.png';

import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../Components/UserContext';

import skillLinkLogo from './../../assets/logo.png'


function ProfileUser() {



    //const { user } = useUser();

    const { id } = useParams();

    const navigate = useNavigate();

    const { user, setUser } = useUser(); // 
    const token = localStorage.getItem("token");
    // variables 
    const [previewUrl, setPreviewUrl] = useState(user2);

    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [ProfileImageUrl, setProfileImageUrl] = useState('');
    const [skills, setSkills] = useState([]);
    const [uploadedImagePath, setUploadedImagePath] = useState('');
    const [ImageUrl, setImageUrl] = useState('');


    const handleImageChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        //  const { user } = useUser();


        // Show preview
        setPreviewUrl(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append('File', file); // 'file' should match your API's expected field name
        formData.append("FileName", file.name);
        formData.append("FileDescription", "profile image uplaoded ")

        try {

            const response = await axios.post('https://localhost:7113/api/Images/Upload',
                formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
            );

            if (response.status === 201 || response.status === 200) {
                const uploadedPath = response.data.filePath || response.data.url || response.data.imagePath;

                if (uploadedPath) {
                    setUploadedImagePath(uploadedPath); // Save image path for event creation
                    setImageUrl(uploadedPath);
                    try {
                        const response = await axios.post('https://localhost:7113/api/Account/UpdateProfilePic', uploadedPath
                            ,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                }
                            }
                        );

                        if (response.status === 201 || response.status === 200) {
                            alert('Image Updated successfully!');
                            fetchUser();
                            console.log(response.data);
                            //setPreviewUrl(URL.createObjectURL(file));
                            setPreviewUrl(uploadedPath)
                            navigate('/dashboard/Profile/View');
                        }

                    }
                    catch (error) {
                        console.error('Error updateing profile pic:', error);

                    }

                }
                else {
                    throw new Error("Image upload did not return a valid file path.");
                }

                // alert('Image uploaded successfully!' + uploadedImagePath);
            }



        } catch (error) {
            console.error('Error creating Event:', error);
            alert('Failed to create Event' + error);
        }
    };




    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));

        }
    }

    const handleDeleteSkill = (skillsToDelete) => {
        const updatedskills = skills.filter(skill => skill !== skillsToDelete);
        setSkills(updatedskills);
    };

    useEffect(() => {
        axios.get("https://localhost:7113/api/Account/GetCurrentUser",
            {
                headers: {
                    Authorization: `Bearer ${token}`, // if required
                },
            })
            .then(res => {

                // alert(res.data.phoneNumber);
                setName(res.data.userName)
                setEmail(res.data.email)
                setPhone(res.data.phoneNumber)
                setProfileImageUrl(res.data.ProfileImageUrl)
                if (res.data.profileImageUrl) {
                    setPreviewUrl(res.data.profileImageUrl);
                }
            })
    }, [])


    // useEffect(() => {
    //     axios.get('https://localhost:7113/api/Account/UpdateProfileImage')
    //         .then(res => {
    //             setPreviewUrl(previewUrl)
    //         })
    // }, [id, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validations
        // if (Name.trim() === '') {
        //     alert('Name is required');
        // }

        if (Email.trim() === '') {
            alert('Email is required');
        }

        if (Phone.trim() === '') {
            alert('Phone is required');
        }


        try {
            const response = await axios.post('https://localhost:7113/api/Account/UpdateUser',
                {
                    email: Email,
                    phone: Phone
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.status === 201 || response.status === 200) {
                alert('User Update successfully!');
                navigate('/dashbord/Profile/View');
                // navigate('/User');
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

    const colors = [
        "#bf8c00ff",  // yellow
        "#0b1f75ff",  // blue
        "#920c92ff",  // pink
        "#046d6eff",  // teal
        "#bd8100ff",  // orange
        "#2ecc71",  // green
        "#e74c3c",  // red
    ];

    const fetchUser = async () => {
        try {
            const res = await axios.get("https://localhost:7113/api/Account/GetCurrentUser", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data); // ✅ update user context
        } catch (err) {
            console.error("Failed to fetch user", err);
        }
    };

    return (

        <div className='border bg-white rounded-2' >

            <div className="py-5 bg-dark rounded-top"></div>

            <div className="d-flex flex-column align-items-start ms-5 me-3 mt-5">
                <div className="admin-image-change"
                    style={{ marginTop: '-100px' }}>

                    <img src={previewUrl} className='rounded-1  shadow-sm' />

                    <a className="btn-chnage-image text-black" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="bi bi-pencil-square"></i> Change
                    </a>
                </div>

            </div>


            <form className='mt-5' onSubmit={handleSubmit}>
                <div className="p-5">
                    <h4>Hello {user.userName} , </h4>
                    {/* <h4>Hello Rohit, </h4> */}

                    <div className="row gap-3 gap-md-0 mb-3 mt-4">
                        <label className="pb-1">User Name</label>
                        <input type="text" disabled
                            className="form-control"
                            name="name"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Name' />
                    </div>

                    <div className="row mt-4">
                        <label className="pb-1">Email</label>

                        <input type="text"
                            className="form-control"
                            name="email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email' />
                    </div>
                    <div className="row mt-4">
                        <label className="pb-1">Phone</label>

                        <input type="text"
                            className="form-control"
                            name="phone"
                            value={Phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder='Phone' />
                    </div>
                    {/*  */}

                    <div className="row mt-4 gap-3 gap-md-0 mb-3">
                        <div className="d-flex gap-2 align-items-center">
                            <button type="submit" className="section-btn btn-custom">
                                Update
                            </button>
                            <Link
                                className="btn-custom section-btn"
                                to="/dashboard"
                                style={{ background: '#333', color: 'white' }}
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>

                </div>
            </form>

            <hr />

            <div className="p-5">
                <h5>My Skills</h5>

                <div className="dynamic-skills-section">
                    <span style={{ background: colors[0] }}>HTML</span>
                    <span style={{ background: colors[1] }}>CSS</span>
                    <span style={{ background: colors[2] }}>JavaScript</span>
                    <span style={{ background: colors[3] }}>Adobe XD</span>
                    <span style={{ background: colors[4] }}>Photoshop</span>
                    <span style={{ background: colors[5] }}>Figma</span>
                    {skills.map((skill, index) => (
                        <span key={index} style={{
                            backgroundColor: colors[index % colors.length],
                        }} >
                            {skill}
                        </span>
                    ))}
                </div>
                <Link
                    className="mt-5 d-block text-white p-2 rounded-2 bg-dark"
                    to="/dashboard/Skills/ListSkill"
                    style={{ width: 'fit-content' }}
                >
                    <i class="bi bi-pencil-square me-1"></i>
                    Manage Skills
                </Link>
            </div>




            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <img src={skillLinkLogo} alt="" height={'40px'} />
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form >
                            <div className="modal-body">
                                <div className="row p-2">
                                    <label className="pb-2">Upload Image</label>
                                    <input
                                        name="file"
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                {/* <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                {/* <button type="submit" className="btn btn-primary">Save changes</button> */}
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfileUser