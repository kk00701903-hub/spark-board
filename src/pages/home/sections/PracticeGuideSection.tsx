import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Clock, ChevronUp, ChevronDown, Target, Code2, ArrowRight,
} from 'lucide-react';
import { springGentle, springSnappy } from '../animations';
import { EditablePrompt } from './EditablePrompt';

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
      '선택한 아이디어의 기대 효과를 정량적으로 작성해 봅니다 (예: 주 X시간 절감)',
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
      '최종 Canvas를 제안서 형식으로 정리합니다',
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
    title: '실습 3: AI 제안서 초안 자동 생성',
    icon: '📝',
    duration: '25분',
    difficulty: '중급',
    steps: [
      '완성된 Lean Canvas를 기반으로 제안서 생성 프롬프트를 입력합니다',
      '생성된 초안의 각 섹션을 검토하며 실제 수치와 데이터로 보완합니다',
      '제안서의 기대 효과를 정량적으로 구체화합니다 (예: "50% 시간 단축")',
      '최종 제안서를 내부 양식에 맞게 편집합니다',
    ],
    prompt: `아래 괄호 안 내용을 바탕으로 사내 AI 아이디어 제안서 초안을 작성해 줘. 문체는 격식 있는 한국어(합니다/입니다 체)로 통일하고, 빈 칸은 문맥에 맞게 보완해 줘. 각 섹션에 소제목과 글머리 기호를 사용해 줘.

**기본 정보**
- 제출자: [이름]
- 부서: [부서명]
- 제출일: [날짜]

**1. 제안 배경**
- 현 업무의 비효율 사례: [구체적인 현황]
- 페인포인트: [핵심 문제점]

**2. AI 활용 방안**
- 적용 기술·도구: [AI 기술 또는 도구]
- 해결 시나리오: [단계별로 3~5단계]

**3. 활용 데이터**
- 외부 데이터: [필요 시 명시, 없으면 "해당 없음" 가능]
- 내부 데이터: [문서·DB·로그 등]

**4. 기대 효과**
- 정량적 효과: [측정 가능한 지표·수치]
- 정성적 효과: [업무 환경·의사결정·역량 등]

**5. 관련 시스템**
- 연계·연동이 필요한 시스템: [목록]`,
  },
  {
    title: '실습 4: 구현 가능성 점검',
    icon: '⚙️',
    duration: '20분',
    difficulty: '고급',
    steps: [
      '실습용 프롬프트에서 [제안서 내용]을 실제 초안 텍스트로 바꿔 붙여넣습니다',
      '항목별 점수·근거·개선 제안을 읽고, 가장 취약한 항목을 표시해 둡니다',
      '같은 대화에서 "가장 기술적으로 어려운 부분과 완화 방안 3가지"처럼 꼬리 질문을 이어 갈 수 있습니다',
      '필요하면 "초기 구축·연간 운영 비용을 구간만 추정해 줘" 등으로 비용을 추가로 물어봅니다',
    ],
    prompt: `다음은 사내 AI 아이디어 제안서 초안이야. 기술·운영 관점에서 구현 가능성을 검토해 줘.

---
[제안서 내용]
---

아래 다섯 항목을 각각 1~5점(정수)으로 매기고, 항목마다 점수, 판단 근거(2~3문장), 개선 제안을 bullet로 적어 줘. 점수 의미는 항목마다 다르니 괄호 안 설명을 따져.

1. 기술 구현 난이도 — 1=매우 쉬움, 5=매우 어려움
2. 데이터 확보·품질 — 1=확보·정제 매우 어려움, 5=상대적으로 수월
3. 조직 도입·변경 관리 용이성 — 1=저항·프로세스 변경 큼, 5=상대적으로 수월
4. 비용 대비 효과(기대 ROI) — 1=낮음, 5=높음
5. 확장·재사용 가능성 — 1=낮음, 5=높음

마지막에 **종합 의견** 한 단락과 **우선 실행 과제 3가지**(짧게)를 한국어로 정리해 줘.`,
  },
];

export function PracticeGuideSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="practice" className="py-24" style={{ background: 'oklch(0.97 0.004 240)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <Brain className="w-4 h-4" /> 1단계 · 아이디어 구체화
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            아이디어 실습 (ChatGPT)
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            페인포인트부터 제안서·구현 검토까지, 복사해 바로 쓸 수 있는 프롬프트로 진행합니다.             이후{' '}
            <Link to="/workshop/implement" className="text-primary font-medium hover:underline">
              2단계 구현 실습
            </Link>
            에서 ChatGPT 프롬프트에 이 내용을 붙여 넣고, 받은 코드를 VS Code로 옮겨 보세요.
          </p>
        </div>

        <div className="space-y-4">
          {practices.map((practice, i) => (
            <motion.div
              key={practice.title}
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

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/workshop/setup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
          >
            준비 단계: VS Code · Python 설치
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/workshop/example"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
          >
            2단계: 예제로 먼저 연습하기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
