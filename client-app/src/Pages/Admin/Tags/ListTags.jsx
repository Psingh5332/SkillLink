import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

function ListTags() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const response = await axios.get('https://localhost:7113/api/Tags');
            setTags(response.data); // adjust this if your API returns nested data
        } catch (error) {
            console.error('Error fetching Tag:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this tag?')) {
            try {
                await axios.delete(`https://localhost:7113/api/Tags/${id}`);
                fetchTags(); // refresh the list after deletion
            } catch (error) {
                console.error('Error deleting Tag:', error);
            }
        }
    };

    return (
        <div>
            <div className="pb-2 border-bottom d-flex justify-content-between">
                <h2 className="fs-1 Bricolage-font">
                    <i className="bi bi-tags me-3"></i>
                    Tags
                </h2>
                <Link to="/Admin/Tags/CreateTags" className="btn btn-custom section-btn">
                    Add Tags
                </Link>
            </div>

            <div className="my-5 bg-white p-4 shadow-sm rounded-lg">
                <table className="table table-bordered shadow-sm p-3 mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Tags</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.length > 0 ? (
                            tags.map((tag, index) => (
                                <tr key={tag.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{tag.name}</td>
                                    <td className="icons">
                                        <Link to={`/Admin/Tags/EditTags/${tag.id}`} title="Edit">
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>

                                        
                                        <button
                                            onClick={() => handleDelete(tag.id)}
                                            className="btn btn-link p-0 ms-3"
                                            title="Delete"
                                        >
                                            <i className="bi bi-trash3 text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No tags found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListTags;
