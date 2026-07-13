import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ClipboardCheck, RotateCcw } from 'lucide-react';

type QuizOption = { label: string; correct: boolean };

type QuizQuestion = {
  id: number;
  question: string;
  options: QuizOption[];
  explanation: string;
};

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '예제 실습 1~2에서 ChatGPT 창을 닫지 말라고 한 이유는 무엇인가요?',
    options: [
      { label: '같은 창에서 이어 보내야 ChatGPT가 앞 질문 내용을 기억하기 때문', correct: true },
      { label: 'VS Code와 자동으로 연결되기 때문', correct: false },
      { label: '인터넷 속도가 빨라지기 때문', correct: false },
      { label: '엑셀 파일이 자동으로 만들어지기 때문', correct: false },
    ],
    explanation: '질문 1~5(또는 1~3)은 같은 ChatGPT 대화에서 이어서 보내야 맥락이 유지됩니다.',
  },
  {
    id: 2,
    question: '프로그램이 읽는 예제 엑셀 파일의 올바른 경로는?',
    options: [
      { label: 'D:\\example\\명단.xlsx', correct: true },
      { label: 'C:\\Users\\명단.xlsx', correct: false },
      { label: 'excel_printer\\명단.xlsx (프로젝트 폴더 안)', correct: false },
      { label: '바탕화면\\명단.xlsx', correct: false },
    ],
    explanation: '예제 프로그램은 D:\\example\\명단.xlsx 를 읽도록 설계되어 있습니다.',
  },
  {
    id: 3,
    question: '라이브러리를 설치하기 전에 터미널 앞에 (.venv)가 보여야 하는 이유는?',
    options: [
      { label: '가상환경 안에 라이브러리를 설치해 프로젝트별로 따로 관리하기 위해', correct: true },
      { label: 'VS Code 한국어 팩이 켜지기 위해', correct: false },
      { label: 'Python 버전을 자동으로 올리기 위해', correct: false },
      { label: '엑셀 파일을 자동으로 받기 위해', correct: false },
    ],
    explanation: '(.venv)는 가상환경에 들어갔다는 표시입니다. 이 상태에서 pip install 을 해야 합니다.',
  },
  {
    id: 4,
    question: 'pytest 실행 후 초록색 점(.)이 나오면 무엇을 의미하나요?',
    options: [
      { label: '테스트가 통과했다', correct: true },
      { label: '프로그램 GUI가 자동으로 실행됐다', correct: false },
      { label: 'ChatGPT 연결이 성공했다', correct: false },
      { label: '엑셀 파일이 인쇄됐다', correct: false },
    ],
    explanation: 'pytest 의 초록색 점(.)은 해당 테스트가 성공했다는 뜻입니다. 빨간 F 는 실패예요.',
  },
  {
    id: 5,
    question: '예제 실습 2에서 추가한 "미리보기" 기능의 목적은?',
    options: [
      { label: '실행·인쇄 전에 GUI에서 명단 목록을 먼저 확인하기 위해', correct: true },
      { label: '엑셀 파일을 인터넷에 자동 업로드하기 위해', correct: false },
      { label: 'ChatGPT 답을 자동으로 복사하기 위해', correct: false },
      { label: 'pytest 설치 없이 테스트하기 위해', correct: false },
    ],
    explanation: '미리보기는 "실행" 전에 A열 명단이 맞는지 GUI에서 확인하는 기능입니다.',
  },
];

export function ExampleStep2Quiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = QUIZ_QUESTIONS.reduce((acc, q) => {
    const selected = answers[q.id];
    if (selected === undefined) return acc;
    return acc + (q.options[selected]?.correct ? 1 : 0);
  }, 0);

  const allAnswered = QUIZ_QUESTIONS.every((q) => answers[q.id] !== undefined);

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div id="step2-quiz" className="edu-card border-primary/30 overflow-hidden">
      <div className="px-5 py-5 sm:px-6 border-b border-border bg-primary/5">
        <div className="flex items-center gap-2 text-foreground font-semibold text-base sm:text-lg">
          <ClipboardCheck className="w-5 h-5 shrink-0 text-primary" />
          예제 실습 이해도 확인 (5문제)
        </div>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          예제 실습 1·2를 모두 마쳤다면, 아래 5문제로 오늘 배운 내용을 간단히 점검해 보세요.
        </p>
      </div>

      <div className="px-6 py-6 space-y-6 bg-card">
        {QUIZ_QUESTIONS.map((q) => (
          <div key={q.id} className="rounded-xl border border-border p-4 sm:p-5">
            <p className="text-sm font-semibold text-foreground mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold mr-2">
                {q.id}
              </span>
              {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi;
                const showResult = submitted;
                const isCorrect = opt.correct;
                return (
                  <label
                    key={oi}
                    className={[
                      'flex items-start gap-3 rounded-lg border px-3 py-2.5 text-sm cursor-pointer transition-colors',
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
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed pl-1">
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
              <p className="text-xs text-muted-foreground mt-2">5문제 모두 선택한 뒤 제출할 수 있어요.</p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-xl border-2 border-green-200 bg-green-50 px-5 py-4 text-center">
              <p className="text-lg font-bold text-green-900 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                {score} / {QUIZ_QUESTIONS.length}점
              </p>
              <p className="text-sm text-green-800 mt-1 leading-relaxed">
                {score === QUIZ_QUESTIONS.length
                  ? '완벽해요! 2단계 예제 흐름을 잘 이해했습니다.'
                  : score >= 3
                    ? '잘했어요! 해설을 보며 틀린 부분만 다시 확인해 보세요.'
                    : '예제 실습 1·2를 한 번 더 살펴본 뒤 다시 도전해 보세요.'}
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
              <p className="text-lg font-bold text-foreground mb-2">2단계 예제 실습 완료! 🎉</p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
                오늘 교육에서는 여기까지입니다.
                <strong className="text-foreground"> 3단계(내 아이디어 직접 구현)</strong>는 교육이 끝난 뒤,
                각자 집이나 개인 시간에 <strong className="text-foreground">1단계에서 정리한 내 아이디어</strong>로
                천천히 진행해 보세요.
              </p>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                3단계 페이지는 미리 읽어볼 수 있지만, 오늘 수업 중에 바로 시작할 필요는 없어요.
              </p>
              <Link
                to="/workshop/implement"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/30 bg-card text-primary font-semibold text-sm transition-all hover:bg-primary/5"
              >
                3단계 안내 미리 보기
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
