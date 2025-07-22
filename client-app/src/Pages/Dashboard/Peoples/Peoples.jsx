import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../../Components/UserContext';

import user1 from '../../../assets/user1.jpg';

function Peoples() {
    const [Peoples, setPeoples] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        fetchPeoples();
    }, []);

    const fetchPeoples = async () => {
        try {
            const response = await axios.get('https://localhost:7113/api/Account/GetAllUsers');
            setPeoples(response.data);
            console.log(response.data);
            console.log(user);

        }
        catch (error) {
            console.error('Error fetching Peoples :', error);
        }
    }

    return (
        <>
            <div className="">
                <div className="row">
                    {
                        Peoples.length > 0 ? (
                            <>
                                {Peoples.map((People, index) => {
                                    return (
                                        <div className="col-lg-4">
                                            <div key={index} className="shadow rounded-4 p-3 bg-white">
                                                <div className="d-flex align-items-center border-bottom pb-4">
                                                    <div
                                                        className="rounded-4 d-flex align-items-center justify-content-center"
                                                        style={{ backgroundColor: '#f5d85c', width: '130px', height: '130px' }}
                                                    >
                                                        <img src={People.profileImageUrl} className='w-100 h-100 rounded' alt="" />
                                                    </div>
                                                    <div className="ms-3">
                                                        <h5 className="mb-0 fs-2 fw-bold">{People.fullName}</h5>
                                                        <p className="text-muted mb-1">{People.userName}</p>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <span>Expertise</span>
                                                            <span>Skills</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-between align-items-end  mt-3">
                                                    <div>
                                                        <strong>Total Articles</strong>
                                                        <p className="mb-0">41</p>
                                                    </div>
                                                    <div>
                                                        <strong>Skills</strong>
                                                        <p className="mb-0">5</p>
                                                    </div>
                                                    <Link to='/dashboard/Peoples/Profile:id'>

                                                        <button
                                                            className="btn mt-3 rounded-3"
                                                            style={{ fontWeight: 500, backgroundColor: '#f5d85c' }}
                                                        >
                                                            Profile
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        ) : (<>
                            <p>No Profile Found</p>
                        </>)}
                </div>
            </div>
        </>
    )
}

export default Peoples