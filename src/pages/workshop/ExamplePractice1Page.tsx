import { PageShell } from '@/pages/PageShell';
import { ExamplePracticeDetail } from '@/pages/workshop/ExamplePracticeDetail';
import { EXAMPLE_ROUTES, exampleHubPath, examplePractice1 } from '@/pages/workshop/examplePracticeData';

export default function ExamplePractice1Page() {
  return (
    <PageShell title="예제 실습 1 · 엑셀 명단 자동 인쇄 프로그램">
      <ExamplePracticeDetail
        practice={examplePractice1}
        practiceNumber={1}
        prev={{ label: '2단계 개요', to: EXAMPLE_ROUTES.hub }}
        next={{ label: '예제 실습 2 안내', to: exampleHubPath('ex-2') }}
      />
    </PageShell>
  );
}
