import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import ResumeService from '../services/ResumeService';

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({

    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {

    setUser({

      ...user,

      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await ResumeService.register(user);

      alert('Registration Successful');

      navigate('/login');

    } catch (error) {

      console.log(error);

      alert('Registration Failed');
    }
  };

  return (

    <div className="container mt-5">

      <div className="card shadow p-5">

        <h2 className="mb-4">

          Register

        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-success w-100"
          >

            Register

          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;