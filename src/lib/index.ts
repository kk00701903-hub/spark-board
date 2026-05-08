// Route paths
export const ROUTE_PATHS = {
  HOME: '/',
} as const;

// Types
export interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  detail: string[];
  color: string;
}

export interface PromptTemplate {
  title: string;
  category: string;
  prompt: string;
  tip: string;
}

export interface CaseStudyData {
  label: string;
  before: string;
  after: string;
  reduction?: string;
}

// Education Steps Data
export const educationSteps: Step[] = [
  {
    id: 1,
    title: '페인포인트 발굴',
    subtitle: '무엇을 해결할지 명확화',
    icon: '🔍',
    description: '현업에서 반복적으로 시간을 낭비하거나 비효율이 발생하는 업무를 구체적으로 나열합니다.',
    detail: [
      '매일 반복하는 단순 작업 리스트업',
      '처리 시간이 오래 걸리는 업무 파악',
      '실수나 누락이 자주 발생하는 프로세스 확인',
      '담당자 부재 시 멈추는 업무 식별',
    ],
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    title: 'AI 페르소나 설정',
    subtitle: '전문가 역할 부여로 답변 전문성 확보',
    icon: '🤖',
    description: 'ChatGPT에게 구체적인 전문가 역할을 부여하면 일반 답변보다 훨씬 전문적인 결과를 얻을 수 있습니다.',
    detail: [
      '직무/산업 전문가 역할 명시',
      '분석 관점 사전 정의 (시장성, 기술, UX 등)',
      '원하는 출력 형식 미리 안내',
      '배경 정보와 제약 조건 함께 제공',
    ],
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 3,
    title: '반복적 구체화',
    subtitle: '질문-답변-보완의 사이클 실습',
    icon: '🔄',
    description: '한 번의 질문으로 완벽한 답변을 기대하지 말고, 점진적으로 아이디어를 발전시켜 나가는 과정이 핵심입니다.',
    detail: [
      '초안 생성 → 약점 발굴 → 보완 질문',
      'SCAMPER 기법으로 아이디어 확장',
      '"실패 확률 가장 높은 이유 3가지" 역질문',
      'Lean Canvas 형식으로 구조화',
    ],
    color: 'from-green-500 to-green-600',
  },
  {
    id: 4,
    title: '실행 가능성 검토',
    subtitle: '데이터 확보 가능성 및 비용 대비 효과 분석',
    icon: '📊',
    description: '아이디어가 실제로 구현 가능한지, 효과는 충분한지를 AI와 함께 검토합니다.',
    detail: [
      '필요 데이터 확보 가능성 점검',
      'API/시스템 연계 가능성 확인',
      '개발 난이도 및 비용 추정',
      '기대 효과의 정량화 (시간 단축, 비용 절감)',
    ],
    color: 'from-orange-500 to-orange-600',
  },
];

// Prompt Templates
export const promptTemplates: PromptTemplate[] = [
  {
    title: '역할 부여 프롬프트',
    category: 'Context Setting',
    prompt: `너는 10년 차 IT 서비스 기획자이자 비즈니스 전략가야. 지금부터 내가 제안하는 AI 아이디어를 다음 3가지 관점에서 분석해 줘:
1. 시장성 (실제 비즈니스 가치와 경쟁 우위)
2. 기술적 구현 가능성 (현재 AI 기술 수준에서의 실현 가능성)
3. 사용자 경험 (실제 사용자가 쉽고 편리하게 사용할 수 있는지)

아이디어: [여기에 당신의 아이디어를 입력하세요]`,
    tip: '구체적인 전문가 역할을 부여할수록 더 전문적인 분석을 받을 수 있습니다.',
  },
  {
    title: 'SCAMPER 확장 프롬프트',
    category: 'Idea Expansion',
    prompt: `아래 아이디어를 SCAMPER 기법으로 확장해 줘. 각 항목별로 구체적인 변형 아이디어를 2-3개씩 제안해 줘:
- S (Substitute): 대체할 수 있는 요소
- C (Combine): 결합할 수 있는 것
- A (Adapt): 응용할 수 있는 방법
- M (Modify/Magnify): 수정하거나 확대할 부분
- P (Put to other uses): 다른 용도로의 활용
- E (Eliminate): 제거할 수 있는 요소
- R (Reverse/Rearrange): 순서를 바꾸거나 뒤집으면?

현재 아이디어: [여기에 아이디어를 입력하세요]`,
    tip: 'SCAMPER 기법은 기존 아이디어의 틀을 깨고 새로운 가능성을 발견하는 데 효과적입니다.',
  },
  {
    title: 'Lean Canvas 작성 프롬프트',
    category: 'Business Structuring',
    prompt: `아래 AI 아이디어를 Lean Canvas 형식으로 정리해 줘. 표 형식으로 작성해 줘:
- 서비스 명칭
- 해결하는 문제 (Top 3)
- 타겟 고객 (얼리어답터 포함)
- 독특한 가치 제안 (UVP)
- 솔루션 (핵심 기능 3가지)
- 핵심 지표 (성공 측정 방법)
- 경쟁 우위 (복사하기 어려운 강점)
- 채널 (고객 접점)
- 수익 모델
- 비용 구조

아이디어: [여기에 아이디어를 입력하세요]`,
    tip: '비즈니스 모델을 한눈에 볼 수 있어 이해관계자에게 설명하기 용이합니다.',
  },
  {
    title: '역질문(Devil\'s Advocate) 프롬프트',
    category: 'Critical Thinking',
    prompt: `다음 AI 아이디어가 실패할 가능성이 높은 이유 5가지를 솔직하게 말해줘. 각 이유에 대해 대응 방안도 함께 제안해 줘:
[여기에 아이디어를 입력하세요]

분석 시 고려사항:
- 기술적 한계 및 구현 어려움
- 조직 내 도입 저항 (Change Management)
- 데이터 품질 및 확보 문제
- 비용 대비 효과
- 사용자 수용성`,
    tip: '아이디어의 약점을 미리 파악하면 제안서의 완성도가 크게 높아집니다.',
  },
];

// Case Study Stats
export const caseStudyStats: CaseStudyData[] = [
  { label: '전체 공고 추출', before: '수작업 검색', after: '90만건 자동 추출', reduction: '100% 자동화' },
  { label: '1차 필터링', before: '담당자 개별 검토', after: '1,700건 자동 선별', reduction: '99.8% 감소' },
  { label: 'AI 정밀 분석', before: '건당 5분 소요', after: '200건 적합 공고 도출', reduction: '80% 단축' },
  { label: '보고 주기', before: '주간 보고', after: '일간 자동 발송', reduction: '7배 빠름' },
];
