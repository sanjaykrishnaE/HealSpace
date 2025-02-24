import { useState } from 'react';
import { Route, Routes, } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
// import Register from './pages/Register';
import Navbar from './components/Navbar';
import Doctors from './pages/Doctors';
import Appointment from './pages/Appointment'; // Ensure this import is correct
import MyAppointment from './pages/MyAppointment';
import Profile from './pages/Profile';
import Aboutus from './components/Aboutus';
import ContactUs from './components/ContactUs';


import './App.css';

function App() {

  
  return (
    <>
      {/* <div className='mx-4 sm:mx-[10%]'> */}
      <ToastContainer />
      
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/about' element={<Aboutus/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/doctors/appointment/:docId' element={<Appointment />} /> {/* Ensure this matches the component name */}
        <Route path='/my-appointments' element={<MyAppointment />} />
        <Route path='/profile' element={<Profile />} />
      </Routes> 
      
      {/* </div> */}
    </>
  );
}

export default App;
