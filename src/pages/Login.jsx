import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [responseMessage, setResponseMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., authentication logic
    try {
      const response = await axios.post('http://localhost:8000/login-data', formData);
      const { message } = response.data;
      setResponseMessage(message); // 
      localStorage.setItem('token', response.data.token);
      console.log('Form data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
    console.log('Form Data:', formData);
    // Reset the form fields after submission
    setFormData({
      username: '',
      password: '',
    });
  };

  return (
    <div className="container">
      {responseMessage && (
        <p style={{ color: 'green' }}>{responseMessage}</p>
      )}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

