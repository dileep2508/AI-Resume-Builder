import React from 'react';

function ResumePreview() {

  const template =
    localStorage.getItem('selectedTemplate');

  const resume = JSON.parse(
    localStorage.getItem('previewResume')
  );

  if (!resume) {

    return (

      <div className="container mt-5">

        <h2>No Resume Data Found</h2>

      </div>
    );
  }

  return (

    <div className="container mt-5 mb-5">

      <div
        className={

          template === 'Professional Template'
            ? 'professional-template'
            : template === 'Minimal Template'
            ? 'minimal-template'
            : 'modern-template'
        }
      >

        {/* PROFILE SECTION */}

        <div className="text-center mb-4">

          {

            resume.profileImage && (

              <img
                src={resume.profileImage}
                alt="profile"
                className="preview-image"
              />
            )
          }

          <h1>{resume.fullName}</h1>

          <p>

            {resume.email} | {resume.phone}

          </p>

          <p>{resume.linkedin}</p>

          <p>{resume.github}</p>

          <p>{resume.portfolio}</p>

        </div>

        <hr />

        {/* SUMMARY */}

        <div className="section">

          <h3>Professional Summary</h3>

          <p>{resume.summary}</p>

        </div>

        {/* ATS FRIENDLY SKILLS */}

        <div className="section">

          <h3>Skills</h3>

          <div className="mb-3">

            <h5>Programming Languages</h5>

            <ul>
              <li>Java</li>
              <li>JavaScript</li>
              <li>SQL</li>
            </ul>

            <h5>Backend Technologies</h5>

            <ul>
              <li>Spring Boot</li>
              <li>Spring Security</li>
              <li>Hibernate</li>
              <li>REST APIs</li>
              <li>JWT Authentication</li>
            </ul>

            <h5>Frontend Technologies</h5>

            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React</li>
            </ul>

            <h5>Database</h5>

            <ul>
              <li>PostgreSQL</li>
              <li>MySQL</li>
              <li>SQLite</li>
            </ul>

            <h5>Tools & Platforms</h5>

            <ul>
              <li>Git</li>
              <li>GitHub</li>
              <li>Maven</li>
              <li>IntelliJ IDEA</li>
              <li>VS Code</li>
              <li>Postman</li>
            </ul>

          </div>

        </div>

        {/* EDUCATION */}

        <div className="section">

          <h3>Education</h3>

          <p style={{ whiteSpace: 'pre-line' }}>

            {resume.education}

          </p>

        </div>

        {/* EXPERIENCE */}

        <div className="section">

          <h3>Experience</h3>

          <p style={{ whiteSpace: 'pre-line' }}>

            {resume.experience}

          </p>

        </div>

        {/* PROJECTS */}

        <div className="section">

          <h3>Projects</h3>

          <p style={{ whiteSpace: 'pre-line' }}>

            {resume.projects}

          </p>

        </div>

        {/* LANGUAGES */}

        <div className="section">

          <h3>Languages</h3>

          <p>{resume.languages}</p>

        </div>

        {/* HOBBIES */}

        <div className="section">

          <h3>Hobbies</h3>

          <p>{resume.hobbies}</p>

        </div>

      </div>

    </div>
  );
}

export default ResumePreview;