import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageShell } from '@/pages/PageShell';
import { ExampleHubSection } from '@/pages/workshop/ExampleHubSection';

export default function ExamplePage() {
  return (
    <PageShell title="2단계 · 예제 따라하기 (ChatGPT → VS Code)">
      <ExampleHubSection />
    </PageShell>
  );
}
