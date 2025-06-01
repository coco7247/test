import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Exam from '@/models/Exam';

export async function GET() {
  try {
    await connectDB();

    // 기존 데이터 삭제
    await Exam.deleteMany({});

    const examTypes = [
      {
        type: '순경',
        timeLimit: 30,
        questions: [
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
        ]
      },
      {
        examType: '경장-경사',
        timeLimit: 30,
        questions: [
          {
            question: '경찰은 도주차량 추격 중, 정차 명령(E키) 3회 실시 후에도 정차하지 않으면 즉시 발포가 가능하다.',
            options: ['O', 'X'],
            correctAnswer: 0
          },
          {
            question: '스토리"전멸" 나온 이후에는 전술지휘권은 일반 상급 경찰에게 자동으로 이전된다.',
            options: ['O', 'X'],
            correctAnswer: 0
          },
          {
            question: '다음 중 즉흥RP → 벌금/구금 집행까지의 절차가 올바르게 나열된 것은?',
            options: [
              '정차명령 → 도주 확인 → 즉각 발포 → 무기 압수 → 체포 → 집행',
              '무전전파 → 정차명령 3회 → 즉각 발포 → 무기 압수 → 체포 → 집행',
              '정차명령 3회 → 무전 전파 및 보고 → 지휘 하에 발포 → 무기 압수 → 체포 → 집행',
              '바로 총격전 진입 → 무기 압수 → 체포 → 집행'
            ],
            correctAnswer: 2
          },
          {
            question: '다음 중 경찰청 내부 규칙상 경찰 복무 중 처벌 수위가 \'중징계\'에 해당하는 상황은?',
            options: [
              '퇴근 중 무전방 청취',
              '경찰복을 입고 잠수',
              '경찰 차량 문 단속 하지 않아 차량 탈취로 RP상 손해 발생',
              '체포 중 미란다 고지를 누락한 경우'
            ],
            correctAnswer: 2
          },
          {
            question: '스토리RP 도중 경찰의 전멸이 확인되었을 때, 이후 경찰 측의 행동으로 적절한 것은?',
            options: [
              '즉시 복귀 후 재정비하여 재투입',
              '지휘자 판단 하 RP 즉흥으로 전환',
              '모든 경찰은 RP 구역에서 이탈',
              '경찰은 복귀 후 바로 총기 보급 후 재진입'
            ],
            correctAnswer: 1
          },
          {
            question: '다음 중 수배RP 관련 법률에 알맞지 않는 것은?',
            options: [
              '출석 공지 작성 시, 출석자 닉네임만 적으면 충분하다',
              '지원콜 기능이 있는 팩션은 수배 공지가 올라오고 5분 이후에 지원이 가능하다.',
              '수배 시작 후 차량 수리 기능 대신 사유지가 가깝다면 비콘으로 차량 복구가 가능하다.',
              '수배 패배 벌금: 2억 / 구금: 30분이다.'
            ],
            correctAnswer: 0
          },
          {
            question: '당신은 경사로서 경찰 복무 중, 후임 경관이 RP 중 시민에게 반말을 사용하고 과잉 체포를 시도하는 장면을 목격했습니다. 후임 경관이 잘못한 점과 잘못한 점에 대한 피드백을 서술하시오',
            options: ['서술형'],
            correctAnswer: 0
          },
          {
            question: '스토리RP 중 강도 측이 정상적인 절차 없이 벨을 울려서 RP가 시작됐다. 이때 조치해야할 행동을 서술하시오. 지휘권, 법률, 규정을 포함해 서술하시오.',
            options: ['서술형'],
            correctAnswer: 0
          },
          {
            question: '폭주로 인해 체포된 시민이 폭언 및 물리적 저항을 반복하여 경찰 공무집행을 방해하고 있습니다. 이때 알맞은 행동을 서술하시오.',
            options: ['서술형'],
            correctAnswer: 0
          },
          {
            question: '도주가 수배로 전환되어 출석 공지를 올렸으나 도주자가 출석 공지가 올라오기전에 디컨한 사실을 확인하였다. 이때 알맞은 행동을 서술 하시오.',
            options: ['서술형'],
            correctAnswer: 0
          }
        ]
      },
      {
        examType: '경사-경위',
        timeLimit: 40,
        questions: [
          {
            question: '경찰은 정차 명령을 3회 실시 후에도 도주 차량이 멈추지 않을 경우, 보고 없이 현장 판단으로 발포를 진행할 수 있다.',
            options: ['O', 'X'],
            correctAnswer: 1
          },
          {
            question: '퇴근 중인 경찰은 내부 규칙에 따라 경찰 무전 채널 청취는 허용되며, 무전 송출만 금지된다.',
            options: ['O', 'X'],
            correctAnswer: 1
          },
          {
            question: '다음 중 \'즉흥RP\'의 성립 조건으로 맞는 것은?',
            options: [
              '경찰이 먼저 총기를 사용한 경우',
              '시민이 경찰에게 무기를 휘두른 뒤 도주할 경우',
              '강도RP가 종료된 후 전투가 다시 시작될 경우',
              '경찰이 정차 명령을 2회만 하고도 발포할 경우'
            ],
            correctAnswer: 1
          },
          {
            question: '마공포 수배 공지 절차에서 옳지 않은 항목은?',
            options: [
              '수배자는 고유번호와 닉네임을 포함해 공지한다.',
              '수배 공지 없이 /추적 명령은 금지되어 있다.',
              '수배 공지는 디스코드 자유채팅이 아닌 팩션 공지에 작성한다.',
              '수배는 별도의 출석 없이 공지가 가능하다.'
            ],
            correctAnswer: 3
          },
          {
            question: '다음 중 경찰청 감사관의 역할 및 권한으로 맞는 것은?',
            options: [
              '모든 징계 처리를 단독으로 확정한다.',
              '징계 결정권은 치안정감급 이상이 가능하다.',
              '징계가 가능한 범위는 치안총감을 포함한 경찰청에 속한 경관이다.',
              '감찰 신고는 별도의 영상이 없더라도 증인이 있다면 가능하다.'
            ],
            correctAnswer: 3
          },
          {
            question: '다음 중 바디캠 영상의 법적 효력에 대한 설명으로 맞는 것은?',
            options: [
              '경찰의 바디캠은 모든 상황에서 영상 제공 의무가 있다.',
              '시민이 바디캠 영상을 요청할 경우, 경찰은 거부할 수 없다.',
              '바디캠 영상은 내부 절차 없이 즉시 삭제가 가능하다.',
              '바디캠 영상은 출근 시 녹화가 시작되어야 하며, RP 근거로 효력이 인정된다.'
            ],
            correctAnswer: 3
          },
          {
            question: '영장RP 도중 헬기 탑승자가 낙하산을 매고 낙하해서 옥상으로 착지했다. 이때 옥상에 착지한 경관은 지상에 영장 인원과 격렬하게 대치하였으며 상대측은 옥상으로 올라와 경찰을 죽였다. 이 지문에 대한 잘못된 점을 서술하시오',
            options: ['서술형'],
            correctAnswer: 0
          },
          {
            question: '즉흥RP 도중, 체포한 시민이 바디캠 영상이 없다는 이유로 혐의를 인정하지 않으며 억울함을 주장합니다. 이때 행동을 서술 하시오',
            options: ['서술형'],
            correctAnswer: 0
          },
          {
            question: '당신은 경위로서 신고콜을 받고 출동했지만, 현장에는 시민이 여럿 몰려 혼란스러운 상태입니다. 이때 신고자와 어떻게 만날것이며, 출근 중인 경관들에게 어떠한 지시를 내릴 것인지 서술하시오',
            options: ['서술형'],
            correctAnswer: 0
          },
          {
            question: '당신은 경위로써 순찰 중 경찰차 문단속이 제대로 되지 않아 시민이 차량을 탈취하는 사고를 목격했습니다. 이때 목격 후 행동, RP 종료 후 사후처리에 대해 서술하시오.',
            options: ['서술형'],
            correctAnswer: 0
          }
        ]
      }
    ];

    // 시험 데이터 추가
    for (const examType of examTypes) {
      await Exam.create({
        type: examType.type,
        timeLimit: examType.timeLimit,
        questions: examType.questions
      });
    }

    return NextResponse.json({ message: '시험 데이터가 성공적으로 추가되었습니다.' });
  } catch (error) {
    console.error('Error seeding exam data:', error);
    return NextResponse.json(
      { error: '시험 데이터 추가 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 