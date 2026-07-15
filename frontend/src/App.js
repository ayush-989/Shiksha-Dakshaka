import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';

// Existing pages
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Compiler from './pages/Compiler';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import VideoManager from './pages/VideoManager';

// New pages
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import CourseUpload from './pages/CourseUpload';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Forum from './pages/Forum';
import Assignments from './pages/Assignments';
import Certificate from './pages/Certificate';
import AdminPanel from './pages/AdminPanel';

const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const els = document.querySelectorAll('.fade-in-on-scroll');
    els.forEach(el => observer.observe(el));
    return () => els.forEach(el => observer.unobserve(el));
  }, []);
};

function App() {
  useScrollAnimation();
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/quiz/:category" element={<Quiz />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/videos" element={<VideoManager />} />

          {/* Student */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/certificate/:courseId" element={<Certificate />} />

          {/* Instructor */}
          <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor/upload" element={<CourseUpload />} />
          <Route path="/instructor/assignments" element={<Assignments />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminPanel />} />

          {/* Legacy mentor routes */}
          <Route path="/mentor/dashboard" element={<InstructorDashboard />} />
          <Route path="/mentor/upload" element={<CourseUpload />} />
        </Routes>
        <Chatbot />
      </div>
    </AuthProvider>
  );
}

export default App;
