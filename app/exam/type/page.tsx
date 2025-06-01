'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ExamTypePage() {
  const [selectedExam, setSelectedExam] = useState<string>('');
  const router = useRouter();

  const handleStartExam = () => {
    if (!selectedExam) return;
    router.push(`/exam/name?examType=${selectedExam}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">시험 유형 선택</h1>
          <p className="text-gray-600">응시할 시험 유형을 선택하세요</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시험 유형
            </label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">시험 유형을 선택하세요</option>
              <option value="순경">순경</option>
              <option value="경장-경사">경장-경사</option>
              <option value="경사-경위">경사-경위</option>
            </select>
          </div>

          <button
            onClick={handleStartExam}
            disabled={!selectedExam}
            className={`w-full py-3 px-4 rounded-md text-white ${
              selectedExam
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            응시하기
          </button>
        </div>
      </div>
    </div>
  );
} 