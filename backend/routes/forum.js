const express = require('express');
const Forum = require('../models/Forum');
const { verifyToken } = require('./auth');

const router = express.Router();

// Get posts (optionally filter by course)
router.get('/', async (req, res) => {
  try {
    const { courseId, page = 1, limit = 20 } = req.query;
    const query = courseId ? { courseId } : {};
    const posts = await Forum.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Forum.countDocuments(query);
    res.json({ posts, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create post
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content, courseId, tags } = req.body;
    const post = new Forum({
      title, content, courseId, tags,
      authorId: req.user.id,
      authorName: req.body.authorName,
      authorRole: req.user.role
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add reply
router.post('/:id/reply', verifyToken, async (req, res) => {
  try {
    const post = await Forum.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.replies.push({
      authorId: req.user.id,
      authorName: req.body.authorName,
      authorRole: req.user.role,
      content: req.body.content
    });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upvote post
router.put('/:id/upvote', verifyToken, async (req, res) => {
  try {
    const post = await Forum.findById(req.params.id);
    const idx = post.upvotes.indexOf(req.user.id);
    if (idx >= 0) post.upvotes.splice(idx, 1);
    else post.upvotes.push(req.user.id);
    await post.save();
    res.json({ upvotes: post.upvotes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark resolved
router.put('/:id/resolve', verifyToken, async (req, res) => {
  try {
    const post = await Forum.findOneAndUpdate(
      { _id: req.params.id, authorId: req.user.id },
      { resolved: true }, { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
