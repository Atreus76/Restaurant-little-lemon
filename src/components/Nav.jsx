import React, { useState } from 'react'
import "./Nav.css"
import BookingModal from './BookingModal'
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/menu"); // Redirect to Menu page
  };
  return (
    <div className='nav'>
        <div className="nav__pages">Home</div>
        <div className="nav__pages" onClick={handleClick}>Menu</div>
        <div className="nav__pages"
          onClick={() => setShowModal(true)}
        >Book</div>

        {showModal && <BookingModal onClose={() => setShowModal(false)}/>}
        <div className="nav__pages">About</div>
    </div>
  )
}

export default Nav