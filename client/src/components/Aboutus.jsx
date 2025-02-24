import React from 'react';
import image from '../assets/aboutimg.af2db4b9f307d04f8745.jpg';
import Footer from './Footer';

function Aboutus() {
  return (
    <section className="py-16 bg-lightblue" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-[#1E375A] mb-12">
          About Us
        </h2>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Hero Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={image}
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Hero Content */}
          <div className="w-full lg:w-1/2">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At Healspace, we are dedicated to providing exceptional healthcare
              services tailored to your needs. Our team of experienced
              professionals is committed to ensuring your well-being and helping
              you achieve your health goals.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We believe in a holistic approach to health, combining modern
              medicine with personalized care. Whether you're seeking routine
              check-ups, specialized treatments, or wellness programs, Healspace
              is here to support you every step of the way.
            </p>
            <button className="bg-[#1E375A] text-white px-8 py-3 rounded-lg hover:bg-[#2A4A7A] transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
    </section>
  );
}

export default Aboutus;