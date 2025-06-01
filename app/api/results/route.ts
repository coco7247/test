import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// 결과 데이터를 저장할 배열
let results: any[] = [];

export async function POST(request: Request) {
  try {
    const result = await request.json();
    
    // 결과에 ID와 시간 추가
    const newResult = {
      ...result,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    // 결과 저장
    results.push(newResult);
    
    return NextResponse.json(newResult);
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // 관리자 인증 확인
    const cookieStore = cookies();
    const isAdmin = cookieStore.get('isAdmin')?.value === 'true';
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // 결과를 시간순으로 정렬하여 반환
    const sortedResults = [...results].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return NextResponse.json(sortedResults);
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 