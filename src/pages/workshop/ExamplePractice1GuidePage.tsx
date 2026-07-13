import { PageShell } from '@/pages/PageShell';
import { ExamplePracticeGuideSection } from '@/pages/workshop/ExamplePracticeGuideSection';
import {
  EXAMPLE_ROUTES,
  exampleHubPath,
  examplePractice1,
} from '@/pages/workshop/examplePracticeData';

export default function ExamplePractice1GuidePage() {
  return (
    <PageShell
      title="예제 실습 1 · 실습 내용"
      subtitle="무엇을 왜 이 순서로 하는지 먼저 읽어 보세요"
    >
      <ExamplePracticeGuideSection
        practice={examplePractice1}
        practiceNumber={1}
        practiceTo={EXAMPLE_ROUTES.ex1}
        hubTo={exampleHubPath('ex-1')}
      />
    </PageShell>
  );
}
