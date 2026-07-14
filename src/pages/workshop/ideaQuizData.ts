export type QuizOption = { label: string; correct: boolean };

export type QuizQuestion = {
  id: number;
  question: string;
  options: QuizOption[];
  explanation: string;
};

/** PDF Q1–Q30 중 Q4·Q6·Q8·Q9·Q11·Q12·Q13·Q25 제외 (실습 명칭·메타 문항·제외분 반영) */
export const IDEA_QUIZ_BANK: QuizQuestion[] = [
  {
    id: 1,
    question: '아이디어를 다듬은 뒤 최종 문안을 등록해야 하는 사내 시스템의 명칭은 무엇입니까?',
    options: [
      { label: 'AI 모델 학습 시스템', correct: false },
      { label: 'AI Idea Spark 포인트 관리시스템', correct: true },
      { label: '사내 아이디어 제안 포털', correct: false },
      { label: 'ChatGPT 통합 플랫폼', correct: false },
    ],
    explanation: "'AI OOO Spark OOO 관리시스템' 입니다.",
  },
  {
    id: 2,
    question: '최종 문안을 시스템에 등록하기 전, 아이디어를 다듬기 위해 활용하도록 명시된 AI 도구는 무엇입니까?',
    options: [
      { label: 'Midjourney', correct: false },
      { label: 'Claude', correct: false },
      { label: 'ChatGPT', correct: true },
      { label: 'Gemini', correct: false },
    ],
    explanation: '이미지 상단 설명글의 가장 첫 단어입니다.',
  },
  {
    id: 3,
    question: '제안 양식에서 필수적으로 작성해야 하는 항목이 아닌 것은 무엇입니까?',
    options: [
      { label: '제안 배경', correct: false },
      { label: 'AI 활용 시나리오', correct: false },
      { label: '기대 효과', correct: false },
      { label: '활용 데이터', correct: true },
    ],
    explanation: "별표(*)가 없는 항목을 찾으세요.",
  },
  {
    id: 5,
    question: '선택 입력 항목에 해당하는 것은 무엇입니까?',
    options: [
      { label: '관련 시스템', correct: true },
      { label: '제안 배경', correct: false },
      { label: 'AI 활용 시나리오', correct: false },
      { label: '기대 효과', correct: false },
    ],
    explanation: "항목명 옆에 '(선택)'이라고 적힌 것을 떠올려보세요.",
  },
  {
    id: 7,
    question: 'ChatGPT로 아이디어를 다듬은 후, 완성된 문안을 시스템에 그대로 붙여넣는 단계는 몇 번 실습입니까?',
    options: [
      { label: '실습 1', correct: false },
      { label: '실습 2', correct: false },
      { label: '실습 3', correct: true },
      { label: '실습 4', correct: false },
    ],
    explanation: '회사 시스템·업무 프로세스 알려주기와 연관된 실습 번호입니다.',
  },
  {
    id: 10,
    question: "실습 2의 주제인 '아이디어 Lean Canvas 작성'의 난이도는 무엇입니까?",
    options: [
      { label: '입문', correct: false },
      { label: '초급', correct: false },
      { label: '중급', correct: true },
      { label: '고급', correct: false },
    ],
    explanation: '초급 다음 단계입니다. 노란색 뱃지입니다.',
  },
  {
    id: 14,
    question: '페인포인트(Pain Point)의 가장 정확한 정의는 무엇입니까?',
    options: [
      { label: '사용자가 원하는 이상적인 미래 상황', correct: false },
      { label: '업무 중 겪는 불편함이나 문제점', correct: true },
      { label: '경쟁사의 취약점', correct: false },
      { label: '도입할 AI의 기술적 한계', correct: false },
    ],
    explanation: 'Pain(고통)이라는 단어의 의미를 생각해보세요.',
  },
  {
    id: 15,
    question: "아이디어 기획 시 '해결책(AI 솔루션)'보다 '페인포인트'를 먼저 정의해야 하는 가장 큰 이유는?",
    options: [
      { label: '보고서 분량을 채우기 위해', correct: false },
      { label: '진짜 필요한(가치 있는) 문제를 풀기 위해', correct: true },
      { label: '예산을 많이 배정받기 위해', correct: false },
      { label: '기술 부서의 업무를 줄이기 위해', correct: false },
    ],
    explanation: '문제가 명확해야 올바른 답이 나옵니다.',
  },
  {
    id: 16,
    question: '다음 중 페인포인트로 보기 가장 어려운 것은?',
    options: [
      { label: '데이터 취합에 하루 3시간이 소요됨', correct: false },
      { label: '수작업 복사-붙여넣기로 인한 오타 발생 잦음', correct: false },
      { label: '최신 생성형 AI 모델을 우리 팀도 도입하고 싶음', correct: true },
      { label: '고객 클레임 분류에 너무 많은 인력이 투입됨', correct: false },
    ],
    explanation: "단순한 '도입 희망'은 현상의 문제점이 아닙니다.",
  },
  {
    id: 17,
    question: "페인포인트를 양식의 '제안 배경'에 작성할 때 가장 설득력을 높이는 방법은?",
    options: [
      { label: '감정적인 형용사를 많이 사용한다', correct: false },
      { label: '관련된 정량적 수치(시간, 비용, 횟수 등)를 포함한다', correct: true },
      { label: '어려운 기술 용어를 최대한 많이 넣는다', correct: false },
      { label: '무조건 AI가 아니면 안 된다고 주장한다', correct: false },
    ],
    explanation: '객관적인 근거가 필요합니다.',
  },
  {
    id: 18,
    question: '다음 중 가장 잘 작성된 페인포인트 문장은 무엇입니까?',
    options: [
      { label: '보고서 쓰는 게 너무 힘들다.', correct: false },
      { label: '수기 작업이 많아 효율성이 떨어진다.', correct: false },
      {
        label: '매일 아침 3개 시스템의 매출 데이터를 엑셀로 취합하는 데 2시간이 낭비되고 있다.',
        correct: true,
      },
      { label: '요즘 유행하는 RPA를 우리도 써야 한다.', correct: false },
    ],
    explanation: '구체적인 대상, 수치, 문제 상황이 모두 포함된 것을 고르세요.',
  },
  {
    id: 19,
    question: "본인의 업무가 아닌 타 부서의 문제보다 '내 페인포인트'부터 찾는 것을 권장하는 이유는?",
    options: [
      { label: '다른 부서와 소통하기 귀찮아서', correct: false },
      { label: '내 업무의 도메인 지식과 문제 심각성을 가장 잘 알기 때문', correct: true },
      { label: '내 인사고과만 올리기 위해서', correct: false },
      { label: '보안을 유지하기 위해서', correct: false },
    ],
    explanation: '자신이 직접 겪은 일일수록 문제 정의가 정확해집니다.',
  },
  {
    id: 20,
    question: '실무자가 자신의 페인포인트를 발굴하기 위해 던지기 좋은 질문이 아닌 것은?',
    options: [
      { label: '어떤 작업에 시간이 가장 많이 허비되는가?', correct: false },
      { label: '단순 반복적인 수작업은 무엇인가?', correct: false },
      { label: '실수가 잦아 스트레스 받는 업무는 무엇인가?', correct: false },
      { label: '경쟁사는 어떤 AI를 쓰고 있는가?', correct: true },
    ],
    explanation: '내 내부의 문제에 집중해야 합니다.',
  },
  {
    id: 21,
    question: "'AI 활용 시나리오' 항목을 작성할 때 반드시 들어가야 할 핵심 내용은?",
    options: [
      { label: '도입할 하드웨어 서버의 상세 스펙', correct: false },
      { label: '입력 데이터, AI 처리 방식, 최종 결과물로 이어지는 워크플로우', correct: true },
      { label: '프로젝트 예산 상세 내역', correct: false },
      { label: 'AI 모델의 수학적 알고리즘 증명', correct: false },
    ],
    explanation: "사용자가 어떻게 이 AI를 쓰게 될지 '이야기'처럼 보여주어야 합니다.",
  },
  {
    id: 22,
    question: '기대 효과를 작성할 때 가장 주의해야 할 점은?',
    options: [
      {
        label: '제안 배경(페인포인트)의 문제가 어떻게 해결되는지 연결지어 작성해야 한다',
        correct: true,
      },
      { label: '최대한 추상적이고 거창한 비전을 적어야 한다', correct: false },
      { label: '글자 수를 무조건 1,000자에 꽉 채워야 한다', correct: false },
      { label: '부정적인 예측만 가득 적어야 한다', correct: false },
    ],
    explanation: 'Before(배경)와 After(기대효과)가 맞물려야 합니다.',
  },
  {
    id: 23,
    question: "'관련 시스템(선택)' 항목에 작성하기 적절한 내용은 무엇입니까?",
    options: [
      { label: '내가 매일 쓰는 키보드와 마우스 기종', correct: false },
      { label: 'AI와 연동되어야 할 사내 ERP나 그룹웨어 등의 명칭', correct: true },
      { label: '경쟁사의 IT 시스템 이름', correct: false },
      { label: '우리 집 컴퓨터 사양', correct: false },
    ],
    explanation: 'AI 아이디어가 사내 인프라 어디에 붙을지를 묻는 것입니다.',
  },
  {
    id: 24,
    question: '성공적인 아이디어 구체화를 위해 지켜야 할 가장 중요한 논리적 흐름은?',
    options: [
      { label: '기술 설명 → 예산 요청 → 팀원 모집', correct: false },
      {
        label: '페인포인트(배경) → AI 도입 방안(시나리오) → 해결 결과(기대효과)',
        correct: true,
      },
      { label: '기대효과 → 관련 시스템 → 활용 데이터', correct: false },
      { label: 'ChatGPT 질문 → 답변 복사 → 제출', correct: false },
    ],
    explanation: '문제 제기 - 해결책 제시 - 결과 예측의 자연스러운 흐름입니다.',
  },
  {
    id: 26,
    question: "다음 중 AI 아이디어의 '활용 데이터'로 적절하지 않은 것은?",
    options: [
      { label: '과거 3년간의 월별 매출 내역 엑셀 파일', correct: false },
      { label: '고객센터에 접수된 VOC 텍스트 로그', correct: false },
      { label: '영업 사원들의 직감과 기분', correct: true },
      { label: '공장 설비의 실시간 온도 센서 데이터', correct: false },
    ],
    explanation: '데이터는 컴퓨터가 학습할 수 있는 객관적인 형태여야 합니다.',
  },
  {
    id: 27,
    question: "아이디어 제안 시 '글자 수 제한'을 두는 가장 주된 이유는 무엇일까요?",
    options: [
      { label: '서버 용량을 아끼기 위해', correct: false },
      { label: '핵심 내용만 간결하고 명확하게 요약하여 전달하게 하기 위해', correct: true },
      { label: '직원들이 타자 치는 것을 싫어해서', correct: false },
      { label: '평가자가 글을 길게 읽기 싫어서', correct: false },
    ],
    explanation: '기획서는 장황한 것보다 핵심만 담는 것이 중요합니다.',
  },
  {
    id: 28,
    question: "실습 3 '회사 시스템·업무 프로세스 알려주기'가 필요한 이유는 무엇입니까?",
    options: [
      { label: '동료들에게 내 업무를 자랑하기 위해', correct: false },
      { label: '범용 AI(ChatGPT)에게 우리 회사의 특수한 맥락을 이해시키기 위해', correct: true },
      { label: '업무 매뉴얼 책자를 만들기 위해', correct: false },
      { label: '보안 부서에 신고하기 위해', correct: false },
    ],
    explanation: 'AI는 우리 회사의 내부 사정을 기본적으로 알지 못합니다.',
  },
  {
    id: 29,
    question: "다음 중 '초급' 난이도에 해당하는 실습들로만 묶인 것은?",
    options: [
      { label: '실습 1, 실습 2', correct: false },
      { label: '실습 1, 실습 3', correct: true },
      { label: '실습 3, 실습 4', correct: false },
      { label: '실습 4, 실습 5', correct: false },
    ],
    explanation: '시계 옆의 초록색 뱃지를 확인하세요.',
  },
  {
    id: 30,
    question: '이 전체 교육/실습 과정이 궁극적으로 목표로 하는 것은 무엇입니까?',
    options: [
      { label: '전 직원의 파이썬 코딩 마스터', correct: false },
      {
        label: '임직원 스스로 현업의 문제를 찾고 AI를 활용해 기획안을 완성하는 역량 강화',
        correct: true,
      },
      { label: '사내 새로운 시스템 구축을 위한 외주 업체 선정', correct: false },
      { label: '단순히 퀴즈 만점 받기', correct: false },
    ],
    explanation: '모든 과정은 현업 주도의 아이디어 구체화에 초점이 맞춰져 있습니다.',
  },
];

export const QUIZ_PICK_COUNT = 5;

/** Fisher–Yates 셔플 후 앞에서 n개 */
export function pickRandomQuestions(
  bank: QuizQuestion[] = IDEA_QUIZ_BANK,
  count: number = QUIZ_PICK_COUNT,
): QuizQuestion[] {
  const arr = [...bank];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(count, arr.length));
}
