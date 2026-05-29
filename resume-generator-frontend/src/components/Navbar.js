import React from 'react';

import { Link } from 'react-router-dom';

function Navbar() {

  const token =
    localStorage.getItem('token');

  const logout = () => {

    localStorage.removeItem('token');

    window.location.href = '/login';
  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar shadow">

      <div className="container">

        <Link
          to="/"
          className="navbar-brand fw-bold fs-3"
        >

          AI Resume Builder

        </Link>

        <div>

          {

            token ? (

              <>

                <Link
                  to="/templates"
                  className="btn btn-warning me-2"
                >

                  Templates

                </Link>

                <Link
                  to="/create"
                  className="btn btn-primary me-2"
                >

                  Create Resume

                </Link>

                <Link
                  to="/resumes"
                  className="btn btn-success me-2"
                >

                  My Resumes

                </Link>

                <button
                  className="btn btn-danger"
                  onClick={logout}
                >

                  Logout

                </button>

              </>

            ) : (

              <>

                <Link
                  to="/login"
                  className="btn btn-primary me-2"
                >

                  Login

                </Link>

                <Link
                  to="/register"
                  className="btn btn-success"
                >

                  Register

                </Link>

              </>

            )
          }

        </div>

      </div>

    </nav>
  );
}

export default Navbar;