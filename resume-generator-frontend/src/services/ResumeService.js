import axios from 'axios';

// ================= AXIOS INSTANCE =================

const API = axios.create({

  baseURL: 'http://localhost:8080'
});

// ================= REQUEST INTERCEPTOR =================

API.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem('token');

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

// ================= RESPONSE INTERCEPTOR =================

API.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response &&
        error.response.status === 401) {

      alert("Session Expired. Please Login Again");

      localStorage.removeItem('token');

      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// ================= URLS =================

const API_URL = '/api/resume';

const AUTH_URL = '/api/auth';

// ================= SERVICE =================

class ResumeService {

  // ================= AUTH =================

  register(user) {

    return API.post(

      `${AUTH_URL}/register`,

      user
    );
  }

  login(user) {

    return API.post(

      `${AUTH_URL}/login`,

      user
    );
  }

  // ================= CRUD =================

  getAllResumes() {

    return API.get(API_URL);
  }

  saveResume(resume) {

    return API.post(

      API_URL,

      resume
    );
  }

  getResumeById(id) {

    return API.get(

      `${API_URL}/${id}`
    );
  }

  updateResume(id, resume) {

    return API.put(

      `${API_URL}/${id}`,

      resume
    );
  }

  deleteResume(id) {

    return API.delete(

      `${API_URL}/${id}`
    );
  }

  // ================= AI =================

  generateSummary(skills) {

    return API.post(

      `${API_URL}/generate-summary`,

      skills,

      {

        headers: {

          'Content-Type': 'text/plain'
        }
      }
    );
  }
}

export default new ResumeService();