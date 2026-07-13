import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ChevronDown, ChevronUp, Clock, Code2, Rocket, Target, Lightbulb, AlertCircle,
} from 'lucide-react';
import { springGentle, springSnappy } from '@/pages/home/animations';
import { EditablePrompt } from '@/pages/home/sections/EditablePrompt';

function BoldText({ text }: { text: string }) {
  const parts = text.split(/\*\*/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-foreground font-semibold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

type PromptStep = {
  n: number;
  title: string;
  lead: string;
  vsCodeSteps: string[];
  tip?: string;
  prompt: string;
};

type ImplementPractice = {
  id: string;
  listTitle: string;
  icon: string;
  duration: string;
  difficulty: '초급' | '중급' | '고급';
  summary: string;
  warning: string;
  overviewSteps: string[];
  promptSteps: PromptStep[];
};

const implementPractices: ImplementPractice[] = [
  {
    id: 'impl-1',
    listTitle: '실습 1: 프로그램 구조 뼈대 만들기',
    icon: '📁',
    duration: '약 45분',
    difficulty: '중급',
    summary:
      'STEP 1.에서 정리한 **아이디어 글**을 ChatGPT에게 보여 주고, 파이썬 프로그램에 필요한 **파일 구조를 함께 설계**합니다. ChatGPT가 알려 준 파일 내용을 VS Code에 **하나씩 붙여 넣어** 실제 프로젝트 폴더를 완성합니다.',
    warning:
      '⚠️ ChatGPT 창을 절대 닫지 마세요! 같은 창에서 질문을 이어서 보내야 ChatGPT가 앞 내용을 기억합니다.',
    overviewSteps: [
      'VS Code를 열고 **빈 폴더**를 하나 만들어 엽니다 (예: "my_project")',
      '**질문 1**: 아이디어 글 붙여넣기 → ChatGPT가 어떤 파일이 필요한지 목록으로 알려 줌',
      '**질문 2**: requirements.txt · .gitignore 내용 받기 → VS Code에 파일 만들어 저장',
      '**질문 3**: README.md 내용 받기 → VS Code에 파일 만들어 저장',
      '**질문 4**: main.py 코드 받기 → VS Code에 src 폴더 만들고 저장',
      '**질문 5**: 테스트 코드 받기 → tests 폴더 만들고 저장 후 실행',
    ],
    promptSteps: [
      {
        n: 1,
        title: '아이디어를 ChatGPT에 소개하고 파일 목록 받기',
        lead: 'STEP 1.에서 정리한 글(페인포인트 분석, 린캔버스, 제안서 등)을 아래 노란 칸에 붙여 넣으세요. 그런 다음 "복사" 버튼을 눌러 ChatGPT 창에 붙여 넣고 전송합니다.\n\n💡 너무 길면 핵심 내용만 잘라도 됩니다.',
        vsCodeSteps: [
          'ChatGPT가 폴더·파일 목록을 텍스트 구조로 보여 줄 거예요.',
          '아직 파일을 만들 필요 없어요. 목록만 눈으로 확인하고 **질문 2번**으로 넘어가세요.',
        ],
        tip: '새로운 아이디어라도 OK! ChatGPT가 적합한 파일 구조를 제안해 줘요.',
        prompt: `너는 중고등학생도 쉽게 이해하도록 설명해 주는 파이썬 선생님이야.

아래는 내가 STEP 1. 실습에서 정리한 아이디어야. 이걸 바탕으로 파이썬 3.11 이상으로 실행되는 작은 프로그램을 만들 거야.

=== STEP 1.에서 정리한 내용 ===
[여기에 STEP 1. 아이디어 글 붙여넣기]
===

지금은 코드를 작성하지 마. 한국어로만 답해 줘.

1) 이 아이디어를 한 문장으로 요약해 줘
2) 만들 폴더와 파일 이름을 나무 구조(트리)처럼 그려 줘
3) 각 파일이 어떤 역할을 하는지 한 줄씩 설명해 줘`,
      },
      {
        n: 2,
        title: '필요한 도구 목록(requirements.txt)과 .gitignore 받기',
        lead: '같은 ChatGPT 창에서 이어서 보냅니다. 프롬프트를 그대로 복사해서 전송하면 됩니다.',
        vsCodeSteps: [
          'VS Code 왼쪽 탐색기에서 "새 파일" 아이콘을 클릭합니다.',
          '파일 이름을 **requirements.txt** 로 입력하고 Enter 를 누릅니다.',
          'ChatGPT가 알려 준 requirements.txt 내용을 복사해 붙여 넣고 **Ctrl+S** 로 저장합니다.',
          '같은 방법으로 **.gitignore** 파일도 만들고 내용을 붙여 넣어 저장합니다.',
        ],
        tip: 'requirements.txt 는 프로그램을 실행하는 데 필요한 도구(라이브러리) 목록이에요. 다른 PC에서도 같은 환경을 만들 수 있게 해줍니다.',
        prompt: `방금 말한 그 프로그램 그대로, 아래 두 파일의 전체 내용만 각각 코드 상자로 보여 줘.

1) requirements.txt — 필요한 파이썬 라이브러리 이름과 버전 (예: pandas==2.2.0)
2) .gitignore — 파이썬 프로젝트에서 깃(Git)에 올리면 안 되는 파일 목록

설명은 두 줄 이내로만 해 줘.`,
      },
      {
        n: 3,
        title: '설치·실행 안내문(README.md) 받기',
        lead: '같은 ChatGPT 창에서 이어서 보냅니다.',
        vsCodeSteps: [
          'VS Code에서 "새 파일" → **README.md** 로 저장합니다.',
          'ChatGPT 답을 전체 복사해 붙여 넣고 **Ctrl+S** 로 저장합니다.',
          '나중에 실행 방법이 헷갈리면 이 파일을 보면 됩니다.',
        ],
        tip: 'README.md 는 프로그램 사용 설명서예요. 나중에 친구에게 보낼 때도 유용해요.',
        prompt: `같은 프로그램의 README.md 전체를 한국어 마크다운 형식으로 써 줘.

반드시 넣어야 할 내용:
- 이 프로그램이 무엇인지 한 줄 설명
- 파이썬 3.11 이상 필요하다고 적기
- 가상환경 만드는 법: python -m venv .venv
- 가상환경 활성화 방법 (Windows 한 줄, 맥/리눅스 한 줄 따로)
- 라이브러리 설치: pip install -r requirements.txt
- 프로그램 실행 명령어 (예: python main.py)`,
      },
      {
        n: 4,
        title: '가장 중요한 메인 코드(main.py) 받기',
        lead: '같은 ChatGPT 창에서 이어서 보냅니다. ChatGPT가 질문 1번에서 제안한 파일 경로와 다를 수도 있으니, 나온 경로 이름을 그대로 사용하세요.',
        vsCodeSteps: [
          'VS Code에서 **src 폴더**를 만듭니다 (탐색기에서 "새 폴더" 클릭).',
          'src 폴더 안에 **main.py** 파일을 만듭니다.',
          'ChatGPT가 준 코드 전체를 복사해 붙여 넣고 **Ctrl+S** 로 저장합니다.',
          'VS Code 상단 메뉴 → 터미널 → 새 터미널을 엽니다.',
          '터미널에서 **python src/main.py** 를 입력하고 Enter 를 눌러 실행해 봅니다.',
        ],
        tip: '오류가 나도 괜찮아요! 오류 메시지를 복사해서 실습 2의 질문 3번에 붙여 넣으면 됩니다.',
        prompt: `같은 프로그램에서 일단 아주 간단하게만 돌아가는 시작 파일 코드를 줘.

파일 경로: src/main.py

조건:
- STEP 1. 아이디어와 어울리는 간단한 동작 하나만 (예: 화면에 결과 한 줄 출력)
- 중요한 줄에는 한국어 주석으로 설명 달기
- 변수에 타입을 표시하는 타입 힌트 사용 (예: name: str = "홍길동")

파일 전체를 코드 상자 하나로 보여 줘.`,
      },
      {
        n: 5,
        title: '자동 확인용 테스트 코드 받고 실행해 보기',
        lead: '같은 ChatGPT 창에서 이어서 보냅니다. 테스트 코드는 프로그램이 올바르게 작동하는지 자동으로 확인해 주는 코드예요.',
        vsCodeSteps: [
          'VS Code에서 **tests 폴더**를 만듭니다.',
          'ChatGPT가 알려 준 파일 이름으로 tests 폴더 안에 파일을 만들고 코드를 붙여 넣어 저장합니다.',
          '터미널에서 **pytest** 를 입력하고 Enter 를 눌러 실행합니다.',
          '초록색 점(.) 이 나오면 성공! 빨간 F 가 나오면 실습 2 질문 3번으로 오류를 고칩니다.',
        ],
        tip: 'pytest 가 없다는 오류가 나오면 터미널에서 pip install pytest 를 먼저 실행하세요.',
        prompt: `같은 프로그램에 pytest 테스트를 파일 하나만 추가해 줘.

- src/main.py 안의 함수나 동작 중 하나를 테스트
- 파일은 tests/ 폴더 안에 두기
- 테스트 파일 전체를 코드 상자로 보여 줘
- 테스트 코드 안에 한국어 주석으로 "이 테스트가 무엇을 확인하는지" 한 줄 적기

한국어로 답해 줘.`,
      },
    ],
  },
  {
    id: 'impl-2',
    listTitle: '실습 2: 기능 더하기 & 오류 고치기',
    icon: '🔧',
    duration: '약 30분',
    difficulty: '중급',
    summary:
      '실습 1에서 만든 뼈대에 **원하는 기능을 하나씩 추가**합니다. VS Code 코드를 ChatGPT에게 보여 주고, 돌아온 코드를 다시 VS Code에 붙여 넣어 반영합니다. **오류가 나면 터미널 메시지를 그대로 복사**해 ChatGPT에 붙여 넣으면 원인과 수정 방법을 알려줍니다.',
    warning:
      '⚠️ 기능은 한 번에 하나씩만 추가하세요. 여러 기능을 한꺼번에 요청하면 오류가 더 많아질 수 있어요.',
    overviewSteps: [
      '추가할 기능을 **한 문장**으로 먼저 적어 둡니다 (예: "CSV 파일을 불러와서 표로 보여 주기")',
      '**질문 1**: 현재 코드를 ChatGPT에 보여 주고 이해를 맞춥니다',
      '**질문 2**: 원하는 기능을 요청합니다 → VS Code에 반영 후 실행',
      '**질문 3**: 오류가 나면 터미널 메시지를 복사해 붙여 넣습니다',
      '기능이 잘 작동하면 **질문 2** 를 반복해 다음 기능을 추가합니다',
    ],
    promptSteps: [
      {
        n: 1,
        title: '현재 코드를 ChatGPT에 보여 주고 상황 파악하기',
        lead: '새 ChatGPT 창을 열거나 기존 대화에서 이어서 보냅니다. VS Code에서 현재 main.py 내용을 복사해 아래 노란 칸에 붙여 넣으세요.\n\n이 질문은 ChatGPT가 내 코드를 이해하도록 "준비 단계"예요. 아직 기능을 만들지 않아요.',
        vsCodeSteps: [
          'ChatGPT 답을 읽고 현재 코드에 대한 설명이 맞는지 확인합니다.',
          '이해가 되면 **질문 2번**으로 넘어가 기능을 요청합니다.',
        ],
        tip: '새 ChatGPT 창을 열었다면, STEP 1. 아이디어 요약을 한 줄만 적어서 먼저 보내도 됩니다.',
        prompt: `너는 중고등학생도 이해시키는 파이썬 선생님이야. 내 프로젝트 상황을 파악해 줘.

=== STEP 1. 아이디어 요약 ===
[무슨 프로그램인지, 누가 쓰는지, 핵심 기능을 2~3줄로]
===

=== 지금 VS Code에 있는 코드 ===
[main.py 전체 또는 중요한 부분 복사해서 붙여넣기]
===

지금은 코드를 수정하지 마. 한국어로만 답해 줘.

1) 이 코드가 하는 일을 초등학생에게 말하듯 한 문장으로 설명해 줘
2) 나중에 기능을 추가할 때 고쳐야 할 파일이 어디인지 최대 2개까지 알려 줘`,
      },
      {
        n: 2,
        title: '원하는 기능 하나를 만들어 달라고 요청하기',
        lead: '같은 ChatGPT 창에서 이어서 보냅니다. 아래 노란 칸에 **내가 원하는 기능**을 구체적으로 적으세요.\n\n좋은 예: "CSV 파일 경로를 입력받아서 줄 개수와 열 이름을 출력"\n나쁜 예: "기능 추가해 줘" (너무 막연함)',
        vsCodeSteps: [
          'ChatGPT가 바꿀 파일과 전체 코드를 보여 줄 거예요.',
          'VS Code에서 해당 파일을 열고 기존 내용을 **전부 지운 뒤** 새 코드를 붙여 넣습니다.',
          '**Ctrl+S** 로 저장하고, 터미널에서 **python src/main.py** 로 실행해 봅니다.',
          '잘 된다면 다음 기능은 이 질문 2번을 반복합니다. 오류가 나면 질문 3번으로 이동하세요.',
        ],
        tip: '기능이 복잡할수록 오류도 많아요. "작고 단순하게" 만들고 나서 조금씩 확장하는 게 좋습니다.',
        prompt: `같은 프로젝트야. 아래 기능을 지금 폴더 구조 그대로 살려서 추가해 줘.

추가할 기능: [예: CSV 파일 경로를 입력받아서, 줄 개수와 열 이름을 화면에 출력]

규칙:
- 먼저 무엇을 어떻게 바꿀지 3줄 이내로 설명해 줘
- 고치거나 새로 만든 파일은 "파일 경로 + 전체 코드" 형태로 코드 상자에 담아 줘
- 오류 메시지는 한국어로 출력되도록 해 줘
- 가능하면 tests/ 폴더 아래에 테스트 코드도 하나 추가해 줘

한국어로 답해 줘.`,
      },
      {
        n: 3,
        title: '오류가 났을 때 → 원인과 수정 코드 받기',
        lead: '터미널에 빨간 오류가 나오면 당황하지 마세요! 오류 메시지를 **전체 선택(Ctrl+A) → 복사(Ctrl+C)** 한 뒤 아래 노란 칸에 붙여 넣고 전송합니다.\n\n같은 오류가 반복되면 새 코드로 다시 바꾼 뒤 이 질문을 다시 보내세요.',
        vsCodeSteps: [
          'ChatGPT가 원인과 수정된 파일 코드를 알려 줄 거예요.',
          'VS Code에서 해당 파일을 열고 내용을 **전부 지운 뒤** 새 코드를 붙여 넣습니다.',
          '**Ctrl+S** 로 저장하고 다시 실행해 봅니다.',
          '오류가 또 나오면 새 로그를 복사해 이 질문을 다시 보냅니다.',
        ],
        tip: '터미널에서 오류를 복사할 때 마지막 "Traceback" 부분까지 포함해서 복사하면 ChatGPT가 더 정확히 분석해요.',
        prompt: `같은 프로젝트야. VS Code 터미널에서 실행했더니 아래처럼 오류가 났어.

이것만 답해 줘:
1) 오류 원인을 한 줄로 요약
2) 고쳐야 할 파일 경로
3) 그 파일의 수정된 전체 코드를 코드 상자 하나에 담아 줘

오류 전체 내용:
\`\`\`
[여기에 터미널에 나온 오류 전체 붙여넣기]
\`\`\``,
      },
    ],
  },
];

function difficultyClass(d: ImplementPractice['difficulty']) {
  if (d === '초급') return 'bg-green-100 text-green-700';
  if (d === '중급') return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
}

export function ImplementPracticeSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [openSubStep, setOpenSubStep] = useState<Record<string, number | null>>({
    'impl-1': 0,
    'impl-2': 0,
  });

  const toggleSubStep = (practiceId: string, stepIdx: number) => {
    setOpenSubStep((prev) => {
      const cur = prev[practiceId] ?? null;
      return { ...prev, [practiceId]: cur === stepIdx ? null : stepIdx };
    });
  };

  return (
    <section className="edu-section">
      <div className="edu-container">
        <div className="mb-6">
          <Link
            to="/workshop/example"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            STEP 2. 예제 따라하기로 돌아가기
          </Link>
        </div>

        <div className="mb-6 edu-card border-primary/25 bg-primary/5 px-5 py-4 flex items-start gap-3">
          <Rocket className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground mb-1">교육 종료 후 개별 실습 단계</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              STEP 3.는 오늘 수업 시간에 함께 진행하지 않아요.
              교육이 끝난 뒤 집이나 개인 시간에 <strong className="text-foreground">STEP 1.에서 정리한 아이디어</strong>로 천천히 따라해 보세요.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="edu-badge mb-3">
            <Rocket className="w-4 h-4" /> STEP 3. <span className="edu-step text-xs">내 아이디어 구현하기</span>
          </div>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            STEP 2. 예제에서 익힌 <strong className="text-foreground">똑같은 흐름</strong>으로,
            이번엔 STEP 1.에서 정리한 내 아이디어를 파이썬 프로그램으로 만듭니다.
            <span className="text-sm block mt-1">(교육 당일이 아닌, 이후 개별 실습용 안내입니다)</span>
          </p>
        </div>

        {/* 전체 흐름 안내 배너 */}
        <div className="mb-6 edu-card px-5 py-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">전체 진행 흐름</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {[
              { icon: '📋', label: '프롬프트 복사' },
              { icon: '💬', label: 'ChatGPT에 전송' },
              { icon: '📄', label: '답 코드 복사' },
              { icon: '💻', label: 'VS Code에 파일 저장' },
              { icon: '▶️', label: '터미널에서 실행' },
            ].map((item, i, arr) => (
              <span key={i} className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted font-medium text-foreground">
                  <span>{item.icon}</span> {item.label}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-muted-foreground font-bold">→</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {implementPractices.map((practice, i) => (
            <motion.div
              key={practice.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springSnappy, delay: i * 0.05 }}
              className="edu-card overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                    {practice.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-foreground">{practice.listTitle}</div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3 shrink-0" /> {practice.duration}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyClass(practice.difficulty)}`}>
                        {practice.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={springGentle}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-border pt-6 space-y-6">

                      {/* 요약 + 경고 */}
                      <div className="space-y-3">
                        <div className="rounded-xl border border-border bg-muted/30 p-4 sm:p-5 text-sm text-muted-foreground leading-relaxed">
                          <BoldText text={practice.summary} />
                        </div>
                        <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{practice.warning}</span>
                        </div>
                      </div>

                      {/* 전체 순서 */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary shrink-0" /> 이 실습 전체 순서
                        </h4>
                        <div className="space-y-2">
                          {practice.overviewSteps.map((step, si) => (
                            <div key={si} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-primary">{si + 1}</span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                <BoldText text={step} />
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 질문 카드들 */}
                      <div className="space-y-3">
                        {practice.promptSteps.map((step, si) => {
                          const subOpen = openSubStep[practice.id];
                          const isSubOpen = subOpen === si;
                          return (
                            <div
                              key={step.n}
                          className="edu-card overflow-hidden"
                            >
                              <button
                                type="button"
                                onClick={() => toggleSubStep(practice.id, si)}
                                className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left hover:bg-muted/30 transition-colors"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-sm font-bold text-primary">
                                    {step.n}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-xs font-medium text-muted-foreground">ChatGPT 질문 {step.n}</div>
                                    <div className="font-bold text-foreground text-sm sm:text-base leading-snug">
                                      {step.title}
                                    </div>
                                  </div>
                                </div>
                                {isSubOpen ? (
                                  <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                                )}
                              </button>

                              <AnimatePresence>
                                {isSubOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={springGentle}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 border-t border-border pt-4">
                                      <div className="grid md:grid-cols-2 gap-6">

                                        {/* 왼쪽: 실습 순서 */}
                                        <div className="space-y-4">
                                          <div>
                                            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                              <span className="text-base">💬</span> ChatGPT에 보내기 전
                                            </h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                              <BoldText text={step.lead} />
                                            </p>
                                          </div>

                                          <div>
                                            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                              <span className="text-base">💻</span> ChatGPT 답 받은 후 VS Code에서
                                            </h4>
                                            <div className="space-y-2">
                                              {step.vsCodeSteps.map((vs, vsi) => (
                                                <div key={vsi} className="flex items-start gap-2.5">
                                                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <span className="text-xs font-bold text-accent">{vsi + 1}</span>
                                                  </div>
                                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                                    <BoldText text={vs} />
                                                  </p>
                                                </div>
                                              ))}
                                            </div>
                                          </div>

                                          {step.tip && (
                                            <div className="flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/15 px-3 py-2.5">
                                              <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                              <p className="text-xs text-foreground/80 leading-relaxed">
                                                <BoldText text={step.tip} />
                                              </p>
                                            </div>
                                          )}
                                        </div>

                                        {/* 오른쪽: 프롬프트 */}
                                        <div>
                                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3 min-w-0">
                                            <Code2 className="w-4 h-4 text-accent shrink-0" /> 실습용 프롬프트
                                          </h4>
                                          <EditablePrompt
                                            text={step.prompt}
                                            promptKey={`${practice.id}-q${step.n}`}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            <BoldText text="STEP 1. 글이 너무 길면 **요약본만** 질문 1번에 넣어도 됩니다. 보안 관련 위배되는 정보는 넣지 마세요." />
          </p>
          <Link
            to="/prompts"
            className="text-sm font-semibold text-primary hover:underline"
          >
            다른 질문 예시 모음 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
