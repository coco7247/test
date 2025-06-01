'use client';

import { useRouter } from 'next/navigation';

const examTypes = [
  {
    id: '순경-경장',
    title: '순경 → 경장 진급시험',
    description: '20분 제한',
    timeLimit: 20,
  },
  {
    id: '경장-경사',
    title: '경장 → 경사 진급시험',
    description: '30분 제한',
    timeLimit: 30,
  },
  {
    id: '경사-경위',
    title: '경사 → 경위 진급시험',
    description: '40분 제한',
    timeLimit: 40,
  },
];

export default function ExamSelect() {
  const router = useRouter();

  const handleExamSelect = (examType: typeof examTypes[0]) => {
    router.push(`/exam?type=${examType.id}&time=${examType.timeLimit}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            시험 종류 선택
          </h1>
          <p className="text-gray-600">
            응시하실 시험을 선택해주세요
          </p>
        </div>

        <div className="space-y-4">
          {examTypes.map((exam) => (
            <button
              key={exam.id}
              onClick={() => handleExamSelect(exam)}
              className="w-full p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {exam.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {exam.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
} 