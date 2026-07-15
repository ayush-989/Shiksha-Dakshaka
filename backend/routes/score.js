const express = require('express');
const Result = require('../models/Result');
const User = require('../models/User');
const { verifyToken } = require('./auth');

const router = express.Router();

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