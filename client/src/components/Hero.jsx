import React from 'react';
import heroimg from '../assets/pngegg (1).png';
import { useNavigate } from 'react-router-dom';

function Hero() {

    const navigate = useNavigate();
  return (
    <div className='bg-blue-50 py-12 md:py-20 lg:py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
          {/* Left Side - Content */}
          <div className='md:w-1/2 flex flex-col items-start justify-center space-y-6 text-center md:text-left'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E375A] leading-tight'>
            Your Health, <br className='hidden sm:block' />Our Responsibility
            </h1>
            <p className='text-lg text-gray-600 font-light max-w-md'>
            Your Trusted Partner in Personalized Healthcare. At HealSpace, we believe in delivering compassionate, high-quality care tailored to your unique needs.
            </p>
            <button
  onClick={() => navigate('/doctors')}
  className='inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
>
  Book Appointment
</button>
          </div>

          {/* Right Side - Image */}
          <div className='md:w-1/2 relative'>
            <img
              className='w-full h-auto max-w-xl mx-auto md:max-w-none rounded-lg shadow-lg'
              src={heroimg}
              alt='Healthcare Professionals'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;




























// import React from 'react';
// import heroimg from '../assets/pngegg (1).png'

// function Hero() {
//     return (
//         <>
// <div className='flex flex-col md:flex-row flex-wrap bg-blue-200 h-[93vh] rounded-lg px-6 md:px-10 lg:px-20 '>

//                 {/* left side */}
//                 <div className='md: w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] '>
//                     <p className='text-3xl md:text-4xl lg:text-5xl text-[#1E375A] font-semibold leading-tight md:leading-tight lg:leading-tight'>
//                     Your Health, <br />Our Responsibility...
//                     </p>
//                     <div className='flex flex-col md:flex-row items-center gap-3 text-[#1E375A] text-sm font-light'>
//                         {/* <img className='w-28 ' src='' alt='' /> */}
//                         <p> We are a team of dedicated healthcare professionals <br className='hidden sm:block' /> who are passionate about providing high-quality medical care.</p>
//                     </div>
//                     <a href='#' className='flex items-center gap-2 bg-white px-8 py-2 rounded-full text-gray-600 m-auto md:m-0 hover:scale-105 transition-all duration-300 '>
//                         Book appoinment <img src='' className='w-3' alt=''/>
//                     </a>

//                 </div>
//                 {/* right side */}
//                 <div className='md:w-1/2 relative '>
//                     <img className='w-full md:absolute bottom-0 h-auto  rounded-lg'
//                     src={heroimg} alt="hero img" />

//                 </div>
//             </div>




            
//         </>
//     );
// }

// export default Hero;














// {/* <section className='hero'>
//                 <div className="hero-content">
//                     <h1>Your Health, <br />Our Responsibility...</h1>
//                     <p>
//                         We are a team of dedicated healthcare professionals who are passionate about providing high-quality medical care. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam tenetur doloremque molestias repellat minus asperiores in aperiam dolor, quaerat praesentium.
//                     </p>
//                 </div>
//                 <div className="hero-img">
                    
//                 </div>
//             </section> */}