import React, { useState } from "react";
import video from "../assets/Video.mp4";
import { Link, useNavigate } from 'react-router-dom';
import googlelogo from '../../src/assets/google-logo.jpg'
import Dashboard from "../Pages/Dashboard/Dashboard";
import { useUser } from "./UserContext";
import axios from 'axios';

const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        // alert(form.username)
        try {
            const res = await axios.post('https://localhost:7113/api/Account/Login', form);
            const token=res.data.jwtToken;
            localStorage.setItem('token', token);
            alert(token)
            const userRes =await axios.get("https://localhost:7113/api/Account/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser({ ...userRes.data, token });
            alert(res.data)
            localStorage.setItem('token', token);

            navigate('/dashboard'); // redirect to dashboard


            //earlier correct code 
            // const user=await axios.get("https://localhost:7113/api/Account/GetCurrentUser/",{params:{username:form.username}})
            // //authentication 
            //   setUser({ ...userRes.data, token });
            //   localStorage.setItem('token', token);

            // navigate('/dashboard'); // 👈 redirect to dashboard
            // setMessage('Login successful!');
        } catch (error) {
            console.error(error);
            setMessage('Login failed.');
            alert("Login failed");
        }
    };


    return (
        <div className="login-skilllink-wrapper row d-flex vh-100 overflow-hidden">
            {/* Left: Form Side */}
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-blur p-5 text-center">
                <h1 className="site-title mb-2">Skill Link</h1>
                <p className="tagline mb-4">
                    Bridge the gap between <span>Skills</span> and <span>Opportunities</span>
                </p>

                <div className="login-box shadow animate-slide-in">
                    <h2 className="mb-3 fw-bold">Welcome Back! 👋</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="mb-3 position-relative">
                            <i className="bi bi-person-fill input-icon-start"></i>
                            <input
                                type="email"
                                name="username"
                                className="form-control ps-5"
                                placeholder="Email"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-3 position-relative">
                            <i className="bi bi-lock-fill input-icon-start"></i>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="form-control ps-5 pe-5"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                            <i
                                className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} input-icon-end`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>

                        {/* Remember + Forgot */}
                        <div className="d-flex justify-content-between align-items-center small mb-3">
                            <div>
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember" className="ms-2">Remember me</label>
                            </div>
                            <a href="#" className="text-decoration-none">Forget Password?</a>
                        </div>

                        {/* Login Button */}
                        <button className="btn login-btn w-100 " type="submit">Login</button>


                    </form>

                    <p className="mt-4 small">
                        Don’t have an account?{" "}
                        <Link to="/RegisterPage" className="fw-semibold text-decoration-none">Sign Up</Link>
                    </p>

                    <div className="btn-login">
                        <img src={googlelogo} alt="" />
                        <span>Google</span>
                    </div>


                </div>
            </div>

            {/* Right: Video Background */}
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

export default LoginPage;
