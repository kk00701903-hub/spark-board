export type SiteNavItem = {
  label: string;
  path?: string;
  children?: SiteNavItem[];
};

export const siteNavTree: SiteNavItem[] = [
  { label: '홈', path: '/' },
  {
    label: '워크숍',
    children: [
      { label: '실습 구성', path: '/workshop' },
      { label: '교육 커리큘럼', path: '/workshop/curriculum' },
      { label: '준비 단계 · 환경 설치', path: '/workshop/setup' },
      { label: 'STEP 1. · 아이디어 구체화', path: '/workshop/idea' },
      {
        label: 'STEP 2. · 예제 따라하기',
        children: [
          { label: '개요', path: '/workshop/example' },
          { label: '예제 실습 1 · 내용', path: '/workshop/example/ex-1/guide' },
          { label: '예제실습전 사전학습하기', path: '/workshop/example/ex-1' },
          { label: '예제 실습 2 · 내용', path: '/workshop/example/ex-2/guide' },
          { label: '예제 실습 2에 대해 단계별로 실습해보기', path: '/workshop/example/ex-2' },
          { label: '이해도 확인 · 내용', path: '/workshop/example/quiz/guide' },
          { label: '이해도 확인', path: '/workshop/example/quiz' },
        ],
      },
      { label: 'STEP 3. · 내 아이디어 구현', path: '/workshop/implement' },
    ],
  },
  { label: '프롬프트 모음', path: '/prompts' },
];

export function isNavPathActive(path: string, currentPath: string): boolean {
  if (path === '/') return currentPath === '/';
  return currentPath === path;
}

export function branchHasActivePath(item: SiteNavItem, currentPath: string): boolean {
  if (item.path && isNavPathActive(item.path, currentPath)) return true;
  return item.children?.some((child) => branchHasActivePath(child, currentPath)) ?? false;
}

export type BreadcrumbCrumb = {
  label: string;
  path?: string;
};

function firstNavigablePath(item: SiteNavItem): string | undefined {
  if (item.path) return item.path;
  if (!item.children) return undefined;
  for (const child of item.children) {
    const path = firstNavigablePath(child);
    if (path) return path;
  }
  return undefined;
}

/** DFS 순서로 메뉴에 등록된 경로 목록 */
export function flattenNavPaths(items: SiteNavItem[] = siteNavTree): string[] {
  const out: string[] = [];
  for (const item of items) {
    if (item.path) out.push(item.path);
    if (item.children) out.push(...flattenNavPaths(item.children));
  }
  return out;
}

/** 사이드 메뉴 순서상 바로 이전 페이지. 없으면 undefined */
export function getPreviousPagePath(pathname: string): string | undefined {
  const paths = flattenNavPaths();
  const idx = paths.findIndex((p) => isNavPathActive(p, pathname));
  if (idx <= 0) return undefined;
  return paths[idx - 1];
}

/** 현재 경로에 해당하는 메뉴 하이어라키(홈 → … → 현재)를 반환 */
export function getBreadcrumbTrail(pathname: string): BreadcrumbCrumb[] {
  function walk(items: SiteNavItem[], trail: BreadcrumbCrumb[]): BreadcrumbCrumb[] | null {
    for (const item of items) {
      const crumb: BreadcrumbCrumb = {
        label: item.label,
        path: item.path ?? firstNavigablePath(item),
      };
      const next = [...trail, crumb];
      if (item.path && isNavPathActive(item.path, pathname)) {
        return next;
      }
      if (item.children) {
        const found = walk(item.children, next);
        if (found) return found;
      }
    }
    return null;
  }

  return walk(siteNavTree, []) ?? [{ label: '홈', path: '/' }];
}
