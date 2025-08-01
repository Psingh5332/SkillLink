import React, { useState, useEffect , useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


function EditArticle() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Variables 
    const fileInputRef = useRef(null);

    const [previewUrl, setPreviewUrl] = useState(null);

    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Tags, setTags] = useState('');
    const [Author, setAuthor] = useState('');
    const [PublishedDate, setPublishedDate] = useState('');
    const [ShortDesciption, setShortDesciption] = useState('');


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };


    const handleRemoveImage = () => {
        setPreviewUrl(null);
        fileInputRef.current.value = "";
    };

    useEffect(() => {
        const today = new Date();
        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };
        setPublishedDate(formatDate(today));
    }, []);



    useEffect(() => {
        axios.get(`https://your-api-url.com/api/categories/${id}`)
            .then(res => {
                // setName(res.data.name);
            })
            .catch(err => {
                console.error('Error fetching Articles:', err);
                alert('Failed to load Articles');
                navigate('/dashboard/Article/Manage');
            });
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validations
        if (Title.trim() === '') {
            alert('Article name is required');
        }

        if (Description.trim() === '') {
            alert('Article Description is required');
        }

        if (Tags.trim() === '') {
            alert('Article Tag is required');
        }

        if (Author.trim() === '') {
            alert('Author Name is required');
        }

        if (ShortDesciption.trim() === '') {
            alert('Article ShortDesciption is required');
        }

        if (previewUrl.trim() === '') {
            alert('Article Featured Image is required');
        }


        try {

            const response = await axios.put(`https://your-api-url.com/api/categories/${id}`, {
                id,
                Title,
                Description,
                Tags,
                PublishedDate,
                Author,
                ShortDesciption,
                previewUrl,
            })

            if (response.status === 200) {
                alert('Article updated successfully!');
                navigate('/dashboard/Article/Manage');
            }
        }
        catch (error) {
            console.error('Error updating Articles :', error);
            alert('Failed to update Articles');
        }

        return (
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-12 d-flex align-items-center stretch-card">
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <h2 className="fs-1 Bricolage-font">
                                    <i className="bi bi-pencil-square me-3"></i>
                                    Update Article
                                </h2>
                                <Link to="/Dashboard/Article/Manage" className="btn section-btn btn-custom">
                                    View Articles
                                </Link>
                            </div>
                        </div>
                    </div>


                    <hr />

                    <div className="col-xl-8 offset-xl-2 align-items-center stretch-card">
                        <div className="card shadow border-0 rounded-lg mt-5">
                            <div className="card-header">
                                <h2 className="text-center font-weight-bold p-4 Bricolage-font">Update Article</h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row gap-3 gap-md-0 mb-3">
                                        <div className="col-md-12">
                                            <div
                                                onClick={() => !previewUrl && fileInputRef.current.click()}
                                                className="border rounded-4 d-flex align-items-center justify-content-center position-relative"
                                                style={{
                                                    width: "200px",
                                                    height: "120px",
                                                    backgroundColor: "#F4F7FA",
                                                    cursor: "pointer",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {!previewUrl ? (
                                                    <div className="text-center text-light d-flex gap-2">
                                                        <i className="fa fa-camera mb-2 text-black-50" style={{ fontSize: "20px" }}></i>
                                                        <div className="text-black">Featured Image</div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <img
                                                            src={previewUrl}
                                                            alt="Preview"
                                                            className="w-100 h-100 object-fit-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm position-absolute top-0 end-0 bg-dark bg-opacity-50 border-0 text-white"
                                                            onClick={handleRemoveImage}
                                                            style={{ borderRadius: "0 0 0 6px" }}
                                                        >
                                                            <i className="fa fa-times"></i>
                                                        </button>
                                                    </>
                                                )}
                                            </div>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                                className="d-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="row gap-3 gap-md-0 mb-3">
                                        <div className="col-md-12">
                                            <label className="pb-1">Title</label>
                                            <input type="text"
                                                className="form-control"
                                                name="title"
                                                value={Title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row gap-3 gap-md-0 mb-3">
                                        <div className="form-group">
                                            <label className="pb-1">Content</label>
                                            <FroalaEditor
                                                model={Description}
                                                onModelChange={(e) => setDescription(e)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row gap-3 gap-md-0 mb-3">
                                        <div className="col-md-6">
                                            <label className="pb-1">Author</label>
                                            <input type="text"
                                                className="form-control"
                                                value={Author}
                                                onChange={(e) => { setAuthor(e.target.value) }}
                                                name="author" />
                                        </div>
                                        <div className="col-md-6">
                                            <label class="pb-1">Tags</label>
                                            <select class="form-control" value={Tags} onChange={(e) => setTags(e.target.value)} name="tags">
                                                <option value=''>Select Tags</option>
                                                <option value="WebDev">Web Development</option>
                                                <option value="MobileDev">Mobile Development</option>
                                                <option value="AIML">AI &amp; Machine Learning</option>
                                                <option value="Backend">Backend Development</option>
                                                <option value="CloudComputing">Cloud Computing</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <label className="pb-1">Short Description</label>
                                            <textarea
                                                className="form-control"
                                                name="shortDescription"
                                                value={ShortDesciption}
                                                onChange={(e) => setShortDesciption(e.target.value)}
                                                rows="4">

                                            </textarea>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="d-flex gap-2 align-items-center">
                                            <button type="submit" className="btn section-btn btn-custom">
                                                Update
                                            </button>
                                            <Link
                                                className="btn btn-custom section-btn"
                                                to="/dashbaord/Article/Manage"
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
        )

    }

}

export default EditArticle