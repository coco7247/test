import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Exam from '@/models/Exam';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json(
        { error: '시험 유형이 지정되지 않았습니다.' },
        { status: 400 }
      );
    }

    await connectDB();
    const exam = await Exam.findOne({ type });

    if (!exam) {
      return NextResponse.json(
        { error: '해당 유형의 시험을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(exam);
  } catch (error) {
    console.error('Error fetching exam:', error);
    return NextResponse.json(
      { error: '시험 정보를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 