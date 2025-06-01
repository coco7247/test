'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Question {
  question: string;
  type: 'ox' | 'multiple' | 'essay';
  options?: string[];
  answer: string;
  explanation: string;
}

export default function ExamPage() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: '동승자가 도주자에게 최초PM 2회를 찍은 상태이다. 쫓아가서 운전자가 PM를 1회 찍었다. 경찰측에서 총기 발포가 가능한가?',
      type: 'ox',
      answer: 'O',
      explanation: 'PM 3회 이상이면 총기 발포가 가능합니다.'
    },
    {
      question: '불법 주정차에 단속 기준은 5분이며, 도로교통법 집행이 가능하다.',
      type: 'ox',
      answer: 'X',
      explanation: '불법 주정차 단속 기준은 3분입니다.'
    },
    {
      question: '제 3장 경찰기관 봉금에 관한 규정 중 초과근무 수당 지급 제외 대상자 에 대한 항목 중 틀린것은?',
      type: 'multiple',
      options: [
        '뇌물 수수 혐의 이력자',
        '전일 1회 이상 출근한 이력이 없는 경우',
        '내부경고 2회 누적자',
        '피크타임(23:00 ~) 이후 출근자'
      ],
      answer: '3',
      explanation: '내부경고 2회 누적자는 초과근무 수당 지급 제외 대상자가 아닙니다.'
    },
    {
      question: '조직과 도주RP중 양측이 총기를 발포하여 즉흥으로 전환됬을때 3블럭 이상으로 범위를 벗어나면 안된다 그러면 시민은 몇블럭 까지 가능한가?',
      type: 'multiple',
      options: ['2블럭', '3블럭', '5블럭', '전체'],
      answer: '1',
      explanation: '시민은 2블럭까지만 이동이 가능합니다.'
    },
    {
      question: '영장 RP의 경찰이 참여할 수 있는 최대 인원 수를 고르시오',
      type: 'multiple',
      options: [
        '강도측 +1',
        '강도측 +2',
        '강도측 +3',
        '출근 중인 경찰 공무원 전부'
      ],
      answer: '2',
      explanation: '영장 RP는 강도측 +2까지 참여 가능합니다.'
    },
    {
      question: '특공대 메뉴얼 무전 수칙 중 특공대가 아닌 인원이 마이크를 사용할 수 있을 때의 조건은 알맞지 않는 것을 고르시오.',
      type: 'multiple',
      options: [
        '지휘권자의 지시에 따른 진입대기가 준비 되었을 때',
        '본인이 다운 되었을 때',
        '부여 받은 위치의 대상을 제압 하였을 때',
        '내가 현재 어디 위치에 있는지 알려줄 때'
      ],
      answer: '4',
      explanation: '위치 보고는 특공대가 아닌 인원이 마이크를 사용할 수 있는 조건이 아닙니다.'
    },
    {
      question: '본인은 교통사고 현장을 목격했다. A와 B는 서로 누구의 과실이 큰지 의견이 대립되고 있다. 경찰의 알맞는 행동을 쓰시오.',
      type: 'essay',
      answer: '객관적인 증거 수집과 목격자 진술을 통해 과실을 판단하고, 양측의 의견을 경청하며 중립적인 태도로 대처해야 합니다.',
      explanation: '경찰은 중립적인 입장에서 객관적인 증거를 수집하고 판단해야 합니다.'
    },
    {
      question: '도주 상황이 발생했을시, 운전자는 도주에 성공, 동승자는 제압하여 죽었을 때 어떻게 대처해야하는지 서술하시오',
      type: 'essay',
      answer: '현장 보존, 증거 수집, 목격자 확보, 상부 보고, 수사팀 출동 요청 등의 조치를 취해야 합니다.',
      explanation: '도주 차량 추적과 함께 현장 보존 및 증거 수집이 중요합니다.'
    },
    {
      question: '경찰서 1차와 2차 털이시 사용 가능한 스나이퍼 갯수, 샷건 갯수를 서술하시오',
      type: 'essay',
      answer: '1차 털이: 스나이퍼 2명, 샷건 2명\n2차 털이: 스나이퍼 1명, 샷건 1명',
      explanation: '경찰서 털이 시 무기 사용 인원은 제한되어 있습니다.'
    },
    {
      question: '공무원 합동 RP는 어떤 것이 있는지 모두 서술하시오.',
      type: 'essay',
      answer: '경찰-검사 합동 RP, 경찰-법원 합동 RP, 경찰-교도소 합동 RP 등이 있습니다.',
      explanation: '공무원 합동 RP는 여러 기관이 협력하여 진행하는 수사 활동입니다.'
    }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(10).fill(''));
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30분
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  useEffect(() => {
    if (!name) {
      router.push('/');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [name, router]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    const endTime = new Date();
    const score = questions.reduce((acc, q, i) => {
      if (q.type === 'essay') return acc;
      return acc + (answers[i] === q.answer ? 10 : 0);
    }, 0);

    // Create text file content
    const textContent = `시험 결과
이름: ${name}
시험 유형: 순경
시험 날짜: ${new Date().toLocaleDateString()}
점수: ${score}점

답변:
${questions.map((q, i) => `
${i + 1}. ${q.question}
답변: ${answers[i]}
`).join('\n')}`;

    // Create and download text file
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `시험결과_${name}_${new Date().toLocaleDateString()}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    // Try to save to database, but don't block completion if it fails
    try {
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          examType: '순경',
          score,
          totalQuestions: questions.length,
          startTime,
          endTime,
          answers: questions.map((q, i) => ({
            question: q.question,
            userAnswer: answers[i],
            correctAnswer: q.answer,
            isCorrect: answers[i] === q.answer,
          })),
        }),
      });

      if (!response.ok) {
        console.error('결과 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error saving result:', error);
    }

    // Show completion screen
    router.push('/exam/complete');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">시험 제출 완료</h2>
          <p className="text-gray-600 mb-4">결과 파일이 다운로드되었습니다.</p>
          <p className="text-gray-600">잠시 후 완료 페이지로 이동합니다...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">순경 시험</h1>
              <p className="text-gray-600">응시자: {name}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">남은 시간: {formatTime(timeLeft)}</p>
              <p className="text-gray-600">
                문제 {currentQuestion + 1} / {questions.length}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {currentQuestion + 1}. {currentQ.question}
              {currentQ.type === 'ox' && ' (O/X)'}
              {currentQ.type === 'multiple' && ' (객관식)'}
              {currentQ.type === 'essay' && ' (서술형)'}
            </h2>
            {currentQ.type === 'ox' && (
              <div className="space-y-2">
                {['O', 'X'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-3 text-left rounded ${
                      answers[currentQuestion] === option
                        ? 'bg-blue-100 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    } border`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            {currentQ.type === 'multiple' && currentQ.options && (
              <div className="space-y-2">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer((index + 1).toString())}
                    className={`w-full p-3 text-left rounded ${
                      answers[currentQuestion] === (index + 1).toString()
                        ? 'bg-blue-100 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    } border`}
                  >
                    {index + 1}. {option}
                  </button>
                ))}
              </div>
            )}
            {currentQ.type === 'essay' && (
              <textarea
                value={answers[currentQuestion]}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="답변을 입력하세요"
              />
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
            >
              이전
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion((prev) => prev + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                다음
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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