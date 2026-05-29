import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import ResumeService from '../services/ResumeService';

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({

    email: '',
    password: ''

  });

  const [loading, setLoading] =
    useState(false);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {

    setUser({

      ...user,

      [e.target.name]: e.target.value

    });
  };

  // ================= LOGIN =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response =
        await ResumeService.login(user);

      console.log(
        'Login Response:',
        response.data
      );

      // ================= TOKEN =================

      const token =
        response.data.token ||
        response.data.jwt ||
        response.data.accessToken;

      if (!token) {

        alert(
          'Token Not Received From Backend'
        );

        setLoading(false);

        return;
      }

      // ================= SAVE TOKEN =================

      localStorage.setItem(
        'token',
        token
      );

      // ================= SAVE USER =================

      localStorage.setItem(
        'isLoggedIn',
        'true'
      );

      alert('Login Successful');

      // ================= REDIRECT =================

      navigate('/');

    } catch (error) {

      console.log(error);

      // ================= ERROR HANDLING =================

      if (error.response) {

        if (error.response.status === 401) {

          alert('Invalid Email or Password');

        } else {

          alert(
            'Login Failed : ' +
            error.response.status
          );
        }

        console.log(
          error.response.data
        );

      } else if (error.request) {

        alert(
          'Backend Server Not Running'
        );

      } else {

        alert(
          'Something Went Wrong'
        );
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow p-5">

            <h2 className="text-center mb-4">

              Login

            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="email"
                name="email"
                value={user.email}
                placeholder="Email"
                className="form-control mb-3"
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                value={user.password}
                placeholder="Password"
                className="form-control mb-4"
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >

                {
                  loading
                    ? 'Logging In...'
                    : 'Login'
                }

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;