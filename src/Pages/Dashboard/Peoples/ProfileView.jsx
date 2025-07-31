import React, { useEffect, useState } from "react";

import user2 from '../../../assets/user-default-image.png';
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

function ProfileView() {

    
    const { id } = useParams();
    
    //variables
    
    const [userProfile, setuserProfile] = useState();
    const [skills, setSkills] = useState([]);
     const token = localStorage.getItem("token");
    useEffect(() => {
        // API URL 
        axios.get(`https://localhost:7113/api/Account/GetUserById/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                //    'Content-Type': 'application/json',
                }
            }
        )
            .then(response => {
                setuserProfile(response.data)
            })
            .catch(err => {
                console.error('Error fetching User :', err);
                alert('Failed to load User ');
                // navigate('/');
            });
    }, [id]) //remove navigte



    // Skills

    // useEffect(() => {
    //     axios.get("https://localhost:7113/api/skills")
    //         .then(res => {
    //             console.log("API response:", res.data);
    //             setSkills(res.data);
    //         })
    //         .catch(err => {
    //             console.error("Failed to fetch Skills:", err);
    //         });
    // }, [])



    const colors = [
        "#bf8c00ff",  // yellow
        "#0b1f75ff",  // blue
        "#920c92ff",  // pink
        "#046d6eff",  // teal
        "#bd8100ff",  // orange
        "#2ecc71",  // green
        "#e74c3c",  // red
    ];

    return (
        <>

            {
                userProfile != null ? (
                    <div className="d-flex flex-column gap-4">
                        <div className="p-5 bg-white border shadow rounded-3  mb-4">
                            <div className="d-flex gap-3 align-items-center">
                                <img src={userProfile.profileImageUrl} className="rounded-2 shadow-sm" width="100" height="100" />
                                <div className="d-flex flex-column">
                                    <h3 className="fs-1">{userProfile.fullName}</h3>

                                    <div className="d-flex gap-4 mt-1">
                                        <p className="text-muted mb-0"> <i className="bi bi-envelope"></i> <span>{userProfile.email}</span></p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="p-5 bg-white border shadow rounded-3">

                            <div className="pb-4 py-4 border-bottom d-flex gap-4 flex-wrap">
                                <p className="fs-3 fw-semibold"><i class="bi bi-file-text"></i> Total Posts - <span className="fw-bold">{userProfile.articlesCount}</span> </p>
                                <p className="fs-3 fw-semibold"> <i class="bi bi-heart"></i> Total Likes - <span className="fw-bold">{userProfile.LikesCount}</span> </p>
                            </div>

                            <div className="mt-4">
                                <h3 className="fw-semibold ">Expertise</h3>

                                <div className="dynamic-skills-section">
                                    <span style={{ background: colors[0] }}>HTML</span>
                                    <span style={{ background: colors[1] }}>CSS</span>
                                    <span style={{ background: colors[2] }}>JavaScript</span>
                                    <span style={{ background: colors[3] }}>Adobe XD</span>
                                    <span style={{ background: colors[4] }}>Photoshop</span>
                                    <span style={{ background: colors[5] }}>Figma</span>
                                    {/* {skills.map((skill, index) => (
                                        <span key={index} style={{
                                            backgroundColor: colors[index % colors.length],
                                        }} >
                                            {skill}
                                        </span>
                                    ))} */}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (

                    <p>Loading ...</p>
                )
            }


        </>
    )
}

export default ProfileView

