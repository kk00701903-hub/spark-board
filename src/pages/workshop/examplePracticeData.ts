import {
  EX1_Q1_ANSWER, EX1_Q2_ANSWER, EX1_Q3_ANSWER, EX1_Q4_ANSWER, EX1_Q5_ANSWER,
  EX2_Q1_ANSWER, EX2_Q2_ANSWER, EX2_Q3_ANSWER,
} from '@/pages/workshop/exampleAnswers';

export type PromptStep = {
  n: number;
  title: string;
  lead: string;
  vsCodeSteps: string[];
  tip?: string;
  prompt: string;
  answer: string;
  conditionReasons?: { condition: string; reason: string }[];
};

export type OverviewStep = {
  action: string;
  reason: string;
};

export type ExamplePractice = {
  id: string;
  listTitle: string;
  icon: string;
  duration: string;
  summary: string;
  warning: string;
  overviewSteps: OverviewStep[];
  promptSteps: PromptStep[];
};

export const EXAMPLE_ROUTES = {
  hub: '/workshop/example',
  ex1: '/workshop/example/ex-1',
  ex2: '/workshop/example/ex-2',
  quiz: '/workshop/example/quiz',
} as const;

export type ExampleFocusStep = 'ex-1' | 'ex-2' | 'quiz';

export function exampleHubPath(focus: ExampleFocusStep = 'ex-1'): string {
  if (focus === 'ex-1') return EXAMPLE_ROUTES.hub;
  return `${EXAMPLE_ROUTES.hub}?focus=${focus}`;
}

export function parseExampleFocusStep(value: string | null): ExampleFocusStep {
  if (value === 'ex-2' || value === 'quiz') return value;
  return 'ex-1';
}

export const examplePractices: ExamplePractice[] = [
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

export const examplePracticeById = Object.fromEntries(examplePractices.map((p) => [p.id, p])) as Record<string, ExamplePractice>;
export const examplePractice1 = examplePractices[0];
export const examplePractice2 = examplePractices[1];
