import { PageShell } from '@/pages/PageShell';
import { SetupSection } from '@/pages/workshop/SetupSection';

export default function SetupPage() {
  return (
    <PageShell
      title="준비 단계"
      subtitle="VS Code · Python · 가상환경 설치 · 약 15~20분"
    >
      <SetupSection />
    </PageShell>
  );
}
