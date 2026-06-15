import { Fragment, useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';

// ── 타입 ──────────────────────────────────────────────────────────────────────
type Seg =
  | { kind: 'text'; content: string }
  | { kind: 'slot'; idx: number; placeholder: string; multiline: boolean };

// ── 파서: [...]를 입력 슬롯으로 분리 ─────────────────────────────────────────
function parse(raw: string): Seg[] {
  const parts = raw.split(/(\[[^\]]*\])/g);
  const segs: Seg[] = [];
  let si = 0;
  for (const p of parts) {
    if (!p) continue;
    if (/^\[[^\]]*\]$/.test(p)) {
      const inner = p.slice(1, -1); // 괄호 제거
      segs.push({
        kind: 'slot',
        idx: si++,
        placeholder: inner,
        multiline: inner.length > 45,
      });
    } else {
      segs.push({ kind: 'text', content: p });
    }
  }
  return segs;
}

// ── 텍스트 줄바꿈 렌더 ────────────────────────────────────────────────────────
function TextPart({ content }: { content: string }) {
  return (
    <>
      {content.split('\n').map((line, i, arr) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────
type Props = {
  text: string;
  /** 같은 페이지에 여러 개일 때 React key 충돌 방지 */
  promptKey?: string;
};

export function EditablePrompt({ text, promptKey = 'ep' }: Props) {
  const segments = useMemo(() => parse(text), [text]);
  const slotCount = useMemo(
    () => segments.filter((s) => s.kind === 'slot').length,
    [segments],
  );

  const [values, setValues] = useState<string[]>(() => Array(slotCount).fill(''));
  const [copied, setCopied] = useState(false);

  const setVal = (idx: number, v: string) =>
    setValues((prev) => {
      const n = [...prev];
      n[idx] = v;
      return n;
    });

  // 빈 슬롯은 원본 [placeholder] 유지
  const assembled = segments
    .map((s) =>
      s.kind === 'text' ? s.content : values[s.idx]?.trim() || `[${s.placeholder}]`,
    )
    .join('');

  const handleCopy = () => {
    navigator.clipboard.writeText(assembled);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filledCount = values.filter((v) => v.trim()).length;
  const allFilled = filledCount === slotCount;

  return (
    <div>
      {/* 안내 + 복사 버튼 */}
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-yellow-200 border border-yellow-400 shrink-0" />
          노란 칸을 클릭해 내용을 직접 입력하거나 붙여넣으세요.
          {slotCount > 0 && (
            <span className="ml-1 text-yellow-700 font-medium">
              ({filledCount}/{slotCount} 입력됨)
            </span>
          )}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className={[
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
            allFilled
              ? 'bg-primary text-primary-foreground hover:opacity-90'
              : 'bg-accent/10 text-accent hover:bg-accent/20',
          ].join(' ')}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? '복사됨 ✓' : '완성본 복사'}
        </button>
      </div>

      {/* 프롬프트 본문 */}
      <div className="bg-muted/50 rounded-xl border border-border p-4 sm:p-5 text-sm text-foreground leading-[1.85] font-sans">
        {segments.map((seg, i) => {
          if (seg.kind === 'text') {
            return <TextPart key={`${promptKey}-t-${i}`} content={seg.content} />;
          }

          if (seg.multiline) {
            return (
              <textarea
                key={`${promptKey}-s-${seg.idx}`}
                value={values[seg.idx]}
                onChange={(e) => setVal(seg.idx, e.target.value)}
                placeholder={seg.placeholder}
                rows={3}
                className={[
                  'block w-full my-1.5 px-3 py-2 rounded-lg text-sm font-sans resize-y',
                  'border-2 bg-yellow-50 placeholder:text-yellow-700/70 text-foreground',
                  values[seg.idx]
                    ? 'border-yellow-400'
                    : 'border-yellow-300',
                  'focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200',
                  'transition-colors',
                ].join(' ')}
              />
            );
          }

          const displayLen = values[seg.idx]?.length || seg.placeholder.length;
          const inputW = Math.max(90, displayLen * 9 + 24);

          return (
            <input
              key={`${promptKey}-s-${seg.idx}`}
              type="text"
              value={values[seg.idx]}
              onChange={(e) => setVal(seg.idx, e.target.value)}
              placeholder={seg.placeholder}
              className={[
                'inline-block px-2 py-0.5 rounded text-sm font-sans align-baseline mx-0.5',
                'border-2 bg-yellow-50 placeholder:text-yellow-700/70 text-foreground',
                values[seg.idx]
                  ? 'border-yellow-400'
                  : 'border-yellow-300',
                'focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200',
                'transition-colors',
              ].join(' ')}
              style={{ width: `${inputW}px` }}
            />
          );
        })}
      </div>
    </div>
  );
}
