import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      alert('Skill name is required');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7113/api/Skills', {
        name: name
      });

      if (response.status === 201 || response.status === 200) {
        alert('Category created successfully!');
        navigate('/Admin/Skills/List');
      }
    } catch (error) {
      console.error('Error creating skill:', error);
      alert('Failed to create Skill');
    }
  };

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12 d-flex align-items-center stretch-card">
            <div className="d-flex justify-content-between align-items-center w-100">
              <h2 className='fs-1 Bricolage-font'>
                <i className="bi bi-pencil-square me-3"></i>
                Skills
              </h2>
              <Link to='/Admin/Skills/List' className='btn section-btn btn-custom'>View Skills</Link>
            </div>
          </div>
        </div>

        <hr />

        <div className="col-md-8 offset-2 align-items-center stretch-card">
          <div className="card shadow border-0 rounded-lg mt-5">
            <div className="card-header">
              <h2 className="text-center font-weight-bold p-4 Bricolage-font">Add Skill</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className='pb-1'>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="d-flex gap-2 align-items-center">
                    <button type="submit" className="btn section-btn btn-custom">Create</button>
                    <Link className="btn btn-custom section-btn" to='/Admin/Categories/ListCategories' style={{ background: '#333', color: 'white' }}>Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;