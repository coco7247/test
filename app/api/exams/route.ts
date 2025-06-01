import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

// MongoDB 연결
const connectToDatabase = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw new Error('Database connection failed');
  }
};

// 시험 스키마 정의
const examSchema = new mongoose.Schema({
  type: String,
  questions: [{
    question: String,
    options: [String],
    answer: String,
    type: String
  }]
});

// 모델 정의
const Exam = mongoose.models.Exam || mongoose.model('Exam', examSchema);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json({ error: 'Exam type is required' }, { status: 400 });
    }

    await connectToDatabase();
    const exam = await Exam.findOne({ type });

    if (!exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }

    return NextResponse.json(exam);
  } catch (error) {
    console.error('Error fetching exam:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 