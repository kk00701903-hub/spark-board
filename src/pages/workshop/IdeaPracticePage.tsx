import { PageShell } from '@/pages/PageShell';
import { PracticeGuideSection } from '@/pages/home/sections/PracticeGuideSection';

export default function IdeaPracticePage() {
  return (
    <PageShell
      stepLabel="STEP 1."
      title="아이디어 구체화"
      subtitle="회사 맥락·ChatGPT 질의응답으로 제출 양식 문안까지 완성 · 약 60분"
    >
      <PracticeGuideSection />
    </PageShell>
  );
}
