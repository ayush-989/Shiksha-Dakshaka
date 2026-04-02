const express = require('express');
const jwt = require('jsonwebtoken');
const Result = require('../models/Result');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'Access denied' });

  const token = authHeader.split(' ')[1]; // Extract token after 'Bearer '
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Post score
router.post('/', verifyToken, async (req, res) => {
  const { category, score } = req.body;
  try {
    const result = new Result({ userId: req.user.id, category, score });
    await result.save();

    // Update user's total score
    const user = await User.findById(req.user.id);
    user.totalScore += score;
    await user.save();

    res.status(201).json({ message: 'Score saved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ totalScore: -1 }).limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;