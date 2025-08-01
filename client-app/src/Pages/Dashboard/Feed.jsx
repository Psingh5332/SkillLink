import React, { useEffect, useState } from 'react'
import axios from 'axios';


function Feed() {

    const [likes, setLikes] = useState(25);
    const [comments, setComments] = useState(10);
    const [bookmarks, setBookmarks] = useState(3);

    const [Feeds, setFeeds] = useState([]);

    useEffect(() => {
        fetchFeeds();
    }, []);


    const fetchFeeds = async () => {
        try {
            const response = await axios.get('https://your-api-url.com/api/Articles');
            setFeeds(response.data); // adjust this if your API returns nested data
        } catch (error) {
            console.error('Error fetching Feeds :', error);
        }
    };




    return (
        <div className='row g-4'>

            {
                Feeds.length > 0 ? (
                    Feeds.map((feed, index) => (
                        <div className="col-xl-3 col-md-4 col-sm-6" key={index}>
                            <div className="card h-100 shadow-sm border-0 py-2 px-2">
                                <div className="card-body">
                                    {/* <img
                                        src={feed.image}
                                        className='rounded-5'
                                        style={{ height: '40px', width: '40px' }}
                                        alt={item.title}
                                    /> */}
                                    <h6 className="card-title fw-bold mt-3">{feed.title}</h6>
                                    <small className="text-muted">{feed.publishedDate}</small>

                                    <div className="d-flex gap-2 mt-3">
                                        <span className="badge bg-light text-dark border">{feed.tags}</span>
                                    </div>

                                    <img
                                        src={feed.featuredImage}
                                        className="card-img-top"
                                        alt={feed.title}
                                        style={{ height: "180px", objectFit: "cover" }}
                                    />
                                </div>

                                <div className="card-footer bg-white border-top-0 d-flex justify-content-between">
                                    <span
                                        className="fw-semibold text-muted"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setLikes(likes + 1)}
                                    >
                                        <i className="bi bi-heart me-1"></i>{likes}
                                    </span>
                                </div>

                            </div>
                        </div>
                    ))

                ) : (
                    <>
                        <h4>Loading Feeds...</h4>
                    </>
                )
            }
        </div>
    )
}

export default Feed