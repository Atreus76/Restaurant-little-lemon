import React, { useState } from 'react'
import "./Nav.css"
import BookingModal from './BookingModal'
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();

  const navigateMenu = () => {
    navigate("/menu"); // Redirect to Menu page
  };

  const navigateLogIn = () => {
    navigate("/login")
  }

  const navigateAbout = () => {
    navigate("/about")
  }
  return (
    <div className='nav'>
        <div className="nav__pages">Home</div>
        <div className="nav__pages" onClick={navigateMenu}>Menu</div>
        <div className="nav__pages"
          onClick={() => setShowModal(true)}
        >Book</div>
        {showModal && <BookingModal onClose={() => setShowModal(false)}/>}
        <div className="nav__pages" onClick={navigateAbout}>About</div>
        <div className="nav__pages" onClick={navigateLogIn}>Log In</div>
        
    </div>
  )
}

export default Nav