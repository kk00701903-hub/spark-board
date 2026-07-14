import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Sparkles } from 'lucide-react';
import { NavMenuButton } from '@/components/nav/NavSidebar';
import { getBreadcrumbTrail, getPreviousPagePath } from '@/lib/siteNavTree';
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
  /** 예: "STEP 1." — 대제목 앞에 표시 (하이라이트는 title에 적용) */
  stepLabel?: string;
  subtitle?: string;
  /** 제목 강조: marker=노란바탕, contrast=검정바탕+노란글씨 */
  titleHighlight?: 'marker' | 'contrast';
};

export function PageShell({ children, title, stepLabel, subtitle, titleHighlight }: PageShellProps) {
  const { pathname } = useLocation();
  const trail = getBreadcrumbTrail(pathname);
  const crumbs = trail.length > 0 ? trail : [{ label: title, path: undefined as string | undefined }];
  const prevPath = getPreviousPagePath(pathname) ?? '/';

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight flex flex-wrap items-center gap-2">
              {stepLabel ? (
                <>
                  <span className="text-lg sm:text-xl font-extrabold tracking-wide text-muted-foreground">
                    {stepLabel}
                  </span>
                  <span className="edu-step">{title}</span>
                </>
              ) : titleHighlight === 'contrast' ? (
                <span className="edu-step-contrast">{title}</span>
              ) : titleHighlight === 'marker' ? (
                <span className="edu-step">{title}</span>
              ) : (
                <span>{title}</span>
              )}
            </h1>
            {subtitle ? (
              <p className="mt-1 text-base text-muted-foreground leading-relaxed">{subtitle}</p>
            ) : null}
          </div>
          <Link
            to={prevPath}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-card text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">이전페이지</span>
            <span className="sm:hidden">이전</span>
          </Link>
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
