import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, ArrowRight, BookOpen, Clock, Target } from 'lucide-react';
import { type ExamplePractice } from '@/pages/workshop/examplePracticeData';
import { BoldText, difficultyBadge } from '@/pages/workshop/examplePracticeUi';

type ExamplePracticeGuideSectionProps = {
  practice: ExamplePractice;
  practiceNumber: 1 | 2;
  practiceTo: string;
  hubTo: string;
};

export function ExamplePracticeGuideSection({
  practice,
  practiceNumber,
  practiceTo,
  hubTo,
}: ExamplePracticeGuideSectionProps) {
  return (
    <section className="edu-section">
      <div className="edu-container">
        <div className="edu-card border-primary/30 overflow-hidden">
          <div className="px-5 py-5 sm:px-6 sm:py-6 border-b border-border bg-primary/5">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                {practice.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-primary/15 text-primary inline-flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    실습 내용 안내
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    예제 실습 {practiceNumber}
                  </span>
                </div>
                <h2 className="font-semibold text-foreground text-lg sm:text-xl">
                  {practice.listTitle.replace(/^예제 실습 \d+: /, '')}
                </h2>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3 shrink-0" /> {practice.duration}
                  </span>
                  {difficultyBadge()}
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6 space-y-6">
            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-muted/30 p-4 sm:p-5 text-sm text-muted-foreground leading-relaxed">
                <BoldText text={practice.summary} />
              </div>
              <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{practice.warning}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary shrink-0" /> 이 실습 전체 순서
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                무엇을 하는지와, <strong className="text-foreground">왜 이 순서인지</strong> 함께 읽어 보세요.
                준비가 되면 아래 <strong className="text-foreground">실습 시작하기</strong>로 질문 실습에 들어가면 됩니다.
              </p>
              <div className="space-y-3">
                {practice.overviewSteps.map((step, si) => (
                  <div
                    key={si}
                    className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 px-4 py-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">{si + 1}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-foreground leading-relaxed font-medium">
                        <BoldText text={step.action} />
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                        <span className="text-primary font-semibold">왜? </span>
                        <BoldText text={step.reason} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
              <Link
                to={hubTo}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                이전
              </Link>
              <Link
                to={practiceTo}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:opacity-90"
              >
                실습 시작하기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
