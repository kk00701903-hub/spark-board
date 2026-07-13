import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ClipboardCheck, FlaskConical, Lightbulb, Wrench } from 'lucide-react';
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
    icon: '📁',
  },
  {
    id: 'ex-2' as const,
    number: 2,
    title: '예제 실습 2',
    subtitle: '기능 더하기 & 오류 고치기',
    description: '미리보기 기능을 추가하고, 오류가 나면 ChatGPT로 고치는 방법을 연습합니다.',
    to: EXAMPLE_ROUTES.ex2,
    icon: '🔧',
  },
  {
    id: 'quiz' as const,
    number: 3,
    title: '이해도 확인',
    subtitle: '5문제 퀴즈',
    description: '예제 실습 1·2를 마친 뒤, 오늘 배운 내용을 5문제로 간단히 점검합니다.',
    to: EXAMPLE_ROUTES.quiz,
    icon: '✅',
  },
];

const focusCta: Record<
  ExampleFocusStep,
  { to: string; label: string; icon: typeof Wrench }
> = {
  'ex-1': {
    to: EXAMPLE_ROUTES.ex1,
    label: '예제 실습 1 시작하기',
    icon: Wrench,
  },
  'ex-2': {
    to: EXAMPLE_ROUTES.ex2,
    label: '예제 실습 2 시작하기',
    icon: Wrench,
  },
  quiz: {
    to: EXAMPLE_ROUTES.quiz,
    label: '이해도 확인 시작하기',
    icon: ClipboardCheck,
  },
};

type ExampleHubSectionProps = {
  focusStep?: ExampleFocusStep;
};

export function ExampleHubSection({ focusStep = 'ex-1' }: ExampleHubSectionProps) {
  const cta = focusCta[focusStep];
  const CtaIcon = cta.icon;

  return (
    <section className="edu-section">
      <div className="edu-container">
        <div className="mb-6">
          <Link
            to="/workshop"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            워크숍 실습 구성으로 돌아가기
          </Link>
        </div>

        <div className="mb-8">
          <div className="edu-badge mb-3">
            <FlaskConical className="w-4 h-4" /> 2단계 · 예제 따라하기
          </div>
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

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {steps.map((step) => {
            const highlighted = step.id === focusStep;
            return (
              <Link
                key={step.to}
                to={step.to}
                className={[
                  'edu-card p-5 text-left transition-all duration-200 hover:shadow-md group',
                  highlighted
                    ? 'border-2 border-primary ring-2 ring-primary/20'
                    : 'hover:border-primary/30',
                ].join(' ')}
              >
                <div className="text-2xl mb-3">{step.icon}</div>
                <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1">
                  {highlighted ? (
                    <span className="text-primary">지금 시작 · {step.number}단계</span>
                  ) : (
                    <span>{step.number}단계</span>
                  )}
                </div>
                <div className="font-semibold text-foreground text-base mb-1 group-hover:text-primary transition-colors">
                  {step.title}
                </div>
                <p className="text-sm font-medium text-foreground/80 mb-2">{step.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.description}</p>
                <span className="text-sm font-semibold text-primary inline-flex items-center gap-1">
                  시작하기 <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to={cta.to}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:opacity-90"
          >
            <CtaIcon className="w-4 h-4" />
            {cta.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
            <ClipboardCheck className="w-3.5 h-3.5" />
            실습 1 → 실습 2 → 이해도 확인 순서로 진행하세요
          </p>
        </div>
      </div>
    </section>
  );
}
