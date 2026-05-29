// ResumeForm.jsx

import React, { useState } from 'react';
import ResumeService from '../services/ResumeService';
import axios from 'axios';

function ResumeForm() {

  // ================= RESUME STATE =================

  const [resume, setResume] = useState({

    fullName: '',
    email: '',
    phone: '',

    github: '',
    linkedin: '',
    portfolio: '',

    profileImage: '',

    summary: '',

    skills: {
      programmingLanguages: [''],
      backendTechnologies: [''],
      frontendTechnologies: [''],
      database: [''],
      toolsPlatforms: ['']
    },

    education: [''],
    experience: [''],
    projects: [''],
    languages: [''],
    hobbies: ['']

  });

  // ================= AI CHAT STATE =================

  const [chatMessage, setChatMessage] = useState('');

  const [chatHistory, setChatHistory] = useState([

    {
      role: 'ai',
      text:
        `👋 Hi! I'm your AI Resume Assistant.

I can help you with:
• Professional Summary
• ATS Optimization
• Resume Formatting
• Skills Improvement
• Experience Writing

Ask me anything about your resume.`
    }

  ]);

  const [loadingAI, setLoadingAI] = useState(false);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {

    setResume({

      ...resume,

      [e.target.name]: e.target.value

    });
  };

  // ================= IMAGE UPLOAD =================

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    // 500 KB limit
    if (file.size > 500 * 1024) {

      alert('Image size should be less than 500KB');

      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {

      setResume(prev => ({

        ...prev,

        profileImage: reader.result

      }));
    };

    reader.readAsDataURL(file);
  };

  // ================= SKILL CHANGE =================

  const handleSkillChange = (
    category,
    index,
    value
  ) => {

    const updatedSkills = {
      ...resume.skills
    };

    updatedSkills[category][index] = value;

    setResume({

      ...resume,

      skills: updatedSkills

    });
  };

  // ================= ADD SKILL =================

  const addSkillField = (category) => {

    setResume({

      ...resume,

      skills: {

        ...resume.skills,

        [category]: [

          ...resume.skills[category],
          ''

        ]

      }

    });
  };

  // ================= REMOVE SKILL =================

  const removeSkillField = (
    category,
    index
  ) => {

    const updated = [
      ...resume.skills[category]
    ];

    updated.splice(index, 1);

    setResume({

      ...resume,

      skills: {

        ...resume.skills,

        [category]:
          updated.length > 0
            ? updated
            : ['']

      }

    });
  };

  // ================= ARRAY CHANGE =================

  const handleArrayChange = (
    index,
    field,
    value
  ) => {

    const updated = [...resume[field]];

    updated[index] = value;

    setResume({

      ...resume,

      [field]: updated

    });
  };

  // ================= ADD FIELD =================

  const addField = (field) => {

    setResume({

      ...resume,

      [field]: [

        ...resume[field],
        ''

      ]

    });
  };

  // ================= REMOVE FIELD =================

  const removeField = (
    field,
    index
  ) => {

    const updated = [...resume[field]];

    updated.splice(index, 1);

    setResume({

      ...resume,

      [field]:
        updated.length > 0
          ? updated
          : ['']

    });
  };

  // ================= AI SUMMARY =================

  const generateAISummary = async () => {

    try {

      const allSkills = [

        ...resume.skills.programmingLanguages,
        ...resume.skills.backendTechnologies,
        ...resume.skills.frontendTechnologies,
        ...resume.skills.database,
        ...resume.skills.toolsPlatforms

      ];

      const skillsText = allSkills
        .filter(skill =>
          skill.trim() !== ''
        )
        .join(', ');

      if (!skillsText) {

        alert('Please Enter Skills First');

        return;
      }

      const response =
        await ResumeService.generateSummary(
          skillsText
        );

      setResume(prev => ({

        ...prev,

        summary: response.data

      }));

    } catch (error) {

      console.log(error);

      alert('AI Summary Error');
    }
  };

  // ================= AI CHAT =================

  const sendMessageToAI = async () => {

    if (!chatMessage.trim()) return;

    const userMessage = {

      role: 'user',

      text: chatMessage

    };

    setChatHistory(prev => [

      ...prev,

      userMessage

    ]);

    try {

      setLoadingAI(true);

      const response = await axios.post(

        'http://localhost:8080/api/resume/chat',

        {

          model: 'gpt-4o-mini',

          prompt: chatMessage,

          max_tokens: 200

        }

      );

      const aiMessage = {

        role: 'ai',

        text: response.data

      };

      setChatHistory(prev => [

        ...prev,

        aiMessage

      ]);

      setChatMessage('');

    } catch (error) {

      console.log(error);

      setChatHistory(prev => [

        ...prev,

        {

          role: 'ai',

          text:
            error.response?.data ||
            error.message ||
            'Backend Error'

        }

      ]);

    } finally {

      setLoadingAI(false);
    }
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formattedSkills = `

Programming Languages:
${resume.skills.programmingLanguages
  .filter(item => item.trim() !== '')
  .join(', ')}

Backend Technologies:
${resume.skills.backendTechnologies
  .filter(item => item.trim() !== '')
  .join(', ')}

Frontend Technologies:
${resume.skills.frontendTechnologies
  .filter(item => item.trim() !== '')
  .join(', ')}

Database:
${resume.skills.database
  .filter(item => item.trim() !== '')
  .join(', ')}

Tools & Platforms:
${resume.skills.toolsPlatforms
  .filter(item => item.trim() !== '')
  .join(', ')}

`;

      const formattedResume = {

        fullName: resume.fullName,

        email: resume.email,

        phone: resume.phone,

        github: resume.github,

        linkedin: resume.linkedin,

        portfolio: resume.portfolio,

        profileImage: resume.profileImage,

        summary: resume.summary,

        skills: formattedSkills,

        education:
          resume.education
            .filter(item =>
              item.trim() !== ''
            )
            .join('\n'),

        experience:
          resume.experience
            .filter(item =>
              item.trim() !== ''
            )
            .join('\n'),

        projects:
          resume.projects
            .filter(item =>
              item.trim() !== ''
            )
            .join('\n'),

        languages:
          resume.languages
            .filter(item =>
              item.trim() !== ''
            )
            .join(', '),

        hobbies:
          resume.hobbies
            .filter(item =>
              item.trim() !== ''
            )
            .join(', ')
      };

      await ResumeService.saveResume(
        formattedResume
      );

      alert('Resume Saved Successfully');

      localStorage.setItem(
        'previewResume',
        JSON.stringify(formattedResume)
      );

      window.location.href = '/preview';

    } catch (error) {

      console.log(error);

      alert('Error Saving Resume');
    }
  };

  // ================= COMMON ARRAY UI =================

  const renderArrayField = (
    title,
    field,
    type = 'input'
  ) => (

    <div className="mb-4">

      <h4>{title}</h4>

      {

        resume[field].map((item, index) => (

          <div
            className="d-flex mb-2"
            key={index}
          >

            {

              type === 'textarea'

                ? (

                  <textarea
                    value={item}
                    className="form-control me-2"
                    rows="3"
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        field,
                        e.target.value
                      )
                    }
                  />

                )

                : (

                  <input
                    type="text"
                    value={item}
                    className="form-control me-2"
                    onChange={(e) =>
                      handleArrayChange(
                        index,
                        field,
                        e.target.value
                      )
                    }
                  />

                )
            }

            <button
              type="button"
              className="btn btn-danger"
              onClick={() =>
                removeField(
                  field,
                  index
                )
              }
            >

              Remove

            </button>

          </div>

        ))
      }

      <button
        type="button"
        className="btn btn-primary"
        onClick={() =>
          addField(field)
        }
      >

        Add {title}

      </button>

    </div>
  );

  // ================= SKILL CATEGORY UI =================

  const renderSkillCategory = (
    title,
    category
  ) => (

    <div className="mb-4">

      <h5>{title}</h5>

      {

        resume.skills[category].map((item, index) => (

          <div
            className="d-flex mb-2"
            key={index}
          >

            <input
              type="text"
              value={item}
              className="form-control me-2"
              placeholder={`Enter ${title}`}
              onChange={(e) =>
                handleSkillChange(
                  category,
                  index,
                  e.target.value
                )
              }
            />

            <button
              type="button"
              className="btn btn-danger"
              onClick={() =>
                removeSkillField(
                  category,
                  index
                )
              }
            >

              Remove

            </button>

          </div>

        ))
      }

      <button
        type="button"
        className="btn btn-primary"
        onClick={() =>
          addSkillField(category)
        }
      >

        Add {title}

      </button>

    </div>
  );

  // ================= UI =================

  return (

    <div className="container mt-5 mb-5">

      <div className="card shadow p-5">

        <h1 className="text-center mb-5">

          Create Resume

        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="fullName"
            value={resume.fullName}
            placeholder="Full Name"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            value={resume.email}
            placeholder="Email"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            value={resume.phone}
            placeholder="Phone"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="github"
            value={resume.github}
            placeholder="GitHub URL"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="text"
            name="linkedin"
            value={resume.linkedin}
            placeholder="LinkedIn URL"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="text"
            name="portfolio"
            value={resume.portfolio}
            placeholder="Portfolio URL"
            className="form-control mb-4"
            onChange={handleChange}
          />

          <div className="mb-4">

            <label className="form-label">

              Upload Profile Image

            </label>

            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageUpload}
            />

          </div>

          {

            resume.profileImage && (

              <div className="mb-4 text-center">

                <img
                  src={resume.profileImage}
                  alt="Profile"
                  style={{

                    width: '150px',

                    height: '150px',

                    borderRadius: '50%',

                    objectFit: 'cover'

                  }}
                />

              </div>
            )
          }

          <button
            type="button"
            className="btn btn-dark mb-4"
            onClick={generateAISummary}
          >

            Generate AI Summary

          </button>

          <textarea
            name="summary"
            value={resume.summary}
            placeholder="Professional Summary"
            className="form-control mb-4"
            rows="4"
            onChange={handleChange}
          />

          {/* ================= SKILLS ================= */}

          <div className="mb-5">

            <h3 className="mb-4">

              Skills

            </h3>

            {renderSkillCategory(
              'Programming Languages',
              'programmingLanguages'
            )}

            {renderSkillCategory(
              'Backend Technologies',
              'backendTechnologies'
            )}

            {renderSkillCategory(
              'Frontend Technologies',
              'frontendTechnologies'
            )}

            {renderSkillCategory(
              'Database',
              'database'
            )}

            {renderSkillCategory(
              'Tools & Platforms',
              'toolsPlatforms'
            )}

          </div>

          {renderArrayField(
            'Education',
            'education',
            'textarea'
          )}

          {renderArrayField(
            'Experience',
            'experience',
            'textarea'
          )}

          {renderArrayField(
            'Projects',
            'projects',
            'textarea'
          )}

          {renderArrayField(
            'Languages',
            'languages'
          )}

          {renderArrayField(
            'Hobbies',
            'hobbies'
          )}

          <button
            type="submit"
            className="btn btn-success w-100"
          >

            Save Resume

          </button>

        </form>

        {/* ================= AI CHAT ================= */}

        <div
          style={{

            marginTop: '40px',

            border: '1px solid #ddd',

            borderRadius: '10px',

            padding: '20px'

          }}
        >

          <div
            className="d-flex justify-content-between align-items-center mb-3"
          >

            <h4>

              🤖 AI Assistant

            </h4>

            <button
              className="btn btn-danger btn-sm"
              onClick={() =>

                setChatHistory([

                  {

                    role: 'ai',

                    text:
                      'Chat Cleared Successfully.'

                  }

                ])
              }
            >

              Clear

            </button>

          </div>

          <div
            style={{

              height: '300px',

              overflowY: 'auto',

              border: '1px solid #ccc',

              borderRadius: '10px',

              padding: '15px',

              background: '#f8f9fa'

            }}
          >

            {

              chatHistory.map((msg, index) => (

                <div

                  key={index}

                  style={{

                    background:

                      msg.role === 'user'
                        ? '#0d6efd'
                        : '#e9ecef',

                    color:

                      msg.role === 'user'
                        ? 'white'
                        : 'black',

                    padding: '10px',

                    borderRadius: '10px',

                    marginBottom: '10px',

                    maxWidth: '75%',

                    marginLeft:

                      msg.role === 'user'
                        ? 'auto'
                        : '0'

                  }}
                >

                  {msg.text}

                </div>
              ))
            }

          </div>

          <div className="d-flex mt-3">

            <input

              type="text"

              className="form-control me-2"

              placeholder="Ask AI anything..."

              value={chatMessage}

              onChange={(e) =>
                setChatMessage(e.target.value)
              }
            />

            <button
              className="btn btn-success"
              onClick={sendMessageToAI}
            >

              {
                loadingAI
                  ? 'Sending...'
                  : 'Send'
              }

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResumeForm;