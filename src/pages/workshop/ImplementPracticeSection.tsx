import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ChevronDown, ChevronUp, Clock, Code2, Rocket, Target,
} from 'lucide-react';
import { springGentle, springSnappy } from '@/pages/home/animations';
import { CopyButton } from '@/pages/home/sections/CopyButton';
import { HighlightedPrompt } from '@/pages/home/sections/HighlightedPrompt';

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
  afterChat: string;
  prompt: string;
};

type ImplementPractice = {
  id: string;
  listTitle: string;
  icon: string;
  duration: string;
  difficulty: '초급' | '중급' | '고급';
  screenCaption: string;
  promptFocus: string;
  aiRole: string;
  overviewSteps: string[];
  promptSteps: PromptStep[];
};

const implementPractices: ImplementPractice[] = [
  {
    id: 'impl-1',
    listTitle: '실습 1: 프로그램 폴더 뼈대 만들기',
    icon: '📁',
    duration: '약 45분',
    difficulty: '중급',
    screenCaption:
      'ChatGPT에 **질문 1번부터 순서대로** 보내고, 답을 **VS Code**에 새 파일로 붙여 넣어요. ChatGPT 창은 **이어서** 쓰면 앞 내용을 기억해 줘서 편해요.',
    promptFocus:
      '**1단계에서 쓴 글**은 **질문 1번**에만 길게 넣으면 됩니다. **새 채팅**이면 1단계 글을 다시 붙이고 "이걸로 파이썬 프로그램 만들 거야" 한 번 보낸 뒤 이어 가세요.',
    aiRole:
      'ChatGPT는 질문마다 답을 적어 줍니다. **파일 만들기·저장·실행**은 VS Code에서 직접 해요.',
    overviewSteps: [
      'VS Code에서 **빈 폴더**를 엽니다.',
      '아래 **질문 1번부터** ChatGPT에 순서대로 보냅니다.',
      '각 답을 VS Code에 옮긴 뒤 **다음 번호**로 넘어갑니다.',
      '마지막에 README대로 **설치·실행**을 해 봅니다.',
    ],
    promptSteps: [
      {
        n: 1,
        title: '어떤 파일이 필요한지 먼저 물어보기',
        lead:
          'ChatGPT가 우리 아이디어를 이해하게 해요. 아래 프롬프트를 ChatGPT에 넣기 전, 칸에 **1단계 실습에서 정리한 글**을 붙여 넣으세요. (길면 요약만 넣어도 됩니다.)',
        afterChat:
          '아직 파일을 많이 만들 필요 없어요. 폴더·파일 **목록**만 메모해 두고 **질문 2번**으로 가요.',
        prompt: `너는 중고등학생도 이해할 수 있게 말해 주는 Python 선생님이야.

아래는 우리가 **1단계 실습**에서 이미 정리한 **아이디어와 설명**이야. 이걸 바탕으로 **파이썬 3.11 이상**으로 돌아가는 **작은 프로그램**을 만들 거야.

--- 여기에 1단계에서 쓴 글 붙여넣기 ---
[아이디어 정리, 캔버스, 제안서 중에서 복사한 내용]
---

**지금은 코드를 쓰지 마.** 한국어로만 답해 줘.

1) 이 아이디어를 **한 문장**으로 요약
2) 만들 폴더와 파일 이름을 **나무 구조**처럼 그려 줘 (텍스트로)
3) 각 파일이 **무슨 일**을 하는지 **한 줄씩**만 설명`,
      },
      {
        n: 2,
        title: '필요한 도구 목록·업로드 제외 목록 받기',
        lead:
          '**같은 ChatGPT 대화**에서 이어서 보냅니다. (새 채팅이면: 1단계 글을 다시 붙이고 "이걸로 파이썬 프로그램 만들 거야" 한 번 보낸 뒤 이 프롬프트를 씁니다.)',
        afterChat:
          'VS Code 프로젝트 **맨 바깥**에 `requirements.txt`, `.gitignore`를 만들고 답 내용을 붙여 넣어 **저장**합니다.',
        prompt: `아까 말한 **그 프로그램** 그대로로, 아래 두 파일의 **전체 내용**만 보여 줘. 각각 따로 코드 상자로 구분해 줘.

1) requirements.txt — 필요한 파이썬 도구(라이브러리) 이름과 버전
2) .gitignore — 파이썬 프로젝트에서 보통 안 올리는 파일 목록

설명은 **두 줄 이내**로만.`,
      },
      {
        n: 3,
        title: '설치·실행 방법 글 (README) 받기',
        lead: '**같은 대화**에서 이어서 보냅니다.',
        afterChat:
          'VS Code에서 `README.md`를 만들고 받은 글을 통째로 붙여 넣습니다. 나중에 **실행 방법**은 여기만 보면 됩니다.',
        prompt: `같은 프로그램에 대해 **README.md 전체**를 써 줘.

꼭 넣을 내용:
- 이 프로그램이 뭔지 **한 줄** 설명
- 파이썬 3.11 이상 쓴다고 적기
- 가상환경 만드는 법 (예: python -m venv .venv)
- 가상환경 켜는 법 (Windows 한 줄, 맥/리눅스 한 줄)
- pip install -r requirements.txt
- 프로그램 실행하는 명령 (예: python -m src.main)

**한국어**로, 마크다운 형식으로.`,
      },
      {
        n: 4,
        title: '실제로 실행되는 메인 코드 받기',
        lead:
          '질문 2에서 나온 파일 이름이 `src/main.py`가 아니면, 프롬프트 안 경로를 그 이름으로 바꿔도 됩니다.',
        afterChat:
          'VS Code에서 `src` 폴더와 `main.py`(또는 답의 경로)를 만들고 코드를 붙여 넣어 **저장**합니다.',
        prompt: `같은 프로그램에서 **아주 작게만** 돌아가는 **시작 파일** 코드를 줘.

파일 경로: src/main.py

조건:
- 1단계 아이디어와 맞는 **간단한 동작** 하나만 (예: 화면에 한 줄 출력, 가짜 데이터 하나 처리)
- 중요한 줄에는 **한국어 주석**
- 변수 타입을 적는 **타입 힌트** 쓰기
- 필요하면 **argparse**로 옵션 하나만

**파일 전체**를 코드 상자 하나로.`,
      },
      {
        n: 5,
        title: '자동 점검용 테스트 코드 한 개 받기',
        lead:
          '프로그램이 맞게 도는지 **자동으로 확인**하는 코드를 받습니다.',
        afterChat:
          'VS Code에 `tests` 폴더와 답의 테스트 파일을 만든 뒤, 터미널에서 README나 안내대로 `pytest` 등을 쳐 봅니다.',
        prompt: `같은 프로그램에 **pytest 테스트**를 **한 파일만** 추가해 줘.

- src/main.py 안의 **함수나 동작** 하나를 테스트
- 파일은 tests/ 안에 두기
- **테스트 파일 전체**를 코드 상자로
- 테스트 안에 **한국어 주석** 한 줄

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
    screenCaption:
      '기능은 **하나씩만** 추가합니다. VS Code 코드를 **복사**해 ChatGPT에 넣고, 돌아온 코드로 파일을 **고칩니다**. **빨간 오류**가 나면 터미널 글을 **통째로** 복사해 질문 3번을 반복합니다.',
    promptFocus:
      '**질문 1번**으로 코드 이해를 맞춘 뒤 **질문 2번**으로 기능을 시킵니다. 오류는 **질문 3번**만 여러 번 써도 됩니다.',
    aiRole:
      'ChatGPT는 단계마다 짧게 답하도록 나눠 두었습니다. 긴 코드는 **질문 2번**에서 받습니다.',
    overviewSteps: [
      '추가할 기능을 **한 문장**으로 적어 둡니다.',
      '**질문 1 → 2**를 같은 ChatGPT 대화에 순서대로 보냅니다.',
      'VS Code에 반영한 뒤 **실행**해 봅니다.',
      '오류가 나면 **질문 3**에 터미널 글만 붙여 넣습니다.',
    ],
    promptSteps: [
      {
        n: 1,
        title: '지금 코드가 뭘 하는지 맞추기',
        lead:
          '**새 채팅**이면: 프롬프트 안에 **1단계 아이디어 요약**과 **VS Code 코드**를 넣습니다.',
        afterChat:
          'ChatGPT 답을 읽고 이해가 되면 **질문 2번**으로 넘어갑니다.',
        prompt: `너는 중고등학생도 이해시키는 Python 선생님이야. 내 프로젝트 상황을 맞추고 싶어.

--- 1단계 아이디어 요약 (한 단락) ---
[무슨 프로그램인지, 누가 쓰는지, 핵심 기능]
---

--- 지금 VS Code에 있는 코드 (복사해서 붙여넣기) ---
[파일 전체 또는 중요한 부분만]
---

**지금은 코드를 고치지 마.** 한국어로만 답해 줘.

1) 이 코드가 하는 일을 **초등학생에게 말하듯** 한 문장으로
2) 나중에 기능을 넣을 때 **손댈 파일 후보**를 **최대 2개**까지`,
      },
      {
        n: 2,
        title: '새 기능 만들어 달라고 하기',
        lead:
          '**같은 대화**에서 이어서 보냅니다. [내가 원하는 기능]만 본인 말로 바꿉니다.',
        afterChat:
          '답의 파일별 코드를 VS Code에 옮기고 **저장**한 뒤, 터미널에서 실행해 봅니다.',
        prompt: `같은 프로젝트야. 아래 기능을 **지금 구조 그대로** 살려서 만들어 줘.

만들 기능: [예: CSV 파일 경로를 입력받아서, 줄 개수랑 열 이름을 화면에 출력]

규칙:
- 먼저 **무엇을 어떻게 바꿀지** 3줄 이내로 설명
- 고치거나 새로 만든 파일은 **파일 경로 + 전체 코드** 형태로 (코드 상자)
- 사람이 읽기 쉬운 **한국어 오류 메시지**
- 가능하면 tests/ 아래에 **테스트 코드** 하나

한국어로 답해 줘.`,
      },
      {
        n: 3,
        title: '오류 났을 때 (같은 대화에 다시 보내기)',
        lead:
          '**빨간 오류**가 나면 터미널 글을 **전부 복사**해 아래 칸에 넣고, **같은 대화**에 보냅니다.',
        afterChat:
          '고쳐 준 파일을 VS Code에 반영하고 다시 실행합니다. 같은 오류면 **새 로그**로 질문 3을 반복합니다.',
        prompt: `같은 프로젝트야. VS Code 터미널에서 돌렸더니 아래처럼 오류가 났어.

이것만 답해 줘:
1) 원인 **한 줄** 요약
2) 고칠 **파일 경로**
3) 그 파일의 **고친 뒤 전체 코드** (코드 상자 하나)

오류 전체 내용:
\`\`\`
[여기에 터미널에 나온 글 전부 붙여넣기]
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
    <section className="py-24" style={{ background: 'oklch(0.97 0.004 240)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/workshop"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            1단계 아이디어 실습으로 돌아가기
          </Link>
        </div>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <Rocket className="w-4 h-4" /> 2단계 · 구현 실습 (ChatGPT → VS Code)
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            구현 실습 (ChatGPT + VS Code)
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            <BoldText text="**짧은 질문을 번호 순서대로** 보내면 따라 하기 쉬워요. 아래에서 **질문 카드를 펼쳐** 왼쪽 실습 순서와 오른쪽 **실습용 프롬프트**를 확인하세요. 1단계 글은 **실습 1의 질문 1번**에만 넣으면 됩니다." />
          </p>
        </div>

        <div className="space-y-4">
          {implementPractices.map((practice, i) => (
            <motion.div
              key={practice.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springSnappy, delay: i * 0.05 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
              style={{ boxShadow: '0 4px 12px -4px oklch(0.48 0.18 240 / 0.06)' }}
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
                    <div className="px-6 pb-6 border-t border-border pt-6 space-y-8">
                      <div className="rounded-xl border border-border bg-muted/30 p-4 sm:p-5 space-y-3 text-sm text-muted-foreground leading-relaxed">
                        <p>
                          <BoldText text={practice.screenCaption} />
                        </p>
                        <p>
                          <BoldText text={practice.promptFocus} />
                        </p>
                        <p className="text-xs sm:text-sm border-t border-border pt-3">
                          <span className="font-semibold text-foreground">역할: </span>
                          {practice.aiRole}
                        </p>
                      </div>

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

                      <div className="space-y-3">
                        {practice.promptSteps.map((step, si) => {
                          const subOpen = openSubStep[practice.id];
                          const isSubOpen = subOpen === si;
                          return (
                            <div
                              key={step.n}
                              className="rounded-xl border border-border bg-card overflow-hidden"
                              style={{ boxShadow: '0 2px 8px -4px oklch(0.48 0.18 240 / 0.08)' }}
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
                                    <div className="text-xs font-medium text-muted-foreground">질문 {step.n}</div>
                                    <div className="font-bold text-foreground text-sm sm:text-base leading-snug truncate sm:whitespace-normal">
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
                                        <div>
                                          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                            <Target className="w-4 h-4 text-primary shrink-0" /> 실습 순서
                                          </h4>
                                          <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="text-xs font-bold text-primary">1</span>
                                              </div>
                                              <p className="text-sm text-muted-foreground leading-relaxed">
                                                <BoldText text={step.lead} />
                                              </p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="text-xs font-bold text-primary">2</span>
                                              </div>
                                              <p className="text-sm text-muted-foreground leading-relaxed">
                                                <span className="font-medium text-foreground">VS Code에서: </span>
                                                <BoldText text={step.afterChat} />
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        <div>
                                          <div className="flex items-center justify-between mb-3 gap-2">
                                            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 min-w-0">
                                              <Code2 className="w-4 h-4 text-accent shrink-0" /> 실습용 프롬프트
                                            </h4>
                                            <CopyButton text={step.prompt} />
                                          </div>
                                          <HighlightedPrompt
                                            text={step.prompt}
                                            highlightKey={`${practice.id}-q${step.n}`}
                                            className="text-xs font-mono text-foreground whitespace-pre-wrap leading-relaxed bg-muted/50 rounded-xl p-4 overflow-auto max-h-52 border border-border"
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
            <BoldText text="1단계 글이 너무 길면 **요약본만** 질문 1번에 넣어도 됩니다. 보안 관련 위배되는 정보는 넣지 마세요." />
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
