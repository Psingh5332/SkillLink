import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Index from './Pages/Index';
import LoginPage from './Components/Login';
import RegisterPage from './Components/RegisterPage';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';

function App() {

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Index />} />
            <Route path="/Login" element={<LoginPage/>} />
            <Route path="/Register" element={<RegisterPage/>} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
