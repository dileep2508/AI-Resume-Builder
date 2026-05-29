import React, {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import {
  useNavigate,
  useParams
} from 'react-router-dom';

function EditResume() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [resume, setResume] = useState({

    fullName: '',
    email: '',
    phone: '',
    summary: '',
    skills: '',
    education: '',
    experience: '',
    projects: ''

  });

  // FETCH RESUME

  useEffect(() => {

    fetchResume();

  }, []);

  const fetchResume = async () => {

    try {

      const response = await axios.get(

        `http://localhost:8080/api/resume/${id}`

      );

      setResume(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // HANDLE CHANGE

  const handleChange = (e) => {

    setResume({

      ...resume,
      [e.target.name]: e.target.value

    });
  };

  // UPDATE RESUME

  const updateResume = async (e) => {

    e.preventDefault();

    try {

      await axios.put(

        `http://localhost:8080/api/resume/${id}`,

        resume

      );

      alert('Resume Updated Successfully');

      navigate('/resumes');

    } catch (error) {

      console.log(error);

      alert('Error Updating Resume');
    }
  };

  return (

    <div className="container mt-5">

      <div className="card shadow p-5">

        <h2 className="mb-4">

          Edit Resume

        </h2>

        <form onSubmit={updateResume}>

          <input
            type="text"
            name="fullName"
            value={resume.fullName}
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            value={resume.email}
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            value={resume.phone}
            className="form-control mb-3"
            onChange={handleChange}
          />

          <textarea
            name="summary"
            value={resume.summary}
            className="form-control mb-3"
            onChange={handleChange}
          ></textarea>

          <textarea
            name="skills"
            value={resume.skills}
            className="form-control mb-3"
            onChange={handleChange}
          ></textarea>

          <textarea
            name="education"
            value={resume.education}
            className="form-control mb-3"
            onChange={handleChange}
          ></textarea>

          <textarea
            name="experience"
            value={resume.experience}
            className="form-control mb-3"
            onChange={handleChange}
          ></textarea>

          <textarea
            name="projects"
            value={resume.projects}
            className="form-control mb-3"
            onChange={handleChange}
          ></textarea>

          <button
            className="btn btn-success w-100"
          >

            Update Resume

          </button>

        </form>

      </div>

    </div>
  );
}

export default EditResume;