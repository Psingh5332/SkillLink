import { useState, useEffect, useRef } from 'react';
import logo from './../../assets/logo-2.png';
import clipboard from './../../assets/clipboard.png';
import paperplane from './../../assets/paper-plane.png';
import user1 from './../../assets/Jigisha.png';
import user2 from './../../assets/user2.jpg';
import user3 from './../../assets/user3.jpg';
import user4 from './../../assets/user4.jpg';
import notes from './../../assets/notes.png';
import userDefaultImage  from './../../assets/user-Default.png';
import { Link } from 'react-router-dom';
import { useUser } from '../../Components/UserContext';
import { Outlet } from 'react-router-dom';
import axios from 'axios';


const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [loginUser, setLoginUser] = useState({});
  const [user,setUser]= useState({})
  // const contentRefs = useRef({});

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const toggleDropdownMenu = (id) => {
    setOpenSubmenu((prev) => (prev === id ? null : id));
  };



  useEffect(() => {
        fetchUser();
    }, []);

  //fetching current user

  // const {user}=useUser();

 

  // if (!user) {

  //   return <p>Loading user info...</p>;
  // }

  useEffect(() => {
    if (!user) {
      return <p>Loading user info...</p>;
    }
  }, [user]);


  {/*Change Uncomment  */ }


  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest('.dropdown')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', closeDropdowns);
    return () => document.removeEventListener('click', closeDropdowns);
  }, []);


  useEffect(() => {
    if (isCollapsed) setOpenSubmenu(null);
  }, [isCollapsed])


  const token = localStorage.getItem("token");
  console.log(token);
  const fetchUser = async () => {
    try {
      const res = await axios.get("https://localhost:7113/api/Account/GetCurrentUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoginUser(res.data);
      setUser(res.data);
      console.log(res.data); // full user object
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };


  return (
    <div className={`wrapper w-100 d-flex align-items-start justify-content-between`}>
      <nav className={`sidebar position-relative ${isCollapsed ? 'collapsed' : ''}`} id="sidebar">
        <div className="sidebar-content w-100">
          <div className="scrollbar-container h-100 w-100 d-flex justify-content-center flex-column">
            <Link to="/" className="sidebar-brand d-flex justify-content-center align-items-center gap-1 py-2 sidebar-top text-center">
              <img src={logo} alt="Logo" />
              <span className="text-uppercase text-black fw-semibold fs-3 p-2">SkillLink</span>
            </Link>

            <ul className="sidebar-nav position-relative p-0 mt-4">
              <li className="sidebar-item">
                <Link to="/dashboard/feed" className="sidebar-link">
                  <i className="bi bi-house-door"></i>
                  <span className="align-middle">My Feeds</span>
                </Link>
              </li>

               <li className="sidebar-item mt-2">
                <Link to="AllEvents" className="sidebar-link">
                  <i className="bi bi-calendar2-check me-2" ></i>
                  <span className="align-middle">Events</span>
                </Link>
              </li>

              <li className="sidebar-item mt-2">
                <Link to="/dashboard/peoples/List" className="sidebar-link">
                  <i class="bi bi-people"></i>
                  <span className="align-middle">Peoples</span>
                </Link>
              </li>

              <li className="sidebar-header">My Dashboard</li>

              {/* Articles Submenu */}
              <li className="sidebar-item py-2">
                <Link
                  to="Article/Manage"
                  className="sidebar-link d-flex align-items-center justify-content-between position-relative"

                >
                  <img src={clipboard} alt="" />
                  <span className="align-middle">Articles</span>
                </Link>

              </li>

              {/* Skill Share Submenu */}
              <li className="sidebar-item py-2">
                <Link
                  to="Skills/ListSkill"
                  className="sidebar-link d-flex align-items-center justify-content-between"
                  onClick={() => toggleDropdownMenu('skills')}

                >
                  <img src={paperplane} alt="" />
                  <span className="align-middle">My Skill</span>
                </Link>
              </li>

              {/* Events Submenu */}
              <li className="sidebar-item py-2">
                <Link
                  to="Events/Manage"
                  className="sidebar-link d-flex align-items-center justify-content-between"
                  onClick={() => toggleDropdownMenu('events')}

                >
                  <span><i className="bi bi-calendar2-check me-2"></i>My Events</span>
                </Link>
              </li>

              {/* Other Menu Items */}
              <li className="sidebar-item py-2">
                <Link to="#" className="sidebar-link"><i className="bi bi-file-earmark-arrow-up"></i> <span>Uploads</span></Link>
              </li>
              <li className="sidebar-item py-2">
                <Link to="#" className="sidebar-link"><i className="bi bi-download"></i> <span>Downloads</span></Link>
              </li>
              <li className="sidebar-item py-2">
                <Link to="/dashboard/Profile/View" className="sidebar-link"><i className="bi bi-person"></i> <span>Profile</span></Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="sidebar-item logout-item bg-white">
          <Link to="#" className="sidebar-link bg-white">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </Link>
        </div>
      </nav>

      <div className="main flex-grow-1" id="main">
        <nav className="navbar-main d-flex justify-content-between align-items-center px-4 navbar navbar-expand navbar-light">
          <span className="sidebar-toggle d-flex align-items-center fs-4">
            <i
              className={`fa-solid fa-bars cursor-pointer ${isCollapsed ? 'rotate-360' : ''}`}
              id="toggle"
              onClick={toggleSidebar}
            />
          </span>
          <form className="ps-4 d-none d-sm-inline-block">
            <div className="input-group-navbar input-group">
              <input placeholder="Search projects…" aria-label="Search" className="form-control" />
              <button type="button" className="btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search lucide">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </button>
            </div>
          </form>
          <div className="navbar-collapse collapse">
            <div className="navbar-align navbar-nav ms-auto d-flex align-items-center gap-3">
              {/* <div className="nav-item dropdown d-flex position-relative dropdown">
                <a href="#" className="d-flex align-items-center nav-link nav-icon" onClick={(e) => { e.preventDefault(); toggleDropdown('eventNotification'); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle align-middle">
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                  </svg>
                  <span className="indicator">4</span>
                </a>
                <div className={`dropdown-menu-lg py-0 dropdown-menu dropdown-menu-end ${activeDropdown === 'eventNotification' ? 'show' : ''}`}>
                  <div className="w-100 position-relative text-center dropdown-menu-header">4 Event Notifications</div>
                  <div className="list-group d-flex g-5">
                    <div className="list-group-item">
                      <div className="row align-items-center g-0">
                        <div className="col-2"><img className="avatar img-fluid rounded-circle" src={user1} alt="AI Event" width="50" height="50" /></div>
                        <div className="ps-2 col-10">
                          <div className="dropdown-menu-header p-0 fw-500 fs-6">Assignment Submitted</div>
                          <p className="text-muted mt-1" style={{ fontSize: '1rem' }}>You submitted "Machine Learning - Week 2 Assignment".</p>
                          <div className="text-muted mt-1 fs-6">15m ago</div>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row align-items-center g-0">
                        <div className="col-2"><img className="avatar img-fluid rounded-circle" src={user2} alt="Course Enroll" /></div>
                        <div className="ps-2 col-10">
                          <div className="dropdown-menu-header p-0 fw-500">New Course Enrolled</div>
                          <p className="text-muted small mt-1">You enrolled in "Frontend Development with React".</p>
                          <div className="text-muted small mt-1">2h ago</div>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row align-items-center g-0">
                        <div className="col-2"><img className="avatar img-fluid rounded-circle" src={user3} alt="Stacie Hall" /></div>
                        <div className="ps-2 col-10">
                          <div className="dropdown-menu-header p-0 fw-500">Live Class Starting</div>
                          <p className="text-muted small mt-1">Your "Data Structures" session starts in 30 minutes.</p>
                          <div className="text-muted small mt-1">4h ago</div>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row align-items-center g-0">
                        <div className="col-2"><img className="avatar img-fluid rounded-circle" src={user4} alt="Bertha Martin" /></div>
                        <div className="ps-2 col-10">
                          <div className="dropdown-menu-header p-0 fw-500">Certificate Issued</div>
                          <p className="text-muted small mt-1">Your certificate for "Python Basics" is now available to download.</p>
                          <div className="text-muted small mt-1">5h ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 position-relative text-center dropdown-menu-footer">
                    <Link to='/' className='text-muted'>View All Events</Link>
                  </div>
                </div>
              </div>
              <div className="nav-item dropdown d-flex position-relative">
                <a href="#" className="d-flex align-items-center nav-link nav-icon" onClick={(e) => { e.preventDefault(); toggleDropdown('skillNotification'); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell align-middle">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                  </svg>
                  <span className="indicator">2</span>
                </a>
                <div className={`dropdown-menu-lg py-0 dropdown-menu dropdown-menu-skillshare dropdown-menu-end ${activeDropdown === 'skillNotification' ? 'show' : ''}`}>
                  <div className="w-100 position-relative text-center dropdown-menu-header">2 SkillShare Notifications</div>
                  <div className="list-group d-flex g-5">
                    <div className="list-group-item">
                      <div className="row align-items-center g-0">
                        <div className="col-2"><img src={user1} className="rounded-circle" alt="User" width="50" height="50" /></div>
                        <div className="ps-2 col-10">
                          <div className="fw-500 fs-6">Artificial Intelligence</div>
                          <p className="text-muted small mb-1" style={{ fontSize: '.9rem' }}>You have successfully completed the AI module.</p>
                          <div className="text-muted small fs-6">06 Jul 2025, 10:30 AM</div>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row align-items-center g-0">
                        <div className="col-2"><img src={user2} className="rounded-circle" alt="Alice" width="50" height="50" /></div>
                        <div className="ps-2 col-10">
                          <div className="fw-500 fs-6">New Course Enrolled</div>
                          <p className="text-muted small mb-1" style={{ fontSize: '.9rem' }}>Alice enrolled in "Full-Stack Web Development".</p>
                          <div className="text-muted fs-6">06 Jul 2025, 09:15 AM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 position-relative text-center dropdown-menu-footer">
                    <Link to='/' className='text-muted'>View All Skills</Link>
                  </div>
                </div>
              </div> */}
              <div className="nav-item dropdown nav-item-user position-relative">
                <span className="d-inline-block d-md-none nav-icon" aria-expanded="true">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown('user');
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-settings align-middle"
                    >
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </a>
                </span>

                <span className="d-none d-md-inline-block nav-icon" aria-expanded="true">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle py-2 d-flex align-items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown('user');
                    }}
                  >
                    <img
                      src={user.profileImageUrl || userDefaultImage}
                      className="avatar img-fluid rounded-circle me-1 mt-n2 mb-n2"
                      // alt={user.FullName}
                      width="40"
                      height="40"
                    />

                    {/*Change Uncomment  */}

                    <span>{user?.userName ||loginUser.userName } </span>
                  </a>
                </span>

                <div
                  className={`dropdown dropdown-menu dropdown-menu-end dropdown-menu-user py-2 ${activeDropdown === 'user' ? 'show' : ''
                    }`}
                  style={{ width: '200px' }}
                >
                  <Link to='/dashboard/Profile/View' className="dropdown-item">
                    <i className="bi bi-person me-2"></i>Profile
                  </Link>

                  <Link to='/dashboard/Profile/ChangePassword' className="dropdown-item">
                    <i className="bi bi-person me-2"></i>Change Password
                  </Link>

                  <hr className="dropdown-divider" />
                  <a href="#" className="dropdown-item">Sign out</a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="content">
          {/* Components Load Dynamicly */}

          <Outlet />
        </div>


      </div>
    </div>
  );
};

export default Dashboard;