'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

function ExamContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(3600); // 1시간
  const [startTime, setStartTime] = useState<Date | null>(null);

  const examType = searchParams.get('type');
  const name = searchParams.get('name');

  useEffect(() => {
    if (!examType || !name) {
      router.push('/exam/type');
      return;
    }

    const fetchExam = async () => {
      try {
        const response = await fetch(`/api/exams?type=${examType}`);
        if (!response.ok) {
          throw new Error('Failed to fetch exam');
        }
        const data = await response.json();
        setExam(data);
        setAnswers(new Array(data.questions.length).fill(''));
        setStartTime(new Date());
      } catch (err) {
        setError('시험을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examType, name, router]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!exam || !startTime) return;

    const endTime = new Date();
    const timeSpent = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

    const result = {
      name,
      examType,
      answers: exam.questions.map((q: any, index: number) => ({
        question: q.question,
        userAnswer: answers[index],
        correctAnswer: q.answer,
        isCorrect: answers[index] === q.answer
      })),
      score: exam.questions.reduce((acc: number, q: any, index: number) => 
        acc + (answers[index] === q.answer ? 1 : 0), 0),
      totalQuestions: exam.questions.length,
      startTime,
      endTime
    };

    try {
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      });

      if (!response.ok) {
        throw new Error('Failed to submit exam');
      }

      router.push('/exam/complete');
    } catch (err) {
      setError('시험 제출에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">시험을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => router.push('/exam/type')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  if (!exam) {
    return null;
  }

  const question = exam.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {examType} 시험
            </h1>
            <div className="text-right">
              <p className="text-gray-600">응시자: {name}</p>
              <p className="text-gray-600">
                남은 시간: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-lg font-semibold mb-4">
              {currentQuestion + 1}. {question.question}
            </p>
            <div className="space-y-3">
              {question.options.map((option: string, index: number) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={answers[currentQuestion] === option}
                    onChange={() => handleAnswer(option)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
            >
              이전
            </button>
            {currentQuestion < exam.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                다음
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                제출
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExamPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <ExamContent />
    </Suspense>
  );
} 