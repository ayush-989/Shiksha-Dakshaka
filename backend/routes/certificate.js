const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const Progress = require('../models/Progress');
const { verifyToken } = require('./auth');

const router = express.Router();

// Get certificate data
router.get('/:courseId', verifyToken, async (req, res) => {
  try {
    const [user, course, progress] = await Promise.all([
      User.findById(req.user.id).select('name email certificates'),
      Course.findById(req.params.courseId).select('title category mentorName'),
      Progress.findOne({ userId: req.user.id, courseId: req.params.courseId })
    ]);

    if (!progress?.completed) return res.status(403).json({ error: 'Course not completed yet' });

    const cert = user.certificates.find(c => c.courseId.toString() === req.params.courseId);
    res.json({
      studentName: user.name,
      courseTitle: course.title,
      category: course.category,
      instructorName: course.mentorName,
      issuedAt: cert?.issuedAt || progress.completedAt,
      certificateId: `SD-${req.user.id.toString().slice(-6).toUpperCase()}-${req.params.courseId.toString().slice(-6).toUpperCase()}`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify certificate by ID
router.get('/verify/:certId', async (req, res) => {
  try {
    const [, userId, courseId] = req.params.certId.split('-');
    const progress = await Progress.findOne({ completed: true })
      .populate('userId', 'name')
      .populate('courseId', 'title');
    res.json({ valid: !!progress, details: progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
