/** 2단계 예제 실습 — ChatGPT 정답 예시 (질문별) */

export const EX1_Q1_ANSWER = `1) 한 문장 요약
엑셀 명단 파일을 날짜별로 복사·이름 변경한 뒤, 첫 번째 열을 HTML로 만들어 브라우저에서 자동 인쇄하는 GUI 프로그램입니다.

2) 폴더·파일 구조
excel_printer/
├── src/
│   └── main.py          ← GUI + 엑셀 처리 + HTML 생성
├── tests/
│   └── test_main.py     ← 파일명·HTML 생성 테스트
├── requirements.txt     ← tkcalendar, openpyxl 등
├── README.md
└── output.html          ← 실행 시 자동 생성 (인쇄용)

3) 각 파일 역할
- src/main.py : tkinter 창, 날짜 선택, 실행 버튼, 엑셀 읽기, HTML 만들기
- tests/test_main.py : 파일 이름·HTML 내용이 맞는지 자동 확인
- requirements.txt : pip으로 설치할 라이브러리 목록
- README.md : 설치·실행 방법 설명서
- output.html : 인쇄할 명단 페이지 (프로그램이 만들어 줌)`;

export const EX1_Q2_ANSWER = `requirements.txt
\`\`\`
tkcalendar==1.6.1
openpyxl==3.1.5
pytest==8.3.4
\`\`\`

프로젝트 루트에 저장한 뒤 pip install -r requirements.txt 로 설치하면 됩니다.`;

export const EX1_Q3_ANSWER = `# 엑셀 명단 자동 인쇄 프로그램

엑셀 명단 파일을 날짜별로 저장하고, 첫 번째 열을 HTML로 만들어 브라우저에서 인쇄합니다.

## 필요 환경
- Python 3.11 이상
- Windows

## 사전 준비
1. D:\\example 폴더를 만듭니다.
2. Excel에서 A1에 "이름", A2부터 이름 목록을 입력합니다.
3. D:\\example\\명단.xlsx 로 저장합니다.

## 설치 방법
\`\`\`bash
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
\`\`\`

## 실행 방법
\`\`\`bash
python src/main.py
\`\`\`

GUI에서 날짜를 선택하고 [실행] 버튼을 누르면 HTML이 생성되고 인쇄 창이 열립니다.`;

export const EX1_Q4_ANSWER = `src/main.py
\`\`\`python
"""엑셀 명단 자동 인쇄 프로그램"""
import os
import shutil
import webbrowser
from pathlib import Path

import openpyxl
import tkinter as tk
from tkinter import messagebox
from tkcalendar import DateEntry

SRC_XLSX = Path(r"D:\\example\\명단.xlsx")


def make_new_filename(date_str: str) -> str:
    """날짜(YYYYMMDD)로 새 파일 이름을 만든다."""
    return f"명단_{date_str}.xlsx"


def read_first_column(filepath: str) -> list[str]:
    """엑셀 A열 전체를 읽어 목록으로 반환한다."""
    wb = openpyxl.load_workbook(filepath)
    ws = wb.active
    values: list[str] = []
    for row in ws.iter_rows(min_col=1, max_col=1, values_only=True):
        if row[0] is not None:
            values.append(str(row[0]))
    return values


def build_html(title: str, items: list[str]) -> str:
    """제목과 항목 목록으로 HTML 문자열을 만든다."""
    li_tags = "\\n".join(f"    <li>{item}</li>" for item in items)
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>{title}</title>
  <style>
    body {{ font-family: '맑은 고딕', sans-serif; margin: 40px; }}
    h1 {{ border-bottom: 2px solid #333; padding-bottom: 8px; }}
    ul {{ line-height: 2; }}
  </style>
</head>
<body>
  <h1>{title}</h1>
  <ul>
{li_tags}
  </ul>
  <script>window.onload = function() {{ window.print(); }};</script>
</body>
</html>"""


def run_export(date_str: str) -> str:
    """파일 복사 → A열 읽기 → HTML 생성 → 브라우저 열기"""
    if not SRC_XLSX.exists():
        raise FileNotFoundError(f"파일 없음: {SRC_XLSX}")

    new_name = make_new_filename(date_str)
    dest_path = SRC_XLSX.parent / new_name
    shutil.copy2(SRC_XLSX, dest_path)

    items = read_first_column(str(dest_path))
    title = dest_path.stem
    html = build_html(title, items)

    output_path = Path(__file__).parent.parent / "output.html"
    output_path.write_text(html, encoding="utf-8")
    webbrowser.open(output_path.as_uri())

    return f"완료! {new_name} ({len(items)}명)"


class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("명단 자동 인쇄 프로그램")
        self.resizable(False, False)

        tk.Label(self, text="날짜를 선택하세요:", font=("맑은 고딕", 11)).pack(padx=16, pady=8)
        self.date_entry = DateEntry(self, width=16, date_pattern="yyyy-mm-dd")
        self.date_entry.pack(padx=16, pady=4)

        tk.Button(self, text="▶ 실행", command=self._on_run,
                  font=("맑은 고딕", 11, "bold"), bg="steelblue", fg="white").pack(pady=16)

    def _on_run(self):
        date_str = self.date_entry.get_date().strftime("%Y%m%d")
        try:
            msg = run_export(date_str)
            messagebox.showinfo("완료", f"{msg}\\n브라우저에서 인쇄 창이 열립니다.")
        except Exception as e:
            messagebox.showerror("오류", str(e))


if __name__ == "__main__":
    App().mainloop()
\`\`\``;

export const EX1_Q5_ANSWER = `먼저 pytest 설치 (아직 안 했다면)
\`\`\`
pip install pytest
\`\`\`
※ 질문 2에서 pip install -r requirements.txt 를 실행했다면 pytest 는 이미 설치되어 있을 수 있습니다.

tests/test_main.py
\`\`\`python
"""파일명 생성·HTML 생성 로직 테스트"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))
from main import make_new_filename, build_html


def test_make_new_filename():
    """날짜로 명단_YYYYMMDD.xlsx 형식 이름이 만들어지는지 확인"""
    assert make_new_filename("20260617") == "명단_20260617.xlsx"


def test_build_html_contains_title_and_items():
    """HTML에 제목과 li 항목이 포함되는지 확인"""
    html = build_html("명단_20260617", ["이름", "홍길동", "김철수"])
    assert "<title>명단_20260617</title>" in html
    assert "<li>홍길동</li>" in html
    assert "window.print()" in html
\`\`\`

터미널에서 실행:
\`\`\`
pytest
\`\`\`
초록색 점(.) 이 나오면 성공입니다.`;

export const EX2_Q1_ANSWER = `1) 초등학생 설명
"엑셀에 적어 둔 이름 목록을 날짜별로 저장하고, 컴퓨터가 알아서 인쇄할 수 있는 종이(HTML)를 만들어 주는 프로그램이에요."

2) 기능 추가 시 고칠 부분
- src/main.py 의 App 클래스 (_build_ui, 버튼 연결 부분)
- GUI 위젯을 추가할 때는 __init__ 또는 별도 _build_ui 메서드`;

export const EX2_Q2_ANSWER = `변경 요약:
1. Listbox + Scrollbar를 GUI 중앙에 추가합니다.
2. "미리보기" 버튼을 누르면 read_first_column()으로 A열을 읽어 Listbox에 표시합니다.
3. "실행" 버튼 동작은 기존과 동일합니다.

src/main.py (전체)
\`\`\`python
# ... (기존 import·함수 동일) ...

class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("명단 자동 인쇄 프로그램")
        self.resizable(False, False)
        self._build_ui()

    def _build_ui(self):
        tk.Label(self, text="날짜를 선택하세요:").pack(padx=16, pady=8)
        self.date_entry = DateEntry(self, width=16, date_pattern="yyyy-mm-dd")
        self.date_entry.pack(padx=16, pady=4)

        # 미리보기 리스트박스
        tk.Label(self, text="명단 미리보기:").pack(anchor="w", padx=16)
        frame = tk.Frame(self)
        frame.pack(padx=16, pady=4)
        sb = tk.Scrollbar(frame)
        self.listbox = tk.Listbox(frame, height=8, width=28, yscrollcommand=sb.set)
        sb.config(command=self.listbox.yview)
        sb.pack(side="right", fill="y")
        self.listbox.pack(side="left")

        btn_frame = tk.Frame(self)
        btn_frame.pack(pady=12)
        tk.Button(btn_frame, text="📋 미리보기", command=self._preview).pack(side="left", padx=6)
        tk.Button(btn_frame, text="▶ 실행", command=self._on_run).pack(side="left", padx=6)

    def _preview(self):
        try:
            items = read_first_column(str(SRC_XLSX))
            self.listbox.delete(0, tk.END)
            for item in items:
                self.listbox.insert(tk.END, item)
        except Exception as e:
            messagebox.showerror("오류", str(e))

    def _on_run(self):
        # ... 기존 run_export 호출 동일 ...
\`\`\`

ChatGPT가 전체 코드를 한 상자로 주면 그대로 src/main.py 에 붙여 넣으세요.`;

export const EX2_Q3_ANSWER = `1) 오류 원인
D:\\example\\명단.xlsx 파일이 없어서 FileNotFoundError 가 발생했습니다.

2) 고칠 파일
src/main.py

3) 수정된 전체 코드
(파일이 없을 때 친절한 안내 메시지를 보여 주도록 run_export 또는 _on_run 에서 처리)

\`\`\`python
def run_export(date_str: str) -> str:
    if not SRC_XLSX.exists():
        raise FileNotFoundError(
            "D:\\\\example\\\\명단.xlsx 파일을 찾을 수 없어요.\\n"
            "1) D:\\\\example 폴더를 만들고\\n"
            "2) Excel에서 A열에 이름을 입력한 뒤\\n"
            "3) 명단.xlsx 로 저장해 주세요."
        )
    # ... 이하 동일 ...
\`\`\`

실제 오류 내용에 따라 ChatGPT 답이 달라질 수 있어요. 핵심은 오류 메시지 전체를 붙여 넣는 것입니다.`;
