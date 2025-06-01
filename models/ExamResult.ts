import mongoose from 'mongoose';

const examResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  answers: [{
    questionId: Number,
    selectedAnswer: Number,
    isCorrect: Boolean,
  }],
});

export default mongoose.models.ExamResult || mongoose.model('ExamResult', examResultSchema); 