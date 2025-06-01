import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  examType: {
    type: String,
    required: true,
    enum: ['순경-경장', '경장-경사', '경사-경위']
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: Number,
      required: true
    }
  }],
  timeLimit: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Exam || mongoose.model('Exam', examSchema); 