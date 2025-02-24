import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import {assets} from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios';



function Profile() {

   const {userData, setUserData ,token, backendUrl, loadUserProfileData } = useContext(AppContext)

   const [isEdit, setIsEdit] =useState(false)

   const [image ,setImage] = useState(false)


   const updateUserProfileData = async () => {
     try {
      const formData = new FormData()

          formData.append('name',userData.name)
          formData.append('phone',userData.phone)
          formData.append('address',JSON.stringify(userData.address))
          formData.append('gender',userData.gender)
          formData.append('dob',userData.dob)
      
          image && formData.append('image',image)
      
          const {data} = await axios.post(backendUrl+'/user/update-profile', formData, {headers:{token}})
          if (data.success) {
            toast.success(data.message)
            await loadUserProfileData()
            setIsEdit(false)
            setImage(false)
          } else {
            toast.error(data.message)
          }
      
     } catch (error) {
      console.log(error);
      toast.error(error.message)
      
      
     }
   }
  
  return userData && (
    <div className='max-w-2xl mx-auto p-6 bg-lightBlue rounded-lg shadow-lg'>
      {
        isEdit
        ? <label htmlFor="image">
          <div className='flex flex-col items-center mb-6'>
            <img className='w-32 h-32 rounded-full object-cover border-4 border-blue-500' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '': assets.profile_pic } alt="" />
          </div>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
        </label>
        : <img className='w-36 rounded' src={userData.image} alt="" />
      }
      
      {
        isEdit
        ? <input className='bg-gray-50 text-2xl font-semibold text-center mt-4 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))} />
        : <p className='font-semibold text-2xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='border-t border-gray-200 my-4' />
      <div className='space-y-4'>
        <p className='text-sm font-medium text-gray-500 uppercase mb-2'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700  '>
          <p className='w-24 font-medium text-gray-700 '>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'> Phone :</p>
          {
        isEdit
        ? <input className='bg-gray-100 max-w-56 ' 
        type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))} />
        : <p className='text-blue-400'>{userData.phone}</p>
      }
      <p className='font-medium'>Address:</p>
      {
        isEdit
        ? <p>
          <input className='bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={(e) => setUserData(prev =>({...prev,address:{...prev.address, line1:e.target.value}}))} value={userData.address.line1} type="text" />
          <br/>
          <input className='bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={(e) => setUserData(prev =>({...prev,address:{...prev.address, line2:e.target.value}}))} value={userData.address.line2} type="text" />
        </p>
        : <p className='text-gray-500'>
          {userData.address.line1}
          <br/>
          {userData.address.line2}
        </p>
      }
        </div>
      </div>
      <hr className='border-t border-gray-200 my-4' />

      <div>
        <p className='text-sm font-medium text-gray-500 uppercase mb-2'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='w-24 font-medium text-gray-700'>Gender:</p>
          {
        isEdit
        ? <select className='max-w-20 bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ' onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))} value={userData.gender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        : <p className='bg-gray-400'>{userData.gender}</p>
      }
      <p className='w-24 font-medium text-gray-700'>DOB:</p>
      {
        isEdit
        ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))} value={userData.dob}/>
        : <p className='text-gray-400'>{userData.dob}</p>
      }

        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit
          ? <button type='submit' className='w-50 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all'
           onClick={updateUserProfileData}>Save Information</button>
          : <button className=  'w-50 bg-white border border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all' 
          onClick={() => setIsEdit(true)}>Edit Profile</button>
        }
      </div>


    </div>
  )
}

export default Profile




































// import React, { useState } from 'react';
// import { AppContext } from '../context/AppContext';

// function Profile() {

// const {userData ,setUserData,token ,backendUrl, getUserProfileData } = useContext(AppContext)
//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] =useState(false)

//   const updateUserPrifileData = async () => {
    
//   }

//   return userData && (
//     <div className='max-w-2xl mx-auto p-6 bg-lightBlue rounded-lg shadow-lg'>
//       <div className='flex flex-col items-center mb-6'>
//         <img
//           className='w-32 h-32 rounded-full object-cover border-4 border-blue-300'
//           src={userData.image}
//           alt='Profile'
//         />
//         {isEdit ? (
//           <input
//             className='bg-gray-50 text-2xl font-semibold text-center mt-4 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
//             type='text'
//             value={userData.name}
//             onChange={(e) =>
//               setUserData((prev) => ({ ...prev, name: e.target.value }))
//             }
//           />
//         ) : (
//           <p className='font-semibold text-2xl text-neutral-800 mt-4'>
//             {userData.name}
//           </p>
//         )}
//       </div>

//       <hr className='border-t border-gray-200 my-4' />

//       <div className='space-y-4'>
//         <div>
//           <p className='text-sm font-medium text-gray-500 uppercase mb-2'>
//             Contact Information
//           </p>
//           <div className='space-y-2'>
//             <div className='flex items-center'>
//               <p className='w-24 font-medium text-gray-700'>Email:</p>
//               <p className='text-blue-500'>{userData.email}</p>
//             </div>
//             <div className='flex items-center'>
//               <p className='w-24 font-medium text-gray-700'>Phone:</p>
//               {isEdit ? (
//                 <input
//                   className='bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
//                   type='text'
//                   value={userData.phone}
//                   onChange={(e) =>
//                     setUserData((prev) => ({ ...prev, phone: e.target.value }))
//                   }
//                 />
//               ) : (
//                 <p className='text-blue-400'>{userData.phone}</p>
//               )}
//             </div>
//             <div className='flex items-center'>
//               <p className='w-24 font-medium text-gray-700'>Address:</p>
//               {isEdit ? (
//                 <div className='space-y-2'>
//                   <input
//                     className='bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
//                     type='text'
//                     value={userData.address.line1}
//                     onChange={(e) =>
//                       setUserData((prev) => ({
//                         ...prev,
//                         address: { ...prev.address, line1: e.target.value },
//                       }))
//                     }
//                   />
//                   <input
//                     className='bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
//                     type='text'
//                     value={userData.address.line2}
//                     onChange={(e) =>
//                       setUserData((prev) => ({
//                         ...prev,
//                         address: { ...prev.address, line2: e.target.value },
//                       }))
//                     }
//                   />
//                 </div>
//               ) : (
//                 <p className='text-gray-500'>
//                   {userData.address.line1}
//                   <br />
//                   {userData.address.line2}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         <hr className='border-t border-gray-200 my-4' />

//         <div>
//           <p className='text-sm font-medium text-gray-500 uppercase mb-2'>
//             Basic Information
//           </p>
//           <div className='space-y-2'>
//             <div className='flex items-center'>
//               <p className='w-24 font-medium text-gray-700'>Gender:</p>
//               {isEdit ? (
//                 <select
//                   className='bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
//                   onChange={(e) =>
//                     setUserData((prev) => ({ ...prev, gender: e.target.value }))
//                   }
//                   value={userData.gender}
//                 >
//                   <option value='Male'>Male</option>
//                   <option value='Female'>Female</option>
//                 </select>
//               ) : (
//                 <p className='text-gray-400'>{userData.gender}</p>
//               )}
//             </div>
//             <div className='flex items-center'>
//               <p className='w-24 font-medium text-gray-700'>DOB:</p>
//               {isEdit ? (
//                 <input
//                   className='bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
//                   type='date'
//                   onChange={(e) =>
//                     setUserData((prev) => ({ ...prev, dob: e.target.value }))
//                   }
//                   value={userData.dob}
//                 />
//               ) : (
//                 <p className='text-gray-400'>{userData.dob}</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className='mt-8 flex justify-center'>
//         {isEdit ? (
//           <button
//             className='bg-blue-500 text-white px-8 py-2 rounded-full hover:bg-blue-600 transition-all'
//             onClick={() => setIsEdit(false)}
//           >
//             Save Information
//           </button>
//         ) : (
//           <button
//             className='bg-white border border-blue-500 text-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all'
//             onClick={() => setIsEdit(true)}
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;

















// new one



// import React, { useContext, useState } from 'react';
// import { AppContext } from '../context/AppContext';
// import {assets} from '../assets/assets'
// import axios from 'axios';
// import { toast } from 'react-toastify';

// function Profile() {
//   const { userData, setUserData, token, backendUrl, getUserProfileData  } = useContext(AppContext);
//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] = useState(false)

//   const updateUserProfileData = async () => {

//     try {
//       const formData = new FormData()

//     formData.append('name',userData.name)
//     formData.append('phone',userData.phone)
//     formData.append('address',JSON.stringify(userData.address))
//     formData.append('gender',userData.gender)
//     formData.append('dob',userData.dob)

//     image && formData.append('image',userData.image)

//     const {data} = await axios.post(backendUrl+'/update-profile',formData, {headers:{token}})
//     if (data.success) {
//       toast.success(data.message)
//       await getUserProfileData()
//       setIsEdit(false)
//       setImage(false)
//     } else {
//       toast.error(data.message)
//     }
//     } catch (error) {
//       console.log(error);
      
//       toast.error(error.message)
//     }

    

//   }

//   return userData && (
//     <div className='max-w-2xl mx-auto p-6 bg-light-blue rounded-lg shadow-lg'>
//       <div className='flex items-center space-x-6'>
//         {
//           isEdit
//           ? <label htmlFor="image">
//               <div className='inline-block relative cursor-pointer'>
//                 <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
//                 <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.profile_pic} alt="" />
//               </div>
//               <input onChange={(e)=>setImage(e.target.files[0])} type="file"  id='image' hidden />
//           </label>
//           : <img className='w-24 h-24 rounded-full object-cover border-4 border-blue-100' src={userData.image} alt='' />
//         }
        
//         <div>
//           {isEdit ? (
//             <input
//               className='text-2xl font-bold text-gray-800 bg-gray-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
//               type='text'
//               value={userData.name}
//               onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
//             />
//           ) : (
//             <p className='text-2xl font-bold text-gray-800'>{userData.name}</p>
//           )}
//         </div>
//       </div>

//       <hr className='my-6 border-gray-200' />

//       <div className='space-y-6'>
//         <div>
//           <p className='text-sm font-semibold text-gray-500 uppercase mb-2'>Contact Information</p>
//           <div className='space-y-3'>
//             <div className='flex items-center'>
//               <p className='w-24 text-gray-600 font-medium'>Email:</p>
//               <p className='text-blue-500'>{userData.email}</p>
//             </div>
//             <div className='flex items-center'>
//               <p className='w-24 text-gray-600 font-medium'>Phone:</p>
//               {isEdit ? (
//                 <input
//                   className='bg-gray-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
//                   type='text'
//                   value={userData.phone}
//                   onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
//                 />
//               ) : (
//                 <p className='text-blue-400'>{userData.phone}</p>
//               )}
//             </div>
//             <div className='flex items-center'>
//               <p className='w-24 text-gray-600 font-medium'>Address:</p>
//               {isEdit ? (
//                 <div className='flex flex-row gap-2'>
//                   <input
//                     className='bg-gray-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
//                     onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
//                     value={userData.address.line1}
//                     type='text'
//                   /> 
//                   <input
//                     className='bg-gray-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
//                     onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
//                     value={userData.address.line2}
//                     type='text'
//                   />
//                 </div>
//               ) : (
//                 <p className='text-gray-500'>
//                   {userData.address.line1}
//                   <br />
//                   {userData.address.line2}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         <div>
//           <p className='text-sm font-semibold text-gray-500 uppercase mb-2'>Basic Information</p>
//           <div className='space-y-3'>
//             <div className='flex items-center'>
//               <p className='w-24 text-gray-600'>Gender:</p>
//               {isEdit ? (
//                 <select
//                   className='bg-gray-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
//                   onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
//                   value={userData.gender}
//                 >
//                   <option value='Male'>Male</option>
//                   <option value='Female'>Female</option>
//                 </select>
//               ) : (
//                 <p className='text-gray-400'>{userData.gender}</p>
//               )}
//             </div>
//             <div className='flex items-center'>
//               <p className='w-24 text-gray-600 font-medium'>DOB:</p>
//               {isEdit ? (
//                 <input
//                   className='bg-gray-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
//                   type='date'
//                   onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
//                   value={userData.dob}
//                 />
//               ) : (
//                 <p className='text-gray-400'>{userData.dob}</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className='mt-8'>
//         {isEdit ? (
//           <button
//             className='w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all'
//             onClick={updateUserProfileData}
//           >
//             Save Information
//           </button>
//         ) : (
//           <button
//             className='w-full bg-white border border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-50 transition-all'
//             onClick={() => setIsEdit(true)}
//           >
//             Edit Profile
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;


































