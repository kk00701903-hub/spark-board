import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Download, FlaskConical, Lightbulb, Rocket } from 'lucide-react';
import { PageShell } from '@/pages/PageShell';

const steps = [
  {
    to: '/workshop/setup',
    step: '준비',
    badge: '환경 설치',
    title: 'VS Code · Python',
    duration: '약 30분',
    summary: '실습 전에 PC에 개발 환경을 한 번에 맞춥니다.',
    details: ['VS Code·Python 설치', '가상환경(.venv) 만들기', 'pip로 라이브러리 설치', 'tkcalendar·openpyxl 포함'],
    cta: '준비 단계',
    icon: Download,
    highlight: true,
  },
  {
    to: '/workshop/idea',
    step: 'STEP 1.',
    badge: '아이디어',
    title: '아이디어 구체화',
    duration: '약 60분',
    summary: '교육 목표를 확인하고, 내 아이디어를 문서로 정리합니다.',
    details: ['교육 커리큘럼 확인', '페인포인트·해결책 정리', 'Lean Canvas 작성', '제출 양식 문안 완성'],
    cta: 'STEP 1. 시작',
    icon: Lightbulb,
    highlight: false,
  },
  {
    to: '/workshop/example',
    step: 'STEP 2.',
    badge: '예제 따라하기',
    title: 'ChatGPT → VS Code',
    duration: '약 75분',
    summary: '엑셀 명단 자동 인쇄 예제로 AI와 코딩 흐름을 처음부터 익힙니다.',
    details: ['예제 실습 1: 프로그램 뼈대', '예제 실습 2: 기능·오류 수정', '5문제 이해도 확인', 'ChatGPT → VS Code 반복 연습'],
    cta: 'STEP 2. 시작',
    icon: FlaskConical,
    highlight: false,
  },
  {
    to: '/workshop/implement',
    step: 'STEP 3.',
    badge: '교육 후 개별',
    title: '내 아이디어 구현',
    duration: '각자 진행',
    summary: 'STEP 2.에서 배운 흐름으로 STEP 1.에서 정리한 아이디어를 직접 만듭니다.',
    details: ['STEP 1. 제안서 활용', '예제와 같은 질문 순서', '기능 하나씩 추가·수정', '수업 후 개인 시간에 진행'],
    cta: 'STEP 3. 안내',
    icon: Rocket,
    highlight: false,
  },
] as const;

export default function WorkshopPage() {
  return (
    <PageShell
      title="실습 구성"
      subtitle="준비 → STEP 1. → STEP 2. → STEP 3. 순서로 진행합니다."
    >
      <div className="flex-1 flex flex-col items-center justify-center edu-section px-4 sm:px-6">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={[
                    'edu-card p-6 sm:p-7 min-h-[260px] sm:min-h-[290px] flex flex-col transition-all duration-200 hover:shadow-md group text-left',
                    item.highlight
                      ? 'border-2 border-primary/40 ring-1 ring-primary/15'
                      : 'hover:border-primary/30',
                  ].join(' ')}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-bold uppercase tracking-wide px-2.5 py-1 rounded bg-muted text-muted-foreground">
                          {item.step}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">{item.badge}</span>
                        <span className="text-sm text-muted-foreground inline-flex items-center gap-1 ml-auto">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          {item.duration}
                        </span>
                      </div>
                      <div className="font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  <ul className="space-y-1.5 mb-5 flex-1">
                    {item.details.map((detail) => (
                      <li
                        key={detail}
                        className="text-sm text-foreground/80 leading-snug flex items-start gap-2"
                      >
                        <span className="text-primary font-bold shrink-0 mt-px">·</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="text-sm font-semibold inline-flex items-center gap-1.5 text-primary mt-auto">
                    {item.cta}
                    <ArrowRight className="w-4 h-4" />
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
