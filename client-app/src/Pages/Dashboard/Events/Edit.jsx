import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

import defaultimage from '../../../assets/defalutimage.jpeg';
import { useUser } from '../../../Components/UserContext';
import axios from 'axios';


function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Variables 
    const [previewUrl, setPreviewUrl] = useState(defaultimage);
    const [Title, setTitle] = useState('');
    const [Category, setCategory] = useState('');
    const [Description, setDescription] = useState('');
    const [EventLocation, setEventLocation] = useState('');
    const [EventDate, setEventDate] = useState('');
    // // const [userId, setUserId] = useState('');
    // const [created, setCreated] = useState('');

    // Changes
    const [categories, setcategories] = useState([]);
    const [EventCreated, setEventCreated] = useState('');
    const [isVisible, setisVisible] = useState(false);
    const [EventTime, setEventTime] = useState('');
    const [uploadedImagePath, setUploadedImagePath] = useState('');

    const token = localStorage.getItem("token");


    // Dynamic Categories
    useEffect(() => {
        axios.get("https://localhost:7113/api/Category")
            .then(res => {
                console.log("API response:", res.data);
                setcategories(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch categories:", err);
            });
    }, [])

    useEffect(() => {
        const today = new Date();
        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };

        setEventCreated(formatDate(today));
    }, [])


    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            alert("Please select an image.");
            return;
        }

        // Show preview
        setPreviewUrl(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append('File', file); // 'file' should match your API's expected field name
        formData.append("FileName", file.name);
        formData.append("FileDescription", "event image uplaoded ");

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
                } else {
                    throw new Error("Image upload did not return a valid file path.");
                }

                alert('Image uploaded successfully!' + uploadedImagePath);
            }



        } catch (error) {
            console.error('Error change Image:', error);
            alert('Failed to change Image' + error);
        }



    };

    const { user } = useUser();
    if (!user) {

        return <p>Loading user info...</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Validations

        if (Title.trim() === '') return alert('Event name is required');
        if (Category.trim() === '') return alert('Event Category is required');
        if (Description.trim() === '') return alert('Event Description is required');
        if (EventLocation.trim() === '') return alert('Event Location is required');
        if (EventDate === '') return alert('Event Date is required');
        if (previewUrl === defaultimage) return alert('Event Image is required');
        if (uploadedImagePath === '') return alert('Event Image path is required');

        alert(uploadedImagePath)
        alert(previewUrl)


        let data = {
            Title: Title,
            Type: Category,
            Description: Description,
            Location: EventLocation,
            Date: EventDate,
            Time: EventTime,
            Created: EventCreated,
            ImageUrl: uploadedImagePath,
            UserId: user.userId,
            isPublic: isVisible,
        };

        console.log(JSON.stringify(data, null, 2));

        console.log("Submitting Event:", data);
        try {

            const response = await axios.put(`https://localhost:7113/api/Event/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
            );

            if (response.status === 201 || response.status === 200) {
                alert('Events Updated successfully!');
                navigate('/dashboard/Events/Manage');
            }



        } catch (error) {
            console.error('Error Updating Event:', error);
            alert('Failed to Updating    Event' + error);
        }

    }


    useEffect(() => {
        axios.get(`https://localhost:7113/api/Event/${id}`)
            .then(res => {
             

                setTitle(res.data.title);
                setCategory(res.data.type);
                setPreviewUrl(res.data.imageUrl);
                setDescription(res.data.description);
                setEventLocation(res.data.location);
                setEventDate(res.data.date);
                setEventTime(res.data.time);
                setUploadedImagePath(res.data.imageUrl);
            })
            .catch(err => {
                console.error('Error fetching Events :', err);
                alert('Failed to load Events ');
                // navigate('/dashboard/Events/Manage');
            });


    }, [id, navigate]);


    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 d-flex align-items-center stretch-card">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <h2 className="fs-1 Bricolage-font">
                                <i className="bi bi-pencil-square me-3"></i>
                                Update Event
                            </h2>
                            <Link to="/dashboard/Events/Manage" className="btn section-btn btn-custom">
                                View Events
                            </Link>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="col-xl-8 offset-xl-2 align-items-center stretch-card">
                    <div className="card shadow border-0 rounded-lg mt-5">
                        <div className="card-header">
                            <h2 className="text-center font-weight-bold p-4 Bricolage-font">Update Event</h2>
                        </div>
                        <div className="card-body">
                            {/* encType="multipart/form-data" */}
                            <form onSubmit={handleSubmit} >
                              {/*   <div className="row gap-3 gap-md-0 mb-3">
                                    <div className="col-md-10"></div>
                                    <div className="col-md-2">
                                        <span className='d-flex align-items-center gap-2'>
                                            <input type="checkbox" name='isVisible' onChange={(e) => setisVisible(e.target.checked)} />
                                            <label>Is Visible ?</label>
                                        </span>
                                    </div>
                                </div>  */}
                                <div className="row gap-3 gap-md-0 mb-3">
                                    <div className="col-md-6">
                                        <label className="pb-1">Title</label>
                                        <input type="text"
                                            className="form-control"
                                            name="title"
                                            value={Title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder='Title' />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="pb-1">Category</label>
                                        <select className="form-control" value={Category} onChange={(e) => setCategory(e.target.value)} name="type">
                                            <option value=''>Select Category</option>
                                            {categories.map((cat, index) => (
                                                <option key={index} value={(cat.value || cat.name).replace(/\s+/g, '-')}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <label className="pb-1">Description</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            value={Description}
                                            onChange={(e) => { setDescription(e.target.value) }}
                                            rows="3"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="row gap-3 gap-md-0 mb-3">
                                    <div className="col-md-6">
                                        <label className="pb-1">Location</label>
                                        <input type="text"
                                            className="form-control"
                                            value={EventLocation}
                                            onChange={(e) => { setEventLocation(e.target.value) }}
                                            name="location" />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column">
                                        <label className="pb-1">Date & Time</label>
                                        <DatePicker
                                            selected={EventDate ? new Date(`${EventDate}T${EventTime || '00:00:00'}`) : null}
                                            onChange={(date) => {
                                                const formattedDate = format(date, 'yyyy-MM-dd');
                                                const formattedTime = format(date, 'HH:mm:ss');

                                                setEventDate(formattedDate);
                                                setEventTime(formattedTime);
                                            }}
                                            showTimeSelect
                                            timeFormat="hh:mm aa"
                                            timeIntervals={15}
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            minDate={new Date()}
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <label className="pb-1">Upload Image</label>
                                        <input
                                            name="file"
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4 mb-3">
                                    <div style={{ height: '150px', width: '200px', objectFit: 'cover' }}>
                                        <img
                                            src={previewUrl}
                                            alt="Event Preview"
                                            className="w-100 h-100 rounded object-fit-cover border"
                                        />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="d-flex gap-2 align-items-center">
                                        <button type="submit" className="btn section-btn btn-custom">
                                            Update
                                        </button>
                                        <Link
                                            className="btn btn-custom section-btn"
                                            to="/dashboard/Events/Manage"
                                            style={{ background: '#333', color: 'white' }}
                                        >
                                            Cancel
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );



}

export default EditEvent