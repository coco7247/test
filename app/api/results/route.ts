import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

// MongoDB 연결
const connectToDatabase = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw new Error('Database connection failed');
  }
};

// 결과 스키마 정의
const resultSchema = new mongoose.Schema({
  name: String,
  examType: String,
  answers: [{
    question: String,
    userAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean
  }],
  score: Number,
  totalQuestions: Number,
  startTime: Date,
  endTime: Date
});

// 모델 정의
const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);

export async function GET() {
  try {
    await connectToDatabase();
    const results = await Result.find().sort({ endTime: -1 });
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    
    const result = await Result.create(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 