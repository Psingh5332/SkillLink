import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ListUsers() {
    const [Users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://localhost:7113/api/Account/GetAllUsers');
            setUsers(response.data); // adjust this if your API returns nested data
        } catch (error) {
            console.error('Error fetching User :', error);
        }
    };

    const handleView = async (id) => {
        try {
            alert('user View')

        } catch (error) {
            console.error('Error View User :', error);
        }
    };

    const HandleBlock = async (id) => {
        try {
            alert('user blocked')
        } catch (error) {
            console.error('Error Block User :', error);
        }
    };



    return(
        <div>
            <div className="pb-2 border-bottom d-flex justify-content-between">
                <h2 className="fs-1 Bricolage-font">
                    <i className="bi bi-person me-3"></i>
                    Users
                </h2>

            </div>

            <div className="my-5 bg-white p-4 shadow-sm rounded-lg">
                <table className="table table-bordered shadow-sm p-3 mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
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
                                        <tr key={User.Id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{User.fullName}</td>
                                            <td>{User.userName}</td>
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
    );
}

export default ListUsers;
