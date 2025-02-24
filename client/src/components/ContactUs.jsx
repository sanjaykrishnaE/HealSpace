import React from 'react';

import contactImg from '../assets/pexels-fr3nks-305565.jpg'
import Footer from './Footer';


function ContactUs() {
  return (
    <>
    <section className="py-16 bg-lightblue" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-[#1E375A] mb-12">
          Contact Us
        </h2>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10">

        {/* Image Section */}
        <div className="w-full lg:w-1/2">
            <img
              src={contactImg}
              alt="Contact Us"
              className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>


          {/* Contact Information */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-[#1E375A] p-3 rounded-full flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-xl font-semibold text-[#1E375A]">Our Address</p>
                  <p className="text-lg text-gray-700">
                    123 Health Street,  Kochi,
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#1E375A] p-3 rounded-full flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-xl font-semibold text-[#1E375A]">Phone Number</p>
                  <p className="text-lg text-gray-700">+91 9474634565</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#1E375A] p-3 rounded-full flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-xl font-semibold text-[#1E375A]">Email Address</p>
                  <p className="text-lg text-gray-700">healspace@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </section>

    <Footer />
    </>
  );
}

export default ContactUs;