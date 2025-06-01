import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  examType: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  answers: [{
    question: String,
    userAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean
  }]
}, {
  timestamps: true
});

export default mongoose.models.Result || mongoose.model('Result', ResultSchema); 