import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ClipboardCheck, Lightbulb } from 'lucide-react';
import {
  EXAMPLE_ROUTES,
  type ExampleFocusStep,
} from '@/pages/workshop/examplePracticeData';

const steps = [
  {
    id: 'ex-1' as const,
    number: 1,
    title: '예제 실습 1',
    subtitle: '엑셀 명단 자동 인쇄 프로그램 뼈대 만들기',
    description: 'ChatGPT와 VS Code로 프로그램 뼈대를 처음부터 만듭니다. 질문 5개를 순서대로 진행해요.',
    to: EXAMPLE_ROUTES.ex1,
    guideTo: EXAMPLE_ROUTES.ex1Guide,
    icon: '📁',
  },
  {
    id: 'ex-2' as const,
    number: 2,
    title: '예제 실습 2',
    subtitle: '기능 더하기 & 오류 고치기',
    description: '미리보기 기능을 추가하고, 오류가 나면 ChatGPT로 고치는 방법을 연습합니다.',
    to: EXAMPLE_ROUTES.ex2,
    guideTo: EXAMPLE_ROUTES.ex2Guide,
    icon: '🔧',
  },
  {
    id: 'quiz' as const,
    number: 3,
    title: '이해도 확인',
    subtitle: '5문제 퀴즈',
    description: '예제 실습 1·2를 마친 뒤, 오늘 배운 내용을 5문제로 간단히 점검합니다.',
    to: EXAMPLE_ROUTES.quiz,
    guideTo: EXAMPLE_ROUTES.quizGuide,
    icon: '✅',
  },
];

type ExampleHubSectionProps = {
  focusStep?: ExampleFocusStep;
};

export function ExampleHubSection({ focusStep = 'ex-1' }: ExampleHubSectionProps) {
  return (
    <section className="edu-section">
      <div className="edu-container">
        <div className="mb-8">
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            <strong className="text-foreground">엑셀 명단 자동 인쇄 프로그램</strong> 예제를 함께 만들며
            ChatGPT → VS Code 흐름을 처음부터 끝까지 경험합니다.
          </p>
        </div>

        <div className="mb-6 edu-card px-5 py-4">
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

        <div className="mb-6 edu-card border-primary/25 bg-primary/5 px-5 py-4 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground mb-1">이 단계는 예제를 따라하는 연습이에요</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              프롬프트에 <strong className="text-foreground">예제 내용이 미리 채워져 있어요.</strong>{' '}
              노란 칸을 수정하지 않고 &quot;복사&quot; 버튼만 눌러서 ChatGPT에 전송하면 됩니다.
              단, <strong className="text-foreground">질문 1번 전에 D:\example\명단.xlsx 파일을 먼저 준비하세요!</strong>{' '}
              아래 순서대로 페이지를 이동하며 진행합니다.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-8">
          {steps.map((step) => {
            const highlighted = step.id === focusStep;
            return (
              <div
                key={step.to}
                className={[
                  'edu-card p-6 text-left flex flex-col',
                  highlighted
                    ? 'border-2 border-primary bg-primary/10 ring-2 ring-primary/20'
                    : '',
                ].join(' ')}
              >
                <div className="text-2xl mb-3">{step.icon}</div>
                <div className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-1">
                  {highlighted ? (
                    <span className="text-primary">지금 시작 · {step.number}단계</span>
                  ) : (
                    <span>{step.number}단계</span>
                  )}
                </div>
                <div className="font-semibold text-foreground text-lg mb-1">{step.title}</div>
                <p className="text-sm font-medium text-foreground/80 mb-2">{step.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{step.description}</p>
                <div className="space-y-2 mt-auto">
                  <Link
                    to={step.guideTo}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-card text-sm font-semibold text-foreground hover:border-primary/40 hover:bg-muted/40 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 shrink-0 text-primary" />
                    실습내용 상세히 보기
                  </Link>
                  <Link
                    to={step.to}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    시작하기
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
            <ClipboardCheck className="w-3.5 h-3.5" />
            실습 1 → 실습 2 → 이해도 확인 순서로 진행하세요
          </p>
        </div>
      </div>
    </section>
  );
}
