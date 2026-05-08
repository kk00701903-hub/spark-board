import type { ReactNode } from 'react';

const HIGHLIGHT =
  'rounded-sm px-1 py-0.5 mx-0.5 -my-0.5 box-decoration-clone bg-yellow-200 text-foreground shadow-[inset_0_-0.15em_0_0_rgba(234,179,8,0.45)] dark:bg-amber-400/40 dark:text-foreground dark:shadow-none';

/** [대괄호] 안 직접 입력·붙여넣기 칸, 및 --- … 붙여/여기에 … --- 안내 줄 강조 */
function buildHighlightedNodes(text: string, keyPrefix: string): ReactNode[] {
  const bracketParts = text.split(/(\[[^\]]*\])/g);
  const out: ReactNode[] = [];

  bracketParts.forEach((part, i) => {
    if (part === '') return;
    if (/^\[[^\]]*\]$/.test(part)) {
      out.push(
        <mark key={`${keyPrefix}-b-${i}`} className={HIGHLIGHT}>
          {part}
        </mark>,
      );
      return;
    }
    out.push(...highlightPasteGuideLines(part, `${keyPrefix}-p-${i}`));
  });

  return out;
}

function highlightPasteGuideLines(text: string, lineKeyPrefix: string): ReactNode[] {
  const lines = text.split('\n');
  const out: ReactNode[] = [];

  lines.forEach((line, li) => {
    if (li > 0) out.push('\n');
    const trimmed = line.trim();
    const isPasteGuide =
      /^---\s+.+\s+---\s*$/.test(trimmed) &&
      /(?:붙여|여기에|복사|채워|입력)/.test(trimmed);
    if (isPasteGuide) {
      out.push(
        <mark key={`${lineKeyPrefix}-${li}`} className={HIGHLIGHT}>
          {line}
        </mark>,
      );
    } else {
      out.push(line);
    }
  });

  return out;
}

type HighlightedPromptProps = {
  text: string;
  className?: string;
  id?: string;
  /** 같은 페이지에 여러 개일 때 React key 충돌 방지 */
  highlightKey?: string;
};

export function HighlightedPrompt({ text, className, id, highlightKey = 'hp' }: HighlightedPromptProps) {
  return (
    <pre id={id} className={className}>
      {buildHighlightedNodes(text, highlightKey)}
    </pre>
  );
}
