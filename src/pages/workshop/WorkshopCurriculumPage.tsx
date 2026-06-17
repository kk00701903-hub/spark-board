import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PageShell } from '@/pages/PageShell';
import { CurriculumSection } from '@/pages/home/sections/CurriculumSection';

export default function WorkshopCurriculumPage() {
  return (
    <PageShell title="워크숍 · 교육 커리큘럼">
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/workshop"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            워크숍 실습 구성으로 돌아가기
          </Link>
        </div>
      </div>
      <CurriculumSection />
      <div className="pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 px-6 py-8 text-center">
            <p className="text-lg font-bold text-foreground mb-2">커리큘럼 확인 완료!</p>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-xl mx-auto">
              이제 <strong className="text-foreground">1단계 아이디어 구체화</strong> 실습으로 넘어가
              ChatGPT 프롬프트를 따라해 보세요.
            </p>
            <Link
              to="/workshop/idea"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            >
              1단계 아이디어 구체화 시작하기
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
