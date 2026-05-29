import React from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function ResumeCard({ resume }) {

  const navigate = useNavigate();

  // DOWNLOAD PDF

  const downloadResume = () => {

    window.open(

      `http://localhost:8080/api/resume/download/${resume.id}`

    );
  };

  // EDIT RESUME

  const editResume = () => {

    navigate(`/edit/${resume.id}`);
  };

  // DELETE RESUME

  const deleteResume = async () => {

    const confirmDelete =
      window.confirm(
        'Are you sure you want to delete this resume?'
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(

        `http://localhost:8080/api/resume/${resume.id}`

      );

      alert('Resume Deleted Successfully');

      // REFRESH PAGE

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert('Error Deleting Resume');
    }
  };

  return (

    <div className="card shadow p-4 mb-4">

      <h2>{resume.fullName}</h2>

      <p>
        <b>Email:</b> {resume.email}
      </p>

      <p>
        <b>Phone:</b> {resume.phone}
      </p>

      <p>
  <b>GitHub:</b>

  <a
    href={resume.github}
    target="_blank"
    rel="noreferrer"
  >
    {resume.github}
  </a>
</p>

<p>
  <b>LinkedIn:</b>

  <a
    href={resume.linkedin}
    target="_blank"
    rel="noreferrer"
  >
    {resume.linkedin}
  </a>
</p>

<p>
  <b>Portfolio:</b>

  <a
    href={resume.portfolio}
    target="_blank"
    rel="noreferrer"
  >
    {resume.portfolio}
  </a>
</p>

{
  resume.profileImage && (

    <div className="text-center mb-4">

      <img
        src={resume.profileImage}
        alt="Profile"
        width="150"
        height="150"
        style={{

          borderRadius: '50%',

          objectFit: 'cover'

        }}
      />

    </div>
  )
}

      <hr />

      <h4>Summary</h4>
      <p>{resume.summary}</p>

      <h4>Skills</h4>
      <p>{resume.skills}</p>

      <h4>Education</h4>
      <p>{resume.education}</p>

      <h4>Experience</h4>
      <p>{resume.experience}</p>

      <h4>Projects</h4>
      <p>{resume.projects}</p>

      <div className="mt-4">

        {/* DOWNLOAD BUTTON */}

        <button
          className="btn btn-primary me-3"
          onClick={downloadResume}
        >

          Download PDF

        </button>

        {/* EDIT BUTTON */}

        <button
          className="btn btn-warning me-3"
          onClick={editResume}
        >

          Edit Resume

        </button>

        {/* DELETE BUTTON */}

        <button
          className="btn btn-danger"
          onClick={deleteResume}
        >

          Delete Resume

        </button>

      </div>

    </div>
  );
}

export default ResumeCard;