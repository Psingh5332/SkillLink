
import video from './../assets/Video.mp4'
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });
    const navigate = useNavigate(); 
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }


    const validate = () => {
        const newErrors = {};
        if (!formData.fullName)
            newErrors.fullName = "Full name is required";
        if (!formData.username.includes("@"))
            newErrors.username = "Valid email required";
        if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";
        if (!/^\d{10}$/.test(formData.phone))
            newErrors.mobile = "Mobile number must be 10 digits";

        return newErrors;
    }

     const handleSubmit = async (e) => {
    e.preventDefault();
   
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
        try {
            const response = await axios.post('https://localhost:7113/api/Account/Register', formData);

            if (response.status === 201 || response.status === 200) {
                alert('Register created successfully!');
                navigate('/Login');
            }
        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                alert('⏱️ Request timed out. Server may be unresponsive.');
            } else if (error.response) {
                alert(`❌ Server responded with ${error.response.status}: ${JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                alert('⚠️ Request made but no response received.');
            } else {
                alert(`Unexpected error: ${error.message}`);
            }
            console.error('Error Register User:', error);
        }
    }
}

   

    return (
        <>
            <div className="register-skilllink-wrapper row d-flex min-vh-100">
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-blur p-5 text-center">
                    <h1 className="site-title mb-2">Skill Link</h1>
                    <p className="tagline mb-4">
                        Bridge the gap between <span>Skills</span> and <span>Opportunities</span>
                    </p>

                    <div className="register-box shadow animate-slide-in">
                        <h2 className="mb-3 fw-bold">Create your account</h2>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="mb-3 position-relative">
                                <i className="bi bi-person-fill input-icon-start"></i>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="form-control ps-5"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {errors.fullName && (
                                <p style={{ color: "red" }}>{errors.fullname}</p>
                            )}

                            {/* username -email */}
                            <div className="mb-3 position-relative">
                                <i className="bi bi-envelope-fill input-icon-start"></i>
                                <input
                                    type="email"
                                    name="username"
                                    className="form-control ps-5"
                                    placeholder="Email"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {errors.username && (
                                <p style={{ color: "red" }}>{errors.username}</p>
                            )}



                            {/* Password */}
                            <div className="mb-3 position-relative">
                                <i className="bi bi-lock-fill input-icon-start"></i>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control ps-5 pe-5"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <i
                                    // className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} input-icon-end`}
                                    // onClick={() => setShowPassword(!showPassword)}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-3 position-relative">
                                <i className="bi bi-lock input-icon-start"></i>
                                <input
                                    // type={showConfirmPassword ? "text" : "password"}
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control ps-5 pe-5"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <i
                                    // className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'} input-icon-end`}
                                    // onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                            </div>

                            {/* Mobile */}
                            <div className="mb-3 position-relative">
                                <i className="bi bi-phone-fill input-icon-start"></i>
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control ps-5"
                                    placeholder="Mobile"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {errors.mobile && (
                                <p style={{ color: "red" }}>{errors.mobile}</p>
                            )}


                            <button type="submit" className="btn btn-primary w-100 rounded-pill">Register</button>


                        </form>
                        <p className="mt-4 small">
                            Already have an account? <Link to="/Login" className="fw-semibold text-decoration-none">Login</Link>
                        </p>
                    </div>
                </div>

                <div className="col-md-6 video-panel d-none d-md-block position-relative p-0">
                    <video
                        className="video-bg"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="overlay position-absolute w-100 h-100 top-0 start-0"></div>

                </div>
            </div>
        </>




    );

}
export default RegisterPage