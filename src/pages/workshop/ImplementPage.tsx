import { PageShell } from '@/pages/PageShell';
import { ImplementPracticeSection } from '@/pages/workshop/ImplementPracticeSection';

export default function ImplementPage() {
  return (
    <PageShell
      stepLabel="STEP 3."
      title="내 아이디어 구현하기"
      subtitle="교육 후 개별 실습 · ChatGPT → VS Code"
    >
      <ImplementPracticeSection />
    </PageShell>
  );
}
