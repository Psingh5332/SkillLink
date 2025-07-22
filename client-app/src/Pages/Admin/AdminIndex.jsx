import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios  from 'axios';
function AdminIndex() {

     const [Users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://localhost:7113/api/Account/GetAllUsers');
            setUsers(response.data); 
        } catch (error) {
            console.error('Error fetching User :', error);
        }   
    };

    return (
        <>
            <div className='container-fluid p-0'>
                <h2 className='Bricolage-font fs-2' style={{ letterSpacing: "1px", fontWeight: '500' }}>Welcome Admin</h2>
                <div className="row mt-5">
                    <div className="col-xxl-3 col-xl-6">
                        <div className="card yellow-gradient shadow-sm rounded-2 p-4 d-flex justify-content-between flex-row" style={{ border: '1px solid rgb(254, 181, 34)' }}>
                            <h3 className='d-flex flex-column gap-2 fs-1' style={{ color: 'rgb(254, 181, 34)' }}> 25 <span className='fs-3 text-black'>Register Users</span> </h3>
                            <i className='bi bi-person admin-panel-icon text-white' style={{ background: 'rgb(254, 181, 34)' }}></i>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-xl-6">
                        <div className="card border blue-gradient shadow-sm rounded-2 p-4 d-flex justify-content-between flex-row">
                            <h3 className='d-flex flex-column gap-2 fs-1' style={{ color: 'rgb(18, 152, 255)' }}> 1000 <span className='fs-3 text-black'>Total Articles</span> </h3>
                            <i className='bi bi-journal-text admin-panel-icon text-white' style={{ background: 'rgb(18, 152, 255)' }}></i>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-xl-6">
                        <div className="card border red-gradient shadow-sm rounded-2 p-4 d-flex justify-content-between flex-row">
                            <h3 className='d-flex flex-column gap-2 fs-1' style={{ color: 'crimson' }}> 41 <span className='fs-3 text-black'>Total Events</span> </h3>
                            <i className='bi bi-calendar-check admin-panel-icon text-white' style={{ background: 'crimson' }}></i>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-xl-6">
                        <div className="card green-gradient shadow-sm rounded-2 p-4 d-flex justify-content-between flex-row" style={{ border: '1px solid rgb(58, 125, 46)' }}>
                            <h3 className='d-flex flex-column gap-2 fs-1' style={{ color: 'rgb(58, 125, 46)' }}> 79 <span className='fs-3 text-black'>Experts</span> </h3>
                            <i className='bi bi-person-square admin-panel-icon text-white' style={{ background: 'rgb(58, 125, 46)' }}></i>
                        </div>
                    </div>
                </div>

                {/* Register Users */}

                <div className="my-5 bg-white p-4 shadow-sm rounded-lg">
                   
                   <div className="pb-2 mb-4 border-bottom d-flex justify-content-between align-items-center">
                        <h4> <i className='bi bi-person'></i> Regiser Users</h4>
                        
                        <Link  className="btn btn-custom section-btn" to='/admin/User/List'>View </Link>

                   </div>
                   
                    

                    <table className="table table-bordered p-3">
                        <thead>
                            <tr>
                                <th scope="col">Sr No</th>
                                <th scope="col">Name</th>
                                 <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                               
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Users.length > 0 ?

                                    (
                                        Users.map((User, index) => (
                                            <tr key={User.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{User.fullName}</td>
                                                <td>{User.email}</td>
                                                <td>{User.phoneNumber}</td>
                                                <td className="icons">

                                                    <button
                                                        onClick={() => handleView(User.id)}
                                                        className="btn btn-link p-0 ms-2"
                                                        title="View"
                                                    >
                                                        <i class="bi bi-person-badge"></i>
                                                    </button>

                                                    <button
                                                        onClick={() => HandleBlock(User.id)}
                                                        className="btn btn-link p-0 ms-2"
                                                        title="Block"
                                                    >
                                                        <i class="bi bi-person-fill-slash text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) :

                                    (
                                        <tr>
                                            <td colSpan="5" className="text-center">No Users found</td>
                                        </tr>
                                    )}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default AdminIndex
