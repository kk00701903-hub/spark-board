import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageShell } from '@/pages/PageShell';
import { PracticeGuideSection } from '@/pages/home/sections/PracticeGuideSection';

export default function IdeaPracticePage() {
  return (
    <PageShell
      stepLabel="STEP 1."
      title="아이디어 구체화"
      subtitle="회사 맥락·ChatGPT 질의응답으로 제출 양식 문안까지 완성 · 약 60분"
    >
      <div className="border-b border-border bg-background">
        <div className="edu-container py-4">
          <Link
            to="/workshop/setup"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            준비 단계로 돌아가기
          </Link>
        </div>
      </div>
      <PracticeGuideSection />
    </PageShell>
  );
}
