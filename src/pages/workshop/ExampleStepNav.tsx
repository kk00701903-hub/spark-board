import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export type StepNavLink = { label: string; to: string };

/** 단계 이동 CTA — 준비단계 「1단계로 이동」 버튼과 동일 스타일 */
const nextStepBtnClass =
  'inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:opacity-90';

const prevStepBtnClass =
  'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors';

export function ExampleStepNav({ prev, next }: { prev?: StepNavLink; next?: StepNavLink }) {
  return (
    <div className="flex items-center justify-between gap-4 pt-8 mt-8 border-t border-border">
      {prev ? (
        <Link to={prev.to} className={prevStepBtnClass}>
          <ArrowLeft className="w-4 h-4 shrink-0" />
          {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link to={next.to} className={nextStepBtnClass}>
          {next.label}
          <ArrowRight className="w-4 h-4 shrink-0" />
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
