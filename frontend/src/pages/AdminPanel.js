import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState('analytics');
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userSearch, setUserSearch] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'admin') { navigate('/'); return; }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [analyticsRes, usersRes, coursesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/analytics'),
        axios.get('http://localhost:5000/api/admin/users'),
        axios.get('http://localhost:5000/api/admin/courses'),
      ]);
      setAnalytics(analyticsRes.data);
      setUsers(usersRes.data.users);
      setCourses(coursesRes.data);
    } catch {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const params = {};
      if (userSearch) params.search = userSearch;
      if (userRole) params.role = userRole;
      const res = await axios.get('http://localhost:5000/api/admin/users', { params });
      setUsers(res.data.users);
    } catch {}
  };

  const handleToggleUser = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/admin/users/${id}/toggle`);
      toast.success(res.data.message);
      fetchUsers();
    } catch { toast.error('Failed'); }
  };

  const handleChangeRole = async (id, role) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${id}/role`, { role });
      toast.success('Role updated');
      fetchUsers();
    } catch { toast.error('Failed'); }
  };

  const handleToggleCourse = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/admin/courses/${id}/toggle`);
      toast.success(res.data.message);
      fetchData();
    } catch { toast.error('Failed'); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
  );

  const tabs = ['analytics', 'users', 'courses'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">⚙️ Admin Panel</h1>
            <p className="text-gray-600 text-sm">Platform Management</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Tab */}
        {tab === 'analytics' && analytics && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Users', value: analytics.totalUsers, icon: '👥', color: 'border-blue-500' },
                { label: 'Total Courses', value: analytics.totalCourses, icon: '📚', color: 'border-green-500' },
                { label: 'Enrollments', value: analytics.totalEnrollments, icon: '🎓', color: 'border-purple-500' },
                { label: 'Completions', value: analytics.completionStats?.completed || 0, icon: '✅', color: 'border-orange-500' },
              ].map(stat => (
                <div key={stat.label} className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${stat.color}`}>
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Users by Role</h3>
                <div className="space-y-3">
                  {analytics.usersByRole?.map(r => (
                    <div key={r._id} className="flex justify-between items-center">
                      <span className="capitalize text-gray-700">{r._id}</span>
                      <span className="font-bold text-gray-900">{r.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Popular Courses</h3>
                <div className="space-y-3">
                  {analytics.popularCourses?.map(c => (
                    <div key={c._id} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{c.title}</div>
                        <div className="text-xs text-gray-500">{c.category}</div>
                      </div>
                      <span className="text-sm font-bold text-blue-600">{c.totalEnrolled} students</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Recent Users</h3>
                <div className="space-y-3">
                  {analytics.recentUsers?.map(u => (
                    <div key={u._id} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{u.name}</div>
                        <div className="text-xs text-gray-500">{u.email}</div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${u.role === 'admin' ? 'bg-red-100 text-red-700' : u.role === 'instructor' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                        {u.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Platform Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Course Completion</span>
                    <span className="font-bold">{Math.round(analytics.completionStats?.avgCompletion || 0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Completions</span>
                    <span className="font-bold">{analytics.completionStats?.completed || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {tab === 'users' && (
          <div>
            <div className="flex gap-3 mb-4">
              <input type="text" placeholder="Search users..." value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
              <select value={userRole} onChange={e => setUserRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
                <option value="">All Roles</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
              <button onClick={fetchUsers} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Search</button>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['Name', 'Email', 'Role', 'Score', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map(u => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{u.email}</td>
                      <td className="px-4 py-3">
                        <select value={u.role} onChange={e => handleChangeRole(u._id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1">
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{u.totalScore}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {u.isActive ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleToggleUser(u._id)}
                          className={`text-xs px-3 py-1 rounded font-medium ${u.isActive ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                          {u.isActive ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {tab === 'courses' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Title', 'Category', 'Instructor', 'Students', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {courses.map(c => (
                  <tr key={c._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{c.title}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{c.category}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{c.mentorName}</td>
                    <td className="px-4 py-3 text-gray-600">{c.totalEnrolled}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${c.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {c.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleToggleCourse(c._id)}
                        className={`text-xs px-3 py-1 rounded font-medium ${c.isPublished ? 'bg-gray-50 text-gray-600 hover:bg-gray-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                        {c.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
