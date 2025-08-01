import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

function ListCategory() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://localhost:7113/api/Category');
            setCategories(response.data); // adjust this if your API returns nested data
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await axios.delete(`https://localhost:7113/api/Category/${id}`);
                fetchCategories(); // refresh the list after deletion
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    return (
        <div>
            <div className="pb-2 border-bottom d-flex justify-content-between">
                <h2 className="fs-1 Bricolage-font">
                    <i className="bi bi-tags me-3"></i>
                    Categories
                </h2>
                <Link to="/Admin/Categories/Create" className="btn btn-custom section-btn">
                    Add Category
                </Link>
            </div>

            <div className="my-5 bg-white p-4 shadow-sm rounded-lg">
                <table className="table table-bordered shadow-sm p-3 mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Categories</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <tr key={category.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{category.name}</td>
                                    <td className="icons">
                                        <Link to={`/Admin/Categories/Edit/${category.id}`} title="Edit">
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>

                                        
                                        <button
                                            onClick={() => handleDelete(category.id)}
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
                                <td colSpan="3" className="text-center">No categories found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListCategory;
