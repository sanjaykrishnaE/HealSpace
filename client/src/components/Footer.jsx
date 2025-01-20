import React from 'react'
import '../styles/Footer.css'

function Footer() {
  return (
    
    <>
  {/* Coding by CodingNepal | www.codingnepalweb.com */}
  <meta charSet="UTF-8" />
  <title> Responsive Footer | CodingLab </title>
  <link rel="stylesheet" href="style.css" />
  {/* Fontawesome CDN Link */}
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
  />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <footer>
    <div className="content">
      <div className="top">
        <div className="logo-details">
          <i className="fab fa-slack" />
          <span className="logo_name">HealSpace</span>
        </div>
        <div className="media-icons">
          <a href="#">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#">
            <i className="fab fa-twitter" />
          </a>
          <a href="#">
            <i className="fab fa-instagram" />
          </a>
          <a href="#">
            <i className="fab fa-linkedin-in" />
          </a>
          <a href="#">
            <i className="fab fa-youtube" />
          </a>
        </div>
      </div>
      <div className="link-boxes">
        <ul className="box">
          <li className="link_name">Company</li>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Contact us</a>
          </li>
          <li>
            <a href="#">About us</a>
          </li>
          <li>
            <a href="#">Get started</a>
          </li>
        </ul>
        <ul className="box">
          <li className="link_name">Services</li>
          <li>
            <a href="#">App design</a>
          </li>
          <li>
            <a href="#">Web design</a>
          </li>
          <li>
            <a href="#">Logo design</a>
          </li>
          <li>
            <a href="#">Banner design</a>
          </li>
        </ul>
        <ul className="box">
          <li className="link_name">Account</li>
          <li>
            <a href="#">Profile</a>
          </li>
          <li>
            <a href="#">My account</a>
          </li>
          <li>
            <a href="#">Prefrences</a>
          </li>
          <li>
            <a href="#">Purchase</a>
          </li>
        </ul>
        <ul className="box">
          <li className="link_name">Courses</li>
          <li>
            <a href="#">HTML &amp; CSS</a>
          </li>
          <li>
            <a href="#">JavaScript</a>
          </li>
          <li>
            <a href="#">Photography</a>
          </li>
          <li>
            <a href="#">Photoshop</a>
          </li>
        </ul>
        <ul className="box input-box">
          <li className="link_name">Subscribe</li>
          <li>
            <input type="text" placeholder="Enter your email" />
          </li>
          <li>
            <input type="button" defaultValue="Subscribe" />
          </li>
        </ul>
      </div>
    </div>
    <div className="bottom-details">
      <div className="bottom_text">
        <span className="copyright_text">
          Copyright © 2021 <a href="#">CodingLab.</a>All rights reserved
        </span>
        <span className="policy_terms">
          <a href="#">Privacy policy</a>
          <a href="#">Terms &amp; condition</a>
        </span>
      </div>
    </div>
  </footer>
</>

    
  )
}

export default Footer