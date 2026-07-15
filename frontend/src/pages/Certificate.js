import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Certificate = () => {
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificate();
  }, [courseId]);

  const fetchCertificate = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/certificate/${courseId}`);
      setCert(res.data);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Certificate not available');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => window.print();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
    </div>
  );

  if (!cert) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Certificate Not Available</h2>
        <p className="text-gray-600 mb-4">Complete the course to earn your certificate</p>
        <Link to="/courses" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Browse Courses</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6 print:hidden">
          <h1 className="text-2xl font-bold text-gray-900">🎓 Your Certificate</h1>
          <div className="flex gap-3">
            <button onClick={handlePrint}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
              🖨️ Print / Download
            </button>
            <Link to="/dashboard" className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Certificate */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" id="certificate">
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 h-4"></div>
          <div className="p-12 text-center border-8 border-yellow-100 m-4 rounded-xl">
            <div className="text-6xl mb-4">🏆</div>
            <div className="text-sm font-semibold text-yellow-600 uppercase tracking-widest mb-2">Certificate of Completion</div>
            <div className="text-gray-500 mb-6">This is to certify that</div>
            <div className="text-4xl font-bold text-gray-900 mb-4 font-serif">{cert.studentName}</div>
            <div className="text-gray-500 mb-4">has successfully completed the course</div>
            <div className="text-2xl font-bold text-blue-700 mb-2">{cert.courseTitle}</div>
            <div className="text-gray-500 mb-8">Category: {cert.category}</div>

            <div className="flex justify-around items-end mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Issued On</div>
                <div className="font-semibold text-gray-800">{new Date(cert.issuedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xl">SD</span>
                </div>
                <div className="font-bold text-gray-900">Shiksha Dakshaka</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Instructor</div>
                <div className="font-semibold text-gray-800">{cert.instructorName}</div>
              </div>
            </div>

            <div className="mt-6 text-xs text-gray-400">
              Certificate ID: {cert.certificateId}
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 h-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
