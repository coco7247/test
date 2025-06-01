import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  type: String,
  questions: [{
    question: String,
    options: [String],
    answer: String,
    type: String
  }]
});

const Exam = mongoose.models.Exam || mongoose.model('Exam', examSchema);

const examData = [
  {
    type: '순경',
    questions: [
      {
        question: '경찰공무원법상 경찰공무원의 직무는?',
        options: ['법령을 준수하고 성실히 직무를 수행할 것', '국가와 국민에 대한 봉사자로서의 책임을 다할 것', '공정하고 중립적인 직무수행을 할 것', '모든 것'],
        answer: '모든 것',
        type: '객관식'
      },
      {
        question: '경찰공무원은 직무를 수행할 때 정치적 중립을 지켜야 한다.',
        options: ['O', 'X'],
        answer: 'O',
        type: 'OX'
      }
    ]
  },
  {
    type: '경장-경사',
    questions: [
      {
        question: '경찰공무원법상 경찰공무원의 의무는?',
        options: ['법령을 준수하고 성실히 직무를 수행할 것', '국가와 국민에 대한 봉사자로서의 책임을 다할 것', '공정하고 중립적인 직무수행을 할 것', '모든 것'],
        answer: '모든 것',
        type: '객관식'
      },
      {
        question: '경찰공무원은 직무를 수행할 때 정치적 중립을 지켜야 한다.',
        options: ['O', 'X'],
        answer: 'O',
        type: 'OX'
      }
    ]
  },
  {
    type: '경사-경위',
    questions: [
      {
        question: '경찰공무원법상 경찰공무원의 의무는?',
        options: ['법령을 준수하고 성실히 직무를 수행할 것', '국가와 국민에 대한 봉사자로서의 책임을 다할 것', '공정하고 중립적인 직무수행을 할 것', '모든 것'],
        answer: '모든 것',
        type: '객관식'
      },
      {
        question: '경찰공무원은 직무를 수행할 때 정치적 중립을 지켜야 한다.',
        options: ['O', 'X'],
        answer: 'O',
        type: 'OX'
      }
    ]
  }
];

export async function GET() {
  try {
    await connectDB();
    
    // 기존 데이터 삭제
    await Exam.deleteMany({});
    
    // 새로운 데이터 삽입
    const result = await Exam.insertMany(examData);
    
    return NextResponse.json({ message: 'Exam data seeded successfully', count: result.length });
  } catch (error) {
    console.error('Error seeding exam data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 