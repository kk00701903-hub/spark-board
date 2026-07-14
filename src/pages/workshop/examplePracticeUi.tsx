import { useState } from 'react';
import { Bot, ChevronDown, ChevronUp } from 'lucide-react';
import { CopyButton } from '@/pages/home/sections/CopyButton';

export function BoldText({ text }: { text: string }) {
  const parts = text.split(/\*\*/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-foreground font-semibold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function PromptConditionReasons({ items }: { items: { condition: string; reason: string }[] }) {
  return (
    <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
      <h5 className="text-sm font-semibold text-foreground mb-3">프롬프트 조건 4가지 — 왜 넣었을까?</h5>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="text-sm leading-relaxed">
            <p className="font-medium text-foreground">{i + 1}. {item.condition}</p>
            <p className="text-muted-foreground mt-0.5 pl-3">
              <span className="text-primary font-semibold">이유: </span>
              {item.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SampleAnswerPanel({ text, answerKey }: { text: string; answerKey: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-chart-3/40 bg-chart-3/5 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-chart-3/10 transition-colors"
      >
        <span className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Bot className="w-4 h-4 shrink-0 text-chart-3" />
          AI 답변 (정답 예시)
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="flex items-center justify-between gap-2 mt-3 mb-2">
            <p className="text-xs text-muted-foreground">
              ChatGPT 답이 아래와 비슷하면 정상이에요. 표현이 조금 달라도 괜찮습니다.
            </p>
            <CopyButton text={text} />
          </div>
          <pre
            id={answerKey}
            className="text-sm text-foreground whitespace-pre-wrap leading-relaxed bg-card rounded-lg p-4 overflow-auto max-h-96 border border-border font-sans"
          >
            {text}
          </pre>
        </div>
      )}
    </div>
  );
}

export function difficultyBadge() {
  return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary">예제 따라하기</span>;
}
