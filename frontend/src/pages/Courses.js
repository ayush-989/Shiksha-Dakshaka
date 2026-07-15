import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const CATEGORIES = ['All', 'Java', 'Python', 'CSS', 'HTML', 'C', 'C++', 'JavaScript', 'Aptitude', 'Data Structures', 'Web Development', 'AI', 'ML'];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const Courses = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [enrolling, setEnrolling] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, [search, category, difficulty, page]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (search) params.search = search;
      if (category !== 'All') params.category = category;
      if (difficulty !== 'All') params.difficulty = difficulty;
      const res = await axios.get('http://localhost:5000/api/courses', { params });
      setCourses(res.data.courses);
      setTotalPages(res.data.pages);
    } catch {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!user) { navigate('/login'); return; }
    setEnrolling(courseId);
    try {
      await axios.post(`http://localhost:5000/api/courses/${courseId}/enroll`);
      toast.success('Enrolled successfully!');
      navigate(`/courses/${courseId}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Enrollment failed');
    } finally {
      setEnrolling(null);
    }
  };

  const difficultyColor = { Beginner: 'bg-green-100 text-green-700', Intermediate: 'bg-yellow-100 text-yellow-700', Advanced: 'bg-red-100 text-red-700' };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h1>
          <p className="text-gray-600">Learn from expert instructors at your own pace</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="🔍 Search courses..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="flex-1 min-w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={difficulty} onChange={e => { setDifficulty(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900">No courses found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map(course => (
              <div key={course._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                <div className="h-36 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-5xl">
                    {course.category === 'Python' ? '🐍' : course.category === 'Java' ? '☕' :
                     course.category === 'JavaScript' ? '⚡' : course.category === 'HTML' ? '🌐' :
                     course.category === 'CSS' ? '🎨' : course.category === 'AI' ? '🤖' :
                     course.category === 'ML' ? '🧩' : '📚'}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{course.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[course.difficulty]}`}>{course.difficulty}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">{course.description}</p>
                  <div className="text-xs text-gray-400 mb-3">By {course.mentorName} • {course.totalEnrolled} students</div>
                  {course.averageRating > 0 && (
                    <div className="text-xs text-yellow-600 mb-3">⭐ {course.averageRating.toFixed(1)}</div>
                  )}
                  <div className="mt-auto flex gap-2">
                    <Link to={`/courses/${course._id}`} className="flex-1 text-center border border-blue-600 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                      Details
                    </Link>
                    <button
                      onClick={() => handleEnroll(course._id)}
                      disabled={enrolling === course._id}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {enrolling === course._id ? '...' : course.isPaid ? `₹${course.price}` : 'Enroll Free'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${p === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
