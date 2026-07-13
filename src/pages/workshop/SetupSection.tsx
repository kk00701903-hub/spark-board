import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, ChevronUp,
  Download, MonitorPlay, Package, Terminal,
} from 'lucide-react';
import { springGentle, springSnappy } from '@/pages/home/animations';
import { CopyButton } from '@/pages/home/sections/CopyButton';
import { VsCodeExtensionsScreen, VsCodeVenvScreen } from '@/pages/workshop/SetupVsCodeScreens';

/** 2단계 예제(엑셀 명단 자동 인쇄)에서 바로 쓰는 라이브러리 */
const EXAMPLE_LIBS = ['tkcalendar', 'openpyxl', 'pytest'];

const LIBS = [
  ...EXAMPLE_LIBS,
  'pandas',
  'streamlit',
  'matplotlib',
  'seaborn',
  'folium',
  'finance-datareader',
  'bs4',
  'plotly',
  'python-docx',
  'pdfplumber',
  'pypdf',
  'PyPDF2',
  'openai',
  'langchain',
  'langchain-openai',
  'tiktoken',
  'faiss-cpu',
  'gTTS',
  'streamlit-audiorecorder',
  'langchain-community',
  'youtube-transcript-api',
];

const VENV_CREATE = 'python -m venv .venv';
const VENV_ACTIVATE_WIN = '.venv\\Scripts\\activate';
const VENV_ACTIVATE_MAC = 'source .venv/bin/activate';
const PIP_COMMAND = `pip install ${LIBS.join(' ')}`;

const setupSteps = [
  {
    id: 'vscode',
    icon: '💻',
    title: 'VS Code 설치',
    desc: '코드를 작성하고 실행하는 편집기입니다.',
    steps: [
      '브라우저에서 https://code.visualstudio.com 으로 이동합니다.',
      '파란색 "Download for Windows" 버튼을 눌러 설치 파일을 내려받습니다.',
      '내려받은 파일을 실행하고 "Next"를 계속 눌러 설치를 완료합니다.',
      'VS Code를 실행하면 화면 가운데 영문 편집기 화면이 나타납니다.',
    ],
    tip: 'VS Code 한국어 적용: 왼쪽 네모 4개 아이콘(Extensions) → 검색창에 "Korean" → "Korean Language Pack" → Install → Restart',
    link: { url: 'https://code.visualstudio.com', label: 'VS Code 공식 다운로드' },
  },
  {
    id: 'python',
    icon: '🐍',
    title: 'Python 설치',
    desc: 'AI 라이브러리 실습에 사용할 프로그래밍 언어입니다.',
    steps: [
      '브라우저에서 https://www.python.org/downloads 으로 이동합니다.',
      '"Download Python 3.xx.x" 버튼을 클릭해 설치 파일을 받습니다.',
      '설치 파일을 실행할 때 맨 아래 "Add Python to PATH" 체크박스를 반드시 체크합니다.',
      '"Install Now"를 눌러 설치를 완료합니다.',
      'VS Code 를 열고, 위쪽 메뉴 "Terminal → New Terminal" 을 클릭합니다.',
      '터미널에 python --version 을 입력하고 Enter를 누릅니다. 버전 번호가 출력되면 성공입니다.',
    ],
    tip: '"python"이 아닌 "python3"로 입력해야 하는 경우도 있습니다. 버전이 보이면 정상입니다.',
    link: { url: 'https://www.python.org/downloads', label: 'Python 공식 다운로드' },
  },
  {
    id: 'extensions',
    icon: '🔌',
    title: 'VS Code Python 확장 설치',
    desc: 'VS Code에서 Python 코드를 편리하게 실행하기 위한 플러그인입니다.',
    steps: [
      'VS Code 왼쪽 사이드바에서 네모 4개 아이콘(Extensions)을 클릭합니다.',
      '검색창에 "Python"을 입력하면 Microsoft에서 만든 "Python" 확장이 나타납니다.',
      '"Install" 버튼을 클릭해 설치합니다.',
      '같은 방법으로 "Pylance" 도 설치하면 자동완성이 더 잘 됩니다.',
    ],
    tip: '설치 후 .py 파일을 열면 오른쪽 아래에 Python 버전이 표시됩니다. 클릭해서 설치한 Python 버전을 선택하세요.',
  },
  {
    id: 'venv',
    icon: '🫧',
    title: '가상환경 만들기 · 들어가기',
    desc: '프로젝트마다 라이브러리를 따로 관리하기 위한 독립 공간입니다. 2단계 예제 실습 전에 꼭 설정하세요.',
    steps: [
      'VS Code에서 "File → Open Folder" 로 실습용 빈 폴더를 엽니다 (예: excel_printer).',
      '위쪽 메뉴 "Terminal → New Terminal" 을 클릭해 터미널을 엽니다.',
      '아래 "가상환경 만들기" 명령어를 복사해 터미널에 붙여넣고 Enter를 누릅니다.',
      '완료되면 폴더 안에 .venv 폴더가 생깁니다.',
      '이어서 아래 "가상환경 들어가기(Windows)" 명령어를 붙여넣고 Enter를 누릅니다.',
      '터미널 맨 앞에 (.venv) 가 보이면 가상환경에 들어간 것입니다. 이 상태에서 라이브러리를 설치합니다.',
    ],
    tip: 'Mac·리눅스는 "가상환경 들어가기(Mac/리눅스)" 명령어를 사용하세요. VS Code를 껐다 켜면 다시 activate 명령어를 한 번 더 실행해야 합니다.',
  },
  {
    id: 'libs',
    icon: '📦',
    title: '파이썬 라이브러리 한 번에 설치',
    desc: '가상환경(.venv) 안에서 실습에 필요한 라이브러리를 설치합니다. 2단계 예제용 tkcalendar·openpyxl·pytest 포함.',
    steps: [
      '터미널 맨 앞에 (.venv) 가 보이는지 확인합니다. 없으면 이전 단계의 "가상환경 들어가기" 명령어를 먼저 실행하세요.',
      '아래 복사 버튼을 눌러 설치 명령어를 복사합니다.',
      '터미널에 붙여넣고 Enter를 누릅니다.',
      '설치가 완료될 때까지 기다립니다. (인터넷 속도에 따라 2~10분 소요)',
      '설치가 끝나면 "Successfully installed ..." 메시지가 나타납니다.',
      '2단계 예제에서 GUI·엑셀·테스트에 쓰는 tkcalendar, openpyxl, pytest 가 포함되어 있는지 확인하세요.',
    ],
    tip: '오류가 나면 "python -m pip install ..." 로 바꿔 다시 시도해 보세요. tkcalendar만 따로 설치하려면: pip install tkcalendar openpyxl pytest',
  },
];

export function SetupSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="edu-section">
      <div className="edu-container">

        <div className="mb-6">
          <Link
            to="/workshop"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            실습 구성으로 돌아가기
          </Link>
        </div>

        <div className="mb-8">
          <div className="edu-badge mb-3">
            <Download className="w-4 h-4" /> 준비 단계 · 환경 설치
          </div>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            1단계 실습을 시작하기 전에 PC에 도구를 설치합니다.
            순서대로 따라하면 <strong className="text-foreground">약 15~20분</strong> 안에 완료됩니다.
          </p>
        </div>

        {/* 진행 단계 표시 */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {['VS Code 설치', 'Python 설치', '확장 설치', '가상환경', '라이브러리 설치'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground shadow-sm">
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                {label}
              </div>
              {i < 4 && <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />}
            </div>
          ))}
        </div>

        <div className="space-y-3 mb-10">
          {setupSteps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springSnappy, delay: i * 0.05 }}
              className="edu-card overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                    {step.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-primary">STEP {i + 1}</span>
                      <span className="font-bold text-foreground">{step.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{step.desc}</p>
                  </div>
                </div>
                {openIndex === i
                  ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                  : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                }
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={springGentle}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-border pt-6">
                      {step.id === 'venv' ? (
                        <div className="space-y-6">
                          <div className="grid lg:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-primary" /> 설정 순서
                              </h4>
                              <div className="space-y-2">
                                {step.steps.map((s, si) => (
                                  <div key={si} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                      <span className="text-xs font-bold text-primary">{si + 1}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{s}</p>
                                  </div>
                                ))}
                              </div>
                              {step.tip && (
                                <div className="mt-4 rounded-xl bg-yellow-50 border border-yellow-200 p-4">
                                  <p className="text-xs text-yellow-800 leading-relaxed">
                                    <strong>💡 팁:</strong> {step.tip}
                                  </p>
                                </div>
                              )}
                              <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                                <h4 className="text-xs font-semibold text-blue-800 mb-2">가상환경이란?</h4>
                                <p className="text-xs text-blue-700 leading-relaxed">
                                  프로젝트마다 필요한 라이브러리를 따로 보관하는 <strong>독립된 작업 공간</strong>이에요.
                                  가상환경에 들어간 뒤 설치한 패키지는 이 프로젝트에서만 사용됩니다.
                                  터미널 앞에 <strong>(.venv)</strong> 가 보이면 성공이에요.
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <MonitorPlay className="w-4 h-4 text-accent" /> VS Code 화면 예시
                              </h4>
                              <VsCodeVenvScreen />
                            </div>
                          </div>
                          <div className="space-y-4">
                            {[
                              { label: '1. 가상환경 만들기', cmd: VENV_CREATE },
                              { label: '2. 가상환경 들어가기 (Windows)', cmd: VENV_ACTIVATE_WIN },
                              { label: '3. 가상환경 들어가기 (Mac / 리눅스)', cmd: VENV_ACTIVATE_MAC },
                            ].map(({ label, cmd }) => (
                              <div key={label}>
                                <div className="flex items-center justify-between mb-2 gap-2">
                                  <h4 className="text-sm font-semibold text-foreground">{label}</h4>
                                  <CopyButton text={cmd} />
                                </div>
                                <pre className="text-xs font-mono text-foreground whitespace-pre-wrap leading-relaxed bg-muted/50 rounded-xl p-3 overflow-auto border border-border">
                                  {cmd}
                                </pre>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : step.id === 'extensions' ? (
                        <div className="grid lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary" /> 설치 순서
                            </h4>
                            <div className="space-y-2">
                              {step.steps.map((s, si) => (
                                <div key={si} className="flex items-start gap-3">
                                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-xs font-bold text-primary">{si + 1}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">{s}</p>
                                </div>
                              ))}
                            </div>
                            {step.tip && (
                              <div className="mt-4 rounded-xl bg-yellow-50 border border-yellow-200 p-4">
                                <h4 className="text-xs font-semibold text-yellow-800 mb-1">💡 팁</h4>
                                <p className="text-xs text-yellow-700 leading-relaxed">{step.tip}</p>
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                              <MonitorPlay className="w-4 h-4 text-accent" /> VS Code 화면 예시
                            </h4>
                            <VsCodeExtensionsScreen />
                          </div>
                        </div>
                      ) : step.id === 'libs' ? (
                        /* 라이브러리 설치 특별 레이아웃 */
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* 왼쪽: 순서 */}
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-primary" /> 설치 순서
                              </h4>
                              <div className="space-y-2">
                                {step.steps.map((s, si) => (
                                  <div key={si} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                      <span className="text-xs font-bold text-primary">{si + 1}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{s}</p>
                                  </div>
                                ))}
                              </div>
                              {step.tip && (
                                <div className="mt-4 rounded-xl bg-yellow-50 border border-yellow-200 p-4">
                                  <p className="text-xs text-yellow-800 leading-relaxed">
                                    <strong>💡 팁:</strong> {step.tip}
                                  </p>
                                </div>
                              )}
                            </div>
                            {/* 오른쪽: 라이브러리 목록 */}
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                <Package className="w-4 h-4 text-accent" /> 2단계 예제 필수 ({EXAMPLE_LIBS.length}개)
                              </h4>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {EXAMPLE_LIBS.map((lib) => (
                                  <span
                                    key={lib}
                                    className="text-xs font-mono px-2 py-1 rounded-md bg-primary/5 border border-primary/20 text-primary font-semibold"
                                  >
                                    {lib}
                                  </span>
                                ))}
                              </div>
                              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                                tkinter 는 Python 기본 내장(GUI) · tkcalendar(날짜 선택) · openpyxl(엑셀 읽기) · pytest(테스트)
                              </p>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <Package className="w-4 h-4 text-accent" /> 전체 설치 목록 ({LIBS.length}개)
                              </h4>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {LIBS.map((lib) => (
                                  <span
                                    key={lib}
                                    className={[
                                      'text-xs font-mono px-2 py-1 rounded-md border text-foreground',
                                      EXAMPLE_LIBS.includes(lib)
                                        ? 'bg-primary/10 border-primary/25 text-primary font-semibold'
                                        : 'bg-muted border-border',
                                    ].join(' ')}
                                  >
                                    {lib}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* 설치 명령어 */}
                          <div>
                            <div className="flex items-center justify-between mb-3 gap-2">
                              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <MonitorPlay className="w-4 h-4 text-accent" /> 터미널에 붙여넣을 명령어
                              </h4>
                              <CopyButton text={PIP_COMMAND} />
                            </div>
                            <pre className="text-xs font-mono text-foreground whitespace-pre-wrap leading-relaxed bg-muted/50 rounded-xl p-4 overflow-auto border border-border">
                              {PIP_COMMAND}
                            </pre>
                          </div>
                        </div>
                      ) : (
                        /* 일반 설치 단계 레이아웃 */
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary" /> 설치 순서
                            </h4>
                            <div className="space-y-2">
                              {step.steps.map((s, si) => (
                                <div key={si} className="flex items-start gap-3">
                                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-xs font-bold text-primary">{si + 1}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">{s}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-4">
                            {step.tip && (
                              <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-4">
                                <h4 className="text-xs font-semibold text-yellow-800 mb-1">💡 팁</h4>
                                <p className="text-xs text-yellow-700 leading-relaxed">{step.tip}</p>
                              </div>
                            )}
                            {step.link && (
                              <a
                                href={step.link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02]"
                              >
                                <Download className="w-4 h-4" />
                                {step.link.label}
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* 완료 후 다음 단계 안내 */}
        <div className="edu-card p-6 sm:p-8 text-center">
          <div className="text-3xl mb-3">✅</div>
          <h3 className="text-lg font-bold text-foreground mb-2">설치 완료! 이제 1단계로 넘어가세요.</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
            VS Code, Python, 가상환경, 라이브러리가 모두 준비됐다면 1단계 아이디어 구체화를 시작할 수 있습니다.
          </p>
          <Link
            to="/workshop/idea"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:opacity-90"
          >
            1단계 아이디어 구체화로 이동
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
