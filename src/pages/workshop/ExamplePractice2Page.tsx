import { PageShell } from '@/pages/PageShell';
import { ExamplePracticeDetail } from '@/pages/workshop/ExamplePracticeDetail';
import { EXAMPLE_ROUTES, examplePractice2 } from '@/pages/workshop/examplePracticeData';

export default function ExamplePractice2Page() {
  return (
    <PageShell
      title="예제 실습 2"
      subtitle="기능 더하기 & 오류 고치기 · ChatGPT → VS Code"
    >
      <ExamplePracticeDetail
        practice={examplePractice2}
        practiceNumber={2}
        prevTo={EXAMPLE_ROUTES.ex1}
        nextTo={EXAMPLE_ROUTES.quiz}
      />
    </PageShell>
  );
}
