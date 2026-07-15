import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState({ percentage: 0, completedLessons: [] });
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const isEnrolled = user && course?.enrolledStudents?.some(e => e.userId === user.id);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (user && isEnrolled) fetchProgress();
  }, [user, isEnrolled]);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
      setCourse(res.data);
    } catch {
      toast.error('Course not found');
      navigate('/courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/courses/${id}/progress`);
      setProgress(res.data);
    } catch {}
  };

  const handleEnroll = async () => {
    if (!user) { navigate('/login'); return; }
    setEnrolling(true);
    try {
      await axios.post(`http://localhost:5000/api/courses/${id}/enroll`);
      toast.success('Enrolled successfully!');
      fetchCourse();
      fetchProgress();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  const handleLessonComplete = async (lessonId) => {
    const totalLessons = course.modules?.reduce((sum, m) => sum + m.lessons.length, 0) || 1;
    try {
      const res = await axios.post(`http://localhost:5000/api/courses/${id}/progress`, { lessonId, totalLessons });
      setProgress(res.data);
      if (res.data.completed) toast.success('🎉 Course completed! Certificate issued!');
    } catch {}
  };

  const handleRate = async () => {
    try {
      await axios.post(`http://localhost:5000/api/courses/${id}/rate`, { rating, review });
      toast.success('Rating submitted!');
      fetchCourse();
    } catch {
      toast.error('Failed to submit rating');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!course) return null;

  const totalLessons = course.modules?.reduce((sum, m) => sum + m.lessons.length, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{course.category}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{course.difficulty}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{course.title}</h1>
          <p className="text-blue-100 mb-4 max-w-2xl">{course.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-blue-100">
            <span>👨🏫 {course.mentorName}</span>
            <span>👥 {course.totalEnrolled} students</span>
            {course.averageRating > 0 && <span>⭐ {course.averageRating.toFixed(1)}</span>}
            {totalLessons > 0 && <span>📖 {totalLessons} lessons</span>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Bar */}
            {isEnrolled && (
              <div className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">Your Progress</span>
                  <span className="text-blue-600 font-bold">{progress.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress.percentage}%` }}></div>
                </div>
                {progress.completed && (
                  <div className="mt-3 flex items-center gap-2 text-green-600">
                    <span>✅ Completed!</span>
                    <Link to={`/certificate/${id}`} className="text-blue-600 hover:underline font-medium">View Certificate →</Link>
                  </div>
                )}
              </div>
            )}

            {/* Video Player */}
            {course.videoUrl && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <video controls className="w-full" src={`${window.API_URL}${course.videoUrl}`}>
                  Your browser does not support video.
                </video>
              </div>
            )}

            {/* Modules & Lessons */}
            {course.modules?.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Course Content</h2>
                <div className="space-y-4">
                  {course.modules.map((mod, mi) => (
                    <div key={mi} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 font-semibold text-gray-800">
                        Module {mi + 1}: {mod.title}
                      </div>
                      <div className="divide-y divide-gray-100">
                        {mod.lessons.map((lesson, li) => {
                          const lessonId = `${mi}-${li}`;
                          const done = progress.completedLessons?.includes(lessonId);
                          return (
                            <div key={li} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                              <div className="flex items-center gap-3">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                  {done ? '✓' : li + 1}
                                </span>
                                <span className="text-gray-700">{lesson.title}</span>
                                <span className="text-xs text-gray-400">{lesson.type}</span>
                              </div>
                              {isEnrolled && !done && (
                                <button onClick={() => handleLessonComplete(lessonId)}
                                  className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                                  Mark Done
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Session */}
            {course.liveSessionUrl && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-5 border border-green-200">
                <h3 className="font-bold text-gray-900 mb-2">🎥 Live Session</h3>
                {course.liveSessionDate && (
                  <p className="text-sm text-gray-600 mb-3">📅 {new Date(course.liveSessionDate).toLocaleString()}</p>
                )}
                <a href={course.liveSessionUrl} target="_blank" rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 inline-block">
                  Join Live Session
                </a>
              </div>
            )}

            {/* Rating */}
            {isEnrolled && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Rate this Course</h3>
                <div className="flex gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onClick={() => setRating(s)}
                      className={`text-2xl transition-transform hover:scale-110 ${s <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ⭐
                    </button>
                  ))}
                </div>
                <textarea value={review} onChange={e => setReview(e.target.value)}
                  placeholder="Write a review (optional)..."
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 mb-3" rows={3} />
                <button onClick={handleRate} disabled={!rating}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
                  Submit Rating
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
              <div className="text-3xl font-bold text-gray-900 mb-4">
                {course.isPaid ? `₹${course.price}` : 'Free'}
              </div>
              {!isEnrolled ? (
                <button onClick={handleEnroll} disabled={enrolling}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 mb-3">
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center text-green-700 font-medium mb-3">
                  ✅ Enrolled
                </div>
              )}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between"><span>Category</span><span className="font-medium">{course.category}</span></div>
                <div className="flex justify-between"><span>Difficulty</span><span className="font-medium">{course.difficulty}</span></div>
                <div className="flex justify-between"><span>Students</span><span className="font-medium">{course.totalEnrolled}</span></div>
                {totalLessons > 0 && <div className="flex justify-between"><span>Lessons</span><span className="font-medium">{totalLessons}</span></div>}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <Link to={`/forum?courseId=${id}`} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                  💬 Discussion Forum
                </Link>
                <Link to={`/assignments?courseId=${id}`} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                  📝 Assignments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
