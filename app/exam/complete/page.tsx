'use client';

import { useRouter } from 'next/navigation';

export default function ExamCompletePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">시험 완료</h1>
        <p className="text-gray-600 mb-6">
          시험 결과가 파일로 다운로드되었습니다.<br />
          파일을 확인하여 답변을 확인하실 수 있습니다.
        </p>
        <button
          onClick={() => router.push('/')}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
} 