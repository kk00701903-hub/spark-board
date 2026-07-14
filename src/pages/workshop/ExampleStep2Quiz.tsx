import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ClipboardCheck, RotateCcw, ArrowRight } from 'lucide-react';
import { pickRandomQuestions, QUIZ_PICK_COUNT, type QuizQuestion } from './ideaQuizData';

export function ExampleStep2Quiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => pickRandomQuestions());
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce((acc, q) => {
    const selected = answers[q.id];
    if (selected === undefined) return acc;
    return acc + (q.options[selected]?.correct ? 1 : 0);
  }, 0);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
  };

  const handleRetry = () => {
    setQuestions(pickRandomQuestions());
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div id="step2-quiz" className="edu-card border-primary/30 overflow-hidden">
      <div className="px-5 py-5 sm:px-6 border-b border-border bg-primary/5">
        <div className="flex items-center gap-2 text-foreground font-semibold text-base sm:text-lg">
          <ClipboardCheck className="w-5 h-5 shrink-0 text-primary" />
          아이디어·제출 양식 이해도 확인 ({QUIZ_PICK_COUNT}문제)
        </div>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          STEP 1. 아이디어 구체화·제출 양식 내용을 바탕으로, 매번 다른 {QUIZ_PICK_COUNT}문제를 풀어 보세요.
        </p>
      </div>

      <div className="px-6 py-6 space-y-6 bg-card">
        {questions.map((q, index) => (
          <div key={q.id} className="rounded-xl border border-border p-5 sm:p-6">
            <p className="text-sm font-semibold text-foreground mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold mr-2">
                {index + 1}
              </span>
              {q.question}
            </p>
            <div className="space-y-2.5">
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi;
                const showResult = submitted;
                const isCorrect = opt.correct;
                return (
                  <label
                    key={oi}
                    className={[
                      'flex items-start gap-3 rounded-lg border px-3 py-3 text-sm cursor-pointer transition-colors',
                      !showResult && selected ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/30',
                      showResult && isCorrect ? 'border-green-300 bg-green-50' : '',
                      showResult && selected && !isCorrect ? 'border-red-300 bg-red-50' : '',
                      submitted ? 'cursor-default' : '',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name={`quiz-q${q.id}`}
                      checked={selected}
                      disabled={submitted}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                      className="mt-0.5 shrink-0"
                    />
                    <span className="text-muted-foreground leading-relaxed">{opt.label}</span>
                  </label>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed pl-1">
                <strong className="text-foreground">해설: </strong>
                {q.explanation}
              </p>
            )}
          </div>
        ))}

        {!submitted ? (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              제출하기
            </button>
            {!allAnswered && (
              <p className="text-xs text-muted-foreground mt-2">
                {QUIZ_PICK_COUNT}문제 모두 선택한 뒤 제출할 수 있어요.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-xl border-2 border-green-200 bg-green-50 px-5 py-4 text-center">
              <p className="text-lg font-bold text-green-900 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                {score} / {questions.length}점
              </p>
              <p className="text-sm text-green-800 mt-1 leading-relaxed">
                {score === questions.length
                  ? '완벽해요! 아이디어 구체화·제출 양식을 잘 이해했습니다.'
                  : score >= 3
                    ? '잘했어요! 해설을 보며 틀린 부분만 다시 확인해 보세요.'
                    : 'STEP 1. 아이디어 실습을 한 번 더 살펴본 뒤 다시 도전해 보세요.'}
              </p>
              <button
                type="button"
                onClick={handleRetry}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-green-800 hover:text-green-950"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                다시 풀기
              </button>
            </div>

            <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 px-6 py-8 text-center">
              <p className="text-lg font-bold text-foreground mb-2">
                STEP 2. 예제 실습 완료! 🎉
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
                오늘 교육에서는 여기까지입니다.
                STEP 3. (내 아이디어 직접 구현)는 교육이 끝난 뒤,
                각자 집이나 개인 시간에{' '}
                STEP 1.에서 정리한 내 아이디어로
                천천히 진행해 보세요.
              </p>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                STEP 3. 페이지는 미리 읽어볼 수 있지만, 오늘 수업 중에 바로 시작할 필요는 없어요.
              </p>
              <Link
                to="/workshop/implement"
                className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:opacity-90"
              >
                STEP 3. 내 아이디어 구현으로 이동
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
