import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import HomeCount from '../components/HomeCount';
import TopDoctors from '../components/TopDoctors';
import Aboutus from '../components/Aboutus';

function Home() {
  return (
    <>
      <div >
        <Hero />
        <TopDoctors />
        <Aboutus />
        <HomeCount />
        <Footer />
      </div>
    </>
  );
}

export default Home;
