import { Download, Table2 } from 'lucide-react';
import { CopyButton } from '@/pages/home/sections/CopyButton';

/** 예제 실습 1 질문 1용 — A열 명단 샘플 */
export const EXAMPLE_NAME_LIST = [
  '이름',
  '홍길동',
  '김철수',
  '이영희',
  '박민수',
  '최지우',
  '정하늘',
  '강서연',
] as const;

/** 엑셀 A1에 붙여넣으면 각 줄이 A열 행으로 들어갑니다 */
export const EXAMPLE_NAME_LIST_PASTE = EXAMPLE_NAME_LIST.join('\n');

const SAMPLE_XLSX_URL = `${import.meta.env.BASE_URL}examples/mingdan.xlsx`;

export function ExampleExcelSamplePanel() {
  return (
    <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/60 overflow-hidden">
      <div className="px-4 py-3 border-b border-emerald-200 bg-emerald-50">
        <h4 className="text-sm font-semibold text-emerald-900 flex items-center gap-2">
          <Table2 className="w-4 h-4 shrink-0" />
          예제 엑셀 파일 (명단.xlsx)
        </h4>
        <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
          아래 방법 중 편한 것으로 <strong className="font-semibold">D:\example\명단.xlsx</strong> 를 준비하세요.
        </p>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={SAMPLE_XLSX_URL}
            download="명단.xlsx"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
          >
            <Download className="w-4 h-4 shrink-0" />
            예제 파일 다운로드
          </a>
          <span className="text-xs text-emerald-800">
            다운로드 후 <strong>D:\example</strong> 폴더에 넣고 이름이 <strong>명단.xlsx</strong> 인지 확인하세요.
          </span>
        </div>

        <div className="rounded-lg border border-emerald-200 bg-white overflow-hidden">
          <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-emerald-100 bg-emerald-50/50">
            <p className="text-xs font-medium text-emerald-900">
              또는 엑셀에 아래 내용 복사 → A1 셀에 붙여넣기
            </p>
            <CopyButton text={EXAMPLE_NAME_LIST_PASTE} />
          </div>
          <div className="px-3 py-2 overflow-x-auto">
            <table className="text-sm w-full max-w-xs">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="py-1.5 pr-4 font-medium">A열</th>
                </tr>
              </thead>
              <tbody>
                {EXAMPLE_NAME_LIST.map((name, i) => (
                  <tr key={name} className={i === 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                    <td className="py-1 pr-4 font-mono text-sm">{name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-3 pb-3 text-xs text-muted-foreground leading-relaxed">
            엑셀에서 A1을 선택한 뒤 「복사」한 내용을 붙여넣으면 A열에 한 줄씩 들어갑니다. 저장 위치는{' '}
            <strong className="text-foreground">D:\example\명단.xlsx</strong> 입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
