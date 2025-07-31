// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function MySkillsManage() {

//     const [Skills, setSkills] = useState([]);

//     useEffect(() => {
//         fetchSkills();
//     }, []);

//     const fetchSkills = async () => {
//         try {
//             const response = await axios.get('https://localhost:7113/api/Skills');
//             setSkills(response.data);
//         }
//         catch (error) {
//             console.error('Error fetching User Skills :', error);
//         }
//     }

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this Skill ?')) {
//             try {
//                 await axios.delete(`https://localhost:7113/api/skill/${id}`);
//                 setSkills((prev) => prev.filter(skill => skill.id !== id)); // immediate removal
//             } catch (error) {
//                 console.error('Error deleting User Skill :', error);
//             }
//         }
//     };

//     return (
//         <>
//             <div className="pb-2 border-bottom d-flex justify-content-between">
//                 <h2 className="fs-1 Bricolage-font">
//                     <i className="bi bi-list-ul me-3"></i>
//                     My Skills
//                 </h2>
//                 <Link to="/Dashboard/UserSkill/Add" className="btn btn-custom section-btn">
//                     Add Skill
//                 </Link>
//             </div>

//             <div className="my-5 bg-white p-4 shadow-sm rounded-lg">
//                 <table class="table">
//                     <thead>
//                         <tr>
//                             <th scope="col">Sr No</th>
//                             <th scope="col">Name</th>
//                             <th scope="col">Description</th>
//                             <th scope="col">Category</th>
//                             <th scope="col">Rating</th>
//                             <th scope="col">User</th>
//                             <th scope="col">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             Skills.length > 0 ? (
//                                 <>
//                                     {
//                                         Skills.map((skill, index) => {
//                                             return (
//                                                 <tr key={index}>
//                                                     <td scope="row">
//                                                         <span className="fs-5">{index + 1}</span>
//                                                     </td>
//                                                     <td>
//                                                         <span className="fs-5">{skill.name}</span>
//                                                     </td>
//                                                     <td>
//                                                         <span className="fs-5">{skill.description}</span>
//                                                     </td>
//                                                     <td>
//                                                         <span className="fs-5">{skill.Category}</span>
//                                                     </td>
//                                                     <td>
//                                                         <span className="fs-5">{skill.rating}</span>
//                                                     </td>
//                                                     <td>
//                                                         <span className="fs-5">{skill.user}</span>
//                                                     </td>
//                                                     <td>
//                                                         <div className="d-flex gap-2">
//                                                             <Link to={`/Dashboard/UserSkill/Edit/${skill.id}`} title="Edit">
//                                                                 <i class="bi bi-pencil-square fs-5 text-black me-2" ></i>
//                                                             </Link>

//                                                             <i className='bi bi-trash fs-5 text-black' onClick={() => handleDelete(skill.id)}></i>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             )
//                                         })
//                                     }
//                                 </>
//                             ) : (
//                                 <>
//                                     <tr>
//                                         <td colSpan="7" className="text-center"> No User Skills </td>
//                                     </tr>
//                                 </>
//                             )
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     )
// }

// export default MySkillsManage



import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MySkillsManage() {

    const [Skills, setSkills] = useState([]);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await axios.get('https://localhost:7113/api/Skills');
            setSkills(response.data);
        }
        catch (error) {
            console.error('Error fetching User Skills :', error);
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this Skill ?')) {
            try {
                await axios.delete(`https://localhost:7113/api/skill/${id}`);
                setSkills((prev) => prev.filter(skill => skill.id !== id)); // immediate removal
            } catch (error) {
                console.error('Error deleting User Skill :', error);
            }
        }
    };

    return (
        <>
            <div className="pb-2 border-bottom d-flex justify-content-between">
                <h2 className="fs-1 Bricolage-font">
                    <i className="bi bi-list-ul me-3"></i>
                    My Skills
                </h2>
                <Link to="/Dashboard/UserSkill/Add" className="btn btn-custom section-btn">
                    Add Skill
                </Link>
            </div>

            <div className="my-5 bg-white p-4 shadow-sm rounded-lg">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">Rating</th>
                            <th scope="col">User</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Skills.length > 0 ? (
                                <>
                                    {
                                        Skills.map((skill, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td scope="row">
                                                        <span className="fs-5">{index + 1}</span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-5">{skill.name}</span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-5">{skill.description}</span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-5">{skill.Category}</span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-5">{skill.rating}</span>
                                                    </td>
                                                    <td>
                                                        <span className="fs-5">{skill.user}</span>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <Link to={`/Dashboard/UserSkill/Edit/${skill.id}`} title="Edit">
                                                                <i class="bi bi-pencil-square fs-5 text-black me-2" ></i>
                                                            </Link>

                                                            <i className='bi bi-trash fs-5 text-black' onClick={() => handleDelete(skill.id)}></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </>
                            ) : (
                                <>
                                    <tr>
                                        <td colSpan="7" className="text-center"> No User Skills </td>
                                    </tr>
                                </>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MySkillsManage