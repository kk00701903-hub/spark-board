import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Clock, ChevronUp, ChevronDown, Target, Code2, ArrowRight, MessageCircle,
} from 'lucide-react';
import { springGentle, springSnappy } from '../animations';
import { EditablePrompt } from './EditablePrompt';
import { CopyButton } from './CopyButton';

/** 별첨(제안서 제출 양식) 필드 · 최대 글자 수 */
const SUBMIT_FIELDS = [
  { label: '제안 배경', required: true, max: 1000, icon: '✨' },
  { label: 'AI 활용 시나리오', required: true, max: 1000, icon: '🤖' },
  { label: '활용 데이터', required: false, max: 1000, icon: '📚' },
  { label: '관련 시스템', required: false, max: 500, icon: '🔗' },
  { label: '기대 효과', required: true, max: 1000, icon: '📝' },
] as const;

const COMPANY_SYSTEM_PRESETS = [
  { id: 'sce', label: 'SCE (OMS, TMS, WMS 통합패키지)' },
  { id: 'distribution', label: '유통물류시스템 (유통물류 수주, 발주, 정산 시스템)' },
  { id: 'tpl', label: '3PL 시스템 (3PL 수주시스템)' },
  { id: 'gas', label: '주유소 시스템 (주유소관리 시스템)' },
] as const;

type CompanySystemId = (typeof COMPANY_SYSTEM_PRESETS)[number]['id'];

function buildSystemLine(
  selected: CompanySystemId[],
  otherChecked: boolean,
  otherName: string,
  otherRole: string,
): string {
  const parts: string[] = [];
  for (const id of selected) {
    const preset = COMPANY_SYSTEM_PRESETS.find((p) => p.id === id);
    if (preset) parts.push(preset.label);
  }
  if (otherChecked) {
    const name = otherName.trim();
    const role = otherRole.trim();
    if (name && role) parts.push(`${name} (${role})`);
    else if (name) parts.push(`${name} (역할 미입력)`);
    else if (role) parts.push(`기타시스템 (${role})`);
    else parts.push('기타시스템 (명칭·역할 미입력)');
  }
  if (parts.length === 0) {
    return '아직 선택 안 함 — 위에서 시스템을 골라 주세요';
  }
  return parts.join(', ');
}

function buildPractice3Prompt(systemLine: string): string {
  return `같은 대화에서 이어서, **내부 시스템·업무 맥락**을 알려줄게.
(나는 외부 라이브러리·AI 도구 이름은 잘 몰라. 그건 네가 제안해 줘.)
나중에 제출 양식 5항목을 쓸 때 이 정보를 반드시 반영해 줘.

**내가 알려주는 내용**
- 우리 회사 내부 시스템(내가 고른 것): ${systemLine}
- 내 부서: [내 부서명]
- 내가 주로 하는 일: [내가 주로 하는 일 한두 문장]
- 가장 오래 걸리거나 귀찮은 일: [가장 오래 걸리거나 귀찮은 일]
- 그 일과 연결된 내부 시스템 화면/메뉴(알면): [예: 수주 조회, 재고 화면 / 잘 모르면 모름]
- 데이터는 어디에 보이나: [예: 엑셀, 시스템 화면, 메일]
- 더 알려줄 말(선택): [더 알려줄 말]

---

## 요청
1. 실습 1~2에서 찾은 **문제**와 위 내부 시스템이 어떻게 이어지는지 **3~5문장**으로 정리해 줘.
2. 그 문제를 AI로 풀 때 쓸 수 있는 **외부 라이브러리·도구·기술**을 3개 추천해 줘.
   - 각 항목: 이름 / 쉬운 설명 한 줄 / 우리 내부 시스템과 어떻게 맞출지
   - 나는 전문가가 아니니 쉬운 말로.
3. 제출 양식 5항목을 잘 쓰기 위해 **쉬운 확인 질문 3~5개**만 번호로 물어봐 줘.
4. 내가 답하기 전에는 제출 문안(5항목)을 작성하지 마.

답변은 한국어로 작성해 줘.`;
}

function CompanySystemPicker({
  selected,
  otherChecked,
  otherName,
  otherRole,
  systemLine,
  onToggle,
  onOtherChecked,
  onOtherName,
  onOtherRole,
}: {
  selected: CompanySystemId[];
  otherChecked: boolean;
  otherName: string;
  otherRole: string;
  systemLine: string;
  onToggle: (id: CompanySystemId) => void;
  onOtherChecked: (checked: boolean) => void;
  onOtherName: (value: string) => void;
  onOtherRole: (value: string) => void;
}) {
  return (
    <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 sm:p-5 space-y-3">
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-0.5">우리 회사 시스템 고르기</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          해당하는 <strong className="text-foreground">내부 시스템</strong>을 모두 고르세요.
          고른 내용이 아래 프롬프트에 들어갑니다. 외부 라이브러리·도구 이름은 ChatGPT가 제안합니다.
        </p>
      </div>
      <div className="space-y-2">
        {COMPANY_SYSTEM_PRESETS.map((preset) => {
          const checked = selected.includes(preset.id);
          return (
            <label
              key={preset.id}
              className={[
                'flex items-start gap-2.5 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors',
                checked
                  ? 'border-primary/40 bg-card'
                  : 'border-border bg-card/70 hover:border-primary/25',
              ].join(' ')}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(preset.id)}
                className="mt-0.5 rounded border-border"
              />
              <span className="text-sm text-foreground leading-snug">{preset.label}</span>
            </label>
          );
        })}
        <label
          className={[
            'flex items-start gap-2.5 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors',
            otherChecked
              ? 'border-primary/40 bg-card'
              : 'border-border bg-card/70 hover:border-primary/25',
          ].join(' ')}
        >
          <input
            type="checkbox"
            checked={otherChecked}
            onChange={(e) => onOtherChecked(e.target.checked)}
            className="mt-0.5 rounded border-border"
          />
          <span className="text-sm text-foreground leading-snug font-medium">기타시스템</span>
        </label>
        {otherChecked ? (
          <div className="ml-6 grid sm:grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-medium text-muted-foreground mb-1 block">
                시스템 명칭
              </label>
              <input
                type="text"
                value={otherName}
                onChange={(e) => onOtherName(e.target.value)}
                placeholder="예: 그룹웨어"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-muted-foreground mb-1 block">
                역할 (무엇을 하는 시스템?)
              </label>
              <input
                type="text"
                value={otherRole}
                onChange={(e) => onOtherRole(e.target.value)}
                placeholder="예: 결재·공지 확인"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        ) : null}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed pt-1 border-t border-border/60">
        <span className="font-semibold text-foreground">선택 반영: </span>
        {systemLine}
      </p>
    </div>
  );
}

type Practice = {
  title: string;
  icon: string;
  duration: string;
  difficulty: string;
  steps: string[];
  prompt: string;
  /** ChatGPT에 이어서 물어볼 꼬리 질문 예시 */
  followUps?: string[];
};

const practices: Practice[] = [
  {
    title: '실습 1: 내 페인포인트 찾기',
    icon: '🔍',
    duration: '15분',
    difficulty: '초급',
    steps: [
      '문제가 뭔지 몰라도 됩니다. 매일·매주 반복하는 일을 떠올립니다',
      '노란 칸에 직무·하는 일만 짧게 적고 ChatGPT에 붙여넣습니다',
      'ChatGPT가 찾아 준 문제(페인포인트) 중 현실적인 것 1가지를 고릅니다',
      '고른 문제와 "주 X시간 줄이고 싶다" 정도만 메모해 실습 2로 갑니다',
    ],
    prompt: `나는 업무에서 **어떤 문제가 있는지 아직 잘 몰라.**
대신 내가 하는 일을 알려줄 테니, 그 안에서 AI로 줄일 수 있는 문제를 찾아 줘.

**내 상황**
- 직무/하는 일: [직무명]
- 평소에 반복하는 일: [업무 설명 — 예: 엑셀로 취합, 시스템에서 조회 후 복사, 메일로 확인 요청 등]
- 하루/일주일에 대략 쓰는 시간(알면): [예: 하루 1시간 / 잘 모르면 모름]

## 요청
1. 위 업무를 보고 **숨은 비효율·문제 후보 5가지**를 찾아 줘. (내가 문제로 인식 못해도 괜찮음)
2. 각 후보마다 아래를 적어 줘.
   - 문제 한 줄
   - 왜 시간/실수가 나는지 (쉬운 말)
   - AI로 어떻게 도울 수 있는지 (2~3문장)
   - 필요할 수 있는 **기술·도구 예시**(예: LLM, OCR, 자동화). 나는 라이브러리 이름을 잘 모르니 네가 골라 줘.
   - 예상 효과 (가능하면 주당 시간)
3. 마지막에 **가장 현실적인 문제 1개**를 추천하고, 고른 이유를 두 문장으로 적어 줘.
4. 지금은 Lean Canvas나 제출 문안은 쓰지 마.

답변은 한국어로 작성해 줘.`,
    followUps: [
      '추천해 준 문제 1개를 내 말로 다시 요약해 줘. 내가 실습 2에 그대로 붙여넣을 수 있게.',
      '그 문제와 관련해 내가 시스템에서 자주 누르는 화면/버튼이 있을 법한 것을 추측해 물어봐 줘.',
    ],
  },
  {
    title: '실습 2: 아이디어 Lean Canvas 작성',
    icon: '📋',
    duration: '20분',
    difficulty: '중급',
    steps: [
      '실습 1에서 고른 **문제 1개**를 노란 칸에 붙여넣습니다 (같은 ChatGPT 창)',
      'ChatGPT가 Lean Canvas를 만들면, 제출 5항목에 쓸 재료가 있는지 훑어봅니다',
      '부족한 칸만 짧게 물어보고 보완합니다',
      '완성된 Canvas는 실습 3(내부 시스템)·실습 4(제출 문안)의 재료로 씁니다',
    ],
    prompt: `같은 대화에서 이어서, 실습 1에서 찾은 문제를 바탕으로 Lean Canvas를 만들어 줘.
목표는 나중에 제출 양식 5항목(제안 배경·AI 활용 시나리오·활용 데이터·관련 시스템·기대 효과)을 쓰기 쉽게 만드는 거야.

배경 정보
- 고른 문제(아이디어): [아이디어 내용 — 실습 1에서 고른 문제]
- 적용 부서: [부서명]
- 지금 불편한 점: [현재 업무의 비효율 사항 — 짧게]

## 출력
마크다운 2열 표(항목 / 내용). 빈칸은 합리적으로 채우고, 근거가 약하면 (가정)이라고 표시해 줘.

| 항목 | 내용 |
|------|------|
| 서비스·솔루션 명칭 | |
| 해결하는 문제 (최대 3개) | |
| 타겟 사용자 | |
| 핵심 가치 제안 | |
| 핵심 기능 (3가지) | |
| 성공 지표(KPI) | |
| 필요 내부 시스템(추정) | |
| 필요 외부 기술·라이브러리(네가 제안) | |
| 예상 비용(대략 구간) | |
| 기대 효과(정량·정성) | |

추가 요청
1. 표 아래에 **제출 5항목에 바로 쓸 힌트**를 bullet 5개로 짧게 적어 줘. (항목명: 힌트)
2. 외부 기술·라이브러리는 내가 몰라도 되게 쉬운 말로 적고, 이름은 네가 골라 줘.
3. 제출 문안 본문은 아직 작성하지 마.

전체는 한국어로 작성해 줘.`,
    followUps: [
      '이 아이디어의 가장 큰 리스크 3가지만 짧게 알려 줘.',
      '「필요 외부 기술·라이브러리」를 초보자용으로 한 줄씩 다시 설명해 줘.',
    ],
  },
  {
    title: '실습 3: 회사 시스템·업무 프로세스 알려주기',
    icon: '🏢',
    duration: '15분',
    difficulty: '초급',
    steps: [
      '실습 1·2와 같은 ChatGPT 창에서 이어서 진행합니다',
      '위에서 **우리 회사 내부 시스템**을 고릅니다 (여러 개 가능, 없으면 기타)',
      '노란 칸에 부서·하는 일·귀찮은 일만 짧게 적고 보냅니다',
      'ChatGPT가 내부 시스템 연결 + 외부 도구 추천 + 쉬운 질문을 주면, 짧게 답한 뒤 실습 4로 갑니다',
    ],
    prompt: '',
    followUps: [
      '내부 시스템 이름만 써서 【관련 시스템】 초안 문장 2~3개를 짧게 잡아 줘.',
      '【활용 데이터】 후보를 bullet 3개만. 모르는 건 (확인 필요).',
      '네가 추천한 외부 라이브러리 중, 우리 내부 시스템과 가장 잘 맞는 것 1개만 이유와 함께 골라 줘.',
    ],
  },
  {
    title: '실습 4: 제출 양식용 최종 문안 만들기',
    icon: '📝',
    duration: '25분',
    difficulty: '중급',
    steps: [
      '실습 3 질문에 **짧게라도 답**을 같은 창에 이어 붙입니다',
      '아래 프롬프트로 제출 양식 5항목 초안을 받습니다 (글자 수 제한 준수)',
      '부족한 항목만 「이어서 물어볼 질문」으로 다듬고 5항목을 다시 받습니다',
      '각 【항목】 본문만 복사해 제출 칸에 붙여넣고 글자 수를 확인합니다',
    ],
    prompt: `같은 대화의 내용을 모두 반영해서,
**사내 AI 아이디어 제안 제출 양식에 그대로 붙여넣을 문안**을 작성해 줘.

반드시 반영할 것
- 실습 1에서 찾은 **문제(페인포인트)**
- 실습 2 Lean Canvas의 가치·기능·KPI·기대 효과
- 실습 3에서 내가 고른 **내부 시스템** 명칭과 역할
- 네가 제안한 **외부 라이브러리·기술**(사용자가 모를 수 있으니 시나리오에 자연스럽게 녹여 줄 것)
- 내가 이어서 답한 내용

모르는 부분은 대화 맥락으로 최소 가정만 하고, (가정)이라고 표시해 줘.
문체는 격식 있는 한국어(합니다/입니다 체)로 통일해 줘.

**기본 정보** (내가 입력)
- 제출자: [이름]
- 부서: [부서명]
- 아이디어 한 줄 요약: [한 줄 요약]

---

## 출력 규칙 (매우 중요)
1. 아래 **5개 항목만** 출력한다. 서론·맺음말·표·제출자 정보 블록은 넣지 않는다.
2. **반드시 아래 순서**로만 출력한다: 제안 배경 → AI 활용 시나리오 → 활용 데이터 → 관련 시스템 → 기대 효과
3. 각 항목은 다음 형식을 **그대로** 지킨다.

【항목명】
(본문만 — 제출 양식 입력칸에 그대로 붙여넣을 텍스트)

4. **글자 수 제한(공백 포함)을 절대 초과하지 말 것.** 항목마다 본문 끝에 ← N자 / 최대 M자 를 한 줄로 표시한다.
5. 항목별 작성 가이드
   - 【제안 배경】: 실습 1 문제 + 현재 업무 불편을 구체적으로
   - 【AI 활용 시나리오】: 누가/언제/어떤 **내부 시스템** 화면에서/어떤 AI·도구로 하는지 단계로
   - 【활용 데이터】: 내부 시스템·엑셀 등에서 쓰는 데이터 (없으면 해당 없음)
   - 【관련 시스템】: 내가 고른 **내부 시스템명** 위주, **최대 500자** (외부 라이브러리는 한 줄만)
   - 【기대 효과】: 가능하면 시간·오류 감소 등 수치
6. 필수 항목은 구체적 사례·수치를 포함하고, 선택 항목은 내용이 없으면 "해당 없음"과 짧은 이유를 쓴다.

---

## 작성할 5개 항목

【제안 배경】 필수 · 최대 1000자
【AI 활용 시나리오】 필수 · 최대 1000자
【활용 데이터】 선택 · 최대 1000자
【관련 시스템】 선택 · 최대 500자
【기대 효과】 필수 · 최대 1000자

위 규칙을 지키며 5개 항목을 순서대로 출력해 줘.`,
    followUps: [
      '【제안 배경】만 우리 내부 시스템·업무 용어를 더 넣고, 최대 1000자 안에서 다시 써 줘. 다른 항목은 출력하지 마.',
      '【AI 활용 시나리오】를 실제 업무 단계(누가/언제/어떤 내부 시스템) 순서로 다시 써 줘. 외부 도구 이름은 쉬운 말로. 최대 1000자.',
      '【관련 시스템】을 내가 말한 내부 시스템명 위주로 최대 500자 이내로 다시 정리해 줘.',
      '5개 항목 전체를 글자 수 제한에 맞게 한 번 더 출력해 줘. 초과한 항목만 줄여.',
      '기대 효과의 수치를 더 현실적으로 조정하고, 근거 한 문장을 추가해 줘. 【기대 효과】만 다시 출력해 줘.',
    ],
  },
  {
    title: '실습 5: 구현 가능성 점검',
    icon: '⚙️',
    duration: '20분',
    difficulty: '고급',
    steps: [
      '실습 4에서 받은 5개 항목 문안 전체를 [제출 문안]에 붙여넣습니다',
      '항목별 점수·근거·개선 제안을 읽고, 가장 취약한 항목을 표시해 둡니다',
      '필요하면 ChatGPT에 해당 항목만 다시 다듬어 달라고 요청합니다',
      '최종 문안을 제출 양식 각 칸에 붙여넣고 글자 수가 제한 안인지 확인합니다',
    ],
    prompt: `다음은 사내 AI 아이디어 **제출 양식용 문안**(제안 배경 · AI 활용 시나리오 · 활용 데이터 · 관련 시스템 · 기대 효과)이야. 기술·운영 관점에서 구현 가능성을 검토해 줘. 우리 회사 시스템·업무 프로세스 맥락도 함께 고려해 줘.

---
[제출 문안]
---

아래 다섯 항목을 각각 1~5점(정수)으로 매기고, 항목마다 점수, 판단 근거(2~3문장), 개선 제안을 bullet로 적어 줘.

1. 기술 구현 난이도 — 1=매우 쉬움, 5=매우 어려움
2. 데이터 확보·품질 — 1=확보·정제 매우 어려움, 5=상대적으로 수월
3. 조직 도입·변경 관리 용이성 — 1=저항·프로세스 변경 큼, 5=상대적으로 수월
4. 비용 대비 효과(기대 ROI) — 1=낮음, 5=높음
5. 기존 시스템·프로세스와의 정합성 — 1=충돌 큼, 5=잘 맞음

마지막에 **종합 의견** 한 단락과 **우선 실행 과제 3가지**(짧게)를 한국어로 정리해 줘.
글자 수 초과가 의심되는 제출 항목이 있으면 어떤 항목을 줄여야 하는지도 알려 줘.`,
    followUps: [
      '점수가 가장 낮은 항목을 개선한 문장으로, 해당 제출 양식 【항목】만 다시 작성해 줘 (글자 수 제한 준수).',
      '우리 기존 시스템과 충돌할 수 있는 부분을 3가지만 짧게 짚어 줘.',
    ],
  },
];

export function PracticeGuideSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedSystems, setSelectedSystems] = useState<CompanySystemId[]>([]);
  const [otherChecked, setOtherChecked] = useState(false);
  const [otherName, setOtherName] = useState('');
  const [otherRole, setOtherRole] = useState('');

  const systemLine = buildSystemLine(selectedSystems, otherChecked, otherName, otherRole);

  const toggleSystem = (id: CompanySystemId) => {
    setSelectedSystems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <section id="practice" className="edu-section scroll-mt-16">
      <div className="edu-container">
        <div className="mb-6">
          <div className="edu-badge mb-3">
            <Brain className="w-4 h-4" /> STEP 1. 아이디어 구체화
          </div>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            ChatGPT로 아이디어를 다듬은 뒤, 실습 3에서{' '}
            <strong className="text-foreground">AI Idea Spark 포인트 관리시스템</strong>에
            양식 그대로 붙여넣을 최종 문안을 만듭니다.
          </p>
        </div>

        <div className="mb-8 edu-card border-primary/25 bg-primary/5 px-5 py-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {SUBMIT_FIELDS.map((field) => (
              <div
                key={field.label}
                className="rounded-lg border border-border bg-card px-3 py-2.5"
              >
                <div className="text-sm leading-none mb-1.5">{field.icon}</div>
                <p className="text-xs font-semibold text-foreground leading-snug">
                  {field.label}
                  {field.required ? (
                    <span className="text-destructive ml-0.5">*</span>
                  ) : (
                    <span className="text-muted-foreground font-normal"> (선택)</span>
                  )}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">최대 {field.max.toLocaleString()}자</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {practices.map((practice, i) => (
            <motion.div
              key={practice.title}
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
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-primary/10"
                  >
                    {practice.icon}
                  </div>
                  <div className="min-w-0">
                    <div
                      className={[
                        'font-bold text-foreground leading-snug flex flex-wrap items-center gap-1.5',
                        openIndex === i ? 'text-lg sm:text-xl' : 'text-base',
                      ].join(' ')}
                    >
                      <span className="text-xs sm:text-sm shrink-0 text-muted-foreground font-extrabold tracking-wide">
                        {practice.title.match(/^실습\s*\d+/)?.[0] ?? `실습 ${i + 1}`}
                      </span>
                      <span>
                        {practice.title.replace(/^실습\s*\d+\s*[:：]\s*/, '')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {practice.duration}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${practice.difficulty === '초급' ? 'bg-green-100 text-green-700' : practice.difficulty === '중급' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {practice.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
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
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4 text-primary" /> 실습 순서
                            </h4>
                            <div className="space-y-2">
                              {practice.steps.map((step, si) => (
                                <div key={si} className="flex items-start gap-3">
                                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs font-bold text-primary">{si + 1}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          {i === 2 ? (
                            <CompanySystemPicker
                              selected={selectedSystems}
                              otherChecked={otherChecked}
                              otherName={otherName}
                              otherRole={otherRole}
                              systemLine={systemLine}
                              onToggle={toggleSystem}
                              onOtherChecked={setOtherChecked}
                              onOtherName={setOtherName}
                              onOtherRole={setOtherRole}
                            />
                          ) : null}
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                            <Code2 className="w-4 h-4 text-accent" /> 실습용 프롬프트
                          </h4>
                          <EditablePrompt
                            text={i === 2 ? buildPractice3Prompt(systemLine) : practice.prompt}
                            promptKey={practice.title}
                          />
                        </div>
                      </div>

                      {practice.followUps && practice.followUps.length > 0 && (
                        <div className="rounded-xl border border-border bg-muted/30 p-4 sm:p-5">
                          <h4 className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-primary shrink-0" />
                            ChatGPT에 이어서 물어볼 질문
                          </h4>
                          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                            같은 대화창에 복사해 붙여넣으며, 회사 맥락을 보강하고 제출 문안을 다듬으세요.
                          </p>
                          <div className="space-y-2">
                            {practice.followUps.map((q, qi) => (
                              <div
                                key={qi}
                                className="flex items-start gap-2 rounded-lg border border-border bg-card px-3 py-2.5"
                              >
                                <p className="flex-1 text-xs sm:text-sm text-foreground leading-relaxed min-w-0">
                                  {q}
                                </p>
                                <CopyButton text={q} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 edu-card p-6 sm:p-8 text-center">
          <div className="text-3xl mb-3">✅</div>
          <h3 className="text-lg font-bold text-foreground mb-2">
            STEP 1. 완료! 이제 STEP 2.로 넘어가세요.
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
            제출 양식 문안을 붙여넣었다면, 예제로 ChatGPT → VS Code 흐름을 연습해 보세요.
          </p>
          <Link
            to="/workshop/example"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:opacity-90"
          >
            STEP 2. 예제로 연습하기로 이동
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
