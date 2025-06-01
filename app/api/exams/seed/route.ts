import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 관리자 인증 확인
    const cookieStore = cookies();
    const isAdmin = cookieStore.get('isAdmin')?.value === 'true';
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 시험 데이터가 이미 존재하므로 성공 응답만 반환
    return NextResponse.json({ message: 'Exam data is already initialized' });
  } catch (error) {
    console.error('Error seeding exam data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 