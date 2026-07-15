const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Course = require('../models/Course');
const User = require('../models/User');
const Progress = require('../models/Progress');
const Notification = require('../models/Notification');
const { verifyToken } = require('./auth');

const router = express.Router();

const uploadsDir = path.join(__dirname, '../uploads/courses');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 500 * 1024 * 1024 } });

const verifyInstructor = (req, res, next) => {
  if (req.user.role !== 'instructor' && req.user.role !== 'admin')
    return res.status(403).json({ error: 'Instructor access required' });
  next();
};

// Get all courses with search & filter
router.get('/', async (req, res) => {
  try {
    const { search, category, difficulty, instructor, page = 1, limit = 12 } = req.query;
    const query = { isPublished: true };
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (instructor) query.mentorId = instructor;
    if (search) query.$text = { $search: search };

    const courses = await Course.find(query)
      .select('-enrolledStudents -ratings')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Course.countDocuments(query);
    res.json({ courses, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('mentorId', 'name bio avatar');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload course (instructor only)
router.post('/upload', verifyToken, verifyInstructor, upload.single('video'), async (req, res) => {
  const { title, category, description, difficulty, tags, price, liveSessionUrl, liveSessionDate } = req.body;
  try {
    const instructor = await User.findById(req.user.id);
    const course = new Course({
      title, category, description, difficulty,
      videoUrl: req.file ? `/uploads/courses/${req.file.filename}` : '',
      filename: req.file ? req.file.filename : '',
      fileSize: req.file ? req.file.size : 0,
      mentorId: req.user.id,
      mentorName: instructor.name,
      tags: tags ? JSON.parse(tags) : [],
      price: price || 0,
      isPaid: price > 0,
      liveSessionUrl: liveSessionUrl || '',
      liveSessionDate: liveSessionDate || null,
    });
    await course.save();
    res.json({ message: 'Course uploaded successfully', course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update course
router.put('/:id', verifyToken, verifyInstructor, async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id, mentorId: req.user.id });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    const updates = req.body;
    Object.assign(course, updates);
    await course.save();
    res.json({ message: 'Course updated', course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add module to course
router.post('/:id/modules', verifyToken, verifyInstructor, async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id, mentorId: req.user.id });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    course.modules.push(req.body);
    await course.save();
    res.json({ message: 'Module added', modules: course.modules });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enroll in course
router.post('/:id/enroll', verifyToken, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const alreadyEnrolled = course.enrolledStudents.some(e => e.userId.toString() === req.user.id);
    if (alreadyEnrolled) return res.status(400).json({ error: 'Already enrolled' });

    course.enrolledStudents.push({ userId: req.user.id });
    course.totalEnrolled += 1;
    await course.save();

    await User.findByIdAndUpdate(req.user.id, { $addToSet: { enrolledCourses: course._id } });

    await Progress.create({ userId: req.user.id, courseId: course._id });

    await Notification.create({
      userId: req.user.id,
      title: 'Enrollment Successful',
      message: `You have enrolled in "${course.title}"`,
      type: 'success',
      link: `/courses/${course._id}`
    });

    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update lesson progress
router.post('/:id/progress', verifyToken, async (req, res) => {
  const { lessonId, totalLessons } = req.body;
  try {
    let progress = await Progress.findOne({ userId: req.user.id, courseId: req.params.id });
    if (!progress) progress = new Progress({ userId: req.user.id, courseId: req.params.id });

    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }
    progress.percentage = totalLessons > 0 ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0;
    progress.lastAccessed = new Date();

    if (progress.percentage >= 100 && !progress.completed) {
      progress.completed = true;
      progress.completedAt = new Date();
      await User.findByIdAndUpdate(req.user.id, { $addToSet: { completedCourses: req.params.id } });

      // Issue certificate
      await User.findByIdAndUpdate(req.user.id, {
        $push: { certificates: { courseId: req.params.id, issuedAt: new Date() } }
      });

      await Notification.create({
        userId: req.user.id,
        title: 'Course Completed! 🎉',
        message: 'Congratulations! Your certificate is ready.',
        type: 'success',
        link: `/certificate/${req.params.id}`
      });
    }

    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user progress for a course
router.get('/:id/progress', verifyToken, async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user.id, courseId: req.params.id });
    res.json(progress || { percentage: 0, completedLessons: [], completed: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rate course
router.post('/:id/rate', verifyToken, async (req, res) => {
  const { rating, review } = req.body;
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const existingIdx = course.ratings.findIndex(r => r.userId.toString() === req.user.id);
    if (existingIdx >= 0) {
      course.ratings[existingIdx] = { userId: req.user.id, rating, review };
    } else {
      course.ratings.push({ userId: req.user.id, rating, review });
    }
    course.averageRating = course.ratings.reduce((sum, r) => sum + r.rating, 0) / course.ratings.length;
    await course.save();
    res.json({ message: 'Rating submitted', averageRating: course.averageRating });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get instructor's courses
router.get('/instructor/my-courses', verifyToken, verifyInstructor, async (req, res) => {
  try {
    const courses = await Course.find({ mentorId: req.user.id }).sort({ createdAt: -1 });
    const totalStudents = courses.reduce((sum, c) => sum + c.totalEnrolled, 0);
    const avgCompletion = courses.length > 0
      ? courses.reduce((sum, c) => sum + c.averageCompletion, 0) / courses.length : 0;
    res.json({ courses, stats: { totalCourses: courses.length, totalStudents, averageCompletion: Math.round(avgCompletion) } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete course
router.delete('/:id', verifyToken, verifyInstructor, async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id, mentorId: req.user.id });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    if (course.filename) {
      const filePath = path.join(uploadsDir, course.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await Course.deleteOne({ _id: req.params.id });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
