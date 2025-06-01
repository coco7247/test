'use client';

import { useRouter } from 'next/navigation';

export default function ExamCompletePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">시험 완료</h1>
        <p className="text-gray-600 mb-8">
          시험이 성공적으로 제출되었습니다.
          <br />
          결과는 관리자 페이지에서 확인할 수 있습니다.
        </p>
        <button
          onClick={() => router.push('/')}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
} 