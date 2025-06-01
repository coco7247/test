'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">경찰 진급 시험 시스템</h1>
        <div className="space-y-4">
          <button
            onClick={() => router.push('/exam/type')}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            시험 응시하기
          </button>
          <button
            onClick={() => router.push('/admin')}
            className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            관리자 로그인
          </button>
        </div>
      </div>
    </div>
  );
} 