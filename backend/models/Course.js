const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Java', 'Python', 'CSS', 'HTML', 'C', 'C++', 'Aptitude', 'Data Structures', 'Web Development', 'AI', 'ML']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  videoUrl: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  },
  mentorName: {
    type: String,
    required: true
  },
  enrolledStudents: [{
    userId: mongoose.Schema.Types.ObjectId,
    progress: { type: Number, default: 0 }, // percentage
    enrolledAt: { type: Date, default: Date.now }
  }],
  totalEnrolled: {
    type: Number,
    default: 0
  },
  averageCompletion: {
    type: Number,
    default: 0
  },
  fileSize: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);