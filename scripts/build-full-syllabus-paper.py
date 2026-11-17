"""Publish both assigned papers and the questions-only viewer assets.

Run with the worksheet project's Python environment (PyMuPDF is required):
  python scripts/build-full-syllabus-paper.py --source-dir "../DASS/D3V3NDRA Classes"

Produces both ordered banks, the result-stage worksheets, the Class 2 diagram
assets and the in-exam page images. The viewer PDFs are questions-only; the
answer key is never part of them:
  - test_questions.js                                    ordered 50-question Grade 7 bank
  - class2_questions.js                                  ordered 35-question Class 2 bank
  - assets/worksheet-full-syllabus-comprehensive.pdf     Grade 7 full worksheet (result download)
  - assets/worksheet-full-syllabus-questions-only.pdf    Grade 7 questions pages 1-2 only
  - assets/worksheet-class2-olympiad.pdf                 Class 2 full worksheet (result download)
  - assets/worksheet-class2-olympiad-questions-only.pdf  Class 2 questions pages 1-7 only
  - assets/class2-olympiad/qNN.svg                       Class 2 diagram assets
  - js/paper_pages.js                                    page images for the in-exam View Paper viewer
"""
import argparse
import base64
import html
import json
from pathlib import Path
import re
import shutil
import sys
import xml.etree.ElementTree as ET

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
GRADE7_SOURCE = "output/Worksheet Full Syllabus Comprehensive Olympiad.pdf"
GRADE7_FULL = ROOT / "assets/worksheet-full-syllabus-comprehensive.pdf"
GRADE7_QUESTIONS = ROOT / "assets/worksheet-full-syllabus-questions-only.pdf"
GRADE2_SOURCE = "output/Worksheet Class 2 Mathematics Olympiad.pdf"
GRADE2_FULL = ROOT / "assets/worksheet-class2-olympiad.pdf"
GRADE2_QUESTIONS = ROOT / "assets/worksheet-class2-olympiad-questions-only.pdf"
GRADE2_ASSETS = ROOT / "assets/class2-olympiad"
PAGE_SCALE = 1.8
# The printed key for Q9 ("Sister") does not follow from the printed riddle, and
# the source solution admits it was adapted from another question. The question,
# options and official key are preserved exactly; only the broken explanation is
# left out of the portal review.
SKIP_SOLUTIONS = {9}
DIAGRAM_RE = re.compile(r"<div\s+class=['\"]q-diag['\"]>\s*\{([A-Z0-9_]+)\}\s*</div>", re.I)
TAG_RE = re.compile(r"<[^>]+>")
CLASS2_CATEGORIES = {
    "Logical Reasoning": "Logical Reasoning",
    "Mathematical Reasoning": "Mathematical Reasoning",
    "Everyday Mathematics": "Everyday Mathematics",
    "Achievers Section (HOTS)": "HOTS",
}


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
    for item in data["questions"]:
        assert item["ans"] in "ABCD" and len(item["options"]) == 4
        bank.append({
            "id": item["num"],
            "q": item["q"],
            "opts": list(item["options"]),
            "ans": "ABCD".index(item["ans"]),
            "cat": item["category"],
            "sol": "" if item["num"] in SKIP_SOLUTIONS else item["sol"],
        })
    nums = [q["id"] for q in bank]
    assert nums == list(range(1, 51)), nums
    assert sum(1 for q in bank if q["cat"] == "Logical Reasoning") == 15
    assert sum(1 for q in bank if q["cat"] == "Mathematical Reasoning") == 20
    assert sum(1 for q in bank if q["cat"] == "Everyday Mathematics") == 10
    assert sum(1 for q in bank if q["cat"] == "HOTS") == 5
    return bank


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


def write_grade7_bank(bank):
    header = (
        "// D3V3NDRA Classes - Grade 7 Full Syllabus Comprehensive Olympiad (50 MCQs).\n"
        "// Generated by scripts/build-full-syllabus-paper.py from the approved paper data.\n"
        "// Questions and options are in exact worksheet order; js/app.js does not shuffle them.\n"
        "// The answer key stays application-side; the in-exam paper viewer has questions only.\n"
    )
    (ROOT / "test_questions.js").write_text(
        header + "const QUESTIONS = " + json.dumps(bank, ensure_ascii=False, indent=2) + ";\n\nwindow.QUESTIONS = QUESTIONS;\n",
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
    from data_comprehensive_olympiad_50 import COMPREHENSIVE_OLYMPIAD_DATA
    from data_class2_olympiad_35 import CLASS2_OLYMPIAD_DATA
    import class2_svg_assets

    grade7_bank = extract_grade7_bank(COMPREHENSIVE_OLYMPIAD_DATA)
    write_grade7_bank(grade7_bank)
    print(f"test_questions.js: {len(grade7_bank)} questions, official key preserved application-side.")

    GRADE7_FULL.write_bytes((source / GRADE7_SOURCE).read_bytes())
    with pymupdf.open(GRADE7_FULL) as doc:
        full_text = "\n".join(page.get_text() for page in doc)
        for num in range(1, 51):
            assert re.search(rf"Q{num}\.", full_text), f"full worksheet missing Q{num}"
    print(f"Grade 7 full worksheet: {GRADE7_FULL.stat().st_size:,} bytes (result download only).")

    grade7_numbers = [f"Q{n}." for n in range(1, 51)]
    questions_only(source / GRADE7_SOURCE, GRADE7_QUESTIONS, 2, grade7_numbers,
                   ["answer key", "quick answer", "solution", "correct option", "scorecard", "evaluation"],
                   "Grade 7 questions-only PDF")

    grade2_bank, diagrams = extract_class2_bank(CLASS2_OLYMPIAD_DATA, class2_svg_assets)
    assert_class2_key_matches_pdf(source / GRADE2_SOURCE, grade2_bank)
    write_class2_bank(grade2_bank, diagrams)
    print(f"class2_questions.js: {len(grade2_bank)} questions, 70 marks, 15 SVG diagrams.")

    GRADE2_FULL.write_bytes((source / GRADE2_SOURCE).read_bytes())
    with pymupdf.open(GRADE2_FULL) as doc:
        assert len(doc) == 9
    print(f"Class 2 full worksheet: {GRADE2_FULL.stat().st_size:,} bytes (result download only).")

    questions_only(source / GRADE2_SOURCE, GRADE2_QUESTIONS, 7, [f"Q{n:02d}" for n in range(1, 36)],
                   ["answer key", "quick answer", "step-by-step", "correct:", "solution", "scorecard",
                    "worked answers", "candidate performance"],
                   "Class 2 questions-only PDF")

    write_paper_pages([
        ("class7-full-syllabus", GRADE7_QUESTIONS),
        ("class2-olympiad-35", GRADE2_QUESTIONS),
    ])
    print("Done.")


if __name__ == "__main__":
    main()
