const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Mentor = require('../models/Mentor');

const router = express.Router();

// Register mentor
router.post('/register', async (req, res) => {
  const { name, email, password, expertise, bio } = req.body;
  try {
    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) return res.status(400).json({ message: 'Mentor already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const mentor = new Mentor({
      name,
      email,
      password: hashedPassword,
      expertise: expertise || [],
      bio: bio || ''
    });
    await mentor.save();

    const token = jwt.sign({ id: mentor._id, role: 'mentor' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({
      token,
      mentor: {
        id: mentor._id,
        name,
        email,
        expertise: mentor.expertise,
        bio: mentor.bio
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login mentor
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const mentor = await Mentor.findOne({ email });
    if (!mentor) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, mentor.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: mentor._id, role: 'mentor' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      token,
      mentor: {
        id: mentor._id,
        name: mentor.name,
        email,
        expertise: mentor.expertise,
        bio: mentor.bio,
        totalCourses: mentor.totalCourses,
        totalStudents: mentor.totalStudents,
        averageCompletion: mentor.averageCompletion
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to verify mentor JWT
const verifyMentorToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'Access denied' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified.role !== 'mentor') return res.status(403).json({ message: 'Access denied' });
    req.mentor = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Get mentor profile
router.get('/profile', verifyMentorToken, async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.mentor.id).select('-password');
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { router, verifyMentorToken };