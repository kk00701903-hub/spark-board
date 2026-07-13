import { PageShell } from '@/pages/PageShell';
import { ExampleQuizGuideSection } from '@/pages/workshop/ExampleQuizGuideSection';

export default function ExampleQuizGuidePage() {
  return (
    <PageShell
      title="이해도 확인 · 실습 내용"
      subtitle="퀴즈에서 무엇을 확인하는지 먼저 읽어 보세요"
    >
      <ExampleQuizGuideSection />
    </PageShell>
  );
}
