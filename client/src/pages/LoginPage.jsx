import React, { useState } from 'react';
import '../styles/Loginpage.css';

function LoginPage() {
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
    // You can add your form submission logic here
    // For example, setMessage("Form submitted successfully!");
  };

  return (
    <>
      <div className="wrapper">
        <div className="title">Login</div>
        <form action="#" onSubmit={handleSubmit}>
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
            <div className="checkbox">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <div className="pass-link">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <div className="field">
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">
            Not a member? <a href="/signup">Signup now</a>
          </div>
          {message && <p>{message}</p>}
        </form>
      </div>
    </>
  );
}

export default LoginPage;
