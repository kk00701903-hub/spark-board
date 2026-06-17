import { useSearchParams } from 'react-router-dom';
import { PageShell } from '@/pages/PageShell';
import { ExampleHubSection } from '@/pages/workshop/ExampleHubSection';
import { parseExampleFocusStep } from '@/pages/workshop/examplePracticeData';

export default function ExamplePage() {
  const [searchParams] = useSearchParams();
  const focusStep = parseExampleFocusStep(searchParams.get('focus'));

  return (
    <PageShell title="2단계 · 예제 따라하기 (ChatGPT → VS Code)">
      <ExampleHubSection focusStep={focusStep} />
    </PageShell>
  );
}
