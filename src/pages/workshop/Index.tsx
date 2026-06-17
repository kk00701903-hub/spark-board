import { Link } from 'react-router-dom';
import { ArrowRight, Download, FlaskConical, Lightbulb, Rocket } from 'lucide-react';
import { PageShell } from '@/pages/PageShell';

const steps = [
  {
    to: '/workshop/idea',
    step: '1',
    badge: '첫 단계',
    title: '아이디어 구체화',
    description: '커리큘럼 확인 후 페인포인트·Lean Canvas·제안서 실습',
    cta: '1단계 시작',
    icon: Lightbulb,
    iconClass: 'text-primary',
    iconBg: 'bg-primary/15',
    borderClass: 'border-primary/30 hover:border-primary/50',
    ctaClass: 'text-primary',
    highlight: true,
  },
  {
    to: '/workshop/setup',
    step: '준비',
    badge: '환경 설치',
    title: 'VS Code · Python',
    description: '가상환경·라이브러리(tkcalendar, openpyxl 등) 설치',
    cta: '준비 단계',
    icon: Download,
    iconClass: 'text-green-600',
    iconBg: 'bg-green-100',
    borderClass: 'border-border hover:border-green-400/60',
    ctaClass: 'text-green-600',
    highlight: false,
  },
  {
    to: '/workshop/example',
    step: '2',
    badge: '예제 따라하기',
    title: 'ChatGPT → VS Code',
    description: '엑셀 명단 자동 인쇄 예제로 전체 흐름 연습',
    cta: '2단계 시작',
    icon: FlaskConical,
    iconClass: 'text-blue-600',
    iconBg: 'bg-blue-100',
    borderClass: 'border-border hover:border-blue-400/60',
    ctaClass: 'text-blue-600',
    highlight: false,
  },
  {
    to: '/workshop/implement',
    step: '3',
    badge: '교육 후 개별',
    title: '내 아이디어 구현',
    description: '예제 흐름을 익힌 뒤 본인 아이디어로 직접 구현',
    cta: '3단계 안내',
    icon: Rocket,
    iconClass: 'text-accent',
    iconBg: 'bg-accent/15',
    borderClass: 'border-border hover:border-primary/40',
    ctaClass: 'text-primary',
    highlight: false,
  },
] as const;

export default function WorkshopPage() {
  return (
    <PageShell title="워크숍 · 실습 구성">
      <div
        className="flex-1 flex flex-col py-3 sm:py-4"
        style={{ background: 'oklch(0.97 0.004 240)' }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 w-full flex-1 flex flex-col">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3 shrink-0">
            <p className="text-sm text-muted-foreground leading-snug">
              <strong className="text-foreground">1단계</strong> 아이디어 구체화 →{' '}
              <strong className="text-foreground">준비</strong> 환경 설치 →{' '}
              <strong className="text-foreground">2단계</strong> 예제 따라하기 →{' '}
              <strong className="text-foreground">3단계</strong> 내 아이디어 구현
            </p>
            <Link
              to="/workshop/idea"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shrink-0 transition-all hover:opacity-90"
            >
              1단계 시작하기
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3 flex-1 auto-rows-fr min-h-0">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={[
                    'rounded-xl border bg-card p-3.5 sm:p-4 shadow-sm transition-all duration-200 hover:shadow-md group text-left flex flex-col h-full min-h-[8rem]',
                    item.highlight ? 'border-2 border-primary/30' : item.borderClass,
                  ].join(' ')}
                >
                  <div className="flex items-start gap-2.5 mb-2 shrink-0">
                    <div className={['w-8 h-8 rounded-lg flex items-center justify-center shrink-0', item.iconBg].join(' ')}>
                      <Icon className={['w-4 h-4', item.iconClass].join(' ')} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {item.step}
                        </span>
                        <span className="text-[10px] font-medium text-muted-foreground">{item.badge}</span>
                      </div>
                      <div className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-snug mt-0.5">
                        {item.title}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2 flex-1">
                    {item.description}
                  </p>
                  <span className={['text-xs font-semibold inline-flex items-center gap-1 mt-auto shrink-0', item.ctaClass].join(' ')}>
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
