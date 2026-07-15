import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const InstructorDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'instructor' && user.role !== 'admin') { navigate('/'); return; }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/courses/instructor/my-courses');
      setCourses(res.data.courses);
      setStats(res.data.stats);
    } catch {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      toast.success('Course deleted');
      fetchData();
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
            <p className="text-gray-600">Welcome, {user?.name} 👨‍🏫</p>
          </div>
          <div className="flex gap-3">
            <Link to="/instructor/upload" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
              + Upload Course
            </Link>
            <Link to="/instructor/assignments" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Assignments
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Courses', value: stats.totalCourses || 0, icon: '📚', color: 'border-blue-500' },
            { label: 'Total Students', value: stats.totalStudents || 0, icon: '👥', color: 'border-green-500' },
            { label: 'Avg Completion', value: `${stats.averageCompletion || 0}%`, icon: '📊', color: 'border-purple-500' },
            { label: 'Forum Posts', value: '—', icon: '💬', color: 'border-orange-500' },
          ].map(stat => (
            <div key={stat.label} className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${stat.color}`}>
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Courses */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
          </div>
          {courses.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
              <Link to="/instructor/upload" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
                Upload First Course
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {courses.map(course => (
                <div key={course._id} className="px-6 py-4 hover:bg-gray-50 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{course.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{course.category}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{course.difficulty}</span>
                      <span className="text-xs text-gray-500">{course.totalEnrolled} students</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${course.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 ml-4">
                    <Link to={`/courses/${course._id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</Link>
                    <Link to={`/instructor/assignments?course=${course._id}`} className="text-purple-600 hover:text-purple-800 text-sm font-medium">Assignments</Link>
                    <button onClick={() => handleDelete(course._id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            { to: '/forum', icon: '💬', label: 'Discussion Forum', desc: 'Answer student questions' },
            { to: '/instructor/assignments', icon: '📝', label: 'Grade Assignments', desc: 'Review student submissions' },
            { to: '/courses', icon: '🌐', label: 'Browse All Courses', desc: 'See what others are teaching' },
          ].map(item => (
            <Link key={item.to} to={item.to} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow flex items-start gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
