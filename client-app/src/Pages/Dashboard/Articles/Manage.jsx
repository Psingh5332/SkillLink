import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ManageArticle() {

  const [Articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('https://your-api-url.com/api/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching Articles:', error);
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Article ?')) {
      try {
        await axios.delete(`https://your-api-url.com/api/categories/${id}`);
        fetchArticles(); // refresh the list after deletion
      } catch (error) {
        console.error('Error deleting Article :', error);
      }
    }
  };

  return (
    <div className=''>
      <div className="pb-2 border-bottom d-flex justify-content-between">
        <h2 className='fs-1 Bricolage-font'>
          <i class="bi bi-file-earmark-text me-3"></i>
          Articles
        </h2>
        <Link to="/dashboard/Article/Create" className="btn btn-custom section-btn">Add</Link>
      </div>

      <div className="my-5 bg-white p-4 shadow-sm rounded-lg">

        <div className="row">
          {
            Articles.length > 0 ? (
              Articles.map((article, index) => (
                <div className="col-xl-6" key={index}>
                  <div className="d-flex flex-column gap-3 mb-4 mb-md-0">
                    <div className="user-event-view flex-wrap flex-xl-nowrap">
                      <div className="event-image"></div>
                      <div className="event-content">
                        <div className="d-flex gap-3 flex-wrap align-items-center">
                          <p className='event-category mb-0'>Category</p>
                          <p className='text-muted d-flex gap-1 mb-0' style={{ fontSize: '14px' }}>
                            <i className='bi bi-calendar'></i>
                            <span>{article.date}</span>
                          </p>
                        </div>
                        <h4 className='mt-3'>{article.title}</h4>

                        <p className='extra-peregraph w-100'>{article.shortDescription}</p>

                        <div className="Action-btn">
                          <Link to={`/dashboard/articles/Edit/id=${Event.id}`} title="Edit">
                            <i class="bi bi-pencil-square"></i>
                          </Link>

                          <i className='bi bi-trash' onClick={() => handleDelete(Event.id)}></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))

            ) : (
              <p className="text-center">No Articles  found</p>
            )
          }

          {/* Demo */}

          <div className="col-xl-6">
            <div className="d-flex flex-column gap-3 mb-4 mb-md-0">
              <div className="user-event-view flex-wrap flex-xl-nowrap">
                <div className="event-image"></div>
                <div className="event-content">
                  <div className="d-flex gap-3 flex-wrap align-items-center">
                  <p className='event-category mb-0'>Category</p>
                    <p className='text-muted d-flex gap-1 mb-0' style={{ fontSize: '14px' }}>
                      <i className='bi bi-calendar'></i>
                      <span>9-07-2025</span>
                    </p>
                  </div>
                  <h4 className='mt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h4>

                  <p className='extra-peregraph w-100'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam inventore beatae tempore fugiat, assumenda illum. Iusto, obcaecati hic placeat iste commodi eos libero, explicabo est recusandae, tempore ab accusamus natus.</p>

                  <div className="Action-btn">
                    <Link to={`/User/Events/Edit/id=${Event.id}`} title="Edit">
                      <i class="bi bi-pencil-square"></i>
                    </Link>

                    <i className='bi bi-trash' onClick={() => handleDelete(Event.id)}></i>
                  </div>
                </div>
              </div>
            </div>
          </div><div className="col-xxl-6">
            <div className="d-flex flex-column gap-3 mb-4 mb-md-0">
              <div className="user-event-view flex-wrap flex-xl-nowrap">
                <div className="event-image"></div>
                <div className="event-content">
                  <div className="d-flex gap-3 flex-wrap align-items-center">
                  <p className='event-category mb-0'>Category</p>
                    <p className='text-muted d-flex gap-1 mb-0' style={{ fontSize: '14px' }}>
                      <i className='bi bi-calendar'></i>
                      <span>9-07-2025</span>
                    </p>
                  </div>
                  <h4 className='mt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h4>

                  <p className='extra-peregraph w-100'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam inventore beatae tempore fugiat, assumenda illum. Iusto, obcaecati hic placeat iste commodi eos libero, explicabo est recusandae, tempore ab accusamus natus.</p>

                  <div className="Action-btn">
                    <Link to={`/User/Events/Edit/id=${Event.id}`} title="Edit">
                      <i class="bi bi-pencil-square"></i>
                    </Link>

                    <i className='bi bi-trash' onClick={() => handleDelete(Event.id)}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* <table class="table table-bordered shadow-sm p-3 mt-5">
          <thead>
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Date</th>
              <th scope="col">Author</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              Articles.length > 0 ? (
                Articles.map((article, index) => {
                  <tr key={article.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{article.title}</td>
                    <td>{article.tags}</td>
                    <td>{article.author}</td>
                    <td>{article.publishedDate}</td>
                    <td className="icons">
                      <Link to={`/dashboard/Article/Edit/id=${article.id}`} title="Edit">
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="btn btn-link p-0 ms-3"
                        title="Delete"
                      >
                        <i className="bi bi-trash3 text-danger"></i>
                      </button>
                    </td>
                  </tr>
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No Articles Found</td>
                </tr>
              )
            }
          </tbody>
        </table> */}
      </div >

    </div >
  )
}

export default ManageArticle