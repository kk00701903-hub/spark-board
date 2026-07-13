import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, ClipboardCheck, Clock } from 'lucide-react';
import { EXAMPLE_ROUTES, exampleHubPath } from '@/pages/workshop/examplePracticeData';

const QUIZ_TOPICS = [
  {
    title: 'ChatGPT 대화 유지',
    detail: '왜 같은 창에서 질문을 이어 보내야 하는지 확인합니다.',
  },
  {
    title: '예제 엑셀 경로',
    detail: '프로그램이 읽는 D:\\example\\명단.xlsx 경로를 정확히 아는지 점검합니다.',
  },
  {
    title: '가상환경 (.venv)',
    detail: '라이브러리 설치 전에 (.venv)가 보여야 하는 이유를 확인합니다.',
  },
  {
    title: 'pytest 결과 읽기',
    detail: '초록색 점(.)과 실패 표시가 무엇을 뜻하는지 확인합니다.',
  },
  {
    title: '미리보기 기능',
    detail: '예제 실습 2에서 추가한 미리보기가 왜 필요한지 확인합니다.',
  },
];

export function ExampleQuizGuideSection() {
  return (
    <section className="edu-section">
      <div className="edu-container">
        <div className="mb-6">
          <Link
            to={exampleHubPath('quiz')}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            예제 따라하기로 돌아가기
          </Link>
        </div>

        <div className="edu-card border-primary/30 overflow-hidden">
          <div className="px-5 py-5 sm:px-6 sm:py-6 border-b border-border bg-primary/5">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                ✅
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-primary/15 text-primary inline-flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    실습 내용 안내
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    3단계
                  </span>
                </div>
                <h2 className="font-semibold text-foreground text-lg sm:text-xl">이해도 확인</h2>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3 shrink-0" /> 약 10분 · 5문제
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6 space-y-6">
            <div className="rounded-xl border border-border bg-muted/30 p-4 sm:p-5 text-sm text-muted-foreground leading-relaxed">
              예제 실습 1·2를 마친 뒤, 오늘 배운 ChatGPT → VS Code 흐름을{' '}
              <strong className="text-foreground">객관식 5문제</strong>로 간단히 점검합니다.
              점수가 낮아도 괜찮아요. 틀린 문항의 설명을 읽고 다시 풀어보면 됩니다.
            </div>

            <div className="edu-card border-primary/25 bg-primary/5 px-5 py-4 flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground mb-1">퀴즈 전에 확인하세요</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  예제 실습 1(프로그램 뼈대)과 예제 실습 2(기능 추가·오류 수정)를 먼저 진행한 뒤
                  푸는 것을 권장합니다. 실습 중 본 경로·가상환경·pytest 내용을 그대로 물어봅니다.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">확인하는 내용</h3>
              <div className="space-y-3">
                {QUIZ_TOPICS.map((topic, i) => (
                  <div
                    key={topic.title}
                    className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 px-4 py-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">{i + 1}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-foreground leading-relaxed font-medium">{topic.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">{topic.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
              <Link
                to={exampleHubPath('quiz')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                이전
              </Link>
              <Link
                to={EXAMPLE_ROUTES.quiz}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:opacity-90"
              >
                퀴즈 시작하기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
