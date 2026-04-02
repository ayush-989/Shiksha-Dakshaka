const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Course = require('../models/Course');
const Mentor = require('../models/Mentor');
const { verifyMentorToken } = require('./mentorAuth');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/courses');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for course video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  }
});

// Upload course
router.post('/upload', verifyMentorToken, upload.single('video'), async (req, res) => {
  const { title, category, description, difficulty } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No video file provided' });
  }

  try {
    const mentor = await Mentor.findById(req.mentor.id);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    const course = new Course({
      title,
      category,
      description,
      difficulty,
      videoUrl: `/uploads/courses/${req.file.filename}`,
      filename: req.file.filename,
      mentorId: req.mentor.id,
      mentorName: mentor.name,
      fileSize: req.file.size
    });

    await course.save();

    // Update mentor stats
    mentor.totalCourses += 1;
    await mentor.save();

    res.json({
      message: 'Course uploaded successfully',
      course: {
        id: course._id,
        title: course.title,
        category: course.category,
        description: course.description,
        difficulty: course.difficulty,
        videoUrl: course.videoUrl,
        mentorName: course.mentorName
      }
    });
  } catch (error) {
    console.error('Course upload error:', error);
    res.status(500).json({ error: 'Failed to upload course' });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('mentorId', 'name expertise')
      .sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get courses by mentor
router.get('/mentor', verifyMentorToken, async (req, res) => {
  try {
    const courses = await Course.find({ mentorId: req.mentor.id })
      .sort({ createdAt: -1 });

    // Calculate stats
    const totalCourses = courses.length;
    const totalStudents = courses.reduce((sum, course) => sum + course.totalEnrolled, 0);
    const averageCompletion = totalCourses > 0
      ? courses.reduce((sum, course) => sum + course.averageCompletion, 0) / totalCourses
      : 0;

    res.json({
      courses,
      stats: {
        totalCourses,
        totalStudents,
        averageCompletion: Math.round(averageCompletion * 100) / 100
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mentor courses' });
  }
});

// Delete course
router.delete('/:id', verifyMentorToken, async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      mentorId: req.mentor.id
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Delete file
    const filePath = path.join(uploadsDir, course.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Course.deleteOne({ _id: req.params.id });

    // Update mentor stats
    const mentor = await Mentor.findById(req.mentor.id);
    mentor.totalCourses = Math.max(0, mentor.totalCourses - 1);
    await mentor.save();

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// Enroll in course
router.post('/:id/enroll', async (req, res) => {
  // This would require user authentication
  // For now, return success
  res.json({ message: 'Enrollment feature coming soon' });
});

// Update progress (for future implementation)
router.post('/:id/progress', async (req, res) => {
  // This would update user progress
  res.json({ message: 'Progress tracking coming soon' });
});

module.exports = router;