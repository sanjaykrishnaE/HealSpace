import React from 'react';

function Footer() {
  return (
    <footer className='bg-lightblue py-10 mt-40'>
      <div className='container mx-auto px-4 md:px-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-8 sm:gap-14'>
          {/* Left Section */}
          <div className='mb-8 sm:mb-0'>
          <p className='text-[#1E375A] text-xl font-semibold no-underline mb-5 w-40'>HealSpace</p>
            {/* <img className='mb-5 w-40' src='/path-to-your-logo.png' alt='Company Logo' /> */}
            <p className='text-gray-600 leading-6'>
            HealSpace is your trusted healthcare platform, designed to simplify the way you book doctor appointments. With a seamless and user-friendly interface, we connect patients with experienced healthcare professionals, ensuring timely access to quality medical care. Whether you need a routine check-up, specialist consultation, or urgent care, HealSpace makes healthcare accessible, convenient, and stress-free.
            </p>
          </div>

          {/* Center Section */}
          <nav className='mb-8 sm:mb-0'>
            <h2 className='text-xl font-semibold mb-5'>COMPANY</h2>
            <ul className='space-y-2'>
              <li><a href='/' className='text-gray-600 hover:text-gray-900 transition-colors'>Home</a></li>
              <li><a href='/about' className='text-gray-600 hover:text-gray-900 transition-colors'>About Us</a></li>
              <li><a href='/contact' className='text-gray-600 hover:text-gray-900 transition-colors'>Contact Us</a></li>
              <li><a href='/privacy-policy' className='text-gray-600 hover:text-gray-900 transition-colors'>Privacy Policy</a></li>
            </ul>
          </nav>

          {/* Right Section */}
          <address className='not-italic'>
            <h2 className='text-xl font-semibold mb-5'>GET IN TOUCH</h2>
            <ul className='space-y-2'>
              <li><a href='tel:+919474634565' className='text-gray-600 hover:text-gray-900 transition-colors'>+91 9474634565</a></li>
              <li><a href='mailto:healspace@gmail.com' className='text-gray-600 hover:text-gray-900 transition-colors'>healspace@gmail.com</a></li>
            </ul>
          </address>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-gray-200 mt-10 pt-6 text-center text-gray-600'>
          <p>&copy; {new Date().getFullYear()} HealSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
































// import React from 'react'

// function Footer() {
//   return (
//     <div className='md:mx-10'>
//       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
//         {/* left section */}
//         <div>
//           <img className='mb-5 w-40' src='' alt='' />
//           <p className='w-full md:w-2/3 text-gray-600 leading-6'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam tenetur doloremque molestias repellat minus asperiores in aperiam dolor, quaerat praesentium.
//                     </p>
              

//         </div>

//          {/* center section */}
//         <div>
//           <p className='text-xl font-medium mb-5'>COMPANY</p>
//           <ul className='flex flex-col gap-2 text-gray-600'>
//           <li>Home</li>
//           <li>About us </li>
//           <li>Contact us</li>
//           <li>Privacy policy</li>
//           </ul>
          
//           </div>

//           {/* right section */}
//         <div>
//           <p className='text-xl font-medium mb-5'>Get in touch</p>
//           <ul>
//           <li>+91 9474634565</li>
//           <li>healspace@gmail.com</li>
//           </ul>
          
//           </div>

//       </div>
//     </div>
//   )
// }

// export default Footer