import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please login to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <span className="text-3xl text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-lg mr-3">👤</span>
                  <span className="text-gray-800 font-medium">{user.name}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-lg mr-3">📧</span>
                  <span className="text-gray-800 font-medium">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Total Score</label>
                <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
                  <span className="text-lg mr-3">🏆</span>
                  <span className="text-2xl font-bold text-green-600">{user.totalScore}</span>
                  <span className="text-gray-600 ml-2">points</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Account Status</label>
                <div className="flex items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                  <span className="text-lg mr-3">✅</span>
                  <span className="text-green-700 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">📚</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Learning Progress</h3>
            <p className="text-gray-600 text-sm">Keep taking quizzes to improve your skills</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quiz Performance</h3>
            <p className="text-gray-600 text-sm">Your total score: {user.totalScore} points</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">💻</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Code Practice</h3>
            <p className="text-gray-600 text-sm">Use the compiler to practice coding</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/"
              className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-colors duration-200 border border-blue-200"
            >
              <span className="text-2xl mr-4">📖</span>
              <div>
                <h3 className="font-semibold text-gray-800">Take a Quiz</h3>
                <p className="text-sm text-gray-600">Test your programming knowledge</p>
              </div>
            </a>

            <a
              href="/compiler"
              className="flex items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:from-green-100 hover:to-blue-100 transition-colors duration-200 border border-green-200"
            >
              <span className="text-2xl mr-4">💻</span>
              <div>
                <h3 className="font-semibold text-gray-800">Practice Coding</h3>
                <p className="text-sm text-gray-600">Use the online compiler</p>
              </div>
            </a>

            <a
              href="/leaderboard"
              className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg hover:from-yellow-100 hover:to-orange-100 transition-colors duration-200 border border-yellow-200"
            >
              <span className="text-2xl mr-4">🏆</span>
              <div>
                <h3 className="font-semibold text-gray-800">View Leaderboard</h3>
                <p className="text-sm text-gray-600">See top performers</p>
              </div>
            </a>

            <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <span className="text-2xl mr-4">📊</span>
              <div>
                <h3 className="font-semibold text-gray-800">Your Stats</h3>
                <p className="text-sm text-gray-600">Track your progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;