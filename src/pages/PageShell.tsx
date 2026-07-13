import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import { NavMenuButton } from '@/components/nav/NavSidebar';
import { getBreadcrumbTrail } from '@/lib/siteNavTree';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type PageShellProps = {
  children: React.ReactNode;
  title: string;
  /** 예: "STEP 1." — 제목 앞에 하이라이트 표시 */
  stepLabel?: string;
  subtitle?: string;
};

export function PageShell({ children, title, stepLabel, subtitle }: PageShellProps) {
  const { pathname } = useLocation();
  const trail = getBreadcrumbTrail(pathname);
  const crumbs = trail.length > 0 ? trail : [{ label: title, path: undefined as string | undefined }];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <NavMenuButton />
            <Breadcrumb className="min-w-0">
              <BreadcrumbList className="flex-nowrap gap-1 sm:gap-1.5 overflow-hidden">
                {crumbs.map((crumb, index) => {
                  const isLast = index === crumbs.length - 1;
                  return (
                    <Fragment key={`${crumb.label}-${index}`}>
                      {index > 0 && (
                        <BreadcrumbSeparator className="mx-0.5 text-muted-foreground/70 [&>svg]:size-3">
                          <ChevronRight />
                        </BreadcrumbSeparator>
                      )}
                      <BreadcrumbItem className="min-w-0">
                        {isLast || !crumb.path ? (
                          <BreadcrumbPage
                            className={[
                              'truncate text-xs sm:text-sm',
                              isLast ? 'font-medium text-foreground' : 'text-muted-foreground',
                            ].join(' ')}
                            title={crumb.label}
                          >
                            {crumb.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link
                              to={crumb.path}
                              className="truncate text-xs sm:text-sm text-muted-foreground hover:text-foreground"
                              title={crumb.label}
                            >
                              {crumb.label}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 rounded-lg px-1.5 py-1 transition-colors hover:bg-muted"
            title="홈으로 돌아가기"
          >
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:inline">
              홈
            </span>
          </Link>
        </div>
      </header>

      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight flex flex-wrap items-center gap-2">
            {stepLabel ? <span className="edu-step text-base sm:text-lg">{stepLabel}</span> : null}
            <span>{title}</span>
          </h1>
          {subtitle ? (
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <main className="flex-1 flex flex-col min-h-0 edu-surface">{children}</main>
      <footer className="py-6 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm text-foreground">(주)제때 AI 아이디어 스파크</span>
          </div>
          <p className="text-xs text-muted-foreground">
            2026 교육 커리큘럼 · ChatGPT 활용 아이디어 구체화 워크숍
          </p>
        </div>
      </footer>
    </div>
  );
}
