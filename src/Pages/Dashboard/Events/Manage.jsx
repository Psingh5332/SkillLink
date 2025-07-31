import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

import eventimg from './../../../assets/service-image-3.jpg'

function ManageEvents() {


    const [Events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('https://localhost:7113/api/Event');
            setEvents(response.data);
        }
        catch (error) {
            console.error('Error fetching Events :', error);
        }
    }

    

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this Event?')) {
            try {
                await axios.delete(`https://localhost:7113/api/Event/${id}`);
                //fetchEvents();
                setEvents((prevEvents) => prevEvents.filter(event => event.id !== id)); // immediate removal
            } catch (error) {
                console.error('Error deleting Event:', error);
            }
        }
    };


   return (
        <div>
            <div className="pb-2 border-bottom d-flex justify-content-between">
                <h2 className="fs-1 Bricolage-font">
                    <i className="bi bi-list-ul me-3"></i>
                    Events
                </h2>
                <Link to="/dashboard/Events/Create" className="btn btn-custom section-btn">
                    Add Event
                </Link>
            </div>

            <div className="my-5 bg-white p-4 shadow-sm rounded-lg">

                <div className="row">
                    {
                        Events.length > 0 ? (
                            Events.map((Event, index) => (
                                <div className="user-events-view" key={index}>
                                    <div className="user-events-dateTime">
                                        <i className='bi bi-calendar fs-4'></i>
                                        <p className='mb-0 fs-3 fw-semibold event-date'>{Event.date}</p>
                                        <p className='mb-0'>{Event.time}</p>
                                    </div>
                                    <div className="user-events-image">
                                        <img src={Event.imageUrl} alt="" />
                                    </div>
                                    <div className="user-events-Content">
                                        <div className="d-flex align-items-center mb-2 gap-3 flex-wrap">
                                            <p className='event-category mb-0'>{Event.type}</p>

                                            <p><i className='bi bi-geo-alt-fill me-1'></i> {Event.location}</p>
                                        </div>

                                        <h4 className='fs-4'>{Event.title}</h4>
                                        <p>{Event.description}</p>

                                        <div className="Action-btn">
                                            <Link to={`/Dashboard/Events/Edit/${Event.id}`} title="Edit">
                                                <i class="bi bi-pencil-square"></i>
                                            </Link>

                                            <i className='bi bi-trash' onClick={() => handleDelete(Event.id)}></i>
                                        </div>

                                    </div>
                                </div>
                            ))

                        ) : (

                            <div>
                                <p colSpan="6" className="text-center">No Events found</p>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default ManageEvents;
