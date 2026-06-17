import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageShell } from '@/pages/PageShell';
import { ExampleStep2Quiz } from '@/pages/workshop/ExampleStep2Quiz';
import { ExampleStepNav } from '@/pages/workshop/ExampleStepNav';
import { EXAMPLE_ROUTES } from '@/pages/workshop/examplePracticeData';

export default function ExampleQuizPage() {
  return (
    <PageShell title="예제 실습 이해도 확인">
      <section className="py-24" style={{ background: 'oklch(0.97 0.004 240)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to={EXAMPLE_ROUTES.hub}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              2단계 예제 따라하기 개요로 돌아가기
            </Link>
          </div>

          <ExampleStep2Quiz />

          <ExampleStepNav
            prev={{ label: '예제 실습 2', to: EXAMPLE_ROUTES.ex2 }}
          />
        </div>
      </section>
    </PageShell>
  );
}
