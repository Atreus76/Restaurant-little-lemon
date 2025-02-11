import { useState } from 'react'
import './App.css'
import { 
  BrowserRouter as Router,
  Routes,
  Route } from "react-router-dom"
import Banner from './components/Banner'
import Nav from './components/Nav'
import Advertise from './components/Advertise'
import Contents from './components/Contents'
import Home from './components/Home'
import Menu from './components/Menu'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/menu' element={<Menu />}/>
      </Routes>
    </Router>
  )
}

export default App
