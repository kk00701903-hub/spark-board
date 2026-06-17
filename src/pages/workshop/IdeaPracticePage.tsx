import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageShell } from '@/pages/PageShell';
import { PracticeGuideSection } from '@/pages/home/sections/PracticeGuideSection';

export default function IdeaPracticePage() {
  return (
    <PageShell title="워크숍 · 1단계 아이디어 구체화">
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
