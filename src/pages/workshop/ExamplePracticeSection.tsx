import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Bot, ChevronDown, ChevronUp, Clock, Code2, FlaskConical, Lightbulb, AlertCircle, Target,
} from 'lucide-react';
import { springGentle, springSnappy } from '@/pages/home/animations';
import { EditablePrompt } from '@/pages/home/sections/EditablePrompt';
import { CopyButton } from '@/pages/home/sections/CopyButton';
import {
  EX1_Q1_ANSWER, EX1_Q2_ANSWER, EX1_Q3_ANSWER, EX1_Q4_ANSWER, EX1_Q5_ANSWER,
  EX2_Q1_ANSWER, EX2_Q2_ANSWER, EX2_Q3_ANSWER,
} from '@/pages/workshop/exampleAnswers';
import { ExampleExcelSamplePanel } from '@/pages/workshop/ExampleExcelSamplePanel';
import { ExampleStep2Quiz } from '@/pages/workshop/ExampleStep2Quiz';

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
  answer: string;
  conditionReasons?: { condition: string; reason: string }[];
};

function PromptConditionReasons({ items }: { items: { condition: string; reason: string }[] }) {
  return (
    <div className="mt-4 rounded-xl border border-purple-200 bg-purple-50/60 p-4">
      <h5 className="text-xs font-semibold text-purple-900 mb-3">프롬프트 조건 4가지 — 왜 넣었을까?</h5>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="text-xs leading-relaxed">
            <p className="font-medium text-foreground">{i + 1}. {item.condition}</p>
            <p className="text-muted-foreground mt-0.5 pl-3">
              <span className="text-purple-700 font-semibold">이유: </span>
              {item.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SampleAnswerPanel({ text, answerKey }: { text: string; answerKey: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border-2 border-green-200 bg-green-50/50 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-green-50 transition-colors"
      >
        <span className="text-sm font-semibold text-green-800 flex items-center gap-2">
          <Bot className="w-4 h-4 shrink-0" />
          AI 답변 (정답 예시)
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-green-600 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-green-600 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-green-200">
          <div className="flex items-center justify-between gap-2 mt-3 mb-2">
            <p className="text-xs text-green-700">
              ChatGPT 답이 아래와 비슷하면 정상이에요. 표현이 조금 달라도 괜찮습니다.
            </p>
            <CopyButton text={text} />
          </div>
          <pre
            id={answerKey}
            className="text-sm text-foreground whitespace-pre-wrap leading-relaxed bg-white rounded-lg p-4 overflow-auto max-h-96 border border-green-100 font-sans"
          >
            {text}
          </pre>
        </div>
      )}
    </div>
  );
}

type OverviewStep = {
  action: string;
  reason: string;
};

type ExamplePractice = {
  id: string;
  listTitle: string;
  icon: string;
  duration: string;
  summary: string;
  warning: string;
  overviewSteps: OverviewStep[];
  promptSteps: PromptStep[];
};

// ── 예제 데이터: 엑셀 명단 자동 인쇄 프로그램 ───────────────────────────────
const examplePractices: ExamplePractice[] = [
  {
    id: 'ex-1',
    listTitle: '예제 실습 1: 엑셀 명단 자동 인쇄 프로그램 뼈대 만들기',
    icon: '📁',
    duration: '약 45분',
    summary:
      '**D:\\example\\명단.xlsx** 파일을 읽어 날짜를 선택하면 파일 이름을 자동으로 바꾸고, 첫 번째 열 데이터를 HTML로 만들어 브라우저에서 인쇄하는 프로그램을 만듭니다. 프롬프트에 예제 내용이 이미 채워져 있으니 **"복사" 버튼**만 눌러 ChatGPT에 붙여 넣으면 됩니다.',
    warning:
      '⚠️ ChatGPT 창을 절대 닫지 마세요! 질문 1~5번은 모두 같은 창에서 이어서 보내야 합니다.',
    overviewSteps: [
      {
        action: '**예제 엑셀 파일 준비** — D:\\example 폴더를 만들고 명단.xlsx 저장',
        reason: '프로그램이 읽을 **실제 엑셀 파일**이 있어야 해요. 요리할 **재료를 먼저 준비**하는 것과 같습니다. (아래 질문 1 안내 참고)',
      },
      {
        action: '**VS Code에서 빈 폴더 열기** — 예: excel_printer',
        reason: '앞으로 만들 파일들을 **한곳에 모아 둘 작업 공간**이 필요해요. 여러 파일이 흩어지면 나중에 찾기 어렵습니다.',
      },
      {
        action: '**질문 1** — ChatGPT에 아이디어 소개 → 어떤 파일이 필요한지 목록 확인',
        reason: '바로 코드를 짜지 않고, **설계도(파일 목록)를 먼저** 받는 단계예요. 집을 지을 때 설계도 없이 벽부터 쌓지 않는 것과 같아요.',
      },
      {
        action: '**질문 2** — requirements.txt 받아서 VS Code에 저장',
        reason: '엑셀 읽기·달력 선택에 필요한 **도구 목록**이에요. 앱 설치 전에 "필요한 프로그램 리스트"를 적어 두는 것과 비슷합니다.',
      },
      {
        action: '**질문 3** — README.md 받아서 VS Code에 저장',
        reason: '**사용 설명서**예요. 며칠 뒤 "어떻게 실행하지?" 헷갈릴 때 이 파일만 보면 됩니다.',
      },
      {
        action: '**질문 4** — main.py 받아서 저장 → 프로그램 실행해 보기',
        reason: '지금까지 준비한 것을 합쳐 **실제로 동작하는 프로그램**을 만드는 단계예요. 날짜 선택 → 엑셀 처리 → 인쇄까지 한 번에 확인합니다.',
      },
      {
        action: '**질문 5** — 테스트 코드 받아서 pytest 설치 후 실행',
        reason: '프로그램이 **제대로 작동하는지 자동으로 점검**해요. pytest 는 테스트 도구이므로 **먼저 설치**한 뒤 실행합니다. 시험지를 내고 채점하는 것과 같아요.',
      },
    ],
    promptSteps: [
      {
        n: 1,
        title: '예제 파일 준비 안내 + 아이디어를 ChatGPT에 소개하기',
        lead: `ChatGPT에 보내기 전에 예제 엑셀 파일을 먼저 준비하세요.

1. 탐색기에서 **D:\\example** 폴더를 만듭니다.
2. 아래 **예제 엑셀 파일** 박스에서 **다운로드**하거나, **복사 → 엑셀 A1에 붙여넣기**로 명단을 만듭니다.
3. 파일을 **D:\\example\\명단.xlsx** 로 저장합니다.

준비가 끝나면 오른쪽 **"복사" 버튼**을 눌러 ChatGPT에 붙여 넣고 전송하세요.`,
        vsCodeSteps: [
          'ChatGPT가 폴더·파일 목록을 트리 구조로 보여 줄 거예요.',
          '지금은 파일을 만들지 않아도 됩니다. 목록만 확인하고 **질문 2번**으로 넘어가세요.',
        ],
        tip: '"코드를 쓰지 마"라고 지시하는 이유는, 구조부터 먼저 잡고 나서 파일을 하나씩 만들기 위해서예요.',
        prompt: `너는 중고등학생도 이해할 수 있게 말해 주는 파이썬 선생님이야.

아래는 우리가 만들 프로그램 아이디어야. 파이썬 3.11 이상 + Windows 환경에서 실행되는 GUI 프로그램을 만들 거야.

=== 아이디어 소개 ===
프로그램 이름: 엑셀 명단 자동 인쇄 프로그램
핵심 기능:
  1. tkinter GUI 창이 열린다
  2. 사용자가 달력에서 날짜를 선택한다 (tkcalendar 라이브러리 사용)
  3. "실행" 버튼을 누르면:
     a. D:\\example\\명단.xlsx 파일을 "명단_YYYYMMDD.xlsx" 형식으로 이름을 바꾼다
     b. 이름을 바꾼 엑셀 파일의 첫 번째 열(A열) 데이터를 읽는다
     c. HTML 파일을 생성한다
        - <title>: 바뀐 파일 이름(명단_YYYYMMDD)
        - <body>: A열 데이터를 목록(li)으로 표시
     d. 생성된 HTML 파일을 기본 브라우저로 열고 인쇄 대화상자를 자동으로 띄운다
사용 라이브러리: tkinter(내장), tkcalendar, openpyxl
===

지금은 코드를 작성하지 마. 한국어로만 답해 줘.

1) 이 아이디어를 한 문장으로 요약해 줘
2) 만들 폴더와 파일 이름을 나무 구조(트리)처럼 그려 줘
3) 각 파일이 어떤 역할을 하는지 한 줄씩 설명해 줘`,
        answer: EX1_Q1_ANSWER,
      },
      {
        n: 2,
        title: '필요한 도구 목록(requirements.txt) 받기',
        lead: '같은 ChatGPT 창에서 이어서 보냅니다. 프롬프트를 그대로 복사해서 전송하면 됩니다.',
        vsCodeSteps: [
          'VS Code 왼쪽 탐색기에서 "새 파일" 아이콘을 클릭합니다.',
          '파일 이름을 **requirements.txt** 로 입력하고 Enter 를 누릅니다.',
          'ChatGPT 답의 requirements.txt 내용을 복사해 붙여 넣고 **Ctrl+S** 로 저장합니다.',
          '터미널을 열고 **pip install -r requirements.txt** 를 입력해 라이브러리를 설치합니다.',
        ],
        tip: 'tkcalendar 설치 중 오류가 나면 터미널에 pip install tkcalendar 를 직접 입력해 보세요.',
        prompt: `방금 말한 엑셀 명단 자동 인쇄 프로그램 그대로, requirements.txt 전체 내용만 코드 상자로 보여 줘.

필요한 파이썬 라이브러리 이름과 버전 (tkcalendar, openpyxl, pytest 포함)

설명은 두 줄 이내로만 해 줘.`,
        answer: EX1_Q2_ANSWER,
      },
      {
        n: 3,
        title: '설치·실행 안내문(README.md) 받기',
        lead: '같은 ChatGPT 창에서 이어서 보냅니다.',
        vsCodeSteps: [
          'VS Code에서 "새 파일" → **README.md** 로 저장합니다.',
          'ChatGPT 답 전체를 복사해 붙여 넣고 **Ctrl+S** 로 저장합니다.',
          '나중에 실행 방법이나 파일 준비 방법이 헷갈리면 이 파일을 보면 됩니다.',
        ],
        tip: 'README 에 "D:\\example\\명단.xlsx 파일을 먼저 만들어야 한다"는 안내도 포함되어야 해요. 프롬프트에 이미 요청해 뒀으니 그대로 전송하면 됩니다.',
        prompt: `같은 엑셀 명단 자동 인쇄 프로그램의 README.md 전체를 한국어 마크다운 형식으로 써 줘.

반드시 넣어야 할 내용:
- 이 프로그램이 무엇인지 한 줄 설명
- 파이썬 3.11 이상, Windows 환경 필요 명시
- 사전 준비: D:\\example 폴더 만들기 → 명단.xlsx 파일 준비 방법 (A열에 이름 입력)
- 가상환경 만드는 법: python -m venv .venv
- 가상환경 활성화: Windows 한 줄
- pip install -r requirements.txt
- 프로그램 실행 명령어: python src/main.py`,
        answer: EX1_Q3_ANSWER,
      },
      {
        n: 4,
        title: 'GUI 메인 코드(main.py) 받고 실행해 보기',
        lead: '같은 ChatGPT 창에서 이어서 보냅니다. 코드를 받기 전에 D:\\example\\명단.xlsx 파일이 준비되어 있는지 다시 확인하세요.',
        vsCodeSteps: [
          'VS Code에서 **src 폴더**를 만듭니다 (탐색기에서 "새 폴더" 클릭).',
          'src 폴더 안에 **main.py** 파일을 만들고 코드를 붙여 넣은 뒤 **Ctrl+S** 로 저장합니다.',
          '터미널에서 **python src/main.py** 를 입력하고 Enter 를 눌러 실행합니다.',
          'GUI 창이 뜨면: 달력에서 날짜를 선택하고 **실행** 버튼을 클릭합니다.',
          'D:\\example\\ 폴더에 명단_YYYYMMDD.xlsx 파일이 생기고, 브라우저에서 인쇄 창이 열리면 성공!',
          '오류가 나면 예제 실습 2 질문 3번으로 이동하세요.',
        ],
        tip: '브라우저 인쇄 창이 자동으로 열리지 않으면 생성된 HTML 파일을 직접 열고 Ctrl+P 를 눌러도 됩니다.',
        prompt: `같은 엑셀 명단 자동 인쇄 프로그램의 메인 코드를 줘.

파일 경로: src/main.py

기능 요구사항:
1. tkinter 창 제목: "명단 자동 인쇄 프로그램"
2. tkcalendar DateEntry 위젯으로 날짜 선택 (기본값: 오늘)
3. "실행" 버튼을 누르면 아래 순서로 동작:
   a. D:\\example\\명단.xlsx 를 D:\\example\\명단_YYYYMMDD.xlsx 로 shutil.copy 로 복사 후 이름 변경
   b. openpyxl 로 이름 변경된 파일의 A열 전체(헤더 포함) 읽기
   c. 프로젝트 루트에 output.html 생성:
      - <title> 태그: 변경된 파일 이름(확장자 제외)
      - <h1>: 같은 파일 이름
      - <ul><li>: A열 데이터 한 줄씩
      - 인쇄 시 자동 실행 되도록 <script>window.onload = function(){{ window.print(); }}</script> 포함
   d. webbrowser.open() 으로 output.html 열기
4. 완료 시 tkinter messagebox 로 "완료! 브라우저에서 인쇄 창이 열립니다." 메시지 표시
5. 오류 발생 시 messagebox.showerror 로 오류 내용 표시

조건:
- 중요한 줄마다 한국어 주석
- 변수에 타입 힌트 사용
- 파일 전체를 코드 상자 하나로 보여 줘`,
        answer: EX1_Q4_ANSWER,
      },
      {
        n: 5,
        title: '테스트 코드 받고 pytest 실행해 보기',
        lead: '같은 ChatGPT 창에서 이어서 보냅니다. 테스트 코드는 GUI를 실행하지 않고, 파일 이름 변경 로직과 HTML 생성 로직만 자동으로 확인합니다.\n\npytest 가 아직 설치되지 않았다면, 아래 VS Code 단계에서 **pip install pytest** 를 먼저 실행하세요. (질문 2에서 requirements.txt 로 이미 설치했다면 생략해도 됩니다.)',
        vsCodeSteps: [
          'VS Code에서 **tests 폴더**를 만듭니다.',
          'ChatGPT가 알려 준 파일 이름으로 tests 폴더 안에 파일을 만들고 코드를 붙여 넣어 저장합니다.',
          '터미널 맨 앞에 **(.venv)** 가 보이는지 확인합니다. 없으면 가상환경 활성화 명령을 먼저 실행하세요.',
          'pytest 가 없다면 터미널에 **pip install pytest** 를 입력하고 Enter 를 눌러 설치합니다.',
          '설치가 끝나면 터미널에서 **pytest** 를 입력하고 Enter 를 눌러 테스트를 실행합니다.',
          '초록색 점(.) 이 나오면 성공! 빨간 F 가 나오면 예제 실습 2 질문 3번으로 오류를 고칩니다.',
        ],
        tip: '「pytest를 찾을 수 없습니다」 오류가 나오면 pip install pytest 를 실행하세요. 질문 2에서 pip install -r requirements.txt 를 했다면 pytest 는 이미 설치된 상태일 수 있어요.',
        prompt: `같은 엑셀 명단 자동 인쇄 프로그램에 pytest 테스트를 파일 하나만 추가해 줘.

테스트할 항목:
- 날짜(YYYYMMDD 문자열)를 받아 파일 이름을 만드는 함수 테스트 (예: "명단_20260616.xlsx" 형식 확인)
- A열 데이터 리스트를 받아 HTML 문자열을 만드는 함수 테스트 (<title>, <li> 포함 여부 확인)

조건:
- 파일은 tests/ 폴더 안에 두기
- GUI 관련 코드(tkinter)는 import 하지 않도록 함수를 분리해서 테스트
- 테스트 파일 전체를 코드 상자로 보여 줘
- 각 테스트 함수 위에 한국어 주석으로 무엇을 확인하는지 한 줄 적기

한국어로 답해 줘.`,
        answer: EX1_Q5_ANSWER,
        conditionReasons: [
          {
            condition: '파일은 tests/ 폴더 안에 두기',
            reason: '질문 1에서 정한 프로젝트 구조와 맞추고, pytest가 테스트 파일을 자동으로 찾기 쉬워요. main.py와 테스트를 분리해 폴더를 깔끔하게 유지합니다.',
          },
          {
            condition: 'GUI(tkinter)는 import 하지 않도록 함수를 분리해서 테스트',
            reason: '테스트할 때마다 창이 뜨면 자동 확인이 어렵고 시간도 오래 걸려요. 파일 이름·HTML 만드는 로직만 따로 테스트하면 빠르고 안정적으로 확인할 수 있습니다.',
          },
          {
            condition: '테스트 파일 전체를 코드 상자로 보여 줘',
            reason: 'ChatGPT 답을 통째로 복사해 VS Code에 붙여 넣기 쉽게 하려는 거예요. 일부만 주면 빠진 줄이 있어 실행이 안 될 수 있습니다.',
          },
          {
            condition: '각 테스트 함수 위에 한국어 주석으로 무엇을 확인하는지 한 줄',
            reason: '나중에도 "이 테스트가 뭘 검사하지?"를 바로 알 수 있게 해요. 오류가 났을 때 어느 부분을 고쳐야 하는지 찾기도 쉽습니다.',
          },
        ],
      },
    ],
  },
  {
    id: 'ex-2',
    listTitle: '예제 실습 2: 기능 더하기 & 오류 고치기',
    icon: '🔧',
    duration: '약 30분',
    summary:
      '예제 실습 1에서 만든 프로그램에 **미리보기 기능을 추가**합니다. "실행" 버튼을 누르기 전에 GUI 창 안에서 엑셀 A열 이름 목록을 미리 확인할 수 있게 됩니다. 이 흐름이 3단계에서 본인 아이디어를 만들 때도 똑같이 사용됩니다.',
    warning:
      '⚠️ 기능은 한 번에 하나씩만 추가하세요. 여러 개를 한꺼번에 요청하면 오류가 더 많아질 수 있어요.',
    overviewSteps: [
      {
        action: '**질문 1** — 지금 만든 코드를 ChatGPT에 보여 주고 이해 맞추기',
        reason: '기능을 추가하기 전에 ChatGPT가 **내 프로그램 상태를 파악**하게 해요. 의사에게 증상만 말하기 전에 현재 상태를 알려 주는 것과 같습니다.',
      },
      {
        action: '**질문 2** — "미리보기" 기능 추가 요청 → VS Code에 반영 후 실행',
        reason: '실행 버튼을 누르기 전에 **명단이 맞는지 먼저 확인**하는 기능이에요. 인쇄하기 전에 종이 내용을 한번 훑어보는 것과 같아요.',
      },
      {
        action: '**질문 3** — 오류가 나면 터미널 메시지를 ChatGPT에 보내기',
        reason: '프로그램은 처음에 오류가 나는 경우가 많아요. **빨간 글씨(오류 메시지)를 그대로 복사**해내면 ChatGPT가 원인과 수정 방법을 알려 줍니다.',
      },
      {
        action: '**완료 후** — 5문제 이해도 확인 → 3단계는 교육 종료 후 각자 진행',
        reason: '오늘 배운 내용을 **짧은 퀴즈**로 점검해요. 내 아이디어 구현(3단계)은 **수업이 끝난 뒤** 각자 시간에 도전합니다.',
      },
    ],
    promptSteps: [
      {
        n: 1,
        title: '현재 코드를 ChatGPT에 보여 주고 상황 파악하기',
        lead: '새 ChatGPT 창을 열거나 기존 대화에서 이어서 보냅니다. VS Code에서 **src/main.py 전체**를 복사해 아래 노란 칸에 붙여 넣으세요.',
        vsCodeSteps: [
          'ChatGPT 답을 읽고 코드 설명이 이해되는지 확인합니다.',
          '이해가 되면 **질문 2번**으로 넘어가 기능을 추가합니다.',
        ],
        tip: '이 질문은 ChatGPT가 내 코드를 이해하도록 하는 준비 단계예요. 아직 아무것도 바꾸지 않아도 됩니다.',
        prompt: `너는 중고등학생도 이해시키는 파이썬 선생님이야. 내 프로젝트 상황을 파악해 줘.

=== 프로그램 소개 ===
D:\\example\\명단.xlsx 를 읽어 날짜를 선택하면 파일 이름을 바꾸고,
첫 번째 열을 HTML로 만들어 브라우저에서 자동 인쇄하는 tkinter GUI 프로그램
===

=== 현재 VS Code 코드 ===
[src/main.py 전체 복사해서 붙여넣기]
===

지금은 코드를 수정하지 마. 한국어로만 답해 줘.

1) 이 코드가 하는 일을 초등학생에게 말하듯 한 문장으로 설명해 줘
2) 기능을 추가할 때 고쳐야 할 부분이 어디인지 최대 2곳만 알려 줘`,
        answer: EX2_Q1_ANSWER,
      },
      {
        n: 2,
        title: 'GUI에 "명단 미리보기" 리스트박스 추가하기',
        lead: '같은 ChatGPT 창에서 이어서 보냅니다. "실행" 버튼을 누르기 전에 GUI 안에서 명단 목록을 미리 확인할 수 있게 만듭니다.',
        vsCodeSteps: [
          'ChatGPT가 바꿀 파일과 전체 코드를 보여 줄 거예요.',
          'VS Code에서 src/main.py 를 열고 기존 내용을 **전부 지운 뒤** 새 코드를 붙여 넣습니다.',
          '**Ctrl+S** 로 저장하고 터미널에서 **python src/main.py** 로 실행합니다.',
          'GUI 창에 리스트박스가 보이고, "미리보기" 버튼을 누르면 명단이 표시되면 성공!',
          '오류가 나면 질문 3번으로 이동하세요.',
        ],
        tip: 'tkinter Listbox 위젯은 목록을 화면에 보여 주는 박스예요. 스크롤도 달 수 있어요.',
        prompt: `같은 엑셀 명단 자동 인쇄 프로그램이야. 아래 기능을 지금 코드 구조 그대로 살려서 추가해 줘.

추가할 기능:
- GUI 창 중앙에 tkinter Listbox(스크롤 포함)를 추가한다
- "미리보기" 버튼을 누르면 D:\\example\\명단.xlsx 의 A열 데이터를 Listbox에 표시한다
- "실행" 버튼은 기존 동작(파일 이름 변경 → HTML 생성 → 브라우저 인쇄) 유지

규칙:
- 먼저 무엇을 어떻게 바꿀지 3줄 이내로 설명해 줘
- 고치거나 새로 만든 파일은 "파일 경로 + 전체 코드" 형태로 코드 상자에 담아 줘
- 한국어 주석과 타입 힌트 유지

한국어로 답해 줘.`,
        answer: EX2_Q2_ANSWER,
      },
      {
        n: 3,
        title: '오류가 났을 때 → 원인과 수정 코드 받기',
        lead: '터미널에 빨간 오류가 나오면 당황하지 마세요! 오류 메시지를 **전체 선택 → 복사** 한 뒤 아래 노란 칸에 붙여 넣고 전송합니다.',
        vsCodeSteps: [
          'ChatGPT가 원인과 수정된 파일 코드를 알려 줄 거예요.',
          'VS Code에서 해당 파일을 열고 내용을 **전부 지운 뒤** 새 코드를 붙여 넣습니다.',
          '**Ctrl+S** 로 저장하고 다시 실행합니다.',
          '같은 오류가 반복되면 새 로그를 복사해 이 질문을 다시 보냅니다.',
        ],
        tip: '터미널 오류를 복사할 때 맨 마지막 "Traceback" 부분까지 포함해야 ChatGPT가 더 정확히 분석해요.',
        prompt: `같은 엑셀 명단 자동 인쇄 프로그램이야. 실행했더니 아래처럼 오류가 났어.

이것만 답해 줘:
1) 오류 원인을 한 줄로 요약
2) 고쳐야 할 파일 경로
3) 그 파일의 수정된 전체 코드를 코드 상자 하나에 담아 줘

오류 전체 내용:
\`\`\`
[여기에 터미널에 나온 오류 전체 붙여넣기]
\`\`\``,
        answer: EX2_Q3_ANSWER,
      },
    ],
  },
];

function difficultyBadge() {
  return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">예제 따라하기</span>;
}

export function ExamplePracticeSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [practicePhase, setPracticePhase] = useState<Record<string, 'overview' | 'questions'>>({
    'ex-1': 'overview',
    'ex-2': 'overview',
  });
  const [openSubStep, setOpenSubStep] = useState<Record<string, number | null>>({
    'ex-1': 0,
    'ex-2': 0,
  });
  const questionsRef = useRef<Record<string, HTMLDivElement | null>>({});

  const togglePractice = (index: number, practiceId: string) => {
    if (openIndex === index) {
      setOpenIndex(null);
      setPracticePhase((prev) => ({ ...prev, [practiceId]: 'overview' }));
    } else {
      setOpenIndex(index);
    }
  };

  const startQuestions = (practiceId: string) => {
    setPracticePhase((prev) => ({ ...prev, [practiceId]: 'questions' }));
    setOpenSubStep((prev) => ({ ...prev, [practiceId]: 0 }));
    requestAnimationFrame(() => {
      questionsRef.current[practiceId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const backToOverview = (practiceId: string) => {
    setPracticePhase((prev) => ({ ...prev, [practiceId]: 'overview' }));
  };

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
            워크숍 실습 구성으로 돌아가기
          </Link>
        </div>

        {/* 헤더 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <FlaskConical className="w-4 h-4" /> 2단계 · 예제 따라하기 (ChatGPT → VS Code)
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            예제로 먼저 연습해 봐요
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            <strong className="text-foreground">엑셀 명단 자동 인쇄 프로그램</strong> 예제를 함께 만들며<br className="hidden sm:block" />
            ChatGPT → VS Code 흐름을 처음부터 끝까지 경험합니다.
          </p>
        </div>

        {/* 흐름 배너 */}
        <div className="mb-10 rounded-2xl border border-border bg-card px-6 py-5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">진행 흐름</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {[
              { icon: '📋', label: '프롬프트 복사' },
              { icon: '💬', label: 'ChatGPT에 전송' },
              { icon: '📄', label: '답 코드 복사' },
              { icon: '💻', label: 'VS Code에 저장' },
              { icon: '▶️', label: '터미널에서 실행' },
            ].map((item, i, arr) => (
              <span key={i} className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted font-medium text-foreground">
                  <span>{item.icon}</span> {item.label}
                </span>
                {i < arr.length - 1 && <span className="text-muted-foreground font-bold">→</span>}
              </span>
            ))}
          </div>
        </div>

        {/* 예제 안내 박스 */}
        <div className="mb-8 rounded-2xl border-2 border-blue-200 bg-blue-50 px-6 py-5 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-800 mb-1">이 단계는 예제를 따라하는 연습이에요</p>
            <p className="text-sm text-blue-700 leading-relaxed">
              프롬프트에 <strong>예제 내용이 미리 채워져 있어요.</strong>{' '}
              노란 칸을 수정하지 않고 "복사" 버튼만 눌러서 ChatGPT에 전송하면 됩니다.
              단, <strong>질문 1번 전에 D:\example\명단.xlsx 파일을 먼저 준비하세요!</strong>{' '}
              예제 실습을 마친 뒤 <strong>5문제 퀴즈</strong>로 이해도를 확인하고, <strong>3단계</strong>는 교육 종료 후 각자 진행합니다.
            </p>
          </div>
        </div>

        {/* 실습 카드들 */}
        <div className="space-y-4">
          {examplePractices.map((practice, i) => (
            <motion.div
              key={practice.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springSnappy, delay: i * 0.05 }}
              className={[
                'rounded-2xl border-2 overflow-hidden',
                i === 0
                  ? 'bg-blue-50/60 border-blue-400 ring-2 ring-blue-200/80'
                  : 'bg-indigo-50/60 border-indigo-400 ring-2 ring-indigo-200/80',
              ].join(' ')}
              style={{ boxShadow: '0 8px 24px -8px oklch(0.48 0.18 240 / 0.18)' }}
            >
              <button
                type="button"
                onClick={() => togglePractice(i, practice.id)}
                className={[
                  'w-full flex items-center justify-between p-6 text-left transition-colors',
                  i === 0 ? 'hover:bg-blue-100/50' : 'hover:bg-indigo-100/50',
                ].join(' ')}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl shrink-0">
                    {practice.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={[
                        'text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full',
                        i === 0 ? 'bg-blue-200 text-blue-800' : 'bg-indigo-200 text-indigo-800',
                      ].join(' ')}>
                        예제 실습 {i + 1}
                      </span>
                    </div>
                    <div className="font-bold text-foreground">{practice.listTitle.replace(/^예제 실습 \d+: /, '')}</div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3 shrink-0" /> {practice.duration}
                      </span>
                      {difficultyBadge()}
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
                    <div className={[
                      'px-6 pb-6 border-t pt-6',
                      i === 0 ? 'border-blue-200/60' : 'border-indigo-200/60',
                    ].join(' ')}>
                      <AnimatePresence mode="wait">
                        {practicePhase[practice.id] === 'overview' ? (
                          <motion.div
                            key="overview"
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -12 }}
                            transition={springGentle}
                            className="space-y-6"
                          >
                            {/* 요약 + 경고 */}
                            <div className="space-y-3">
                              <div className="rounded-xl border border-border bg-white/70 p-4 sm:p-5 text-sm text-muted-foreground leading-relaxed">
                                <BoldText text={practice.summary} />
                              </div>
                              <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>{practice.warning}</span>
                              </div>
                            </div>

                            {/* 실습 전체 순서 */}
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                                <Target className="w-4 h-4 text-primary shrink-0" /> 이 실습 전체 순서
                              </h4>
                              <p className="text-xs text-muted-foreground mb-4">
                                무엇을 하는지와, <strong className="text-foreground">왜 이 순서인지</strong> 함께 읽어 보세요.
                                끝까지 읽은 뒤 아래 버튼을 누르면 <strong className="text-foreground">질문 1</strong>부터 실습합니다.
                              </p>
                              <div className="space-y-3">
                                {practice.overviewSteps.map((step, si) => (
                                  <div
                                    key={si}
                                    className="flex items-start gap-3 rounded-xl border border-border bg-white/70 px-4 py-3"
                                  >
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                      <span className="text-xs font-bold text-primary">{si + 1}</span>
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-sm text-foreground leading-relaxed font-medium">
                                        <BoldText text={step.action} />
                                      </p>
                                      <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                                        <span className="text-blue-600 font-semibold">왜? </span>
                                        <BoldText text={step.reason} />
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="pt-2 text-center">
                              <button
                                type="button"
                                onClick={() => startQuestions(practice.id)}
                                className={[
                                  'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]',
                                  i === 0
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-indigo-600 text-white',
                                ].join(' ')}
                              >
                                질문 1부터 실습 시작하기
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="questions"
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 12 }}
                            transition={springGentle}
                            className="space-y-4"
                            ref={(el) => { questionsRef.current[practice.id] = el; }}
                          >
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                              <button
                                type="button"
                                onClick={() => backToOverview(practice.id)}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <ArrowLeft className="w-4 h-4 shrink-0" />
                                실습 순서로 돌아가기
                              </button>
                              <span className="text-xs font-medium text-muted-foreground">
                                ChatGPT 질문 {practice.promptSteps.length}개 · 순서대로 진행하세요
                              </span>
                            </div>

                            {/* 질문 카드들 */}
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
                                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-sm font-bold text-blue-600">
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
                                          {practice.id === 'ex-1' && step.n === 1 && (
                                            <ExampleExcelSamplePanel />
                                          )}
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
                                            <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2.5">
                                              <Lightbulb className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                              <p className="text-xs text-blue-700 leading-relaxed">
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
                                            showSave={practice.id === 'ex-2' && (step.n === 1 || step.n === 3)}
                                          />
                                          {step.conditionReasons && (
                                            <PromptConditionReasons items={step.conditionReasons} />
                                          )}
                                        </div>
                                      </div>

                                      <div className="mt-6">
                                        <SampleAnswerPanel
                                          text={step.answer}
                                          answerKey={`${practice.id}-ans-${step.n}`}
                                        />
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <ExampleStep2Quiz />
      </div>
    </section>
  );
}
