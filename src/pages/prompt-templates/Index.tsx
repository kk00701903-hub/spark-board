import { PageShell } from '@/pages/PageShell';
import { PromptTemplatesSection } from '@/pages/home/sections/PromptTemplatesSection';

export default function PromptTemplatesPage() {
  return (
    <PageShell title="4가지 핵심 프롬프트 템플릿">
      <PromptTemplatesSection />
    </PageShell>
  );
}
