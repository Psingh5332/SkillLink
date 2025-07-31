import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Nav({ onHomeClick, onExpertClick, onEventsClick, onKnowledgeClick, onContactClick }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 180);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <>
            <nav className={`navbar-index navbar-expand-lg py-3 fixed-top ${scrolled ? 'navbar-scrolled' : ''}`}>
                <div className="container navbar-col">
                    <Link className="navbar-brand logo" to="/">
                        <img src={logo} alt="logo" />
                    </Link>

                    {/* Toggle Button */}
                    <button
                        className="navbar-toggler ms-auto nav-toggle"
                        type="button"
                        onClick={toggleMenu}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapse Menu */}
                    <div className={`collapse navbar-collapse justify-content-center ${menuOpen ? 'show' : ''}`}>
                        <ul className="navbar-nav nav-menu mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" onClick={() => { onHomeClick(); setMenuOpen(false); }}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " onClick={() => { onExpertClick(); setMenuOpen(false); }}>
                                    Expert
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link  " onClick={() => { onEventsClick(); setMenuOpen(false); }}>
                                    Events
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " onClick={() => { onKnowledgeClick(); setMenuOpen(false); }}>
                                    Knowledge Base
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={() => { onContactClick(); setMenuOpen(false); }}>
                                    Contact
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Login" className='text-decoration-none'>
                                    <button className='btn btn-custom nav-btn d-block d-lg-none'>Login</button>
                                </Link>
                            </li>
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
