


import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import dropdownimg from '../assets/down-arrow (1).png';
import menuImg from '../assets/menu.png';
import closeImg from '../assets/close.png'
import { AppContext } from '../context/AppContext';

// import '../styles/Navbar.css';

function Navbar() {

  const navigate = useNavigate();

     const {token, setToken, userData} = useContext(AppContext)
  
  const [showMenu, setShowMenu] = useState(false);

  

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }
 



  return (
    <div className='flex items-center justify-between text-sm py-2  '>
      {/* <nav className='flex w-full justify-between items-center'> */}
        
          <h2 onClick={() => navigate('/')} className='text-[#1E375A] text-xl font-semibold no-underline mb-2 w-40 pl-10'>HealSpace</h2>
        
        <ul className='hidden md:flex items-start gap-5 font'>
          <NavLink to='/'>
            <li className='text-[#1E375A] no-underline'>HOME</li>
            <hr className='border-none outline-none h-0.5  bg-blue-500 w-3/5 m-auto hidden ' />
          </NavLink>
          <NavLink to='/doctors'>
            <li className='text-[#1E375A] no-underline'>ALL DOCTORS</li>
            <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden ' />
          </NavLink>
          <NavLink to='/about'>
            <li className='text-[#1E375A] no-underline'>ABOUT</li>
            <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden ' />
          </NavLink>
          <NavLink to='/contact'>
            <li className='text-[#1E375A] no-underline'>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden ' />
          </NavLink>

        </ul>
        <div className='flex items-center gap-4 pr-10'>
          {
            token && userData
              ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className='w-8 rounded-full '
                  src={userData.image}
                  alt="avatar" />
                <img className='w-2.5' src={dropdownimg} alt="" />
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                  <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 '>
                    <p onClick={() => navigate('/profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                    <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                    <p onClick={logout } className='hover:text-black cursor-pointer'>Logout</p>
                  </div>
                </div>
              </div>
              : <button
              onClick={() => navigate('/login')}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Login
              </button>
          }

          <img onClick={() => setShowMenu(true)} className='w-6 md:hidden ' src={menuImg} alt='' />
          {/* Mobile menu */}
          <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className='flex items-center justify-between px-5 py-6'>
  {/* <img className='w-36' src="logo-img" alt="" /> */}
  <img className='w-7' src={closeImg} alt="" />
</div>

          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink  onClick={() =>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
            <NavLink  onClick={() =>setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink  onClick={() =>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink  onClick={() =>setShowMenu(false)} to='contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
          </ul>
      
          </div>
        </div>

      {/* </nav> */}
    </div>
  );
}

export default Navbar;
























// import React, { useState } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import dropdownimg from '../assets/down-arrow (1).png';
// // import '../styles/Navbar.css';
// import menuImg from '../assets/menu.png'

// function Navbar() {
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);
//   const [token, setToken] = useState(true);

//   return (
//     <div className='flex items-center justify-between text-sm py-4 mb-5 bg-white shadow-md sticky top-0 z-50'>
//       {/* Logo */}
//       <h2
//         onClick={() => navigate('/')}
//         className='text-[#1E375A] no-underline pl-10 font-bold text-xl cursor-pointer hover:text-blue-600 transition-colors duration-300'
//       >
//         HealSpace
//       </h2>

//       {/* Navigation Links */}
//       <ul className='hidden md:flex items-center gap-8 font-medium'>
//         <NavLink
//           to='/'
//           className={({ isActive }) =>
//             isActive
//               ? 'text-blue-600 border-b-2 border-blue-600'
//               : 'text-[#1E375A] hover:text-blue-600 transition-colors duration-300'
//           }
//         >
//           <li className='py-1'>HOME</li>
//         </NavLink>
//         <NavLink
//           to='/doctors'
//           className={({ isActive }) =>
//             isActive
//               ? 'text-blue-600 border-b-2 border-blue-600'
//               : 'text-[#1E375A] hover:text-blue-600 transition-colors duration-300'
//           }
//         >
//           <li className='py-1'>ALL DOCTORS</li>
//         </NavLink>
//         <NavLink
//           to='/about'
//           className={({ isActive }) =>
//             isActive
//               ? 'text-blue-600 border-b-2 border-blue-600'
//               : 'text-[#1E375A] hover:text-blue-600 transition-colors duration-300'
//           }
//         >
//           <li className='py-1'>ABOUT</li>
//         </NavLink>
//         <NavLink
//           to='/contact'
//           className={({ isActive }) =>
//             isActive
//               ? 'text-blue-600 border-b-2 border-blue-600'
//               : 'text-[#1E375A] hover:text-blue-600 transition-colors duration-300'
//           }
//         >
//           <li className='py-1'>CONTACT</li>
//         </NavLink>
//       </ul>

//       {/* User Profile or Login Button */}
//       <div className='pr-10'>
//         {token ? 
//           <div className='flex items-center gap-2 cursor-pointer group relative'>
//             <img
//               className='w-8 h-8 rounded-full border-2 border-blue-600'
//               src="https://api.dicebear.com/9.x/initials/svg?seed=Jameson"
//               alt="avatar"
//             />
//             <img
//               className='w-2.5 transition-transform duration-300 group-hover:rotate-180'
//               src={dropdownimg}
//               alt="dropdown"
//             />
//             <div className='absolute top-full right-0 mt-2 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
//               <div className='min-w-48 bg-white rounded-lg shadow-lg flex flex-col gap-3 p-4'>
//                 <p
//                   onClick={() => navigate('/profile')}
//                   className='hover:text-black cursor-pointer transition-colors duration-300'
//                 >
//                   My Profile
//                 </p>
//                 <p
//                   onClick={() => navigate('/my-appointments')}
//                   className='hover:text-black cursor-pointer transition-colors duration-300'
//                 >
//                   My Appointments
//                 </p>
//                 <p
//                   onClick={() => setToken(false)}
//                   className='hover:text-black cursor-pointer transition-colors duration-300'
//                 >
//                   Logout
//                 </p>
//               </div>
//             </div>
//           </div>
//          : 
//           <button
//             onClick={() => navigate('/login')}
//             className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//           >
//             Create account
//           </button>
//         }
//         <img className='w-6 md:hidden' src={menuImg} alt='' />
//       </div>
//     </div>
//   );
// }

// export default Navbar;
