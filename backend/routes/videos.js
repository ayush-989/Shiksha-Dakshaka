const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/videos');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for video uploads
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
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  }
});

// Get videos metadata
router.get('/', (req, res) => {
  const metadataFile = path.join(__dirname, '../uploads/videos-metadata.json');

  if (fs.existsSync(metadataFile)) {
    const data = fs.readFileSync(metadataFile, 'utf8');
    const videos = JSON.parse(data);
    res.json(videos);
  } else {
    res.json([]);
  }
});

// Upload video
router.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No video file provided' });
  }

  const metadataFile = path.join(__dirname, '../uploads/videos-metadata.json');
  let videos = [];

  if (fs.existsSync(metadataFile)) {
    const data = fs.readFileSync(metadataFile, 'utf8');
    videos = JSON.parse(data);
  }

  const newVideo = {
    id: Date.now().toString(),
    title: req.body.title || req.file.originalname,
    filename: req.file.filename,
    url: `/uploads/videos/${req.file.filename}`,
    uploadDate: new Date().toISOString(),
    size: req.file.size
  };

  videos.push(newVideo);

  fs.writeFileSync(metadataFile, JSON.stringify(videos, null, 2));

  res.json({ message: 'Video uploaded successfully', video: newVideo });
});

// Delete video
router.delete('/:id', (req, res) => {
  const metadataFile = path.join(__dirname, '../uploads/videos-metadata.json');

  if (!fs.existsSync(metadataFile)) {
    return res.status(404).json({ error: 'No videos found' });
  }

  const data = fs.readFileSync(metadataFile, 'utf8');
  let videos = JSON.parse(data);

  const videoIndex = videos.findIndex(v => v.id === req.params.id);
  if (videoIndex === -1) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const video = videos[videoIndex];

  // Delete file
  const filePath = path.join(uploadsDir, video.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  // Remove from metadata
  videos.splice(videoIndex, 1);
  fs.writeFileSync(metadataFile, JSON.stringify(videos, null, 2));

  res.json({ message: 'Video deleted successfully' });
});

module.exports = router;