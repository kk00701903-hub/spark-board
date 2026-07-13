import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Clock, ChevronUp, ChevronDown, Target, Code2, ArrowRight, FileText,
} from 'lucide-react';
import { springGentle, springSnappy } from '../animations';
import { EditablePrompt } from './EditablePrompt';

/** 별첨(제안서 제출 양식) 필드 · 최대 글자 수 */
const SUBMIT_FIELDS = [
  { label: '제안 배경', required: true, max: 1000, icon: '✨' },
  { label: 'AI 활용 시나리오', required: true, max: 1000, icon: '🤖' },
  { label: '활용 데이터', required: false, max: 1000, icon: '📚' },
  { label: '관련 시스템', required: false, max: 500, icon: '🔗' },
  { label: '기대 효과', required: true, max: 1000, icon: '📝' },
] as const;

const practices = [
  {
    title: '실습 1: 내 페인포인트 찾기',
    icon: '🔍',
    duration: '15분',
    difficulty: '초급',
    steps: [
      '업무 중 하루에 30분 이상 반복하는 작업 3가지를 떠올립니다',
      '아래 프롬프트에서 [직무명]·[업무 설명]을 본인 상황에 맞게 바꾼 뒤 ChatGPT에 붙여넣습니다',
      '제안된 아이디어 중 가장 현실적인 것 1가지를 선택합니다',
      '선택한 아이디어의 기대 효과를 정량적으로 적어 둡니다 (예: 주 X시간 절감) — 실습 3에서 씁니다',
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
      '완성된 Canvas는 실습 3(제출 양식 채우기)의 재료로 씁니다',
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
    title: '실습 3: 제출 양식용 최종 문안 만들기',
    icon: '📝',
    duration: '25분',
    difficulty: '중급',
    steps: [
      '실습 1·2와 같은 ChatGPT 창에서 이어서 진행합니다',
      '아래 프롬프트에서 **기본 정보**와 **관련 시스템**(알고 있으면)만 노란 칸에 입력합니다',
      'ChatGPT가 별첨 제출 양식 5개 항목을 **글자 수 제한 안**으로 작성해 줍니다',
      '각 항목 본문만 복사해 제출 화면(제안 배경 · AI 활용 시나리오 · 활용 데이터 · 관련 시스템 · 기대 효과)에 붙여넣습니다',
    ],
    prompt: `같은 대화에서 앞서 정리한 아이디어·Lean Canvas를 반영해서, **사내 AI 아이디어 제안 제출 양식에 그대로 붙여넣을 문안**을 작성해 줘.

내가 입력한 내용만 참고하고, 나머지는 합리적으로 채워 줘. 문체는 격식 있는 한국어(합니다/입니다 체)로 통일해 줘.

**기본 정보** (내가 입력)
- 제출자: [이름]
- 부서: [부서명]
- 아이디어 한 줄 요약: [한 줄 요약]

**관련 시스템** (내가 입력 · 모르면 "없음"이라고 적기)
- 연계·연동이 필요한 시스템: [시스템 목록]

---

## 출력 규칙 (매우 중요)
1. 아래 **5개 항목만** 출력한다. 서론·맺음말·표·번호 목록은 넣지 않는다.
2. 각 항목은 다음 형식을 **그대로** 지킨다.

【항목명】
(본문만 — 제출 양식 입력칸에 그대로 붙여넣을 텍스트)

3. **글자 수 제한(공백 포함)을 절대 초과하지 말 것.** 항목마다 본문 끝에 ← N자 / 최대 M자 를 한 줄로 표시한다.
4. 필수 항목은 구체적 사례·수치를 포함하고, 선택 항목은 내용이 없으면 "해당 없음"과 짧은 이유를 쓴다.

---

## 작성할 5개 항목

【제안 배경】
- 필수 · 최대 1000자
- 현재 어떤 문제·불편함이 있어 이 아이디어를 제안하는지 서술

【AI 활용 시나리오】
- 필수 · 최대 1000자
- AI가 어떤 방식으로 이 문제를 해결하는지 구체적으로 서술 (단계·도구 포함 가능)

【활용 데이터】
- 선택 · 최대 1000자
- 활용할 내부·외부 데이터. 없으면 "해당 없음"과 이유

【관련 시스템】
- 선택 · 최대 500자
- 연관 시스템·서비스. 내가 적은 시스템 정보를 반영. 없으면 "해당 없음"과 이유

【기대 효과】
- 필수 · 최대 1000자
- 가능하면 수치(시간·비용·오류율 등)로 표현

위 규칙을 지키며 5개 항목을 순서대로 출력해 줘.`,
  },
  {
    title: '실습 4: 구현 가능성 점검',
    icon: '⚙️',
    duration: '20분',
    difficulty: '고급',
    steps: [
      '실습 3에서 받은 5개 항목 문안 전체를 [제출 문안]에 붙여넣습니다',
      '항목별 점수·근거·개선 제안을 읽고, 가장 취약한 항목을 표시해 둡니다',
      '필요하면 ChatGPT에 "제안 배경을 800자 이내로 더 간결하게"처럼 다듬어 달라고 요청합니다',
      '최종 문안을 제출 양식 각 칸에 붙여넣고 글자 수가 제한 안인지 확인합니다',
    ],
    prompt: `다음은 사내 AI 아이디어 **제출 양식용 문안**(제안 배경 · AI 활용 시나리오 · 활용 데이터 · 관련 시스템 · 기대 효과)이야. 기술·운영 관점에서 구현 가능성을 검토해 줘.

---
[제출 문안]
---

아래 다섯 항목을 각각 1~5점(정수)으로 매기고, 항목마다 점수, 판단 근거(2~3문장), 개선 제안을 bullet로 적어 줘. 점수 의미는 항목마다 다르니 괄호 안 설명을 따져.

1. 기술 구현 난이도 — 1=매우 쉬움, 5=매우 어려움
2. 데이터 확보·품질 — 1=확보·정제 매우 어려움, 5=상대적으로 수월
3. 조직 도입·변경 관리 용이성 — 1=저항·프로세스 변경 큼, 5=상대적으로 수월
4. 비용 대비 효과(기대 ROI) — 1=낮음, 5=높음
5. 확장·재사용 가능성 — 1=낮음, 5=높음

마지막에 **종합 의견** 한 단락과 **우선 실행 과제 3가지**(짧게)를 한국어로 정리해 줘.
글자 수 초과가 의심되는 제출 항목이 있으면 어떤 항목을 줄여야 하는지도 알려 줘.`,
  },
];

export function PracticeGuideSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="practice" className="edu-section scroll-mt-16">
      <div className="edu-container">
        <div className="mb-6">
          <div className="edu-badge mb-3">
            <Brain className="w-4 h-4" /> 1단계 · 아이디어 구체화
          </div>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            ChatGPT로 아이디어를 다듬은 뒤, <strong className="text-foreground">실습 3</strong>에서
            제출 양식(별첨)에 그대로 붙여넣을 최종 문안을 만듭니다.
          </p>
        </div>

        <div className="mb-8 edu-card border-primary/25 bg-primary/5 px-5 py-4">
          <div className="flex items-start gap-3 mb-3">
            <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">최종 목표 · 제출 양식 5항목</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                실습 3 ChatGPT 답변의 각 【항목】 본문을 복사해 아래 칸에 붙여넣으세요. 글자 수 제한을 넘기면 제출이 막힐 수 있습니다.
              </p>
            </div>
          </div>
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
                    <div className="px-6 pb-6 border-t border-border pt-6">
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/workshop/setup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:opacity-90"
          >
            준비 단계: VS Code · Python 설치
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/workshop/example"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-sm transition-all duration-200 hover:border-primary/40"
          >
            2단계: 예제로 먼저 연습하기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
