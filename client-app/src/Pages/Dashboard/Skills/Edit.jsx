import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../../Components/UserContext';
import axios from 'axios';

function EditUserSkills() {

  const { id } = useParams();


  const navigate = useNavigate();

  // Variables 
  const [Name, setName] = useState('');
  const [Rating, setRating] = useState('');
  const [Category, setCategory] = useState('');
  const [User, setUser] = useState('');
  const [Description, setDescription] = useState('');
  const [Categories, setCategories] = useState([]);


  const { user } = useUser();
  if (!user) {

    return <p>Loading user info...</p>;
  }


  // Dynamic Category
  useEffect(() => {
    axios.get("https://localhost:7113/api/Category")
      .then(res => {
        alert('got')
        console.log("API response:", res.data);
        setCategories(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch categories:", err);
      });
  }, [])


  const token = localStorage.getItem("token");


  useEffect(() => {
    axios.get(`https://localhost:7113/api/Skills/${id}`)
      .then(res => {
        setTitle(res.data.name);
        setDescription(res.data.description);
        setCategory(res.data.category);
        setRating(res.data.rating);
        setUser(res.data.user);
      })
      .catch(err => {
        console.error('Error fetching Skills :', err);
        alert('Failed to load Skills ');
        // navigate('/dashboard/Events/Manage');
      });


  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validations
    if (Name.trim() === '') return alert('Name is required');
    if (Description.trim() === '') return alert('Description is required');
    if (Rating.trim() === '') return alert('Skills Rating is required');
    if (Category.trim() === '') return alert('Category is required');


    let data = {
      name: Name,
      Description: Description,
      rating: Rating,
      user: User,
      category: Category
    };

    console.log(JSON.stringify(data, null, 2));

    console.log("Submitting Skills :", data);
    try {

      const response = await axios.post('https://localhost:7113/api/skill', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
      );

      if (response.status === 201 || response.status === 200) {
        alert('Skill Updated successfully!');
        navigate('');
      }

    } catch (error) {
      console.error('Error Updatting Skill:', error);
      alert('Failed to Updatting Skill' + error);
    }
  }
  return (
    <>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12 d-flex align-items-center stretch-card">
              <div className="d-flex justify-content-between align-items-center w-100">
                <h2 className='fs-1 Bricolage-font'>
                  <i className="bi bi-pencil-square me-3"></i>
                  Update Skills
                </h2>
                <Link to='/dashboard/UserSkill/Manage' className='btn section-btn btn-custom'>View Skills</Link>
              </div>
            </div>
          </div>

          <hr />

          <div className="col-md-8 offset-2 align-items-center stretch-card">
            <div className="card shadow border-0 rounded-lg mt-5">
              <div className="card-header">
                <h2 className="text-center font-weight-bold p-4 Bricolage-font">Update Skill</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className='pb-1'>Name</label>
                        <input type="text"
                          className="form-control"
                          name="name"
                          value={Name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder='Name' />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className='pb-1'>Description</label>
                        <textarea
                          className="form-control"
                          name="description"
                          value={Description}
                          onChange={(e) => { setDescription(e.target.value) }}
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                  </div>


                  {/* <div className="row mb-3">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className='pb-1'>Rating</label>
                        <input type="text"
                          className="form-control"
                          name="rating"
                          value={Rating}
                          onChange={(e) => setRating(e.target.value)}
                          placeholder='Rating' />
                      </div>
                    </div>
                  </div> */}

                  <div className="row mb-3">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className='pb-1'>Category</label>
                        <select className="form-control" value={Category} onChange={(e) => setCategory(e.target.value)} name="category">
                          <option value=''>Select Category</option>
                          {Categories.map((cat, index) => (
                            <option key={index} value={(cat.value || cat.name).replace(/\s+/g, '-')}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="d-flex gap-2 align-items-center">
                      <button type="submit" className="btn section-btn btn-custom">Update</button>
                      <Link className="btn btn-custom section-btn" to='/dashboard/UserSkill/Manage' style={{ background: '#333', color: 'white' }}>Cancel</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default EditUserSkills