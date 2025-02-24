import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

function Sidebar() {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)


  return (
    <div className='min-h-screen bg-white border-r'>
        {
            aToken && <ul className='text-gray-700 mt-5'>

                <NavLink className={({isActive}) =>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''}`} 
                to={'/admin-dashboard'}>
                    <img className='w-5' src={assets.home_Icon} alt='' />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                <NavLink className={({isActive}) =>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''}`}
                to={'/all-appointments'}>
                    <img className='w-5' src={assets.Appointment_Icon} alt='' />
                    <p className='hidden md:block'>All Appointments</p>
                </NavLink>

                <NavLink className={({isActive}) =>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''}`}
                 to={'/add-doctor'}>
                    <img className='w-5'  src={assets.Add_Icon} alt='' />
                    <p className='hidden md:block'>Add Doctor</p>
                </NavLink>

                <NavLink className={({isActive}) =>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''}`}
                 to={'/doctors-list'}>
                    <img className='w-5' src={assets.List_Icon} alt='' />
                    <p className='hidden md:block'>Doctors List</p>
                </NavLink>


            </ul>
        }
        {
            dToken && <ul className='text-gray-700 mt-5'>

                <NavLink className={({isActive}) =>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''}`} 
                to={'/doc-dashboard'}>
                    <img className='w-5' src={assets.home_Icon} alt='' />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                <NavLink className={({isActive}) =>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''}`}
                to={'/doc-appointments'}>
                    <img className='w-5' src={assets.Appointment_Icon} alt='' />
                    <p className='hidden md:block'> Appointments</p>
                </NavLink>

                

                <NavLink className={({isActive}) =>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''}`}
                 to={'/doc-profile'}>
                    <img className='w-5' src={assets.List_Icon} alt='' />
                    <p className='hidden md:block'>Doctor Profile</p>
                </NavLink>


            </ul>
        }
    </div>
  )
}

export default Sidebar