import { Fragment, useMemo, useState } from 'react';
import { Check, ChevronDown, ChevronUp, Copy, Save, Trash2 } from 'lucide-react';

// ── 타입 ──────────────────────────────────────────────────────────────────────
type Seg =
  | { kind: 'text'; content: string }
  | { kind: 'slot'; idx: number; placeholder: string; multiline: boolean };

type SavedEntry = {
  id: string;
  text: string;
  savedAt: string;
};

const MAX_SAVES = 5;

// ── 파서: [...]를 입력 슬롯으로 분리 ─────────────────────────────────────────
function parse(raw: string): Seg[] {
  const parts = raw.split(/(\[[^\]]*\])/g);
  const segs: Seg[] = [];
  let si = 0;
  for (const p of parts) {
    if (!p) continue;
    if (/^\[[^\]]*\]$/.test(p)) {
      const inner = p.slice(1, -1);
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

// ── localStorage 헬퍼 ─────────────────────────────────────────────────────────
function loadSaved(key: string): SavedEntry[] {
  try {
    const raw = localStorage.getItem(`ps-${key}`);
    return raw ? (JSON.parse(raw) as SavedEntry[]) : [];
  } catch {
    return [];
  }
}

function persistSaved(key: string, entries: SavedEntry[]) {
  try {
    localStorage.setItem(`ps-${key}`, JSON.stringify(entries));
  } catch {
    // ignore storage errors
  }
}

// ── 텍스트 줄바꿈 렌더 ────────────────────────────────────────────────────────
function TextPart({ content }: { content: string }) {
  return (
    <>
      {content.split('\n').map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}

// ── 저장 내역 항목 ────────────────────────────────────────────────────────────
function SavedEntryRow({
  entry,
  onCopy,
  onDelete,
}: {
  entry: SavedEntry;
  onCopy: (text: string) => void;
  onDelete: (id: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const preview = entry.text.replace(/\n+/g, ' ').slice(0, 80);

  const handleCopy = () => {
    onCopy(entry.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2.5 group">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{entry.savedAt}</p>
        <p className="text-xs text-foreground leading-snug line-clamp-2 whitespace-pre-wrap break-all">
          {preview}{entry.text.length > 80 ? '…' : ''}
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={handleCopy}
          title="복사"
          className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? '복사됨' : '복사'}
        </button>
        <button
          type="button"
          onClick={() => onDelete(entry.id)}
          title="삭제"
          className="p-1 rounded text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────
type Props = {
  text: string;
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
  const [saved, setSaved] = useState<SavedEntry[]>(() => loadSaved(promptKey));
  const [showSaved, setShowSaved] = useState(false);
  const [saveFlash, setSaveFlash] = useState(false);

  const setVal = (idx: number, v: string) =>
    setValues((prev) => {
      const n = [...prev];
      n[idx] = v;
      return n;
    });

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

  const handleSave = () => {
    const entry: SavedEntry = {
      id: Date.now().toString(),
      text: assembled,
      savedAt: new Date().toLocaleString('ko-KR', {
        month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
      }),
    };
    const next = [entry, ...saved].slice(0, MAX_SAVES);
    setSaved(next);
    persistSaved(promptKey, next);
    setSaveFlash(true);
    setShowSaved(true);
    setTimeout(() => setSaveFlash(false), 2000);
  };

  const handleDelete = (id: string) => {
    const next = saved.filter((e) => e.id !== id);
    setSaved(next);
    persistSaved(promptKey, next);
  };

  const handleCopyFromSaved = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const filledCount = values.filter((v) => v.trim()).length;
  const allFilled = slotCount > 0 && filledCount === slotCount;

  return (
    <div>
      {/* 안내 + 버튼 영역 */}
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
        <div className="flex items-center gap-1.5">
          {/* 저장 버튼 */}
          <button
            type="button"
            onClick={handleSave}
            className={[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              saveFlash
                ? 'bg-green-500 text-white'
                : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100',
            ].join(' ')}
          >
            {saveFlash ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {saveFlash ? '저장됨 ✓' : '저장'}
          </button>
          {/* 복사 버튼 */}
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
                  values[seg.idx] ? 'border-yellow-400' : 'border-yellow-300',
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
                values[seg.idx] ? 'border-yellow-400' : 'border-yellow-300',
                'focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200',
                'transition-colors',
              ].join(' ')}
              style={{ width: `${inputW}px` }}
            />
          );
        })}
      </div>

      {/* 저장 내역 */}
      {saved.length > 0 && (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setShowSaved((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            {showSaved ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            저장된 내역 {saved.length}개
          </button>
          {showSaved && (
            <div className="mt-2 space-y-2">
              {saved.map((entry) => (
                <SavedEntryRow
                  key={entry.id}
                  entry={entry}
                  onCopy={handleCopyFromSaved}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
