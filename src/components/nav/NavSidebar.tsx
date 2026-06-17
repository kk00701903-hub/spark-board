import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, Sparkles } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { branchHasActivePath, isNavPathActive, siteNavTree, type SiteNavItem } from '@/lib/siteNavTree';
import { cn } from '@/lib/utils';

type NavSidebarContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const NavSidebarContext = createContext<NavSidebarContextValue | null>(null);

function useNavSidebar() {
  const ctx = useContext(NavSidebarContext);
  if (!ctx) throw new Error('useNavSidebar must be used within NavSidebarProvider');
  return ctx;
}

function NavTreeItem({
  item,
  depth,
  currentPath,
  expanded,
  onToggle,
  onNavigate,
}: {
  item: SiteNavItem;
  depth: number;
  currentPath: string;
  expanded: Record<string, boolean>;
  onToggle: (key: string) => void;
  onNavigate: () => void;
}) {
  const key = `${depth}-${item.label}`;
  const hasChildren = Boolean(item.children?.length);
  const isOpen = expanded[key] ?? branchHasActivePath(item, currentPath);
  const isActive = item.path ? isNavPathActive(item.path, currentPath) : false;

  if (hasChildren) {
    return (
      <li>
        <button
          type="button"
          onClick={() => onToggle(key)}
          className={cn(
            'w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-left transition-colors hover:bg-muted',
            branchHasActivePath(item, currentPath) && 'text-primary',
          )}
          style={{ paddingLeft: `${12 + depth * 14}px` }}
        >
          {isOpen ? (
            <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 shrink-0 text-muted-foreground" />
          )}
          <span>{item.label}</span>
        </button>
        {isOpen && (
          <ul className="mt-0.5 space-y-0.5">
            {item.children!.map((child) => (
              <NavTreeItem
                key={child.label}
                item={child}
                depth={depth + 1}
                currentPath={currentPath}
                expanded={expanded}
                onToggle={onToggle}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  if (!item.path) return null;

  return (
    <li>
      <Link
        to={item.path}
        onClick={onNavigate}
        className={cn(
          'block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted',
          isActive
            ? 'bg-primary/10 text-primary font-semibold'
            : 'text-foreground',
        )}
        style={{ paddingLeft: `${12 + depth * 14}px` }}
      >
        {item.label}
      </Link>
    </li>
  );
}

function SiteNavSidebar({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const initialExpanded = useMemo(() => {
    const next: Record<string, boolean> = {};
    siteNavTree.forEach((item) => {
      if (item.children?.length && branchHasActivePath(item, currentPath)) {
        next[`0-${item.label}`] = true;
      }
    });
    return next;
  }, [currentPath]);

  const mergedExpanded = { ...initialExpanded, ...expanded };

  const handleToggle = useCallback((key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !(prev[key] ?? initialExpanded[key]) }));
  }, [initialExpanded]);

  const handleNavigate = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[min(100vw-2rem,20rem)] p-0 flex flex-col">
        <SheetHeader className="px-5 py-4 border-b border-border text-left space-y-1">
          <SheetTitle className="flex items-center gap-2 text-base">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            페이지 메뉴
          </SheetTitle>
          <p className="text-xs text-muted-foreground font-normal">
            트리에서 페이지를 선택해 이동하세요.
          </p>
        </SheetHeader>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {siteNavTree.map((item) => (
              <NavTreeItem
                key={item.label}
                item={item}
                depth={0}
                currentPath={currentPath}
                expanded={mergedExpanded}
                onToggle={handleToggle}
                onNavigate={handleNavigate}
              />
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function NavSidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <NavSidebarContext.Provider value={{ open, setOpen }}>
      <SiteNavSidebar open={open} onOpenChange={setOpen} />
      {children}
    </NavSidebarContext.Provider>
  );
}

export function NavMenuButton({ className }: { className?: string }) {
  const { setOpen } = useNavSidebar();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="메뉴 열기"
      className={cn(
        'inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted shrink-0',
        className,
      )}
    >
      <Menu className="w-4 h-4" />
    </button>
  );
}
