import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import ResumeForm from './pages/ResumeForm';
import ResumePreview from './pages/ResumePreview';
import AllResumes from './pages/AllResumes';
import EditResume from './pages/EditResume';
import Templates from './pages/Templates';

import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/templates"
          element={<Templates />}
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>

              <ResumeForm />

            </ProtectedRoute>
          }
        />

        <Route
          path="/preview"
          element={
            <ProtectedRoute>

              <ResumePreview />

            </ProtectedRoute>
          }
        />

        <Route
          path="/resumes"
          element={
            <ProtectedRoute>

              <AllResumes />

            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>

              <EditResume />

            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;