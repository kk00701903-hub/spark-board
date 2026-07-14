import { PageShell } from '@/pages/PageShell';
import { ExamplePracticeDetail } from '@/pages/workshop/ExamplePracticeDetail';
import { EXAMPLE_ROUTES, exampleHubPath, examplePractice1 } from '@/pages/workshop/examplePracticeData';

/** 실습용 프롬프트: ChatGPT 질문 실습 */
export default function ExamplePractice1PracticePage() {
  return (
    <PageShell
      title="예제실습1 직접 실습해보기"
      subtitle="엑셀 명단 자동 인쇄 프로그램 · ChatGPT → VS Code"
    >
      <ExamplePracticeDetail
        practice={examplePractice1}
        practiceNumber={1}
        mode="questions"
        guideTo={EXAMPLE_ROUTES.ex1Guide}
        prevTo={EXAMPLE_ROUTES.ex1}
        nextTo={exampleHubPath('ex-2')}
      />
    </PageShell>
  );
}
