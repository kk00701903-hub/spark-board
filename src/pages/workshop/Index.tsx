import { Link } from 'react-router-dom';
import { Download, FlaskConical, Lightbulb, Rocket, Terminal } from 'lucide-react';
import { PageShell } from '@/pages/PageShell';
import { PracticeGuideSection } from '@/pages/home/sections/PracticeGuideSection';

function WorkshopPhaseCards() {
  return (
    <div className="border-b border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <h2 className="text-lg font-semibold text-foreground mb-2">워크숍 실습 구성</h2>
        <p className="text-sm text-muted-foreground max-w-2xl mb-8">
          1단계에서 아이디어를 구체화하고, 준비 단계에서 VS Code·Python을 설치한 뒤,
          2단계 예제를 따라 흐름을 익히고, 3단계에서 내 아이디어를 직접 구현합니다.
        </p>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">

          {/* 1단계 — 현재 페이지 */}
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
              VS Code·Python·가상환경 설정 및 2단계 예제용 라이브러리(tkcalendar, openpyxl 등) 포함 전체 설치.
            </p>
            <span className="text-sm font-semibold text-green-600">준비 단계로 이동 →</span>
          </Link>

          {/* 2단계 — 예제 따라하기 */}
          <Link
            to="/workshop/example"
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-blue-400/60 hover:shadow-md group text-left block"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">다음 단계</div>
                <div className="font-bold text-foreground group-hover:text-blue-600 transition-colors">
                  2단계 · 예제 따라하기
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              "용돈 기록 프로그램" 예제로 ChatGPT → VS Code 흐름을 처음부터 끝까지 따라합니다.
            </p>
            <span className="text-sm font-semibold text-blue-600">2단계 페이지로 이동 →</span>
          </Link>

          {/* 3단계 — 내 아이디어 구현 */}
          <Link
            to="/workshop/implement"
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md group text-left block"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">도전 단계</div>
                <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                  3단계 · 내 아이디어 구현
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              2단계에서 익힌 흐름으로, 1단계 아이디어를 내가 직접 구현합니다.
            </p>
            <span className="text-sm font-semibold text-primary">3단계 페이지로 이동 →</span>
          </Link>

        </div>

        {/* 단계 흐름 화살표 (데스크탑) */}
        <div className="hidden xl:flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
          <Terminal className="w-3.5 h-3.5" />
          <span>1단계 아이디어 정리</span>
          <span>→</span>
          <span>준비 단계 환경 설치</span>
          <span>→</span>
          <span>2단계 예제 따라하기</span>
          <span>→</span>
          <span>3단계 내 아이디어 구현</span>
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
