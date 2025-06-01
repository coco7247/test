'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';

function ExamTypeContent() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState('');

  const examTypes = [
    { id: '순경', name: '순경 진급 시험' },
    { id: '경장-경사', name: '경장-경사 진급 시험' },
    { id: '경사-경위', name: '경사-경위 진급 시험' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) {
      setError('시험 유형을 선택해주세요.');
      return;
    }
    router.push(`/exam/name?type=${selectedType}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">시험 유형 선택</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {examTypes.map((type) => (
              <label
                key={type.id}
                className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="examType"
                  value={type.id}
                  checked={selectedType === type.id}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700">{type.name}</span>
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ExamTypePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <ExamTypeContent />
    </Suspense>
  );
} 