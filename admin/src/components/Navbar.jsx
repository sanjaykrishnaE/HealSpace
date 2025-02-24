import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

function Navbar() {

    const {aToken,setAToken} = useContext(AdminContext)

    const {dToken, setDtoken} = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDtoken('')
        dToken && localStorage.removeItem('dToken')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
        <h2 onClick={() => navigate('/')} className='text-[#1E375A] text-xl font-semibold no-underline mb-2 w-40 pl-10'>HealSpace</h2>
        {/* <img className='w-36 sm:w-40 cursor-pointer' src='logo' alt='' /> */}
        <p className='border px-2.5 py-0.5 rounded-lg border-gray-500 text-gray-600'>{ aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
              >Logout</button>
    </div>
  )
}

export default Navbar