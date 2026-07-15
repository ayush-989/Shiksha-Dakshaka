const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const Result = require('../models/Result');
const Progress = require('../models/Progress');
const { verifyToken } = require('./auth');

const router = express.Router();

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  next();
};

// Platform analytics
router.get('/analytics', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [totalUsers, totalCourses, totalEnrollments, recentUsers] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Progress.countDocuments(),
      User.find().sort({ createdAt: -1 }).limit(5).select('name email role createdAt'),
    ]);

    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    const popularCourses = await Course.find()
      .sort({ totalEnrolled: -1 })
      .limit(5)
      .select('title category totalEnrolled averageRating');

    const completionStats = await Progress.aggregate([
      { $group: { _id: null, avgCompletion: { $avg: '$percentage' }, completed: { $sum: { $cond: ['$completed', 1, 0] } } } }
    ]);

    res.json({
      totalUsers, totalCourses, totalEnrollments,
      usersByRole,
      popularCourses,
      recentUsers,
      completionStats: completionStats[0] || { avgCompletion: 0, completed: 0 }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { role, page = 1, limit = 20, search } = req.query;
    const query = {};
    if (role) query.role = role;
    if (search) query.$or = [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }];
    const users = await User.find(query).select('-password')
      .sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    const total = await User.countDocuments(query);
    res.json({ users, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle user active status
router.put('/users/:id/toggle', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.isActive = !user.isActive;
    await user.save();
    res.json({ message: `User ${user.isActive ? 'activated' : 'suspended'}`, isActive: user.isActive });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Change user role
router.put('/users/:id/role', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all courses (admin view)
router.get('/courses', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }).select('title category mentorName totalEnrolled isPublished createdAt');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle course publish status
router.put('/courses/:id/toggle', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    course.isPublished = !course.isPublished;
    await course.save();
    res.json({ message: `Course ${course.isPublished ? 'published' : 'unpublished'}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
