import React from 'react';
import { useNavigate } from 'react-router-dom';

function Templates() {

  const navigate = useNavigate();

  // ================= TEMPLATE DATA =================

  const templates = [

    {
      id: 1,

      type: 'classic',

      name: 'Classic Template',

      image:
        'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=1200&auto=format&fit=crop',

      color: '#000000',

      description:
        'Simple and ATS-friendly',

      features: [
        'Best for freshers and corporate jobs',
        'Clean black & white layout'
      ]
    },

    {
      id: 2,

      type: 'modern',

      name: 'Modern Template',

      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',

      color: '#0d6efd',

      description:
        'Stylish design with colors',

      features: [
        'Best for developers and designers',
        'Professional modern UI'
      ]
    },

    {
      id: 3,

      type: 'professional',

      name: 'Professional Template',

      image:
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop',

      color: '#198754',

      description:
        'Corporate resume format',

      features: [
        'Best for experienced candidates',
        'Structured sections and clean formatting'
      ]
    },

    {
      id: 4,

      type: 'minimal',

      name: 'Minimal Template',

      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',

      color: '#6f42c1',

      description:
        'Lightweight and elegant',

      features: [
        'Focuses on skills and experience',
        'Minimal colors and spacing'
      ]
    },

    {
      id: 5,

      type: 'developer',

      name: 'Developer Template',

      image:
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',

      color: '#0dcaf0',

      description:
        'Designed for software developers',

      features: [
        'Highlights projects, GitHub, and technical skills',
        'Perfect for Java Full Stack profiles'
      ]
    },

    {
      id: 6,

      type: 'creative',

      name: 'Creative Template',

      image:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',

      color: '#fd7e14',

      description:
        'Attractive and unique design',

      features: [
        'Best for UI/UX and creative roles',
        'Includes icons and visual sections'
      ]
    },

    {
      id: 7,

      type: 'dark',

      name: 'Dark Theme Template',

      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',

      color: '#212529',

      description:
        'Dark background modern resume',

      features: [
        'Stylish appearance for tech profiles',
        'Good for portfolio-based resumes'
      ]
    }

  ];

  // ================= SELECT TEMPLATE =================

  const selectTemplate = (template) => {

    localStorage.setItem(
      'selectedTemplate',
      JSON.stringify(template)
    );

    navigate('/create');
  };

  return (

    <div className="container mt-5 mb-5">

      <h1 className="text-center fw-bold mb-5">

        Choose Resume Template

      </h1>

      <div className="row">

        {

          templates.map((template) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={template.id}
            >

              <div
                className="card shadow-lg border-0 h-100"
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: '0.3s'
                }}
              >

                <img
                  src={template.image}
                  alt={template.name}
                  className="card-img-top"
                  style={{
                    height: '420px',
                    objectFit: 'cover'
                  }}
                />

                <div className="card-body d-flex flex-column">

                  <div className="text-center mb-2">

                    <span
                      className="badge px-3 py-2"
                      style={{
                        backgroundColor:
                          template.color
                      }}
                    >

                      {template.type.toUpperCase()}

                    </span>

                  </div>

                  <h4 className="fw-bold text-center">

                    {template.name}

                  </h4>

                  <p className="text-muted text-center">

                    {template.description}

                  </p>

                  <ul className="mt-3">

                    {

                      template.features.map(
                        (feature, index) => (

                          <li key={index}>

                            {feature}

                          </li>
                        )
                      )
                    }

                  </ul>

                  <button
                    className="btn mt-auto text-white"
                    style={{
                      backgroundColor:
                        template.color
                    }}
                    onClick={() =>
                      selectTemplate(template)
                    }
                  >

                    Use Template

                  </button>

                </div>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Templates;