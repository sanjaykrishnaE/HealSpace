import React from 'react';
import '../styles/Hero.css';

function Hero() {
    return (
        <>
            <section className='hero'>
                <div className="hero-content">
                    <h1>Your Health, <br />Our Responsibility...</h1>
                    <p>
                        We are a team of dedicated healthcare professionals who are passionate about providing high-quality medical care. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam tenetur doloremque molestias repellat minus asperiores in aperiam dolor, quaerat praesentium.
                    </p>
                </div>
                <div className="hero-img">
                    {/* <img src='' alt='hero'/> */}
                </div>
            </section>
        </>
    );
}

export default Hero;
