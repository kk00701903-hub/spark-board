# AI 아이디어 스파크 — 웹 페이지 구조

배포 URL: https://kk00701903-hub.github.io/spark-board/  
라우터: `HashRouter` (경로 예: `/#/curriculum`)

```
spark-board/
├── /  (홈)
│   ├── Header
│   │   ├── 로고 · AI 아이디어 스파크 (홈 링크)
│   │   └── 실습 시작 → /workshop
│   ├── HeroSection
│   │   ├── 교육 소개 배지
│   │   ├── 메인 타이틀 · 부제
│   │   ├── 교육 커리큘럼 보기 → /curriculum
│   │   └── 허브 카드 4개
│   │       ├── 체계적 커리큘럼 → /curriculum
│   │       ├── 핵심 프롬프트 템플릿 → /prompts
│   │       ├── 업무 시간 단축 → /time-savings
│   │       └── 워크숍 방식 → /workshop
│   ├── CTASection
│   │   ├── 실습 바로 시작 → /workshop
│   │   └── 프롬프트 모음 보기 → /prompts
│   └── Footer
│       └── (주)제때 AI 아이디어 스파크
│
├── /curriculum  (4단계 체계적 커리큘럼)
│   ├── PageShell (헤더 · 홈 · 푸터)
│   └── CurriculumSection
│       ├── 단계 1 · 페인포인트 발굴
│       ├── 단계 2 · AI 페르소나 설정
│       ├── 단계 3 · 반복적 구체화
│       └── 단계 4 · 실행 가능성 검토
│
├── /prompts  (4가지 핵심 프롬프트 템플릿)
│   ├── PageShell
│   └── PromptTemplatesSection
│       ├── 역할 부여 프롬프트
│       ├── SCAMPER 확장 프롬프트
│       ├── Lean Canvas 작성 프롬프트
│       └── 역질문(Devil's Advocate) 프롬프트
│
├── /time-savings  (80% 업무 시간 단축)
│   ├── PageShell
│   └── CaseStudySection
│       ├── 성과 지표 (전·후 비교)
│       ├── 프로세스 4단계
│       │   ├── 01 · 나라장터 API
│       │   ├── 02 · 멀티 스테이지 필터링
│       │   ├── 03 · Gemini AI 과업 분석
│       │   └── 04 · 자동 보고서 발송
│       └── 기술 스택 · 도입 효과
│
├── /workshop  (워크숍 · 1단계 아이디어 실습)
│   ├── PageShell
│   ├── WorkshopPhaseCards
│   │   ├── 1단계 · 아이디어 실습 (현재 페이지)
│   │   └── 2단계 · ChatGPT → VS Code → /workshop/implement
│   └── PracticeGuideSection
│       ├── 실습 1 · 내 페인포인트 찾기
│       ├── 실습 2 · 아이디어 Lean Canvas 작성
│       ├── 실습 3 · AI 제안서 초안 자동 생성
│       ├── 실습 4 · 구현 가능성 점검
│       └── 2단계 구현 실습으로 이동 → /workshop/implement
│
├── /workshop/implement  (2단계 · 구현 실습)
│   ├── PageShell
│   └── ImplementPracticeSection
│       ├── 1단계 아이디어 실습으로 돌아가기 → /workshop
│       ├── 실습 1 · 프로그램 폴더 뼈대 만들기
│       │   ├── 질문 1 · 어떤 파일이 필요한지 먼저 물어보기
│       │   ├── 질문 2 · 필요한 도구 목록·업로드 제외 목록 받기
│       │   ├── 질문 3 · 설치·실행 방법 글 (README) 받기
│       │   ├── 질문 4 · 실제로 실행되는 메인 코드 받기
│       │   └── 질문 5 · 자동 점검용 테스트 코드 한 개 받기
│       └── 실습 2 · 기능 더하기 & 오류 고치기
│           ├── 질문 1 · 지금 코드가 뭘 하는지 맞추기
│           ├── 질문 2 · 새 기능 만들어 달라고 하기
│           └── 질문 3 · 오류 났을 때 (같은 대화에 다시 보내기)
│
└── *  (404)
    └── NotFound
        ├── 404 메시지
        └── Return to Home → /
```

## 소스 파일 매핑

| 경로 | 페이지 파일 | 주요 섹션 |
|------|-------------|-----------|
| `/` | `src/pages/home/Index.tsx` | Header, HeroSection, CTASection, Footer |
| `/curriculum` | `src/pages/curriculum/Index.tsx` | `CurriculumSection` |
| `/prompts` | `src/pages/prompt-templates/Index.tsx` | `PromptTemplatesSection` |
| `/time-savings` | `src/pages/time-savings/Index.tsx` | `CaseStudySection` |
| `/workshop` | `src/pages/workshop/Index.tsx` | `WorkshopPhaseCards`, `PracticeGuideSection` |
| `/workshop/implement` | `src/pages/workshop/ImplementPage.tsx` | `ImplementPracticeSection` |
| `*` | `src/pages/not-found/Index.tsx` | NotFound |
