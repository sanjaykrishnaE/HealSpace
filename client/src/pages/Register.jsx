import React from 'react'
import { useState } from 'react';
import '../styles/Register.css'

function Register() {

    const [Formdata, setFormdata] = useState({
        username: "",
        email: "",
        password: ""
      });
      const [message, setMessage] = useState("");
    
      const handleChange = (e) => {
        setFormdata({ ...Formdata, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();

      };


  return (
    <>
    <div className="wrapper">
        <div className="title">Sign Up</div>
        <form action="#" onSubmit={handleSubmit}>
        <div className="field">
            <input 
              type="text"
              name="Username"
              placeholder="Username"
              value={Formdata.email}
              onChange={handleChange} 
              required 
            />
            <label>Username</label>
          </div>
          <div className="field">
            <input 
              type="email"
              name="email"
              placeholder="Email"
              value={Formdata.email}
              onChange={handleChange} 
              required 
            />
            <label>Email</label>
          </div>
          <div className="field">
            <input 
              type="password" 
              name="password"
              placeholder="Password"
              value={Formdata.password}
              onChange={handleChange}
              required 
            />
            <label>Password</label>
          </div>
          <div className="content">
            
            
          </div>
          <div className="field">
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">
            Already a user? <a href="/signup">Login Now</a>
          </div>
          {message && <p>{message}</p>}
        </form>
      </div>
    </>
  )
}

export default Register