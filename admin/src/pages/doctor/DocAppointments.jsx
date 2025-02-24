import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'


function DocAppointments() {

  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])
  return (
    <div className='w-full max-w-6xl mx-auto p-6'>
  <p className='mtext-2xl font-semibold text-gray-800 mb-6'>All Appointments</p>

  <div className='bg-white border rounded-lg text-sm max-h-[80vh] min-h-[50vh] shadow-sm overflow-y-scroll'>
    
    <div className='hidden sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1.5fr] gap-4 py-4 px-6 bg-gray-50 border-b'>
      <p className='text-sm font-medium text-gray-600'>No.</p>
      <p className='text-sm font-medium text-gray-600'>Patient</p>
      <p className='text-sm font-medium text-gray-600'>Payment</p>
      <p className='text-sm font-medium text-gray-600'>Age</p>
      <p className='text-sm font-medium text-gray-600'>Date & Time</p>
      <p className='text-sm font-medium text-gray-600'>Fees</p>
      <p className='text-sm font-medium text-gray-600'>Action</p>
    </div>

    
    {appointments.reverse().map((item, index) => (
      <div
        className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1.5fr] gap-4 items-center py-4 px-6 border-b hover:bg-gray-50 transition-colors'
        key={index}
      >
        <p className='text-sm text-gray-700 max-sm:hidden'>{index + 1}</p>
        <div className='flex items-center gap-3'>
          <img className='w-10 h-10 rounded-full object-cover' src={item.userData.image} alt="" />
          <p className='text-sm font-medium text-gray-800' >{item.userData.name}</p>
        </div>
        <div>
          <p className={`text-xs text-center font-medium px-2 py-1 rounded-full ${item.payment ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
            {item.payment ? 'Online' : 'CASH'}
          </p>
        </div>
        <p className='text-sm text-gray-700 max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
        <p className='text-sm text-gray-700'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
        <p className='text-sm font-medium text-gray-800'>{currency}{item.amount}</p>
        {item.cancelled ? (
          <p className='text-red-500 text-xs font-medium'>Cancelled</p>
        ) : item.isCompleted ? (
          <p className='text-green-500 text-xs font-medium'>Completed</p>
        ) : (
          <div className='flex gap-3'>
           <button
                  onClick={() => cancelAppointment(item._id)}
                  className='p-2 rounded-full hover:bg-red-50 transition-colors'
                >
                  <img className='w-5 h-5' src={assets.cross_icon} alt="Cancel" />
                </button>
                <button
                  onClick={() => completeAppointment(item._id)}
                  className='p-2 rounded-full hover:bg-green-50 transition-colors'
                >
                  <img className='w-5 h-5' src={assets.tick_icon} alt="Complete" />
                </button>
          </div>
        )}
      </div>
    ))}
  </div>
</div>
  )
}

export default DocAppointments

// import React, { useContext, useEffect } from 'react';
// import { DoctorContext } from '../../context/DoctorContext';
// import { AppContext } from '../../context/AppContext';
// import { assets } from '../../assets/assets';

// function DocAppointments() {
//   const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
//   const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

//   useEffect(() => {
//     if (dToken) {
//       getAppointments();
//     }
//   }, [dToken]);

//   return (
//     <div className='w-full max-w-6xl mx-auto p-6'>
//       <h1 className='text-2xl font-semibold text-gray-800 mb-6'>All Appointments</h1>

//       <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
//         <div className='hidden sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1.5fr] gap-4 py-4 px-6 bg-gray-50 border-b'>
//           <p className='text-sm font-medium text-gray-600'>No.</p>
//           <p className='text-sm font-medium text-gray-600'>Patient</p>
//           <p className='text-sm font-medium text-gray-600'>Payment</p>
//           <p className='text-sm font-medium text-gray-600'>Age</p>
//           <p className='text-sm font-medium text-gray-600'>Date & Time</p>
//           <p className='text-sm font-medium text-gray-600'>Fees</p>
//           <p className='text-sm font-medium text-gray-600'>Action</p>
//         </div>

//         {appointments.reverse().map((item, index) => (
//           <div
//             className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1.5fr] gap-4 items-center py-4 px-6 border-b hover:bg-gray-50 transition-colors'
//             key={index}
//           >
//             <p className='text-sm text-gray-700 max-sm:hidden'>{index + 1}</p>
//             <div className='flex items-center gap-3'>
//               <img className='w-10 h-10 rounded-full object-cover' src={item.userData.image} alt={item.userData.name} />
//               <p className='text-sm font-medium text-gray-800'>{item.userData.name}</p>
//             </div>
//             <div>
//               <p className={`text-xs font-medium px-2 py-1 rounded-full ${item.payment ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
//                 {item.payment ? 'Online' : 'CASH'}
//               </p>
//             </div>
//             <p className='text-sm text-gray-700 max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//             <p className='text-sm text-gray-700'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
//             <p className='text-sm font-medium text-gray-800'>{currency}{item.amount}</p>
//             {item.cancelled ? (
//               <p className='text-xs font-medium text-red-600'>Cancelled</p>
//             ) : item.isCompleted ? (
//               <p className='text-xs font-medium text-green-600'>Completed</p>
//             ) : (
//               <div className='flex gap-3'>
//                 <button
//                   onClick={() => cancelAppointment(item._id)}
//                   className='p-2 rounded-full hover:bg-red-50 transition-colors'
//                 >
//                   <img className='w-5 h-5' src={assets.cross_icon} alt="Cancel" />
//                 </button>
//                 <button
//                   onClick={() => completeAppointment(item._id)}
//                   className='p-2 rounded-full hover:bg-green-50 transition-colors'
//                 >
//                   <img className='w-5 h-5' src={assets.tick_icon} alt="Complete" />
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DocAppointments;



