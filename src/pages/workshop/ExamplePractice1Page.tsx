import { PageShell } from '@/pages/PageShell';
import { ExamplePracticeDetail } from '@/pages/workshop/ExamplePracticeDetail';
import { EXAMPLE_ROUTES, exampleHubPath, examplePractice1 } from '@/pages/workshop/examplePracticeData';

export default function ExamplePractice1Page() {
  return (
    <PageShell
      title="예제 실습 1에 대해 단계별로 실습해보기"
      subtitle="엑셀 명단 자동 인쇄 프로그램 · ChatGPT → VS Code"
    >
      <ExamplePracticeDetail
        practice={examplePractice1}
        practiceNumber={1}
        guideTo={EXAMPLE_ROUTES.ex1Guide}
        prevTo={EXAMPLE_ROUTES.hub}
        nextTo={exampleHubPath('ex-2')}
      />
    </PageShell>
  );
}
