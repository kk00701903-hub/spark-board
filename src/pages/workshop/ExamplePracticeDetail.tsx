import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Clock, Code2, Lightbulb, AlertCircle, Target,
} from 'lucide-react';
import { springGentle } from '@/pages/home/animations';
import { EditablePrompt } from '@/pages/home/sections/EditablePrompt';
import { ExampleExcelSamplePanel } from '@/pages/workshop/ExampleExcelSamplePanel';
import { type ExamplePractice } from '@/pages/workshop/examplePracticeData';
import { BoldText, PromptConditionReasons, SampleAnswerPanel, difficultyBadge } from '@/pages/workshop/examplePracticeUi';
import { ExampleStepNav, type StepNavLink } from '@/pages/workshop/ExampleStepNav';

type ExamplePracticeDetailProps = {
  practice: ExamplePractice;
  practiceNumber: 1 | 2;
  prev?: StepNavLink;
  next?: StepNavLink;
};

export function ExamplePracticeDetail({ practice, practiceNumber, prev, next }: ExamplePracticeDetailProps) {
  const isFirst = practiceNumber === 1;
  const [phase, setPhase] = useState<'overview' | 'questions'>('overview');
  const [openSubStep, setOpenSubStep] = useState<number | null>(null);
  const questionsRef = useRef<HTMLDivElement | null>(null);

  const startQuestions = () => {
    setPhase('questions');
    setOpenSubStep(null);
    requestAnimationFrame(() => {
      questionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const toggleSubStep = (stepIdx: number) => {
    setOpenSubStep((cur) => (cur === stepIdx ? null : stepIdx));
  };

  return (
    <section className="py-24" style={{ background: 'oklch(0.97 0.004 240)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/workshop/example"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            2단계 예제 따라하기 개요로 돌아가기
          </Link>
        </div>

        <div
          className={[
            'rounded-2xl border-2 overflow-hidden',
            isFirst
              ? 'bg-blue-50/60 border-blue-400 ring-2 ring-blue-200/80'
              : 'bg-indigo-50/60 border-indigo-400 ring-2 ring-indigo-200/80',
          ].join(' ')}
          style={{ boxShadow: '0 8px 24px -8px oklch(0.48 0.18 240 / 0.18)' }}
        >
          <div className={['px-6 py-6 border-b', isFirst ? 'border-blue-200/60' : 'border-indigo-200/60'].join(' ')}>
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl shrink-0">
                {practice.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span
                    className={[
                      'text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full',
                      isFirst ? 'bg-blue-200 text-blue-800' : 'bg-indigo-200 text-indigo-800',
                    ].join(' ')}
                  >
                    예제 실습 {practiceNumber}
                  </span>
                </div>
                <h2 className="font-bold text-foreground text-xl sm:text-2xl">
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

          <div className="px-6 py-6">
            <AnimatePresence mode="wait">
              {phase === 'overview' ? (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={springGentle}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <div className="rounded-xl border border-border bg-white/70 p-4 sm:p-5 text-sm text-muted-foreground leading-relaxed">
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
                    <p className="text-xs text-muted-foreground mb-4">
                      무엇을 하는지와, <strong className="text-foreground">왜 이 순서인지</strong> 함께 읽어 보세요.
                      끝까지 읽은 뒤 아래 버튼을 누르면 <strong className="text-foreground">질문 1</strong>부터 실습합니다.
                    </p>
                    <div className="space-y-3">
                      {practice.overviewSteps.map((step, si) => (
                        <div
                          key={si}
                          className="flex items-start gap-3 rounded-xl border border-border bg-white/70 px-4 py-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary">{si + 1}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-foreground leading-relaxed font-medium">
                              <BoldText text={step.action} />
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                              <span className="text-blue-600 font-semibold">왜? </span>
                              <BoldText text={step.reason} />
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={startQuestions}
                      className={[
                        'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]',
                        isFirst ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white',
                      ].join(' ')}
                    >
                      질문 1부터 실습 시작하기
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="questions"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={springGentle}
                  className="space-y-4"
                  ref={questionsRef}
                >
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        setPhase('overview');
                        setOpenSubStep(null);
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 shrink-0" />
                      실습 순서로 돌아가기
                    </button>
                    <span className="text-xs font-medium text-muted-foreground">
                      ChatGPT 질문 {practice.promptSteps.length}개 · 순서대로 진행하세요
                    </span>
                  </div>

                  <div className="space-y-3">
                    {practice.promptSteps.map((step, si) => {
                      const isSubOpen = openSubStep === si;
                      return (
                        <div
                          key={step.n}
                          className="rounded-xl border border-border bg-card overflow-hidden"
                          style={{ boxShadow: '0 2px 8px -4px oklch(0.48 0.18 240 / 0.08)' }}
                        >
                          <button
                            type="button"
                            onClick={() => toggleSubStep(si)}
                            className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-sm font-bold text-blue-600">
                                {step.n}
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-medium text-muted-foreground">ChatGPT 질문 {step.n}</div>
                                <div className="font-bold text-foreground text-sm sm:text-base leading-snug">
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
                                        <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2.5">
                                          <Lightbulb className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                          <p className="text-xs text-blue-700 leading-relaxed">
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

                  {next && (
                    <div className="pt-4 text-center">
                      <Link
                        to={next.to}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {next.label}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <ExampleStepNav prev={prev} next={next} />
      </div>
    </section>
  );
}
