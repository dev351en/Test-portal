"""Publish both assigned papers and the questions-only viewer assets.

Run with the worksheet project's Python environment (PyMuPDF is required):
  python scripts/build-full-syllabus-paper.py --source-dir "../DASS/D3V3NDRA Classes"

Produces both ordered banks, the result-stage worksheets, the diagram assets
and the in-exam page images. The viewer PDFs are questions-only; the answer
key is never part of them:
  - test_questions.js                                    Worksheet 3 Grade 7 bank (11 AM-3 PM)
  - worksheet4_questions.js                              Worksheet 4 Grade 7 bank (4-9 PM)
  - class2_questions.js                                  ordered 35-question Class 2 bank
  - assets/worksheet-full-syllabus-comprehensive.pdf     Worksheet 3 full worksheet (result download)
  - assets/worksheet-full-syllabus-questions-only.pdf    Worksheet 3 questions pages 1-3 only
  - assets/worksheet-combined-worksheet-4.pdf            Worksheet 4 full worksheet (result download)
  - assets/worksheet-combined-worksheet-4-questions-only.pdf  Worksheet 4 questions pages 1-3 only
  - assets/class7-worksheet3/qNN.svg                     Worksheet 3 figure assets
  - assets/class7-worksheet4/qNN.svg                     Worksheet 4 figure assets
  - assets/worksheet-class2-olympiad.pdf                 Class 2 full worksheet (result download)
  - assets/worksheet-class2-olympiad-questions-only.pdf  Class 2 questions pages 1-7 only
  - assets/class2-olympiad/qNN.svg                       Class 2 diagram assets
  - js/paper_pages.js                                    page images for the in-exam View Paper viewer
"""
import argparse
import base64
import html
import importlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import xml.etree.ElementTree as ET

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
GRADE7_PAPERS = [
    {
        "id": "class7-combined-worksheet-3",
        "label": "Worksheet 3",
        "source": "output/Class_7_Combined_Worksheet_3.pdf",
        "tex": "output/Class_7_Combined_Worksheet_3.tex",
        "full": ROOT / "assets/worksheet-full-syllabus-comprehensive.pdf",
        "questions": ROOT / "assets/worksheet-full-syllabus-questions-only.pdf",
        "assets": ROOT / "assets/class7-worksheet3",
        "asset_prefix": "assets/class7-worksheet3",
        "data_module": "data_combined_worksheet_3",
        "bank_file": "test_questions.js",
        "bank_global": "QUESTIONS",
        "diagram_questions": {5, 14, 15, 20, 24, 31, 32, 46, 49},
    },
    {
        "id": "class7-combined-worksheet-4",
        "label": "Worksheet 4",
        "source": "output/Class_7_Combined_Worksheet_4.pdf",
        "tex": "output/Class_7_Combined_Worksheet_4.tex",
        "full": ROOT / "assets/worksheet-combined-worksheet-4.pdf",
        "questions": ROOT / "assets/worksheet-combined-worksheet-4-questions-only.pdf",
        "assets": ROOT / "assets/class7-worksheet4",
        "asset_prefix": "assets/class7-worksheet4",
        "data_module": "data_combined_worksheet_4",
        "bank_file": "worksheet4_questions.js",
        "bank_global": "QUESTIONS_WORKSHEET_4",
        "diagram_questions": {5, 14, 15, 20, 22, 24, 33, 34, 46, 49},
    },
]
GRADE7_QUESTION_PAGES = 3
GRADE7_DIAGRAM_SCALE = 1.8
GRADE2_SOURCE = "output/Worksheet Class 2 Mathematics Olympiad.pdf"
GRADE2_FULL = ROOT / "assets/worksheet-class2-olympiad.pdf"
GRADE2_QUESTIONS = ROOT / "assets/worksheet-class2-olympiad-questions-only.pdf"
GRADE2_ASSETS = ROOT / "assets/class2-olympiad"
PAGE_SCALE = 1.8
DIAGRAM_RE = re.compile(r"<div\s+class=['\"]q-diag['\"]>\s*\{([A-Z0-9_]+)\}\s*</div>", re.I)
TAG_RE = re.compile(r"<[^>]+>")
CLASS2_CATEGORIES = {
    "Logical Reasoning": "Logical Reasoning",
    "Mathematical Reasoning": "Mathematical Reasoning",
    "Everyday Mathematics": "Everyday Mathematics",
    "Achievers Section (HOTS)": "HOTS",
}
GRADE7_CATEGORIES = {
    "Logical Reasoning": "Logical Reasoning",
    "Mathematical Reasoning": "Mathematical Reasoning",
    "Everyday Mathematics": "Everyday Mathematics",
    "Achievers (HOTS)": "HOTS",
    "Achievers (Tough / HOTS)": "HOTS",
}
GRADE7_DIAGRAM_PREAMBLE = r"""
\documentclass[border=3pt]{standalone}
\usepackage[T1]{fontenc}
\usepackage{lmodern}
\usepackage{amsmath,amssymb,amsfonts}
\usepackage{tikz}
\usetikzlibrary{arrows.meta,calc}
\definecolor{navy}{HTML}{032356}
\definecolor{electricblue}{HTML}{008EF5}
\definecolor{darkblue}{HTML}{0B244D}
\definecolor{paleblue}{HTML}{EEF6FC}
\definecolor{gold}{HTML}{B45309}
\definecolor{palegold}{HTML}{FEF3C7}
\definecolor{lightgray}{HTML}{F8FAFC}
\definecolor{linegray}{HTML}{CBD5E1}
\definecolor{ink}{HTML}{0F172A}
\definecolor{ansgreen}{HTML}{166534}
\definecolor{palegreen}{HTML}{F0FDF4}
\begin{document}
"""


def uri(data):
    return "data:image/png;base64," + base64.b64encode(data).decode("ascii")


def plain_text(value):
    """Turn the approved HTML question/solution markup into display text."""
    value = re.sub(r"<br\s*/?>", " ", value, flags=re.I)
    value = TAG_RE.sub("", value)
    value = html.unescape(value)
    return re.sub(r"\s+", " ", value).strip()


def extract_grade7_bank(data):
    bank = []
    for item in data:
        assert item["ans"] in "ABCD" and len(item["options"]) == 4
        assert item["category"] in GRADE7_CATEGORIES, item["category"]
        for value in [item["q"], item["sol"], *item["options"]]:
            assert "<" not in value and ">" not in value, f"Q{item['num']}: raw HTML"
        bank.append({
            "id": item["num"],
            "q": item["q"],
            "opts": list(item["options"]),
            "ans": "ABCD".index(item["ans"]),
            "cat": GRADE7_CATEGORIES[item["category"]],
            "sol": item["sol"],
        })
    nums = [q["id"] for q in bank]
    assert nums == list(range(1, 51)), nums
    assert sum(1 for q in bank if q["cat"] == "Logical Reasoning") == 15
    assert sum(1 for q in bank if q["cat"] == "Mathematical Reasoning") == 20
    assert sum(1 for q in bank if q["cat"] == "Everyday Mathematics") == 10
    assert sum(1 for q in bank if q["cat"] == "HOTS") == 5
    return bank


def write_grade7_diagrams(tex_path, out_dir, expected_questions, asset_prefix, label):
    """Compile the source TikZ figures into standalone SVGs for the live exam."""
    text = tex_path.read_text(encoding="utf-8")
    markers = [(m.start(), int(m.group(1)))
               for m in re.finditer(r"\\textbf\{\\color\{navy\}Q(\d+)\.\}", text)]
    blocks = [(m.start(), m.group(0))
              for m in re.finditer(r"\\begin\{tikzpicture\}.*?\\end\{tikzpicture\}", text, re.S)]
    found = {}
    out_dir.mkdir(parents=True, exist_ok=True)
    for stale in out_dir.glob("q*.svg"):
        stale.unlink()
    with tempfile.TemporaryDirectory(prefix="grade7-diagrams-") as tmp:
        work = Path(tmp)
        for position, block in blocks:
            number = [num for start, num in markers if start < position][-1]
            assert number in expected_questions, f"{label}: unexpected diagram for Q{number}"
            scaled = re.sub(
                r"\[scale=([0-9.]+)",
                lambda match: f"[scale={float(match.group(1)) * GRADE7_DIAGRAM_SCALE:.3f}",
                block, count=1)
            (work / "diagram.tex").write_text(
                GRADE7_DIAGRAM_PREAMBLE + scaled + "\n\\end{document}\n", encoding="utf-8")
            result = subprocess.run(
                ["pdflatex", "-interaction=nonstopmode", "-halt-on-error", "diagram.tex"],
                cwd=work, capture_output=True, text=True, timeout=120)
            if result.returncode != 0:
                raise RuntimeError(f"{label} Q{number}: pdflatex failed\n{result.stdout[-2000:]}")
            with pymupdf.open(work / "diagram.pdf") as doc:
                svg = doc[0].get_svg_image(text_as_path=True)
            if not svg.lstrip().startswith("<?xml"):
                svg = '<?xml version="1.0" encoding="UTF-8"?>\n' + svg.lstrip()
            assert "<svg" in svg[:400].lower(), f"{label} Q{number}: invalid SVG"
            ET.fromstring(svg)
            target = out_dir / f"q{number:02}.svg"
            target.write_text(svg, encoding="utf-8")
            found[number] = f"{asset_prefix}/q{number:02}.svg"
            print(f"{label} Q{number}: figure written ({target.stat().st_size:,} bytes)")
    assert set(found) == expected_questions, found.keys()
    return found


def assert_grade7_key_matches_pdf(pdf_path, bank, label):
    with pymupdf.open(pdf_path) as doc:
        assert len(doc) == 7, f"{label} PDF: expected 7 pages, got {len(doc)}"
        key_text = doc[3].get_text()
    section = key_text.split("Quick Evaluation Matrix", 1)[1].split("Easy:", 1)[0]
    pairs = re.findall(r"(?m)^\s*(\d{1,2})\s*\n\s*([A-D])\s*$", section)
    assert len(pairs) == 50, f"{label} answer key: found {len(pairs)} entries"
    keyed = {int(number): letter for number, letter in pairs}
    assert sorted(keyed) == list(range(1, 51))
    for item in bank:
        assert keyed[item["id"]] == "ABCD"[item["ans"]], f"{label} Q{item['id']}"
    print(f"{label} answer key: all 50 entries match the printed matrix.")


def extract_class2_bank(data, svg_module):
    bank = []
    diagrams = {}
    for item in data["questions"]:
        num = item["num"]
        raw_question = item["q"]
        placeholders = DIAGRAM_RE.findall(raw_question)
        assert len(placeholders) <= 1, f"Q{num}: multiple diagram placeholders"
        diagram = ""
        if placeholders:
            placeholder = placeholders[0]
            assert placeholder in svg_module.SVG_GENERATORS, f"Q{num}: unknown {placeholder}"
            relative = f"assets/class2-olympiad/q{num:02}.svg"
            svg = html.unescape(svg_module.SVG_GENERATORS[placeholder]())
            ET.fromstring(svg)  # reject malformed standalone SVG
            diagrams[num] = (relative, svg)
            diagram = relative
            raw_question = DIAGRAM_RE.sub(" ", raw_question)
        assert "{SVG_" not in raw_question, f"Q{num}: unrendered diagram placeholder"
        options = item["options"]
        assert sorted(options) == list("ABCD"), f"Q{num}: option keys"
        assert item["ans"] in "ABCD", f"Q{num}: answer key"
        category = CLASS2_CATEGORIES[item["category"]]
        bank.append({
            "id": num,
            "q": plain_text(raw_question),
            "opts": [plain_text(options[letter]) for letter in "ABCD"],
            "ans": "ABCD".index(item["ans"]),
            "marks": 2,
            "cat": category,
            "sol": plain_text(item["sol"]),
            "diagram": diagram,
        })
    nums = [q["id"] for q in bank]
    assert nums == list(range(1, 36)), nums
    assert all(q["marks"] == 2 for q in bank)
    assert sum(q["marks"] for q in bank) == 70
    assert sum(1 for q in bank if q["cat"] == "Logical Reasoning") == 5
    assert sum(1 for q in bank if q["cat"] == "Mathematical Reasoning") == 15
    assert sum(1 for q in bank if q["cat"] == "Everyday Mathematics") == 10
    assert sum(1 for q in bank if q["cat"] == "HOTS") == 5
    assert len(diagrams) == 15
    assert sum(1 for q in bank if q["diagram"]) == 15
    return bank, diagrams


def assert_class2_key_matches_pdf(pdf_path, bank):
    with pymupdf.open(pdf_path) as doc:
        assert len(doc) == 9, f"Class 2 PDF: expected 9 pages, got {len(doc)}"
        key_text = doc[7].get_text()
    pairs = re.findall(r"Q(\d{2})\s*\n\s*\(([A-D])\)", key_text)
    assert len(pairs) == 35, f"Class 2 answer key: found {len(pairs)} entries"
    assert [int(number) for number, _ in pairs] == list(range(1, 36))
    for number, letter in pairs:
        assert bank[int(number) - 1]["ans"] == "ABCD".index(letter), number
    print("Class 2 answer key: all 35 entries match the printed matrix.")


def write_grade7_bank(config, bank):
    header = (
        f"// D3V3NDRA Classes - Grade 7 Full Syllabus Comprehensive Olympiad (50 MCQs).\n"
        f"// Generated by scripts/build-full-syllabus-paper.py from Combined {config['label']}.\n"
        "// Questions and options are in exact worksheet order; js/app.js does not shuffle them.\n"
        "// The answer key stays application-side; the in-exam paper viewer has questions only.\n"
    )
    global_name = config["bank_global"]
    (ROOT / config["bank_file"]).write_text(
        header + f"const {global_name} = " + json.dumps(bank, ensure_ascii=False, indent=2)
        + f";\n\nwindow.{global_name} = {global_name};\n",
        encoding="utf-8")


def write_class2_bank(bank, diagrams):
    header = (
        "// D3V3NDRA Classes - Class 2 Joyful Mathematics Olympiad Benchmark (35 MCQs).\n"
        "// Generated by scripts/build-full-syllabus-paper.py from the approved paper data.\n"
        "// Questions, options and key are in exact worksheet order; diagrams are standalone SVGs.\n"
        "// The answer key stays application-side; the in-exam paper viewer has questions only.\n"
    )
    GRADE2_ASSETS.mkdir(parents=True, exist_ok=True)
    for stale in GRADE2_ASSETS.glob("q*.svg"):
        stale.unlink()
    for num, (relative, svg) in sorted(diagrams.items()):
        path = ROOT / relative
        path.write_text('<?xml version="1.0" encoding="UTF-8"?>\n' + svg.strip() + "\n", encoding="utf-8")
    (ROOT / "class2_questions.js").write_text(
        header + "window.CLASS2_QUESTIONS = " + json.dumps(bank, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8")


def questions_only(source_pdf, out_pdf, page_count, markers, banned, label):
    with pymupdf.open(source_pdf) as doc:
        assert len(doc) >= page_count, f"{label}: expected >= {page_count} pages, got {len(doc)}"
        text = "\n".join(doc[i].get_text() for i in range(page_count))
        for marker in markers:
            assert marker in text, f"{label}: missing {marker!r} on question pages"
        lowered = text.lower()
        for phrase in banned:
            assert phrase.lower() not in lowered, f"{label}: answer material leaked: {phrase!r}"
        selected = pymupdf.open()
        selected.insert_pdf(doc, from_page=0, to_page=page_count - 1)
        selected.save(out_pdf, garbage=4, deflate=True)
        selected.close()
    with pymupdf.open(out_pdf) as check:
        assert len(check) == page_count
        print(f"{label}: {page_count} pages, questions verified, no answer-key material.")


def publish_grade7_paper(config, source, bank):
    shutil.copyfile(source / config["source"], config["full"])
    with pymupdf.open(config["full"]) as doc:
        assert len(doc) == 7, f"{config['label']} full worksheet: expected 7 pages"
        full_text = "\n".join(page.get_text() for page in doc)
        for num in range(1, 51):
            assert re.search(rf"Q{num}\.", full_text), f"{config['label']} full worksheet missing Q{num}"
    print(f"{config['label']} full worksheet: {config['full'].stat().st_size:,} bytes (result download only).")

    grade7_numbers = [f"Q{n}." for n in range(1, 51)]
    questions_only(source / config["source"], config["questions"], GRADE7_QUESTION_PAGES, grade7_numbers,
                   ["answer key", "quick evaluation", "solution", "correct option", "scorecard"],
                   f"{config['label']} questions-only PDF")


def write_paper_pages(papers):
    pages = {}
    total = 0
    for paper_id, pdf_path in papers:
        uris = []
        with pymupdf.open(pdf_path) as doc:
            for page in doc:
                data = page.get_pixmap(matrix=pymupdf.Matrix(PAGE_SCALE, PAGE_SCALE), alpha=False).tobytes("png")
                total += len(data)
                uris.append(uri(data))
        pages[paper_id] = uris
        print(f"{paper_id}: rendered {len(uris)} page images ({total:,} bytes raw so far)")
    content = ("// In-exam View Paper images, rendered from the questions-only PDFs.\n"
               "// Generated by scripts/build-full-syllabus-paper.py. No answer pages are included.\n"
               "window.PAPER_PAGES = " + json.dumps(pages) + ";\n")
    (ROOT / "js/paper_pages.js").write_text(content, encoding="utf-8")
    print(f"js/paper_pages.js: {(ROOT / 'js/paper_pages.js').stat().st_size:,} bytes")


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-dir", type=Path, required=True)
    source = parser.parse_args().source_dir.resolve()
    sys.path.insert(0, str(source / "data"))
    sys.path.insert(0, str(source / "scripts"))
    from data_class2_olympiad_35 import CLASS2_OLYMPIAD_DATA
    import class2_svg_assets

    for config in GRADE7_PAPERS:
        data = importlib.import_module(config["data_module"]).QUESTIONS_DATA
        bank = extract_grade7_bank(data)
        diagrams = write_grade7_diagrams(
            source / config["tex"], config["assets"], config["diagram_questions"],
            config["asset_prefix"], config["label"])
        for question in bank:
            if question["id"] in diagrams:
                question["diagram"] = diagrams[question["id"]]
        assert sum(1 for q in bank if q.get("diagram")) == len(config["diagram_questions"])
        assert_grade7_key_matches_pdf(source / config["source"], bank, config["label"])
        write_grade7_bank(config, bank)
        print(f"{config['bank_file']}: {len(bank)} questions, {len(diagrams)} figures, key verified.")
        publish_grade7_paper(config, source, bank)

    grade2_bank, diagrams = extract_class2_bank(CLASS2_OLYMPIAD_DATA, class2_svg_assets)
    assert_class2_key_matches_pdf(source / GRADE2_SOURCE, grade2_bank)
    write_class2_bank(grade2_bank, diagrams)
    print(f"class2_questions.js: {len(grade2_bank)} questions, 70 marks, 15 SVG diagrams.")

    shutil.copyfile(source / GRADE2_SOURCE, GRADE2_FULL)
    with pymupdf.open(GRADE2_FULL) as doc:
        assert len(doc) == 9
    print(f"Class 2 full worksheet: {GRADE2_FULL.stat().st_size:,} bytes (result download only).")

    questions_only(source / GRADE2_SOURCE, GRADE2_QUESTIONS, 7, [f"Q{n:02d}" for n in range(1, 36)],
                   ["answer key", "quick answer", "step-by-step", "correct:", "solution", "scorecard",
                    "worked answers", "candidate performance"],
                   "Class 2 questions-only PDF")

    write_paper_pages([
        *((config["id"], config["questions"]) for config in GRADE7_PAPERS),
        ("class2-olympiad-35", GRADE2_QUESTIONS),
    ])
    print("Done.")


if __name__ == "__main__":
    main()
