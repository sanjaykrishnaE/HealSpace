import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function TopDoctors() {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-6 my-16 text-gray-900 px-4 sm:px-6 lg:px-8 '>
      <h1 className='text-3xl font-bold text-center '>Top Doctors to Book</h1>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-8'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/doctors/appointment/${item._id}`)}
            className='border border-blue-200 rounded-lg  overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2'
            key={index}
          >
            <img className='w-full h-60 object-cover bg-blue-50' src={item.image} alt={item.name} />
            <div className='p-4 '>
              <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>{item.available ? 'Available' : 'Unavailable'}</span>
              </div>
              <h2 className='text-xl font-semibold text-gray-900 mt-2'>{item.name}</h2>
              <p className='text-gray-600 text-sm mt-1'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>{ navigate('/doctors'); scrollTo(0,0 )}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>
    </div>
  );
}

export default TopDoctors;





























// import React, { useContext } from 'react'

// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';

// function TopDoctors() {

//    const navigate = useNavigate();

//    const {doctors} = useContext(AppContext)

//   return (
//     <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10  '>
//         <h1 className='text-3xl font-medium'>Top Doctors to book</h1>
//         {/* <p className='sm:w-1/3 text-center text-sm'></p> */}
//         <div className='w-full grid grid-cols-auto gap-5 pt-7 gap-y-6 px-3 sm:px-0 pl-10 pr-10 '>
//             {doctors.slice(0,10).map((item,index) => (
//               <div onClick={()=>navigate(`/doctors/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index }>
//                 <img className='bg-blue-50' src={item.image} alt='' />
//                 <div className='p-4'>
//                     <div className={`flex items-center gap-2 text-sm text-center ${item.available?' text-green-400':' text-red-400'}`}>
//                         <p className={`w-2 h-2 ${item.available? ' bg-green-500 rounded-full':' bg-red-500 rounded-full'} `}></p><p>{item.available?'Available':'Unavailable'}</p>
//                     </div>
//                     <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
//                     <p className='text-gray-600 text-sm '>{item.speciality}</p>
//                 </div>
//               </div>
//             ))}
//         </div>
//         <button onClick={()=>{ navigate('/doctors'); scrollTo(0,0 )}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>
//     </div>
//   )
// }

// export default TopDoctors