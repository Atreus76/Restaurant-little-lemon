import { useState } from 'react'
import axios from "axios"
const API_KEY = "abc"

const About = () => {
  const handleMenu = async() => {
    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10`
        )
        const data = response.data.results
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
    
  }




  return (
    <div className='about'>
        <button onClick={handleMenu}>Show menu</button>
    </div>
  )
}

export default About