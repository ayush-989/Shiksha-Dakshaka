const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Assignment = require('../models/Assignment');
const Notification = require('../models/Notification');
const { verifyToken } = require('./auth');

const router = express.Router();

const uploadsDir = path.join(__dirname, '../uploads/assignments');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
  }),
  limits: { fileSize: 50 * 1024 * 1024 }
});

// Create assignment (instructor)
router.post('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'instructor' && req.user.role !== 'admin')
    return res.status(403).json({ error: 'Instructor access required' });
  try {
    const assignment = new Assignment({ ...req.body, instructorId: req.user.id });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get assignments for a course
router.get('/course/:courseId', verifyToken, async (req, res) => {
  try {
    const assignments = await Assignment.find({ courseId: req.params.courseId })
      .select('-submissions.fileUrl');
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit assignment (student)
router.post('/:id/submit', verifyToken, upload.single('file'), async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

    const existing = assignment.submissions.findIndex(s => s.studentId.toString() === req.user.id);
    const submission = {
      studentId: req.user.id,
      fileUrl: req.file ? `/uploads/assignments/${req.file.filename}` : req.body.fileUrl,
      submittedAt: new Date(),
      status: 'submitted'
    };

    if (existing >= 0) assignment.submissions[existing] = submission;
    else assignment.submissions.push(submission);

    await assignment.save();

    await Notification.create({
      userId: assignment.instructorId,
      title: 'New Assignment Submission',
      message: `A student submitted "${assignment.title}"`,
      type: 'info'
    });

    res.json({ message: 'Assignment submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grade submission (instructor)
router.put('/:id/grade/:studentId', verifyToken, async (req, res) => {
  if (req.user.role !== 'instructor' && req.user.role !== 'admin')
    return res.status(403).json({ error: 'Instructor access required' });
  const { grade, feedback } = req.body;
  try {
    const assignment = await Assignment.findById(req.params.id);
    const submission = assignment.submissions.find(s => s.studentId.toString() === req.params.studentId);
    if (!submission) return res.status(404).json({ error: 'Submission not found' });

    submission.grade = grade;
    submission.feedback = feedback;
    submission.gradedAt = new Date();
    submission.status = 'graded';
    await assignment.save();

    await Notification.create({
      userId: req.params.studentId,
      title: 'Assignment Graded',
      message: `Your submission for "${assignment.title}" has been graded: ${grade}/${assignment.maxScore}`,
      type: 'grade'
    });

    res.json({ message: 'Graded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get my submissions (student)
router.get('/my-submissions', verifyToken, async (req, res) => {
  try {
    const assignments = await Assignment.find({ 'submissions.studentId': req.user.id });
    const result = assignments.map(a => ({
      ...a.toObject(),
      mySubmission: a.submissions.find(s => s.studentId.toString() === req.user.id)
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
