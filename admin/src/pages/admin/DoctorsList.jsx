import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

function DoctorsList() {

  const {doctors, aToken, getAllDoctors, changeAvailability} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  },[aToken])


  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
  <h1 className='text-lg font-medium'>All Doctors</h1>
  <div className='-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-8'>
    {
      doctors.map((item, index) => (
        <div className=' border border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2' key={index}>
          <img className='w-full h-60 object-cover bg-blue-50' src={item.image} alt="" />
          <div className='p-4'>
            <p className='text-xl font-semibold text-gray-900 mt-2'>{item.name}</p>
            <p className='text-gray-500 text-sm'>{item.speciality}</p>
            <div className='mt-2 flex items-center gap-1 text-sm'>
              <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
              <p>Available</p>
            </div>
          </div>
        </div>
      ))
    }
  </div>
</div>

  )
}

export default DoctorsList