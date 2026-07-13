import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Download, FlaskConical, Lightbulb, Rocket } from 'lucide-react';
import { PageShell } from '@/pages/PageShell';

const steps = [
  {
    to: '/workshop/idea',
    step: '1',
    badge: '첫 단계',
    title: '아이디어 구체화',
    duration: '약 60분',
    summary: '교육 목표를 확인하고, 내 아이디어를 문서로 정리합니다.',
    details: ['교육 커리큘럼 확인', '페인포인트·해결책 정리', 'Lean Canvas 작성', '1페이지 제안서 완성'],
    cta: '1단계 시작',
    icon: Lightbulb,
    highlight: true,
  },
  {
    to: '/workshop/setup',
    step: '준비',
    badge: '환경 설치',
    title: 'VS Code · Python',
    duration: '약 30분',
    summary: '2단계 예제를 실행할 개발 환경을 한 번에 맞춥니다.',
    details: ['VS Code·Python 설치', '가상환경(.venv) 만들기', 'pip로 라이브러리 설치', 'tkcalendar·openpyxl 포함'],
    cta: '준비 단계',
    icon: Download,
    highlight: false,
  },
  {
    to: '/workshop/example',
    step: '2',
    badge: '예제 따라하기',
    title: 'ChatGPT → VS Code',
    duration: '약 75분',
    summary: '엑셀 명단 자동 인쇄 예제로 AI와 코딩 흐름을 처음부터 익힙니다.',
    details: ['예제 실습 1: 프로그램 뼈대', '예제 실습 2: 기능·오류 수정', '5문제 이해도 확인', 'ChatGPT → VS Code 반복 연습'],
    cta: '2단계 시작',
    icon: FlaskConical,
    highlight: false,
  },
  {
    to: '/workshop/implement',
    step: '3',
    badge: '교육 후 개별',
    title: '내 아이디어 구현',
    duration: '각자 진행',
    summary: '2단계에서 배운 흐름으로 1단계에서 정리한 아이디어를 직접 만듭니다.',
    details: ['1단계 제안서 활용', '예제와 같은 질문 순서', '기능 하나씩 추가·수정', '수업 후 개인 시간에 진행'],
    cta: '3단계 안내',
    icon: Rocket,
    highlight: false,
  },
] as const;

export default function WorkshopPage() {
  return (
    <PageShell
      title="실습 구성"
      subtitle="1단계 → 준비 → 2단계 → 3단계 순서로 진행합니다."
    >
      <div className="flex-1 flex flex-col items-center justify-center edu-section px-3 sm:px-4">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-6">
            <Link
              to="/workshop/idea"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-all hover:opacity-90"
            >
              1단계 시작하기
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={[
                    'edu-card p-4 transition-all duration-200 hover:shadow-md group text-left block',
                    item.highlight
                      ? 'border-2 border-primary/40 ring-1 ring-primary/15'
                      : 'hover:border-primary/30',
                  ].join(' ')}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-primary/10">
                      <Icon className="w-[18px] h-[18px] text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {item.step}
                        </span>
                        <span className="text-[10px] font-medium text-muted-foreground">{item.badge}</span>
                        <span className="text-[10px] text-muted-foreground inline-flex items-center gap-0.5 ml-auto">
                          <Clock className="w-3 h-3 shrink-0" />
                          {item.duration}
                        </span>
                      </div>
                      <div className="font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
                    {item.summary}
                  </p>

                  <ul className="space-y-1 mb-3">
                    {item.details.map((detail) => (
                      <li
                        key={detail}
                        className="text-xs text-foreground/80 leading-snug flex items-start gap-1.5"
                      >
                        <span className="text-primary font-bold shrink-0 mt-px">·</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="text-xs font-semibold inline-flex items-center gap-1 text-primary">
                    {item.cta}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
