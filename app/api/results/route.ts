import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Result from '@/models/Result';

export async function GET() {
  try {
    await connectDB();
    
    const results = await Result.find()
      .sort({ createdAt: -1 })
      .limit(100);
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { error: '결과 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const result = await Result.create(body);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json(
      { error: '결과 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 