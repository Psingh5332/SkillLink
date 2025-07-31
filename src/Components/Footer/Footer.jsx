import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

function Footer() {
    return (
        <>
            <footer className="footer section pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <div className="footer-logo pb-2">
<Link to="/">
                                            <img src={logo} alt="" />
                                        </Link>
                            </div>
                            <p className='mb-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius, ipsum.</p>
                            <div className="social-icons mt-3">
                                <i className="fab fa-facebook-f"></i>
                                <i className="fab fa-twitter"></i>
                                <i className="fab fa-instagram"></i>
                                <i className="fab fa-linkedin-in"></i>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <h5 className="pb-3">Explore</h5>
                            <div className="footer-col d-flex flex-column gap-2">
                                <a href="#">Expert</a>
                                <a href="#">Events</a>
                                <a href="#">Knowlegde base</a>
                                <a href="#">Contact</a>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <h5 className="pb-3">UseFull Links</h5>
                            <div className="footer-col d-flex flex-column gap-2">
                                <a href="#">Tutorials</a>
                                <a href="#">Youtube Links</a>
                                <a href="#">Notes</a>
                                <a href="#">Download</a>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                            <h5 className="pb-3">Contacts</h5>
                            <p className="mb-1">258C Sunview Street Waterloo , N2L 3V9</p>
                            <p className="mb-1 fs-5 fw-normal">+3834367689</p>
                            <p><a href="mailto:geair@company.com">skilllinkcommunity@gmail.com</a></p>
                            <div className="subscribe mt-3 d-flex alig-items-center gap-1">
                                <input type="email" placeholder="Enter your email" className='form-control' />
                                <button>
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-bar py-4 mt-5">
                    <div className="container">
                        <div className="text-center">
                            <p className="mb-0">Copyright © 2025. All Rights Reserved By <a href="#" style={{ color: '#28b0e2' }}>SkillLink</a></p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
