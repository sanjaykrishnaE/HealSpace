
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'




function LoginPage() {

  const {token, setToken, backendUrl} = useContext(AppContext)

  const navigate = useNavigate()

  const [state ,setState] = useState('Login')

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onHandleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (state === 'Login') {
        const {data} = await axios.post(backendUrl+'/user/login',{email,password})
        if(data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token);
        } else {
          toast.error(data.message)
        }
        
      } else {
        const {data} = await axios.post(backendUrl+'/user/signup',{name,email,password})
        if(data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }
 
  }
  useEffect(()=> {
    if (token) {
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={onHandleSubmit} className='min-h-[80vh] flex items-center' >
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold   text-blue-500'>
          {state === 'Login' ? 'Login' : 'Create account'}</p>
         {
          state !== 'Login' && <div className='w-full'>
          <p>Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 m-1' 
          type="text" onChange={(e) => setName(e.target.value)} value={name}/>
        </div>
         }
        

        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 m-1'
           type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 m-1' 
          type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
        </div>
        <button type='submit' className="bg-blue-500 text-white  px-4 py-2 w-full text-base rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">{state === 'Login' ? 'Login' : 'Create account'}</button>
        {
          state === 'Login'
          ? <p>Not a member ?<span onClick={()=> setState('Create account')} className='text-blue-500 underline cursor-pointer'>Signup Now</span> </p>
          : <p>Already have an account? <span onClick={()=> setState('Login')} className='text-blue-500 underline cursor-pointer'>Login here</span></p>
        }
      </div>

    </form>
  )
}

export default LoginPage

























// import React, { useState } from 'react';
// // import '../styles/Loginpage.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function LoginPage() {
//   const [Formdata, setFormdata] = useState({
    
//     email: "",
//     password: ""
//   });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormdata({ ...Formdata, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/login",
//         Formdata
//       );
//       localStorage.setItem("token",response.data.token)
//       setMessage(response.data.message);

//       navigate('/');

//     } catch (error) {
//       setMessage(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <>
//       <div class="flex justify-center items-center h-screen bg-[#e9f1fa]">
//         <div className="w-[380px] bg-[#fff] rounded-[15px] [box-shadow:0px_15px_20px_rgba(0,_0,_0,_0.1)] p-[20px] pt-[10px]">
//           <div className="text-[35px] font-semibold text-center text-[#fff] select-none rounded-tl-[15px] rounded-br-[0] rounded-tr-[15px] rounded-bl-[0] bg-[#1E375A] px-[0] py-[20px]">Login</div>
//           <form action="#" className='pl-[30px] pr-[30px] py-[10px]' onSubmit={handleSubmit}>
//             <div className="h-[50px] w-full mt-[20px] relative">
//               <input className='h-full w-full outline-none text-[17px] pl-[20px] border border-solid border-lightgrey rounded-[25px] transition-all duration-300 ease-in-out focus:border-[#4158d0] valid:border-[#4158d0]'
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={Formdata.email}
//                 onChange={handleChange}
//                 required
//               />
              
//             </div>
//             <div className="h-[50px] w-full mt-[20px] relative">
//               <input className='h-full w-full outline-none text-[17px] pl-[20px] border border-solid border-lightgrey rounded-[25px] transition-all duration-300 ease-in-out focus:border-[#4158d0] valid:border-[#4158d0]'
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={Formdata.password}
//                 onChange={handleChange}
//                 required
//               />
              
//             </div>
//             <div className="flex w-full h-[50px] text-[16px] items-center justify-between">
//               <div className="flex items-center">
//                 <input type="checkbox" className='w-[15px] h-[15px]' id="remember-me" />
//                 <label className='text-[#262626] select-none pl-[5px]' htmlFor="remember-me">Remember me</label>
//               </div>
//               <div className="pass-link">
//                 <a className='text-[#1E375A] no-underline hover:underline' href="#">Forgot password?</a>
//               </div>
//             </div>
//             <div class="h-[50px] w-full mt-[20px] relative flex items-center justify-center">
//               <input type="submit" class="text-white border-0 mt-0 text-2xl font-medium cursor-pointer bg-[#1E375A] rounded-[35px] shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform active:scale-95"
//                 value="Login" />
//             </div>

//             <div className="text-[#262626] mt-[20px] text-center">
//               Not a member? <a className='text-[#1E375A] no-underline hover:underline' href="/register">Signup now</a>
//             </div>
//             {message && <p>{message}</p>}
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LoginPage;