import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { NavMenuButton } from '@/components/nav/NavSidebar';

type PageShellProps = {
  children: React.ReactNode;
  title: string;
};

export function PageShell({ children, title }: PageShellProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <NavMenuButton />
            <span className="text-sm font-semibold text-foreground truncate">
              {title}
            </span>
          </div>
          <Link to="/" className="flex items-center gap-2 shrink-0 transition-colors hover:opacity-90">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:inline">홈으로 돌아가기</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col min-h-0">{children}</main>
      <footer className="py-8 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-bold text-foreground">(주)제때 AI 아이디어 스파크</span>
          </div>
          <p className="text-sm text-muted-foreground">
            2026 교육 커리큘럼 · ChatGPT 활용 아이디어 구체화 워크숍
          </p>
        </div>
      </footer>
    </div>
  );
}
