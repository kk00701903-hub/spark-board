import { Link } from 'react-router-dom';
import { Download, Lightbulb, Terminal } from 'lucide-react';
import { PageShell } from '@/pages/PageShell';
import { PracticeGuideSection } from '@/pages/home/sections/PracticeGuideSection';

function WorkshopPhaseCards() {
  return (
    <div className="border-b border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">워크숍 실습 구성</h2>
        <p className="text-sm text-muted-foreground max-w-2xl mb-8">
          1단계에서 아이디어를 구체화하고, 준비 단계에서 VS Code·Python을 설치한 뒤, 2단계에서 ChatGPT가 만든 코드를 VS Code에 붙여 넣으며 Python으로 구현합니다.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {/* 1단계 현재 페이지 */}
          <div className="rounded-2xl border-2 border-primary/30 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs font-medium text-primary uppercase tracking-wide">현재 페이지</div>
                <div className="font-bold text-foreground">1단계 · 아이디어 실습</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              페인포인트·Lean Canvas·제안서·구현 검토까지 ChatGPT 프롬프트로 진행합니다.
            </p>
            <span className="text-xs text-muted-foreground">아래 아코디언에서 단계별로 진행하세요.</span>
          </div>

          {/* 준비 단계 */}
          <Link
            to="/workshop/setup"
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-green-400/60 hover:shadow-md group text-left block"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">중간 단계</div>
                <div className="font-bold text-foreground group-hover:text-green-600 transition-colors">
                  준비 단계 · 환경 설치
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              VS Code·Python 설치 및 AI·데이터 분석 라이브러리 22개를 한 번에 세팅합니다.
            </p>
            <span className="text-sm font-semibold text-green-600">
              준비 단계로 이동 →
            </span>
          </Link>

          {/* 2단계 */}
          <Link
            to="/workshop/implement"
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md group text-left block"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">다음 단계</div>
                <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                  2단계 · ChatGPT → VS Code
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              1단계 산출물을 프롬프트에 붙여 ChatGPT에서 코드를 받고, VS Code에 복사·저장하며 기능을 쌓고 디버깅합니다.
            </p>
            <span className="text-sm font-semibold text-primary">
              2단계 페이지로 이동 →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function WorkshopPage() {
  return (
    <PageShell title="워크숍 · 1단계 아이디어 실습">
      <WorkshopPhaseCards />
      <PracticeGuideSection />
    </PageShell>
  );
}
