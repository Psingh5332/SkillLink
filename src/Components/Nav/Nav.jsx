import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png'

function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 180);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`navbar navbar-expand-lg py-3 fixed-top ${scrolled ? 'navbar-scrolled' : ''}`}>
                <div className="container navbar-col">
                    <Link className="navbar-brand logo" to="/">
                        <img src={logo} alt="" />
                    </Link>

                    <button className="navbar-toggler bg-light ms-auto nav-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav nav-menu mb-2 mb-lg-0">
                            <li className="nav-item"><Link to="/" className='nav-link'>Home</Link></li>
                            <li className="nav-item"><Link to="/Expert" className='nav-link'>Expert</Link></li>
                            <li className="nav-item"><Link to="/" className='nav-link'>Events</Link></li>
                            <li className="nav-item"><Link to="/" className='nav-link'>Knowledge Base</Link></li>
                            <li className="nav-item"><Link to="/" className='nav-link'>Contact</Link></li>
                        </ul>
                    </div>

                    <Link to="/Login" className='text-decoration-none'>
                        <button className='btn btn-custom nav-btn d-none d-lg-block'>Login</button>
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default Nav;
