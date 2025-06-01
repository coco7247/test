import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  name: String,
  examType: String,
  answers: [String],
  score: Number,
  submittedAt: { type: Date, default: Date.now }
});

const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);

export async function GET() {
  try {
    await connectDB();
    const results = await Result.find().sort({ submittedAt: -1 });
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, examType, answers, score } = body;

    if (!name || !examType || !answers || score === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();
    const result = await Result.create({
      name,
      examType,
      answers,
      score
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 