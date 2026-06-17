import type { ReactNode } from 'react';

type ScreenFrameProps = {
  title: string;
  caption: string;
  children: ReactNode;
};

function ScreenFrame({ title, caption, children }: ScreenFrameProps) {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-[#1e1e1e] shadow-lg">
      <div className="flex items-center gap-2 px-3 py-2 bg-[#323233] border-b border-black/30">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[10px] sm:text-xs text-[#cccccc] font-medium truncate flex-1 text-center pr-8">
          {title}
        </span>
      </div>
      {children}
      <p className="text-xs text-muted-foreground bg-card px-3 py-2 border-t border-border leading-relaxed">
        {caption}
      </p>
    </div>
  );
}

function SideIcon({ active, label }: { active?: boolean; label: string }) {
  return (
    <div
      className={[
        'w-7 h-7 rounded flex items-center justify-center text-[9px] font-bold shrink-0',
        active ? 'bg-white/15 text-white' : 'text-[#858585]',
      ].join(' ')}
      title={label}
    >
      {label.slice(0, 1)}
    </div>
  );
}

/** STEP 3 — Extensions: Python · Pylance 설치 화면 예시 */
export function VsCodeExtensionsScreen() {
  return (
    <ScreenFrame
      title="Extensions — Visual Studio Code"
      caption="왼쪽 네모 4개 아이콘(Extensions) → 검색창에 Python 입력 → Microsoft Python · Pylance 설치"
    >
      <div className="flex min-h-[220px] text-[10px] sm:text-[11px]">
        <div className="w-9 bg-[#252526] border-r border-black/30 flex flex-col items-center gap-2 py-2 shrink-0">
          <SideIcon label="Explorer" />
          <SideIcon label="Search" />
          <SideIcon label="Git" />
          <SideIcon active label="Extensions" />
        </div>
        <div className="flex-1 bg-[#1e1e1e] p-2 sm:p-3 min-w-0">
          <div className="rounded border border-[#3c3c3c] bg-[#252526] px-2 py-1.5 text-[#cccccc] mb-2">
            @id:ms-python.python
          </div>
          <div className="rounded-lg border border-[#007acc]/50 bg-[#252526] p-2 mb-2">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded bg-[#3776ab] flex items-center justify-center text-white font-bold text-xs shrink-0">
                Py
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#cccccc] font-semibold">Python</span>
                  <span className="px-2 py-0.5 rounded bg-[#0e639c] text-white text-[9px] font-semibold shrink-0">
                    Install
                  </span>
                </div>
                <p className="text-[#858585] text-[9px] mt-0.5">Microsoft · 100M+ downloads</p>
                <p className="text-[#9cdcfe] text-[9px] mt-1 leading-relaxed">
                  IntelliSense, linting, debugging, code formatting…
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-[#3c3c3c] bg-[#252526] p-2">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded bg-[#4b4bff] flex items-center justify-center text-white font-bold text-[9px] shrink-0">
                PL
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#cccccc] font-semibold">Pylance</span>
                  <span className="px-2 py-0.5 rounded bg-[#0e639c] text-white text-[9px] font-semibold shrink-0">
                    Install
                  </span>
                </div>
                <p className="text-[#858585] text-[9px] mt-0.5">Microsoft · Fast Python language server</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

/** STEP 4 — 가상환경: 폴더 열기 + 터미널 (.venv) 화면 예시 */
export function VsCodeVenvScreen() {
  return (
    <ScreenFrame
      title="excel_printer — Visual Studio Code"
      caption="File → Open Folder 로 폴더 연 뒤, 터미널에서 가상환경 만들기·들어가기 → 앞에 (.venv) 표시 확인"
    >
      <div className="flex min-h-[240px] text-[10px] sm:text-[11px]">
        <div className="w-9 bg-[#252526] border-r border-black/30 flex flex-col items-center gap-2 py-2 shrink-0">
          <SideIcon active label="Explorer" />
          <SideIcon label="Search" />
          <SideIcon label="Git" />
          <SideIcon label="Extensions" />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 bg-[#1e1e1e] p-2 sm:p-3 border-b border-black/30">
            <p className="text-[#cccccc] font-semibold mb-2">EXPLORER</p>
            <div className="space-y-1 text-[#cccccc]">
              <p className="font-semibold text-[#4ec9b0]">▼ EXCEL_PRINTER</p>
              <p className="pl-3 text-[#9cdcfe]">▸ .venv</p>
              <p className="pl-3 text-[#858585] italic">(main.py는 2단계에서 만듭니다)</p>
            </div>
          </div>
          <div className="bg-[#1e1e1e]">
            <div className="flex items-center gap-3 px-2 py-1 bg-[#252526] border-b border-black/30 text-[#cccccc]">
              <span className="border-b border-[#cccccc] pb-0.5">TERMINAL</span>
              <span className="text-[#858585]">PROBLEMS</span>
              <span className="text-[#858585]">OUTPUT</span>
            </div>
            <pre className="p-2 sm:p-3 text-[#cccccc] font-mono text-[9px] sm:text-[10px] leading-relaxed overflow-x-auto">
{`PS C:\\Users\\student\\excel_printer> python -m venv .venv
PS C:\\Users\\student\\excel_printer> .venv\\Scripts\\activate
(.venv) PS C:\\Users\\student\\excel_printer> `}
              <span className="inline-block w-1.5 h-3 bg-[#cccccc] animate-pulse align-middle" />
            </pre>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}
