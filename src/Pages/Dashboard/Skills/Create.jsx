// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { useUser } from '../../../Components/UserContext';
// import axios from 'axios';

// function CreateUserSkill() {

//   const navigate = useNavigate();

//   // Variables 
//   const [Name, setName] = useState('');
//   const [Rating, setRating] = useState('5');
//   const [Category, setCategory] = useState('');
//   const [User, setUser] = useState('');
//   const [Description, setDescription] = useState('');
//   const [Categories, setCategories] = useState([]);


//   const { user } = useUser();
//   if (!user) {

//     return <p>Loading user info...</p>;
//   }


//   // Dynamic Category
//   useEffect(() => {
//     axios.get("https://localhost:7113/api/Category")
//       .then(res => {
//         console.log("API response:", res.data);
//         setCategories(res.data);
//       })
//       .catch(err => {
//         console.error("Failed to fetch categories:", err);
//       });
//   }, [])


//   const token = localStorage.getItem("token");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     //Validations
//     if (Name.trim() === '') return alert('Name is required');
//     if (Description.trim() === '') return alert('Description is required');
//     // if (Rating.trim() === '') return alert('Skills Rating is required');
//     if (Category.trim() === '') return alert('Category is required');


//     let data = {
//       name: Name,
//       Description: Description,
//       // rating: Rating,
//       user: User,
//       category: Category
//     };

   
//     try {

//        console.log(JSON.stringify(data, null, 2));

//     console.log("Submitting Skills :", data);
//     console.log("Submitting Skills :", user.userName);

//       const response = await axios.post('', data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         }
//       }


//       );

//       if (response.status === 201 || response.status === 200) {
//         alert('Skill created successfully!');
//         navigate('');
//       }

//     } catch (error) {
//       console.error('Error creating Skill:', error);
//       alert('Failed to create Skill' + error);
//     }
//   }

//   return (
//     <>
//       <div className="main-panel">
//         <div className="content-wrapper">
//           <div className="row">
//             <div className="col-md-12 d-flex align-items-center stretch-card">
//               <div className="d-flex justify-content-between align-items-center w-100">
//                 <h2 className='fs-1 Bricolage-font'>
//                   <i className="bi bi-pencil-square me-3"></i>
//                   Create Skills
//                 </h2>
//                 <Link to='/Dashboard/UserSkill/Manage' className='btn section-btn btn-custom'>View Skills</Link>
//               </div>
//             </div>
//           </div>

//           <hr />

//           <div className="col-md-8 offset-2 align-items-center stretch-card">
//             <div className="card shadow border-0 rounded-lg mt-5">
//               <div className="card-header">
//                 <h2 className="text-center font-weight-bold p-4 Bricolage-font">Create Skill</h2>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row mb-3">
//                     <div className="col-md-12">
//                       <div className="form-group">
//                         <label className='pb-1'>Name</label>
//                         <input type="text"
//                           className="form-control"
//                           name="name"
//                           value={Name}
//                           onChange={(e) => setName(e.target.value)}
//                           placeholder='Name' />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row mb-3">
//                     <div className="col-md-12">
//                       <div className="form-group">
//                         <label className='pb-1'>Description</label>
//                         <textarea
//                           className="form-control"
//                           name="description"
//                           value={Description}
//                           onChange={(e) => { setDescription(e.target.value) }}
//                           rows="3"
//                         ></textarea>
//                       </div>
//                     </div>
//                   </div>


//                   {/* <div className="row mb-3">
//                     <div className="col-md-12">
//                       <div className="form-group">
//                         <label className='pb-1'>Rating</label>
//                         <input type="text"
//                           className="form-control"
//                           name="rating"
//                           value={Rating}
//                           onChange={(e) => setRating(e.target.value)}
//                           placeholder='Rating' />
//                       </div>
//                     </div>
//                   </div> */}

//                   <div className="row mb-3">
//                     <div className="col-md-12">
//                       <div className="form-group">
//                         <label className='pb-1'>Category</label>
//                         <select className="form-control" value={Category} onChange={(e) => setCategory(e.target.value)} name="category">
//                           <option value=''>Select Category</option>
//                           {Categories.map((cat, index) => (
//                             <option key={index} value={(cat.value || cat.name).replace(/\s+/g, '-')}>
//                               {cat.name}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row mt-3">
//                     <div className="d-flex gap-2 align-items-center">
//                       <button type="submit" className="btn section-btn btn-custom">Create</button>
//                       <Link className="btn btn-custom section-btn" to='/dashboard/UserSkill/Manage' style={{ background: '#333', color: 'white' }}>Cancel</Link>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default CreateUserSkill








import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../../Components/UserContext';

import defaultimage from '../../../assets/defalutimage.jpeg';
import axios from 'axios';

function CreateUserSkill() {

  const navigate = useNavigate();

  // Variables 
  const [Name, setName] = useState('');
  const [Rating, setRating] = useState();
  const [Category, setCategory] = useState([]);
  const [Duration, setDuration] = useState('');
  const [Description, setDescription] = useState('');
  const [Categories, setCategories] = useState([]);
  const [uploadedImagePath, setUploadedImagePath] = useState('');
  const [previewUrl, setPreviewUrl] = useState(defaultimage);

  const { user } = useUser();
  if (!user) {

    return <p>Loading user info...</p>;
  }


  // Dynamic Category
  useEffect(() => {
    axios.get("https://localhost:7113/api/Category")
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch categories:", err);
      });
  }, [])

  const handleImageChange = async (e) => {

    const file = e.target.files[0];

    if (!file) {
      alert("Please select an image.");
      return;
    }

    // Show preview
    setPreviewUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('File', file); // 'file' should match your API's expected field name
    formData.append("FileName", file.name);
    formData.append("FileDescription", "event image uplaoded ")

    try {

      const response = await axios.post('https://localhost:7113/api/Images/Upload',
        formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
      );

      if (response.status === 201 || response.status === 200) {
        const uploadedPath = response.data.filePath || response.data.url || response.data.imagePath;

        if (uploadedPath) {
          setUploadedImagePath(uploadedPath); // Save image path for event creation
        } else {
          throw new Error("Image upload did not return a valid file path.");
        }

        alert('Image uploaded successfully!' + uploadedImagePath);
      }



    } catch (error) {
      console.error('Error creating Event:', error);
      alert('Failed to create Event' + error);
    }
  };


  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validations
    if (Name.trim() === '') return alert('Name is required');
    if (Description.trim() === '') return alert('Description is required');
    // if (Rating.trim() === '') return alert('Skills Rating is required');
    // if (Category.trim() === '') return alert('Category is required');
    if (uploadedImagePath === '') return alert('Event Image is required');
  
    console.log(user)

    let data = {
      name: Name,
      description: Description,
      rating: Rating,
      thumbnailUrl: uploadedImagePath,
      categoryId: Category,
      duration: Duration,
      UserId :user.userId

    };
    console.log(data)

    try {
      const response = await axios.post('https://localhost:7113/api/UserSkill/Create', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }


      );

      if (response.status === 201 || response.status === 200) {
        alert('Skill created successfully!');
        navigate('');
      }

    } catch (error) {
      console.error('Error creating Skill:', error);
      alert('Failed to create Skill' + error);
      console.log('Failed to create Skill: ' + (error.response?.data || error.message));
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
                  Create Skills
                </h2>
                <Link to='/Dashboard/UserSkill/Manage' className='btn section-btn btn-custom'>View Skills</Link>
              </div>
            </div>
          </div>

          <hr />

          <div className="col-md-8 offset-2 align-items-center stretch-card">
            <div className="card shadow border-0 rounded-lg mt-5">
              <div className="card-header">
                <h2 className="text-center font-weight-bold p-4 Bricolage-font">Create Skill</h2>
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
                      <label className="pb-1">Upload Image</label>
                      <input
                        name="file"
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4 mb-3">
                    <div style={{ height: '150px', width: '200px', objectFit: 'cover' }}>
                      <img
                        src={previewUrl}
                        alt="Event Preview"
                        className="w-100 h-100 rounded object-fit-cover border"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='pb-1'>Category</label>
                           {/* <select className="form-control" multiple onChange={(e) => {
                          const selected = Array.from(e.target.selectedOptions, option => ({
                            text: option.text,
                            value: option.value,
                            selected: true
                          }));
                          setCategory(selected);
                        }}
                          name="category">
                          <option value=''>Select Category</option>
                          {Categories.map((cat, index) => (
                            <option key={index} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                        */}

                    
                        
                         <select className="form-control" value={Category} onChange={(e) => setCategory(e.target.value)} name="category">
                          <option value=''>Select Category</option>
                          {Categories.map((cat, index) => (
                            <option key={index} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                        

                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className='pb-1'>Duration</label>
                        <input type="text"
                          className="form-control"
                          name="duration"
                          value={Duration}
                          onChange={(e) => setDuration(e.target.value)}
                          placeholder='Duration' />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="d-flex gap-2 align-items-center">
                      <button type="submit" className="btn section-btn btn-custom">Create</button>
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

export default CreateUserSkill