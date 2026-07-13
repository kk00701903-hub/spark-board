import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageShell } from '@/pages/PageShell';
import { PracticeGuideSection } from '@/pages/home/sections/PracticeGuideSection';

export default function IdeaPracticePage() {
  return (
    <PageShell
      title="1단계 · 아이디어 구체화"
      subtitle="ChatGPT로 제출 양식(제안 배경·AI 시나리오·데이터·시스템·기대 효과) 문안까지 완성 · 약 60분"
    >
      <div className="border-b border-border bg-background">
        <div className="edu-container py-4">
          <Link
            to="/workshop/curriculum"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            교육 커리큘럼으로 돌아가기
          </Link>
        </div>
      </div>
      <PracticeGuideSection />
    </PageShell>
  );
}
