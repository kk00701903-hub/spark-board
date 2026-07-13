import { useSearchParams } from 'react-router-dom';
import { PageShell } from '@/pages/PageShell';
import { ExampleHubSection } from '@/pages/workshop/ExampleHubSection';
import { parseExampleFocusStep } from '@/pages/workshop/examplePracticeData';

export default function ExamplePage() {
  const [searchParams] = useSearchParams();
  const focusStep = parseExampleFocusStep(searchParams.get('focus'));

  return (
    <PageShell
      title="본격적인 예제를 실습하기 위한 3단계 과정"
      subtitle="ChatGPT → VS Code · 약 75분"
    >
      <ExampleHubSection focusStep={focusStep} />
    </PageShell>
  );
}
