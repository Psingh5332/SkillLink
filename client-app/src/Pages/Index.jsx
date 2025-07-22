import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import mq1 from '../assets/mq-01.jpg'
import mq2 from '../assets/mq-02.jpg'
import mq3 from '../assets/mq-03.jpg'
import mq4 from '../assets/mq-04.jpg'

import tst1 from '../assets/tst-user1.png'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';

import event1 from '../assets/event1.jpg'
import event2 from '../assets/event2.jpg'
import event3 from '../assets/event3.avif'

import bannervideo from '../assets/banner.mp4'
import { Link } from "react-router-dom";


import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

import Nav from "../Components/Nav/Nav";
import Footer from "../Components/Footer/Footer";
// Expert Section

import mentorImg01 from './../assets/mentorsmall_1.jpg'
import mentorImg02 from './../assets/mentorsmall_2.jpg'
import mentorImg03 from './../assets/mentorsmall_3.jpg'
import mentorImg04 from './../assets/mentorsmall_4.jpg'

function Index() {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.9;
        }
    }, []);


    const mentors = [
        {
            img: mentorImg01,
            name: "Esther Howard",
            role: "Marketing Manager",
            desc: "Esther brings 5+ years of marketing experience and has worked with top global brands.",
            exp: "5 Years",
            phone: "+1 125256523",
            email: "esther@example.com",
            social: {
                linkedin: "https://linkedin.com/in/estherhoward",
                facebook: "https://facebook.com/estherhoward",
                instagram: "https://instagram.com/esther.howard"
            }
        },
        {
            img: mentorImg02,
            name: "Floyd Miles",
            role: "Tech Lead",
            desc: "Floyd is a full-stack developer with deep expertise in React, Node, and cloud technologies.",
            exp: "7 Years",
            phone: "+1 555564987",
            email: "floyd@example.com",
            social: {
                linkedin: "https://linkedin.com/in/Floyd",
                facebook: "https://facebook.com/Floyd",
                instagram: "https://instagram.com/Floyd"
            }
        },
        {
            img: mentorImg03,
            name: "Leslie Alexander",
            role: "Data Analyst",
            desc: "Leslie specializes in data science, AI models, and statistical forecasting.",
            exp: "4 Years",
            phone: "+1 454812569",
            email: "leslie@example.com",
            social: {
                linkedin: "https://linkedin.com/in/Leslie",
                facebook: "https://facebook.com/Leslie",
                instagram: "https://instagram.com/Leslie"
            }
        },
        {
            img: mentorImg04,
            name: "Jenny Wilson",
            role: "UI/UX Designer",
            desc: "Wilson designs interfaces with a focus on accessibility and beauty.",
            exp: "6 Years",
            phone: "+1 998822336",
            email: "jenny@example.com",
            social: {
                linkedin: "https://linkedin.com/in/Jenny",
                facebook: "https://facebook.com/Jenny",
                instagram: "https://instagram.com/Jenny"
            }
        },
        {
            img: mentorImg01,
            name: "Kinky Alexander",
            role: "UI/UX Designer",
            desc: "Jenny designs intuitive user interfaces with a focus on accessibility and beauty.",
            exp: "4.5 Years",
            phone: "+1 98657845",
            email: "jenny@example.com",
            social: {
                linkedin: "https://linkedin.com/in/Kinky",
                facebook: "https://facebook.com/Kinky",
                instagram: "https://instagram.com/Kinky"
            }
        },
        {
            img: mentorImg02,
            name: "lochin Kinky",
            role: "AI Expert",
            desc: "Jenny designs intuitive user interfaces with a focus on accessibility and beauty.",
            exp: "6 Years",
            phone: "+1 98745698",
            email: "jenny@example.com",
            social: {
                linkedin: "https://linkedin.com/in/lochin",
                facebook: "https://facebook.com/lochin",
                instagram: "https://instagram.com/lochin"
            }
        },
    ];

    const [activeMentor, setActiveMentor] = useState(mentors[0]);

    const handleMentorClick = (mentor) => {
        setActiveMentor(mentor);
    };

    const heroRef = useRef(null);
    const expertRef = useRef(null);
    const eventsRef = useRef(null);
    const knowledgeRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToRef = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <Nav
                onHomeClick={() => scrollToRef(heroRef)}
                onExpertClick={() => scrollToRef(expertRef)}
                onEventsClick={() => scrollToRef(eventsRef)}
                onKnowledgeClick={() => scrollToRef(knowledgeRef)}
                onContactClick={() => scrollToRef(contactRef)}
            />

            {/* hero */}
            <div className="hero" ref={heroRef}>
                <div className="section-content hero-content">
                    <span className='sub-title'>learn something new</span>
                    <h1 className='section-title'>Develop Your Skills and Advance <span>Your Career</span></h1>
                    <p className='text-muted fs-5 mb-4'>
                        Grow your abilities, gain confidence, and take the next step in your career journey.
                    </p>
                    <a href="#">
                        <button className='btn btn-custom hero-btn'>
                            Join Now
                        </button>
                    </a>
                </div>
                <div className="hero-image">
                </div>
            </div>

            {/* marquee */}
            <div className="marquee-section">
                <Marquee gradient={false} speed={50} pauseOnHover={true}>
                    {[
                        { image: mq1, text: "Expertise" },
                        { image: mq2, text: "Skills" },
                        { image: mq3, text: "Events" },
                        { image: mq4, text: "knowledge" },
                    ].map((item, index) => (
                        <div className="mq-box" key={index}>
                            <div className="mq-image">
                                <img src={item.image} alt="marquee-image" />
                            </div>
                            <div className="mq-content">
                                <span>{item.text}</span>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>

            {/* Expert */}
            <div className="section expert-container" ref={expertRef}>
                <div className="container">
                    <div className="section-content text-start">
                        <span className='sub-title'>Learn From the Best</span>
                        <h1 className="section-title mt-3">Learn From Certified <br /> Industry Professionals</h1>
                    </div>

                    <div className="container p-4 expert-wrapper rounded-4">
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="row h-100">
                                    <div className="col-md-5 mantor-image-view rounded-4">
                                        <img src={activeMentor.img} alt={activeMentor.name} className="rounded-4 img-fluid" />
                                    </div>
                                    <div className="col-md-7">
                                        <div className="d-flex flex-column align-items-start g-2 p-2">
                                            <span className="text-black fs-5 fw-semibold mt-4 text-uppercase">{activeMentor.role}</span>
                                            <span className="text-black fs-1 fw-semibold mt-1 text-uppercase text-name">{activeMentor.name}</span>
                                            <p className="mt-2">{activeMentor.desc}</p>
                                            <ul className="m-0 p-0">
                                                <li className="mt-3 fw-semibold">Experience : <span className="fw-normal">{activeMentor.exp}</span></li>
                                                <li className="mt-4 fw-semibold">Phone : <span className="fw-normal">{activeMentor.phone}</span></li>
                                                <li className="mt-4 fw-semibold">Email : <span className="fw-normal">{activeMentor.email}</span></li>
                                                <li className="mt-4 fw-semibold">
                                                    Social Media:
                                                    {activeMentor.social?.linkedin && (
                                                        <a href={activeMentor.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-decoration-none fs-6 text-black fw-normal ms-2">
                                                            <i className="ri-linkedin-line"></i>
                                                        </a>
                                                    )}
                                                    {activeMentor.social?.facebook && (
                                                        <a href={activeMentor.social.facebook} target="_blank" rel="noopener noreferrer" className="text-decoration-none fs-6 text-black fw-normal ms-2">
                                                            <i className="ri-facebook-line"></i>
                                                        </a>
                                                    )}
                                                    {activeMentor.social?.instagram && (
                                                        <a href={activeMentor.social.instagram} target="_blank" rel="noopener noreferrer" className="text-decoration-none fs-6 text-black fw-normal ms-2">
                                                            <i className="ri-instagram-line"></i>
                                                        </a>
                                                    )}
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-5">
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={30}
                                    pagination={{ clickable: true }}
                                    modules={[Pagination]}
                                >

                                    {[0, 1].map((slideIndex) => (
                                        <SwiperSlide key={slideIndex}>
                                            <div className="row g-3 mt-0 mt-md-5">
                                                {mentors.slice(slideIndex * 4, slideIndex * 4 + 4).map((mentor, i) => (
                                                    <div className="col-6" key={i}>
                                                        <div
                                                            className="mentor-image rounded-3"
                                                            onClick={() => handleMentorClick(mentor)}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <img src={mentor.img} className="d-inline-block img-fluid rounded-3" alt={mentor.name} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Events section */}
            <div className="event-container section" ref={eventsRef}>
                <div className="container">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-xl-6">
                            <div className="section-content text-start">
                                <span className='sub-title'>Events</span>
                                <h1 className="section-title mt-3">Learn, Connect, Grow One Event at a Time.</h1>
                            </div>
                        </div>

                        <div className="col-xl-6">
                            <div className="expert-splide">
                                <Splide
                                    options={{
                                        type: 'loop',
                                        direction: 'ttb',
                                        height: '350px',
                                        className: "splide-main",
                                        perPage: 1,
                                        arrows: false,
                                        pagination: false,
                                        autoScroll: {
                                            speed: 7,
                                            pauseOnHover: true,
                                        },
                                        breakpoints: {
                                            991: {
                                                height: '450px',
                                                direction: 'ltr',
                                                className: "pb-5 mb-5",
                                                autoScroll: {
                                                    speed: 2,
                                                    pauseOnHover: true,
                                                },
                                            },
                                            500: {
                                                height: 'auto',
                                            },
                                        },
                                    }}
                                    extensions={{ AutoScroll }}
                                    className="p-2 h-100"
                                >
                                    <SplideSlide>
                                        <div className="expert-item p-4 blue-gradient rounded-3 m-2 d-flex align-items-center gap-4">
                                            <img src={event1} alt="expert-image" />
                                            <div className="expert-content">
                                                <ul className="mb-2 d-flex align-items-center p-0 gap-2">
                                                    <li>
                                                        <span>date</span> :
                                                        12/10/2025
                                                    </li>
                                                    <li>
                                                        <span>time</span> :
                                                        10:00 Am
                                                    </li>
                                                </ul>
                                                <h4 className="m-0">artificial intelligence</h4>
                                                <p className="fs-6 mt-2">
                                                    Discover the power of AI through expert-led events, hands-on sessions, and real-world insights. Step into the future with smart technology.
                                                </p>
                                            </div>
                                        </div>
                                    </SplideSlide>

                                    <SplideSlide>
                                        <div className="expert-item p-4 rounded-3 m-2 red-gradient d-flex align-items-center gap-4">
                                            <img src={event2} alt="expert-image" />
                                            <div className="expert-content">
                                                <ul className="mb-2 d-flex align-items-center p-0 gap-2">
                                                    <li>
                                                        <span>date</span> :
                                                        10/10/2025
                                                    </li>
                                                    <li>
                                                        <span>time</span> :
                                                        10:00 Am
                                                    </li>
                                                </ul>
                                                <h4 className="m-0">DesignVerse: Creators Connect</h4>
                                                <p className="fs-6 mt-2">
                                                    Unleash your creativity at this UI/UX design event featuring live prototyping, case studies, and portfolio reviews.
                                                </p>
                                            </div>
                                        </div>
                                    </SplideSlide>

                                    <SplideSlide>
                                        <div className="expert-item p-4 rounded-3 m-2 orange-gradient d-flex align-items-center gap-4">
                                            <img src={event3} alt="expert-image" />
                                            <div className="expert-content">
                                                <ul className="mb-2 d-flex align-items-center p-0 gap-2">
                                                    <li>
                                                        <span>date</span> :
                                                        14/10/2025
                                                    </li>
                                                    <li>
                                                        <span>time</span> :
                                                        10:00 Am
                                                    </li>
                                                </ul>
                                                <h4 className="m-0">CloudLaunch: Deploy the Future</h4>
                                                <p className="fs-6 mt-2">
                                                    Get hands-on with cloud infrastructure, DevOps workflows, and scaling applications in real-world cloud environments.
                                                </p>
                                            </div>
                                        </div>
                                    </SplideSlide>

                                </Splide>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* service */}
            <div className="service-container section" ref={knowledgeRef}>
                <div className="container">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-lg-10 mb-4">
                            <div className="section-content">
                                <span className='sub-title'>Our Knowledge</span>
                                <h1 className="section-title mt-3">Explore The Knowledge</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-4 col-lg-6 mb-3 mb-5">
                            <div className="service-card">
                                <i className='bi bi-cpu fs-1 mb-4'></i>
                                <div className="service-card-content">
                                    <h2 className="mt-1 mb-2">Technology</h2>
                                    <p>Innovate smarter with the latest in tech trends, tools, and digital solutions.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 mb-3 mb-5">
                            <div className="service-card">
                                <i className="fa-solid fa-dumbbell fs-1"></i>
                                <div className="service-card-content">
                                    <h2 className="mt-1 mb-2">Fitness</h2>
                                    <p>Build strength and endurance with expert tips on exercise and healthy habits.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 mb-3 mb-5">
                            <div className="service-card">
                                <i className='bi bi-heart-pulse fs-1'></i>
                                <div className="service-card-content">
                                    <h2 className="mt-1">Health</h2>
                                    <p>Prioritize your well-being with guidance on mental and physical health.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 mb-3 mb-5">
                            <div className="service-card">
                                <i className='bi bi-geo-alt-fill fs-1'></i>
                                <div className="service-card-content">
                                    <h2 className="mt-1">Travel</h2>
                                    <p>Explore new destinations and create unforgettable outdoor adventures.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 mb-3 mb-5">
                            <div className="service-card">
                                <i className='bi bi-dice-5-fill fs-1'></i>
                                <div className="service-card-content">
                                    <h2 className="mt-1">Gaming</h2>
                                    <p>Dive into interactive worlds, latest game releases, and creative gameplay.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 mb-3 mb-5">
                            <div className="service-card">
                                <i className="bi bi-openai fs-1"></i>
                                <div className="service-card-content">
                                    <h2 className="mt-1">AI</h2>
                                    <p>Discover the future of automation, data, and intelligent systems with AI.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a href="#" className='w-100 d-flex justify-content-center text-decoration-none'>
                        <button className='btn btn-custom shadow btn-service'>Explore More</button>
                    </a>
                </div>
            </div>

            {/* banner */}
            <div className="banner w-100" ref={contactRef}>
                <div className="banner-content p-2 p-md-5">
                    <h2 className="mb-5">Level Up Your Skills, Anytime, Anywhere.</h2>
                    <Link to="/">
                        <button className="btn btn-custom banner-btn shadow">
                            Join SkillLink
                        </button>
                    </Link>
                </div>
                <div className="row h-100">
                    <div className="col-12 h-100">
                        <video
                            className="banner-video w-100"
                            autoPlay
                            muted
                            loop
                            ref={videoRef}
                            playsInline
                        >
                            <source src={bannervideo} type="video/mp4" className='w-100' />
                        </video>
                    </div>
                </div>
            </div>

            {/* testimonials */}
            <div className='testimonials-container section'>
                <div className="container">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <div className="section-content">
                                <span className='sub-title'>testimonials</span>
                                <h1 className="section-title mt-3">What Our community say</h1>
                                <p>Over 2200+ members trust SkillLink to power up their careers.</p>
                                <button className='btn btn-custom tst-btn'>View More</button>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="tst-swiper w-100">
                                <Swiper
                                    spaceBetween={30}
                                    slidesPerView={2}
                                    className='p-2'
                                    breakpoints={{
                                        1399: {
                                            slidesPerView: 2
                                        },
                                        991: {
                                            slidesPerView: 1.5,
                                        },
                                        575: {
                                            slidesPerView: 1.2,
                                        },
                                        0: {
                                            slidesPerView: 1,
                                        }
                                    }}
                                >
                                    <SwiperSlide>
                                        <div className="testimonials-item text-center p-4 w-100">
                                            <i className="bi bi-quote fs-1"></i>
                                            <h4 className='text-uppercase'>It is Working!</h4>
                                            <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit velit sit a exercitationem porro culpa commodi!</p>
                                            <div className="tst-user mt-5">
                                                <img src={tst1} alt="tst-user" width={70} height={70} className='img-fluid' />
                                                <div className="tst-user-content">
                                                    <h3>Jay Meghani</h3>
                                                    <span>User</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className="testimonials-item text-center p-4 w-100">
                                            <i className="bi bi-quote fs-1"></i>
                                            <h4 className='text-uppercase'>It is Working!</h4>
                                            <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit velit sit a exercitationem porro culpa commodi!</p>
                                            <div className="tst-user mt-5">
                                                <img src={tst1} alt="tst-user" width={70} height={70} className='img-fluid' />
                                                <div className="tst-user-content">
                                                    <h3>Jay Meghani</h3>
                                                    <span>User</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className="testimonials-item text-center p-4 w-100">
                                            <i className="bi bi-quote fs-1"></i>
                                            <h4 className='text-uppercase'>It is Working!</h4>
                                            <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit velit sit a exercitationem porro culpa commodi!</p>
                                            <div className="tst-user mt-5">
                                                <img src={tst1} alt="tst-user" width={70} height={70} className='img-fluid' />
                                                <div className="tst-user-content">
                                                    <h3>Jay Meghani</h3>
                                                    <span>User</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Index
