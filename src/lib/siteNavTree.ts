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
      { label: '1단계 · 아이디어 구체화', path: '/workshop/idea' },
      { label: '준비 단계 · 환경 설치', path: '/workshop/setup' },
      { label: '2단계 · 예제 따라하기', path: '/workshop/example' },
      { label: '3단계 · 내 아이디어 구현', path: '/workshop/implement' },
    ],
  },
  { label: '프롬프트 모음', path: '/prompts' },
  { label: '시간 단축 사례', path: '/time-savings' },
];

export function isNavPathActive(path: string, currentPath: string): boolean {
  if (path === '/') return currentPath === '/';
  return currentPath === path;
}

export function branchHasActivePath(item: SiteNavItem, currentPath: string): boolean {
  if (item.path && isNavPathActive(item.path, currentPath)) return true;
  return item.children?.some((child) => branchHasActivePath(child, currentPath)) ?? false;
}
