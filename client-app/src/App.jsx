import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Index from './Pages/Index';
import LoginPage from './Components/Login';
import RegisterPage from './Components/RegisterPage';

import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';

import Dashboard from './Pages/Dashboard/Dashboard';
import CreateArticle from './Pages/Dashboard/Articles/Create';
import EditArticle  from './Pages/Dashboard/Articles/Edit';
import ManageArticle from './Pages/Dashboard/Articles/Manage';

//Admin category
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateCategory from './Pages/Admin/Categories/Create';
import ListCategories from './Pages/Admin/Categories/Manage';
import Edit from './Pages/Admin/Categories/Edit';
import CreateSkills from './Pages/Dashboard/Skills/Create';
//Admin skills

import List from './Pages/Admin/Skills/List';
import Create from './Pages/Admin/Skills/Create';
import EditSkill from './Pages/Admin/Skills/Edit'


import ListSkill from './Pages/Dashboard/Skills/ListSkill';


import CreateTag from './Pages/Admin/Tags/CreateTags';

import ListTags from './Pages/Admin/Tags/ListTags';
import EditTag from './Pages/Admin/Tags/EditTags';
import ListUsers from './Pages/Admin/Users/Manage';

import AdminIndex from './Pages/Admin/AdminIndex';
import CreateEvent from './Pages/Dashboard/Events/Create';
import EditEvent from './Pages/Dashboard/Events/Edit';
import ManageEvents from './Pages/Dashboard/Events/Manage';
import Feed from './Pages/Dashboard/Feed';
import ProfileUser from './Pages/Dashboard/UserProfile';
import AdminProfile from './Pages/Admin/UserProfile';
import ChangePassword from './Pages/Dashboard/ChangePassword';
import AllEvents from './Pages/Dashboard/AllEvents';
import Peoples from './Pages/Dashboard/Peoples/Peoples';


function App() {

  return (
    <>


      <Router>
        {/* <Nav /> */}

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />

          <Route path='/Admin' element={<AdminDashboard />}>
            <Route index element={<AdminIndex />} />
            <Route path="Users/Manage" element={<ListUsers />} />
            <Route path="Categories/ListCategories" element={<ListCategories />} />
            <Route path="Categories/Create" element={<CreateCategory />} />
            <Route path="Categories/Edit/:id" element={<Edit />} />


            <Route path="Skills/List" element={<List />} />
            <Route path="Skills/Create" element={<Create />} />
            <Route path="Skills/Edit/:id" element={<EditSkill />} />

            <Route path="Tags/ListTags" element={<ListTags />} />

            <Route path="Tags/CreateTags" element={<CreateTag />} />
            <Route path="Tags/EditTags/:id" element={<EditTag />} />

            {/* Admin Profile View  */}
            <Route path='Profile/View' element={<AdminProfile/>} />



          </Route>


          {/* Nested Routing for Dashboard */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="Article/Create" element={<CreateArticle />} />
            <Route path="Article/Manage" element={<ManageArticle />} />
            <Route path="Article/Edit" element={<EditArticle />} />

            <Route path="Skills/ListSkill" element={<ListSkill />} />
            <Route path="Skills/Create" element={<CreateSkills />} />

            {/*Events */}
             <Route path="Events/Create" element={<CreateEvent />} />
            <Route path="Events/Edit/:id" element={<EditEvent />} />
            <Route path="Events/Manage" element={<ManageEvents />} />

            <Route path="Feed" element={<Feed />} /> 
            <Route path="AllEvents" element={<AllEvents />} />
            <Route path="peoples/List" element={<Peoples/>} />
            {/* Admin Profile View */}
            <Route path="Profile/View" element={<ProfileUser />} />
            <Route path="Profile/ChangePassword" element={<ChangePassword token={localStorage.getItem("token")} />}/>

          </Route>

          {/* <Route path="/ListSkill" element={<ListSkill/>}></Route> */}
        </Routes>

        {/* <Footer /> */}
      </Router>
    </>
  )
}

export default App
