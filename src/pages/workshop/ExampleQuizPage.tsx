import { PageShell } from '@/pages/PageShell';
import { ExampleStep2Quiz } from '@/pages/workshop/ExampleStep2Quiz';
import { ExampleStepNav } from '@/pages/workshop/ExampleStepNav';
import { EXAMPLE_ROUTES } from '@/pages/workshop/examplePracticeData';

export default function ExampleQuizPage() {
  return (
    <PageShell
      title="이해도 확인"
      subtitle="예제 실습 1·2를 마친 뒤 5문제로 점검합니다."
    >
      <section className="edu-section">
        <div className="edu-container">
          <ExampleStep2Quiz />

          <ExampleStepNav
            prev={{ label: '예제 실습 2', to: EXAMPLE_ROUTES.ex2 }}
            next={{ label: 'STEP 3. 내 아이디어 구현으로 이동', to: '/workshop/implement' }}
          />
        </div>
      </section>
    </PageShell>
  );
}
