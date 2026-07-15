import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Assignments = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(null);
  const [grading, setGrading] = useState(null);
  const [gradeData, setGradeData] = useState({});
  const [showCreate, setShowCreate] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', dueDate: '', maxScore: 100 });

  const isInstructor = user?.role === 'instructor' || user?.role === 'admin';

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchAssignments();
  }, [user, courseId]);

  const fetchAssignments = async () => {
    try {
      const url = courseId
        ? `http://localhost:5000/api/assignments/course/${courseId}`
        : 'http://localhost:5000/api/assignments/my-submissions';
      const res = await axios.get(url);
      setAssignments(res.data);
    } catch {
      toast.error('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/assignments', { ...newAssignment, courseId });
      toast.success('Assignment created!');
      setShowCreate(false);
      setNewAssignment({ title: '', description: '', dueDate: '', maxScore: 100 });
      fetchAssignments();
    } catch {
      toast.error('Failed to create assignment');
    }
  };

  const handleSubmit = async (assignmentId, file) => {
    setSubmitting(assignmentId);
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post(`http://localhost:5000/api/assignments/${assignmentId}/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Assignment submitted!');
      fetchAssignments();
    } catch {
      toast.error('Submission failed');
    } finally {
      setSubmitting(null);
    }
  };

  const handleGrade = async (assignmentId, studentId) => {
    const key = `${assignmentId}-${studentId}`;
    try {
      await axios.put(`http://localhost:5000/api/assignments/${assignmentId}/grade/${studentId}`, gradeData[key]);
      toast.success('Graded successfully!');
      setGrading(null);
      fetchAssignments();
    } catch {
      toast.error('Grading failed');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📝 Assignments</h1>
            <p className="text-gray-600">{isInstructor ? 'Manage and grade assignments' : 'Submit your work'}</p>
          </div>
          {isInstructor && courseId && (
            <button onClick={() => setShowCreate(!showCreate)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
              + Create Assignment
            </button>
          )}
        </div>

        {/* Create Form */}
        {showCreate && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">New Assignment</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input type="text" placeholder="Title" required value={newAssignment.title}
                onChange={e => setNewAssignment(p => ({ ...p, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
              <textarea placeholder="Description / Instructions" required value={newAssignment.description}
                onChange={e => setNewAssignment(p => ({ ...p, description: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" rows={3} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Due Date</label>
                  <input type="datetime-local" value={newAssignment.dueDate}
                    onChange={e => setNewAssignment(p => ({ ...p, dueDate: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Max Score</label>
                  <input type="number" value={newAssignment.maxScore}
                    onChange={e => setNewAssignment(p => ({ ...p, maxScore: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">Create</button>
                <button type="button" onClick={() => setShowCreate(false)} className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {assignments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-medium text-gray-900">No assignments yet</h3>
          </div>
        ) : (
          <div className="space-y-4">
            {assignments.map(assignment => {
              const mySubmission = isInstructor ? null : assignment.mySubmission;
              return (
                <div key={assignment._id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{assignment.description}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div>Max: {assignment.maxScore} pts</div>
                      {assignment.dueDate && <div>Due: {new Date(assignment.dueDate).toLocaleDateString()}</div>}
                    </div>
                  </div>

                  {/* Student View */}
                  {!isInstructor && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      {mySubmission ? (
                        <div className="flex items-center justify-between">
                          <div>
                            <span className={`text-sm px-3 py-1 rounded-full ${mySubmission.status === 'graded' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {mySubmission.status === 'graded' ? `✅ Graded: ${mySubmission.grade}/${assignment.maxScore}` : '⏳ Submitted'}
                            </span>
                            {mySubmission.feedback && (
                              <p className="text-sm text-gray-600 mt-2">Feedback: {mySubmission.feedback}</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Submit Assignment</label>
                          <input type="file" onChange={e => e.target.files[0] && handleSubmit(assignment._id, e.target.files[0])}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                          {submitting === assignment._id && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Instructor View */}
                  {isInstructor && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-3">Submissions ({assignment.submissions?.length || 0})</h4>
                      {assignment.submissions?.length === 0 ? (
                        <p className="text-sm text-gray-500">No submissions yet</p>
                      ) : (
                        <div className="space-y-3">
                          {assignment.submissions?.map(sub => {
                            const key = `${assignment._id}-${sub.studentId}`;
                            return (
                              <div key={sub.studentId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">Student ID: {sub.studentId?.toString().slice(-6)}</div>
                                  <div className="text-xs text-gray-500">{new Date(sub.submittedAt).toLocaleDateString()}</div>
                                  {sub.status === 'graded' && <div className="text-xs text-green-600">Grade: {sub.grade}/{assignment.maxScore}</div>}
                                </div>
                                <div className="flex items-center gap-2">
                                  {sub.fileUrl && (
                                    <a href={`${window.API_URL}${sub.fileUrl}`} target="_blank" rel="noopener noreferrer"
                                      className="text-blue-600 text-sm hover:underline">View File</a>
                                  )}
                                  {grading === key ? (
                                    <div className="flex gap-2 items-center">
                                      <input type="number" placeholder="Grade" max={assignment.maxScore}
                                        onChange={e => setGradeData(p => ({ ...p, [key]: { ...p[key], grade: e.target.value } }))}
                                        className="w-20 border border-gray-300 rounded px-2 py-1 text-sm" />
                                      <input type="text" placeholder="Feedback"
                                        onChange={e => setGradeData(p => ({ ...p, [key]: { ...p[key], feedback: e.target.value } }))}
                                        className="w-32 border border-gray-300 rounded px-2 py-1 text-sm" />
                                      <button onClick={() => handleGrade(assignment._id, sub.studentId)}
                                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Save</button>
                                      <button onClick={() => setGrading(null)} className="text-gray-500 text-sm">Cancel</button>
                                    </div>
                                  ) : (
                                    <button onClick={() => setGrading(key)}
                                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                      {sub.status === 'graded' ? 'Re-grade' : 'Grade'}
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;
