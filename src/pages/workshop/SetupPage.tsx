import { PageShell } from '@/pages/PageShell';
import { SetupSection } from '@/pages/workshop/SetupSection';

export default function SetupPage() {
  return (
    <PageShell title="준비 단계 · VS Code · Python 설치">
      <SetupSection />
    </PageShell>
  );
}
