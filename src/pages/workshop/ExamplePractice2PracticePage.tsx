import { PageShell } from '@/pages/PageShell';
import { ExamplePracticeDetail } from '@/pages/workshop/ExamplePracticeDetail';
import { EXAMPLE_ROUTES, examplePractice2 } from '@/pages/workshop/examplePracticeData';

/** 실습용 프롬프트: ChatGPT 질문 실습 */
export default function ExamplePractice2PracticePage() {
  return (
    <PageShell
      title="예제실습2 직접 실습해보기"
      subtitle="기능 더하기 & 오류 고치기 · ChatGPT → VS Code"
    >
      <ExamplePracticeDetail
        practice={examplePractice2}
        practiceNumber={2}
        mode="questions"
        guideTo={EXAMPLE_ROUTES.ex2Guide}
        prevTo={EXAMPLE_ROUTES.ex2}
        nextTo={EXAMPLE_ROUTES.quiz}
      />
    </PageShell>
  );
}
