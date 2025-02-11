import React from 'react'
import "./Contents.css"
import phoImage from "../assets/pho.jpg"
import pastaImage from "../assets/pasta.jpeg"
import pizzaImage from "../assets/pizza.jpg"
const Contents = () => {
  return (
    <div className='contents'>
        <div className="contents__menu">
            <h3>Our New Menu</h3>
            <img src={phoImage} alt="" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <a href="">See our new menu</a>
        </div>
        <div className="contents__booking">
            <h3>Book a table</h3>
            <img src={pastaImage} alt="" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <a href="">Book your table now</a>
        </div>
        <div className="contents__schedule">
            <h3>Opening Hours</h3>
            <img src={pizzaImage} alt="" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                
            <ul>
                <li>Mon-Fri: 2pm-10pm</li>
                <li>Sat: 2pm-11pm</li>
                <li>Sun: 2pm-9pm</li>
            </ul>
        </div>
    </div>
  )
}

export default Contents