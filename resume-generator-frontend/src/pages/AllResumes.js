import React, { useEffect, useState } from 'react';
import ResumeService from '../services/ResumeService';
import jsPDF from 'jspdf';

function AllResumes() {

  const [resumes, setResumes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedResume, setEditedResume] = useState({});

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await ResumeService.getAllResumes();
      setResumes(response.data);
    } catch (error) {
      console.log(error);
      alert('Backend Not Responding or Token Missing');
    }
  };

  const deleteResume = async (id) => {
    try {
      await ResumeService.deleteResume(id);
      alert('Deleted Successfully');
      fetchResumes();
    } catch (error) {
      console.log(error);
      alert('Delete Failed');
    }
  };

  const startEdit = (resume) => {
    setEditingId(resume.id);
    setEditedResume(resume);
  };

  const handleChange = (e) => {
    setEditedResume({
      ...editedResume,
      [e.target.name]: e.target.value
    });
  };

  const updateResume = async () => {
    try {
      await ResumeService.updateResume(editingId, editedResume);
      alert('Updated Successfully');
      setEditingId(null);
      fetchResumes();
    } catch (error) {
      console.log(error);
      alert('Update Failed');
    }
  };

  // ================= REAL CIRCLE IMAGE (IMPORTANT FIX) =================
  const getCircularImage = (url) => {
    return new Promise((resolve) => {
      if (!url) return resolve(null);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;

      img.onload = () => {
        const size = 200;

        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");

        // draw circle mask
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // draw image inside circle
        ctx.drawImage(img, 0, 0, size, size);

        resolve(canvas.toDataURL("image/png"));
      };

      img.onerror = () => resolve(null);
    });
  };

  // ================= PDF DOWNLOAD =================
  const downloadResume = async (resume) => {

    const doc = new jsPDF();
    let y = 10;

    const addSection = (title, content) => {

      if (y > 270) {
        doc.addPage();
        y = 10;
      }

      doc.setFontSize(13);
      doc.setFont(undefined, 'bold');
      doc.text(title, 10, y);
      y += 6;

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');

      const lines = doc.splitTextToSize(String(content || 'Not Provided'), 180);
      doc.text(lines, 10, y);

      y += lines.length * 6 + 6;
    };

    // TITLE
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text("RESUME", 10, y);
    y += 10;

    // ================= PROFILE IMAGE (REAL CIRCLE FIX) =================
    if (resume.profileImage) {
      const imgData = await getCircularImage(resume.profileImage);

      if (imgData) {
        doc.addImage(imgData, "PNG", 150, 10, 40, 40);
      }
    }

    // BASIC INFO
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');

    doc.text(`Name: ${resume.fullName || ''}`, 10, y += 8);
    doc.text(`Email: ${resume.email || ''}`, 10, y += 8);
    doc.text(`Phone: ${resume.phone || ''}`, 10, y += 8);

    y += 5;

    addSection("GitHub", resume.github);
    addSection("LinkedIn", resume.linkedin);
    addSection("Portfolio", resume.portfolio);

    addSection("Professional Summary", resume.summary);
    addSection("Skills", resume.skills);
    addSection("Education", resume.education);
    addSection("Experience", resume.experience);
    addSection("Projects", resume.projects);

    addSection("Languages", resume.languages || "English, Hindi");
    addSection("Hobbies", resume.hobbies || "Coding, Learning");

    doc.save(`${resume.fullName || "resume"}.pdf`);
  };

  return (
    <div className="container mt-5 mb-5">

      <h1 className="mb-4">All Resumes</h1>

      {resumes.length === 0 ? (
        <h4>No Resume Found</h4>
      ) : (

        resumes.map((resume) => (

          <div className="card shadow p-4 mb-4" key={resume.id}>

            {editingId === resume.id ? (

              <div>

                <input name="fullName" value={editedResume.fullName || ''} className="form-control mb-2" onChange={handleChange} />
                <input name="email" value={editedResume.email || ''} className="form-control mb-2" onChange={handleChange} />
                <input name="phone" value={editedResume.phone || ''} className="form-control mb-2" onChange={handleChange} />

                <input name="github" value={editedResume.github || ''} className="form-control mb-2" onChange={handleChange} />
                <input name="linkedin" value={editedResume.linkedin || ''} className="form-control mb-2" onChange={handleChange} />
                <input name="portfolio" value={editedResume.portfolio || ''} className="form-control mb-2" onChange={handleChange} />

                <textarea name="summary" value={editedResume.summary || ''} className="form-control mb-2" rows="3" onChange={handleChange} />
                <input name="skills" value={editedResume.skills || ''} className="form-control mb-2" onChange={handleChange} />

                <input name="languages" value={editedResume.languages || ''} className="form-control mb-2" onChange={handleChange} />
                <input name="hobbies" value={editedResume.hobbies || ''} className="form-control mb-3" onChange={handleChange} />

                <button className="btn btn-success me-2" onClick={updateResume}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>

              </div>

            ) : (

              <div className="row">

                <div className="col-md-3">
                  {resume.profileImage && (
                    <img
                      src={resume.profileImage}
                      alt="Profile"
                      className="img-fluid rounded-circle"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  )}
                </div>

                <div className="col-md-9">

                  <h3>{resume.fullName}</h3>

                  <p><b>Email:</b> {resume.email}</p>
                  <p><b>Phone:</b> {resume.phone}</p>

                  <p><b>Skills:</b> {resume.skills}</p>
                  <p><b>Summary:</b> {resume.summary}</p>

                  <button className="btn btn-primary me-2" onClick={() => startEdit(resume)}>Edit</button>
                  <button className="btn btn-danger me-2" onClick={() => deleteResume(resume.id)}>Delete</button>
                  <button className="btn btn-success" onClick={() => downloadResume(resume)}>Download PDF</button>

                </div>

              </div>

            )}

          </div>

        ))

      )}

    </div>
  );
}

export default AllResumes;  