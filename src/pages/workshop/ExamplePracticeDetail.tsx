import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BookOpen, ChevronDown, ChevronUp, Clock, Code2, Lightbulb, AlertCircle, Target,
} from 'lucide-react';
import { springGentle } from '@/pages/home/animations';
import { EditablePrompt } from '@/pages/home/sections/EditablePrompt';
import { ExampleExcelSamplePanel } from '@/pages/workshop/ExampleExcelSamplePanel';
import { type ExamplePractice } from '@/pages/workshop/examplePracticeData';
import { BoldText, PromptConditionReasons, SampleAnswerPanel, difficultyBadge } from '@/pages/workshop/examplePracticeUi';

const nextBtnClass =
  'inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:opacity-90';
const prevBtnClass =
  'inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors';

type ExamplePracticeDetailProps = {
  practice: ExamplePractice;
  practiceNumber: 1 | 2;
  /** overview = 사전학습 순서 안내, questions = 실습용 프롬프트 */
  mode: 'overview' | 'questions';
  /** 예제 설명(안내) 페이지 */
  guideTo?: string;
  /** 하단 「이전」 경로 */
  prevTo?: string;
  /** 하단 「다음」 경로 */
  nextTo?: string;
};

export function ExamplePracticeDetail({
  practice,
  practiceNumber,
  mode,
  guideTo,
  prevTo,
  nextTo,
}: ExamplePracticeDetailProps) {
  const [openSubStep, setOpenSubStep] = useState<number | null>(null);

  const toggleSubStep = (stepIdx: number) => {
    setOpenSubStep((cur) => (cur === stepIdx ? null : stepIdx));
  };

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
                  <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-primary/15 text-primary">
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
                  {guideTo ? (
                    <Link
                      to={guideTo}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline underline-offset-2"
                    >
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      상세히 보기
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6">
            {mode === 'overview' ? (
              <div className="space-y-6">
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
                  <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary shrink-0" /> 이 실습 전체 순서
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    무엇을 하는지와, <strong className="text-foreground">왜 이 순서인지</strong> 함께 읽어 보세요.
                    끝까지 읽은 뒤 아래 <strong className="text-foreground">다음</strong>을 누르면 질문 실습으로 넘어갑니다.
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
                          <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">
                            <span className="text-primary font-semibold">왜? </span>
                            <BoldText text={step.reason} />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
                  {prevTo ? (
                    <Link to={prevTo} className={prevBtnClass}>
                      <ArrowLeft className="w-4 h-4" />
                      이전
                    </Link>
                  ) : null}
                  {nextTo ? (
                    <Link to={nextTo} className={nextBtnClass}>
                      다음
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-end gap-3 flex-wrap">
                  <span className="text-sm font-medium text-muted-foreground">
                    ChatGPT 질문 {practice.promptSteps.length}개 · 순서대로 진행하세요
                  </span>
                </div>

                <div className="space-y-3">
                  {practice.promptSteps.map((step, si) => {
                    const isSubOpen = openSubStep === si;
                    return (
                      <div
                        key={step.n}
                        className="edu-card overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => toggleSubStep(si)}
                          className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-sm font-bold text-primary">
                              {step.n}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-muted-foreground">ChatGPT 질문 {step.n}</div>
                              <div className="font-semibold text-foreground text-sm sm:text-base leading-snug">
                                {step.title}
                              </div>
                            </div>
                          </div>
                          {isSubOpen ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                          )}
                        </button>

                        <AnimatePresence>
                          {isSubOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={springGentle}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 sm:px-5 sm:pb-5 border-t border-border pt-4">
                                <div className="grid md:grid-cols-2 gap-6 min-w-0">
                                  <div className="space-y-4 min-w-0">
                                    <div>
                                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                        <span className="text-base">💬</span> ChatGPT에 보내기 전
                                      </h4>
                                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                        <BoldText text={step.lead} />
                                      </p>
                                    </div>
                                    {practice.id === 'ex-1' && step.n === 1 && <ExampleExcelSamplePanel />}
                                    <div>
                                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                        <span className="text-base">💻</span> ChatGPT 답 받은 후 VS Code에서
                                      </h4>
                                      <div className="space-y-2">
                                        {step.vsCodeSteps.map((vs, vsi) => (
                                          <div key={vsi} className="flex items-start gap-2.5">
                                            <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                              <span className="text-xs font-bold text-accent">{vsi + 1}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                              <BoldText text={vs} />
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    {step.tip && (
                                      <div className="flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/15 px-3 py-2.5">
                                        <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        <p className="text-sm text-foreground/80 leading-relaxed">
                                          <BoldText text={step.tip} />
                                        </p>
                                      </div>
                                    )}
                                  </div>

                                  <div className="min-w-0">
                                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3 min-w-0">
                                      <Code2 className="w-4 h-4 text-accent shrink-0" /> 실습용 프롬프트
                                    </h4>
                                    <EditablePrompt
                                      text={step.prompt}
                                      promptKey={`${practice.id}-q${step.n}`}
                                      showSave={practice.id === 'ex-2' && (step.n === 1 || step.n === 3)}
                                    />
                                    {step.conditionReasons && (
                                      <PromptConditionReasons items={step.conditionReasons} />
                                    )}
                                  </div>
                                </div>

                                <div className="mt-6">
                                  <SampleAnswerPanel
                                    text={step.answer}
                                    answerKey={`${practice.id}-ans-${step.n}`}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
                  {prevTo ? (
                    <Link to={prevTo} className={prevBtnClass}>
                      <ArrowLeft className="w-4 h-4" />
                      이전
                    </Link>
                  ) : null}
                  {nextTo ? (
                    <Link to={nextTo} className={nextBtnClass}>
                      다음
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
