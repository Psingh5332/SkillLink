import React, { useState } from "react";
import { Link } from 'react-router-dom';

import video from './../assets/Video.mp4'

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="register-skilllink-wrapper row d-flex min-vh-100">
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-blur p-5 text-center">
                <h1 className="site-title mb-2">Skill Link</h1>
                <p className="tagline mb-4">
                    Bridge the gap between <span>Skills</span> and <span>Opportunities</span>
                </p>

                <div className="register-box shadow animate-slide-in">
                    <h2 className="mb-3 fw-bold">Create your account</h2>
                    <form>

                        {/* Full Name */}
                        <div className="mb-3 position-relative">
                            <i className="bi bi-person-fill input-icon-start"></i>
                            <input
                                type="text"
                                className="form-control ps-5"
                                placeholder="Full Name"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3 position-relative">
                            <i className="bi bi-envelope-fill input-icon-start"></i>
                            <input
                                type="email"
                                className="form-control ps-5"
                                placeholder="Email"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-3 position-relative">
                            <i className="bi bi-lock-fill input-icon-start"></i>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control ps-5 pe-5"
                                placeholder="Password"
                                required
                            />
                            <i
                                className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} input-icon-end`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-3 position-relative">
                            <i className="bi bi-lock input-icon-start"></i>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-control ps-5 pe-5"
                                placeholder="Confirm Password"
                                required
                            />
                            <i
                                className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'} input-icon-end`}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            ></i>
                        </div>

                        {/* Register Button */}
                        <button className="btn btn-primary w-100 rounded-pill">Register</button>
                    </form>

                    <p className="mt-4 small">
                        Already have an account? <Link to="/Login" className="fw-semibold text-decoration-none">Login</Link>
                    </p>
                </div>
            </div>

            {/* <div className="col-md-6 image-panel d-none d-md-block position-relative">
                <img src={RegisterImg} alt="Skill Link Visual" className="w-100 h-100 object-fit-cover" />
                <div className="overlay position-absolute w-100 h-100 top-0 start-0"></div>
            </div> */}
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
    );
};

export default RegisterPage;
// Parvinder Singh updated src/Components/RegisterPage.jsx (Week 4, June 2025)
