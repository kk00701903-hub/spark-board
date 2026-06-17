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
    <div className="mt-4 rounded-xl border border-purple-200 bg-purple-50/60 p-4">
      <h5 className="text-xs font-semibold text-purple-900 mb-3">프롬프트 조건 4가지 — 왜 넣었을까?</h5>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="text-xs leading-relaxed">
            <p className="font-medium text-foreground">{i + 1}. {item.condition}</p>
            <p className="text-muted-foreground mt-0.5 pl-3">
              <span className="text-purple-700 font-semibold">이유: </span>
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
    <div className="rounded-xl border-2 border-green-200 bg-green-50/50 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-green-50 transition-colors"
      >
        <span className="text-sm font-semibold text-green-800 flex items-center gap-2">
          <Bot className="w-4 h-4 shrink-0" />
          AI 답변 (정답 예시)
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-green-600 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-green-600 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-green-200">
          <div className="flex items-center justify-between gap-2 mt-3 mb-2">
            <p className="text-xs text-green-700">
              ChatGPT 답이 아래와 비슷하면 정상이에요. 표현이 조금 달라도 괜찮습니다.
            </p>
            <CopyButton text={text} />
          </div>
          <pre
            id={answerKey}
            className="text-sm text-foreground whitespace-pre-wrap leading-relaxed bg-white rounded-lg p-4 overflow-auto max-h-96 border border-green-100 font-sans"
          >
            {text}
          </pre>
        </div>
      )}
    </div>
  );
}

export function difficultyBadge() {
  return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">예제 따라하기</span>;
}
