import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PageShell } from '@/pages/PageShell';
import { CurriculumSection } from '@/pages/home/sections/CurriculumSection';

export default function WorkshopCurriculumPage() {
  return (
    <PageShell
      title="교육 커리큘럼"
      subtitle="4단계 AI 아이디어 구체화 과정 안내"
    >
      <div className="border-b border-border bg-background">
        <div className="edu-container py-4">
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
      <div className="pb-10">
        <div className="edu-container">
          <div className="edu-card border-primary/20 bg-primary/5 px-6 py-8 text-center">
            <p className="text-base font-bold text-foreground mb-2">커리큘럼 확인 완료</p>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-xl mx-auto">
              이제 <strong className="text-foreground">준비 단계</strong>에서 환경을 맞춘 뒤
              1단계 아이디어 구체화로 넘어가세요.
            </p>
            <Link
              to="/workshop/setup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:opacity-90"
            >
              준비 단계 시작하기
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
