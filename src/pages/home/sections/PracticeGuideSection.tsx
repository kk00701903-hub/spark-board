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
      '업무 중 하루에 30분 이상 반복하는 작업 3가지를 떠올립니다',
      '아래 프롬프트에서 [직무명]·[업무 설명]을 본인 상황에 맞게 바꾼 뒤 ChatGPT에 붙여넣습니다',
      '제안된 아이디어 중 가장 현실적인 것 1가지를 선택합니다',
      '선택한 아이디어의 기대 효과를 정량적으로 적어 둡니다 (예: 주 X시간 절감)',
    ],
    prompt: `나는 [직무명]이야. 내가 매일 하는 업무는 [업무 설명]이야.

이 업무에서 AI를 활용해 시간을 절감하고 품질을 높일 수 있는 방법 5가지를 구체적으로 제안해 줘. 각 방법마다 아래 항목을 빠짐없이 적어 줘.
1. 활용 방법 (2~3문장)
2. 필요한 AI 도구 또는 기술 (예: LLM, 자동화, OCR 등)
3. 예상 시간 단축 효과 (가능하면 주당 시간·비율 등으로 표현)

답변은 한국어로 작성해 줘.`,
  },
  {
    title: '실습 2: 아이디어 Lean Canvas 작성',
    icon: '📋',
    duration: '20분',
    difficulty: '중급',
    steps: [
      '실습 1에서 선택한 아이디어를 기반으로 Lean Canvas 프롬프트를 입력합니다',
      'ChatGPT가 생성한 Canvas를 검토하며 부족한 부분을 보완 질문으로 채웁니다',
      '"이 아이디어의 가장 큰 리스크 3가지는?"로 약점을 확인합니다',
      '완성된 Canvas는 이후 실습(회사 맥락·제출 문안)의 재료로 씁니다',
    ],
    prompt: `아래 배경 정보를 반영해서 Lean Canvas를 마크다운 표로 완성해 줘. 표 안의 빈 칸은 합리적으로 채워 넣고, 근거가 약한 부분은 가정이라고 짧게 표시해 줘.

배경 정보
- 아이디어 개요: [아이디어 내용]
- 적용 부서: [부서명]
- 현재 문제(비효율): [현재 업무의 비효율 사항]

출력 형식: 아래 열 이름을 그대로 쓰는 2열 표(항목 / 내용).

| 항목 | 내용 |
|------|------|
| 서비스·솔루션 명칭 | |
| 해결하는 문제 (최대 3개) | |
| 타겟 사용자 | |
| 핵심 가치 제안 | |
| 핵심 기능 (3가지) | |
| 성공 지표(KPI) | |
| 필요 기술·시스템 | |
| 예상 비용(대략 구간) | |
| 기대 효과(정량·정성) | |

전체는 한국어로 작성해 줘.`,
  },
  {
    title: '실습 3: 회사 시스템·업무 프로세스 알려주기',
    icon: '🏢',
    duration: '15분',
    difficulty: '중급',
    steps: [
      '실습 1·2와 같은 ChatGPT 창에서 이어서 진행합니다',
      '아래 프롬프트의 노란 칸에 **우리 회사/부서의 실제 시스템·업무 프로세스**를 최대한 구체적으로 적습니다',
      'ChatGPT가 맥락을 요약하고, 제출 문안을 위해 확인할 질문 목록을 줍니다',
      '질문에 답하거나, 아래 「이어서 물어볼 질문」을 복사해 대화를 이어 갑니다',
    ],
    prompt: `같은 대화에서 이어서, **우리 회사(또는 우리 부서)의 실제 맥락**을 알려줄게.
이후 제출 양식 문안(제안 배경·AI 활용 시나리오·활용 데이터·관련 시스템·기대 효과)을 쓸 때 이 정보를 반드시 반영해 줘.

**회사·부서 맥락** (내가 입력)
- 사업·업무 영역: [예: 물류·유통, 영업지원, 재무 등]
- 내 부서·역할: [부서명 / 담당 역할]
- 주요 업무 프로세스: [누가 → 무엇을 → 어떤 순서로 하는지, 수작업 구간 포함]
- 현재 사용 시스템: [시스템명과 용도 — 예: ERP, WMS, 그룹웨어, 엑셀 공유폴더]
- 데이터·문서 흐름: [어디서 만들어져 어디로 가는지]
- 제약·주의사항: [보안, 승인, 권한, 수기 입력, 외부 연동 제한 등]
- 관련해서 더 알려줄 내용: [자유롭게]

---

## 요청
1. 위 맥락을 **짧게 요약**해 줘 (내가 맞게 말했는지 확인할 수 있게).
2. 제출 양식 5항목을 현실적으로 채우기 위해 **나에게 확인할 질문 5~7개**를 번호로 물어봐 줘.
3. 질문이 끝나면, 내가 답할 때까지 제출 문안은 아직 작성하지 마.

답변은 한국어로 작성해 줘.`,
    followUps: [
      '우리 프로세스에서 가장 시간이 오래 걸리는 구간을 다시 짚어 주고, 그 구간에 AI를 넣을 때 주의할 점을 알려 줘.',
      '관련 시스템끼리 데이터가 어떻게 오가는지 가정하지 말고, 내가 적은 내용만으로 연결도를 짧게 정리해 줘. 모르는 부분은 질문해 줘.',
      '보안·승인 때문에 AI가 직접 건드리면 안 되는 구간이 있으면 표시해 줘.',
      '활용 데이터와 관련 시스템 칸에 넣을 후보를 bullet로 정리해 줘. 확신이 낮은 항목은 (확인 필요)라고 표시해 줘.',
    ],
  },
  {
    title: '실습 4: 제출 양식용 최종 문안 만들기',
    icon: '📝',
    duration: '25분',
    difficulty: '중급',
    steps: [
      '실습 3에서 ChatGPT가 물은 질문에 **짧게라도 답**을 이어 붙입니다',
      '아래 프롬프트로 제출 양식 5항목 초안을 받습니다 (글자 수 제한 준수)',
      '부족한 항목은 「이어서 물어볼 질문」으로 다듬고, 다시 5항목만 재출력해 달라고 요청합니다',
      '각 【항목】 본문만 복사해 제출 화면 칸에 붙여넣고 글자 수를 확인합니다',
    ],
    prompt: `같은 대화의 아이디어·Lean Canvas·회사 시스템/업무 프로세스·내 추가 답변을 모두 반영해서,
**사내 AI 아이디어 제안 제출 양식에 그대로 붙여넣을 문안**을 작성해 줘.

내가 입력한 기본 정보도 참고하고, 모르는 부분은 앞서 대화 맥락으로 합리적으로 채우되 가정은 최소화해 줘.
문체는 격식 있는 한국어(합니다/입니다 체)로 통일해 줘.

**기본 정보** (내가 입력)
- 제출자: [이름]
- 부서: [부서명]
- 아이디어 한 줄 요약: [한 줄 요약]

---

## 출력 규칙 (매우 중요)
1. 아래 **5개 항목만** 출력한다. 서론·맺음말·표는 넣지 않는다.
2. 각 항목은 다음 형식을 **그대로** 지킨다.

【항목명】
(본문만 — 제출 양식 입력칸에 그대로 붙여넣을 텍스트)

3. **글자 수 제한(공백 포함)을 절대 초과하지 말 것.** 항목마다 본문 끝에 ← N자 / 최대 M자 를 한 줄로 표시한다.
4. 회사 시스템·업무 프로세스 설명이 반영되어야 한다.
5. 필수 항목은 구체적 사례·수치를 포함하고, 선택 항목은 내용이 없으면 "해당 없음"과 짧은 이유를 쓴다.

---

## 작성할 5개 항목

【제안 배경】 필수 · 최대 1000자
【AI 활용 시나리오】 필수 · 최대 1000자
【활용 데이터】 선택 · 최대 1000자
【관련 시스템】 선택 · 최대 500자
【기대 효과】 필수 · 최대 1000자

위 규칙을 지키며 5개 항목을 순서대로 출력해 줘.`,
    followUps: [
      '【제안 배경】만 우리 회사 프로세스 용어를 더 넣고, 최대 1000자 안에서 다시 써 줘. 다른 항목은 출력하지 마.',
      '【AI 활용 시나리오】를 실제 업무 단계(누가/언제/어떤 시스템) 순서로 다시 써 줘. 최대 1000자.',
      '【관련 시스템】을 내가 말한 시스템명만 써서 최대 500자 이내로 다시 정리해 줘.',
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

  return (
    <section id="practice" className="edu-section scroll-mt-16">
      <div className="edu-container">
        <div className="mb-6">
          <div className="edu-badge mb-3">
            <Brain className="w-4 h-4" /> <span className="edu-step text-xs">STEP 1.</span> 아이디어 구체화
          </div>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            페인포인트 → Lean Canvas → <strong className="text-foreground">회사 시스템·프로세스 설명</strong> →
            ChatGPT 질의응답으로 <strong className="text-foreground">제출 양식 최종 문안</strong>을 완성합니다.
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
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                    {practice.icon}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{practice.title}</div>
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

                        <div>
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                            <Code2 className="w-4 h-4 text-accent" /> 실습용 프롬프트
                          </h4>
                          <EditablePrompt
                            text={practice.prompt}
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
            <span className="edu-step text-sm">STEP 1.</span> 완료! 이제 <span className="edu-step text-sm">STEP 2.</span>로 넘어가세요.
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
