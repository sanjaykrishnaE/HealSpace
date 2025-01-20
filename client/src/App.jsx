import { useState } from 'react'


import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'

import './App.css'
import { Route,  Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
      
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<Register />} />
          
        </Routes>
      

    </>
  )
}

export default App
