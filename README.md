# 경찰 진급 시험 시스템

온라인 경찰 진급 시험 시스템입니다.

## 주요 기능

- 시험 응시
  - O/X 문제
  - 객관식 문제
  - 서술형 문제
  - 자동 채점
  - 결과 파일 다운로드

- 관리자 기능
  - 시험 결과 조회
  - 상세 결과 확인
  - 결과 파일 다운로드

## 기술 스택

- Next.js 14
- TypeScript
- Tailwind CSS
- MongoDB

## 설치 및 실행

1. 저장소 클론
```bash
git clone [repository-url]
cd police-exam-system
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 내용을 추가:
```
MONGODB_URI=your_mongodb_uri
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. 개발 서버 실행
```bash
npm run dev
```

## 관리자 계정

- ID: policea
- PW: policep

## 라이선스

MIT 