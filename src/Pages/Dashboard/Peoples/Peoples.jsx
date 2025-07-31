import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../../Components/UserContext';
import ProfileView from './ProfileView'

import user1 from '../../../assets/user1.jpg';

function Peoples() {
    const [Peoples, setPeoples] = useState([]);
    const { user } = useUser();
    useEffect(() => {
        fetchPeoples();
    }, []);

    const colors = [
        ['#fff', '#f9d5a7'],
        ['#fff', '#c1d7ff'],
        ['#fff', '#d6bbf5'],
        ['#fff', '#72d9e1'],
        ['#fff', '#f7d97c'],
        ['#fff', '#dcedc1'],
        ['#fff', '#f7d6d6'],
    ];

    const fetchPeoples = async () => {
        try {
            const response = await axios.get('https://localhost:7113/api/Account/GetAllUsers');
            setPeoples(response.data);
            console.log("peoples: -", response.data);
            console.log(user);

        }
        catch (error) {
            console.error('Error fetching Peoples :', error);
        }
    }

    const [searchUser, setsearchUser] = useState('');

    return (
        <>
            <div className="">
                <div className="">
                    <div className="my-4 col-lg-5">
                        <h2>Search User</h2>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="form-control"
                            value={searchUser}
                            onChange={(e) => setsearchUser(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    {
                        Peoples.length > 0 ? (
                            <>
                                {
                                    Peoples.filter((people) =>
                                        people.fullName?.toLowerCase().includes(searchUser.toLowerCase()) ||
                                        people.userName?.toLowerCase().includes(searchUser.toLowerCase())
                                    ).length > 0 ? (
                                        Peoples.filter((people) =>
                                            people.fullName?.toLowerCase().includes(searchUser.toLowerCase()) ||
                                            people.userName?.toLowerCase().includes(searchUser.toLowerCase())
                                        ).map((People, index) => {
                                            return (
                                                <div className="col-lg-4">
                                                    <div key={index}
                                                        style={{
                                                            background: `linear-gradient(135deg, ${colors[index % colors.length][0]} 40%, ${colors[index % colors.length][1]})`
                                                        }}
                                                        className="shadow rounded-4 p-3">
                                                        <div className="d-flex align-items-center border-bottom pb-4">
                                                            <div
                                                                className="rounded-4 d-flex align-items-center justify-content-center"
                                                                style={{ backgroundColor: '#a1986eff', width: '130px', height: '130px' }}
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
                                                            <Link to={`/dashboard/Peoples/ProfileView/${People.id}`}>

                                                                <button
                                                                    className="btn mt-3 rounded-3 bg-black text-white"
                                                                >
                                                                    Profile
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <p className='alert alert-danger'>No User Found</p>
                                    )
                                }
                            </>
                        ) : (
                            <p>No Profile Found</p>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Peoples