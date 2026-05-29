import React from 'react';

import { Link } from 'react-router-dom';

function Home() {

  return (

    <div className="hero-section">

      <div className="container text-center">

        <h1 className="display-3 fw-bold text-white">

          AI ATS Resume Builder

        </h1>

        <p className="lead text-light mt-4">

          Create Modern ATS Friendly Resume
          With AI Powered Technology

        </p>

        <div className="mt-5">

          <Link
            to="/templates"
            className="btn btn-warning btn-lg me-3"
          >

            Choose Template

          </Link>

          <Link
            to="/resumes"
            className="btn btn-light btn-lg"
          >

            View Resumes

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;