import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import AllAppointments from './pages/admin/AllAppointments';
import AddDoctor from './pages/admin/AddDoctor';
import DoctorsList from './pages/admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DocAppointments from './pages/doctor/DocAppointments';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DocProfile from './pages/doctor/DocProfile';


function App() {

  const {aToken} = useContext(AdminContext)

  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-white'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start '>
        <Sidebar />
        <Routes> 
          {/* Admin */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctors-list' element={<DoctorsList/>} />

          {/* doctor */}
          <Route path='/doc-dashboard' element={<DoctorDashboard />} />
          <Route path='/doc-appointments' element={<DocAppointments />} />
          <Route path='/doc-profile' element={<DocProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
    <Login />
    <ToastContainer />
    </>
  )
}

export default App