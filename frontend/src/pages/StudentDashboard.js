import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [progressList, setProgressList] = useState([]);
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'student') { navigate('/'); return; }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [profileRes] = await Promise.all([
        axios.get('http://localhost:5000/api/auth/profile'),
      ]);
      setProfile(profileRes.data);
    } catch {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  const enrolledCourses = profile?.enrolledCourses || [];
  const completedCourses = profile?.completedCourses || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}! 👋</h1>
              <p className="text-gray-600">Student Dashboard</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Enrolled Courses', value: enrolledCourses.length, icon: '📚', color: 'border-blue-500' },
            { label: 'Completed', value: completedCourses.length, icon: '✅', color: 'border-green-500' },
            { label: 'Quiz Score', value: user?.totalScore || 0, icon: '🏆', color: 'border-yellow-500' },
            { label: 'Day Streak', value: `${user?.streak || 0} 🔥`, icon: '⚡', color: 'border-orange-500' },
          ].map(stat => (
            <div key={stat.label} className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${stat.color}`}>
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                <Link to="/courses" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Browse More →</Link>
              </div>
              {enrolledCourses.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-3">📚</div>
                  <p className="text-gray-600 mb-4">No courses enrolled yet</p>
                  <Link to="/courses" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                    Explore Courses
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {enrolledCourses.map(course => (
                    <div key={course._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <h3 className="font-medium text-gray-900">{course.title}</h3>
                        <span className="text-xs text-gray-500 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{course.category}</span>
                      </div>
                      <Link to={`/courses/${course._id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Continue →</Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Certificates */}
            {completedCourses.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">🎓 My Certificates</h2>
                <div className="space-y-3">
                  {(profile?.certificates || []).map(cert => (
                    <div key={cert.courseId} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                      <div>
                        <div className="font-medium text-gray-900">Certificate of Completion</div>
                        <div className="text-sm text-gray-500">Issued: {new Date(cert.issuedAt).toLocaleDateString()}</div>
                      </div>
                      <Link to={`/certificate/${cert.courseId}`} className="bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-yellow-600">
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { to: '/courses', icon: '📚', label: 'Browse Courses', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
                  { to: '/quiz/HTML', icon: '🧠', label: 'Take a Quiz', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
                  { to: '/compiler', icon: '💻', label: 'Code Compiler', color: 'bg-green-50 hover:bg-green-100 text-green-700' },
                  { to: '/forum', icon: '💬', label: 'Discussion Forum', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700' },
                  { to: '/assignments', icon: '📝', label: 'My Assignments', color: 'bg-red-50 hover:bg-red-100 text-red-700' },
                  { to: '/leaderboard', icon: '🏆', label: 'Leaderboard', color: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700' },
                ].map(action => (
                  <Link key={action.to} to={action.to} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${action.color}`}>
                    <span className="text-xl">{action.icon}</span>
                    <span className="font-medium">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">🔥 Keep your streak!</h3>
              <p className="text-blue-100 text-sm mb-3">You're on a {user?.streak || 0}-day streak. Keep learning daily!</p>
              <Link to="/courses" className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 inline-block">
                Continue Learning
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
