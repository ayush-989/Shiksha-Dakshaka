const express = require('express');
const Quiz = require('../models/Quiz');

const router = express.Router();

// Get questions by category
router.get('/:category', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ category: req.params.category });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz.questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;