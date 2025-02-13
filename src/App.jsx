import { useState } from 'react'
import './App.css'
import { 
  BrowserRouter as Router,
  Routes,
  Route } from "react-router-dom"
import Home from './components/Home'
import Menu from './components/Menu'
import LogIn from './components/LogIn'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/menu' element={<Menu />}/>
        <Route path='/login' element={<LogIn />}/>
      </Routes>
    </Router>
  )
}

export default App
