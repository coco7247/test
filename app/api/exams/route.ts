import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// 시험 데이터
const examData = {
  '순경': {
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
  '경장-경사': {
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
  '경사-경위': {
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
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json({ error: 'Exam type is required' }, { status: 400 });
    }

    const exam = examData[type as keyof typeof examData];

    if (!exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }

    return NextResponse.json(exam);
  } catch (error) {
    console.error('Error fetching exam:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 