import { PageShell } from '@/pages/PageShell';
import { ExamplePracticeGuideSection } from '@/pages/workshop/ExamplePracticeGuideSection';
import {
  EXAMPLE_ROUTES,
  exampleHubPath,
  examplePractice2,
} from '@/pages/workshop/examplePracticeData';

export default function ExamplePractice2GuidePage() {
  return (
    <PageShell
      title="예제 실습 2 · 실습 내용"
      subtitle="무엇을 왜 이 순서로 하는지 먼저 읽어 보세요"
    >
      <ExamplePracticeGuideSection
        practice={examplePractice2}
        practiceNumber={2}
        practiceTo={EXAMPLE_ROUTES.ex2}
        hubTo={exampleHubPath('ex-2')}
      />
    </PageShell>
  );
}
