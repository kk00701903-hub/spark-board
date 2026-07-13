import { useSearchParams } from 'react-router-dom';
import { PageShell } from '@/pages/PageShell';
import { ExampleHubSection } from '@/pages/workshop/ExampleHubSection';
import { parseExampleFocusStep } from '@/pages/workshop/examplePracticeData';

export default function ExamplePage() {
  const [searchParams] = useSearchParams();
  const focusStep = parseExampleFocusStep(searchParams.get('focus'));

  return (
    <PageShell
      title="2단계 · 예제 따라하기"
      subtitle="ChatGPT → VS Code · 약 75분"
    >
      <ExampleHubSection focusStep={focusStep} />
    </PageShell>
  );
}
