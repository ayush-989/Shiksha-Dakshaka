const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'pdf', 'notes', 'link'], default: 'video' },
  content: { type: String },
  duration: { type: Number, default: 0 },
  order: { type: Number, default: 0 },
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: { type: Number, default: 0 },
  lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['Java', 'Python', 'CSS', 'HTML', 'C', 'C++', 'JavaScript', 'Aptitude', 'Data Structures', 'Web Development', 'AI', 'ML']
  },
  description: { type: String, required: true, trim: true },
  difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  videoUrl: { type: String },
  filename: { type: String },
  thumbnail: { type: String, default: '' },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentorName: { type: String, required: true },
  modules: [moduleSchema],
  tags: [String],
  price: { type: Number, default: 0 },
  isPaid: { type: Boolean, default: false },
  enrolledStudents: [{
    userId: mongoose.Schema.Types.ObjectId,
    progress: { type: Number, default: 0 },
    enrolledAt: { type: Date, default: Date.now }
  }],
  totalEnrolled: { type: Number, default: 0 },
  averageCompletion: { type: Number, default: 0 },
  ratings: [{
    userId: mongoose.Schema.Types.ObjectId,
    rating: { type: Number, min: 1, max: 5 },
    review: String,
    createdAt: { type: Date, default: Date.now }
  }],
  averageRating: { type: Number, default: 0 },
  fileSize: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  liveSessionUrl: { type: String, default: '' },
  liveSessionDate: { type: Date },
}, { timestamps: true });

courseSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Course', courseSchema);
