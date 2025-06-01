'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            경찰청 진급 통합 사이트
          </h1>
          <p className="text-gray-600">
            로그인하여 진급 시험에 응시하세요
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <button
            onClick={() => router.push('/login')}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            시험 로그인
          </button>
          <button
            onClick={() => router.push('/admin')}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            관리자 로그인
          </button>
        </div>
      </div>
    </main>
  );
} 