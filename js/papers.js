/* Each login opens one paper. Keep IDs stable: they scope local/remote attempts.
   A new test paper gets a fresh ID so earlier attempts cannot block re-sits. */
window.TEST_PAPERS = [
  {
    id: 'class7-full-syllabus',
    loginId: 'DSMG7@012',
    password: '12345678',
    grade: 7,
    title: 'Full Syllabus Comprehensive Olympiad',
    subtitle: 'Grand Olympiad Benchmark — Combined All Chapters (50 MCQs)',
    bank: 'QUESTIONS',
    questionCount: 50,
    totalMarks: 100,
    defaultMarks: 2,
    totalMinutes: 60,
    marking: '+2 for every correct answer',
    textFormat: 'math',
    worksheet: 'assets/worksheet-full-syllabus-comprehensive.pdf',
    downloadName: 'Worksheet Full Syllabus Comprehensive Olympiad.pdf',
    paperPdf: 'assets/worksheet-full-syllabus-questions-only.pdf',
    paperPages: 2
  },
  {
    id: 'class2-test-paper-1',
    loginId: 'DSMG2@001',
    password: '12345678',
    grade: 2,
    title: 'Mathematics · Test Paper 1',
    subtitle: 'Class 2 Mathematics — Test Number 1',
    bank: 'CLASS2_QUESTIONS',
    questionCount: 35,
    totalMarks: 45,
    defaultMarks: 1,
    totalMinutes: 60,
    marking: 'Q1–25: +1 each · Q26–35: +2 each',
    textFormat: 'plain',
    worksheet: 'assets/worksheet-class2-test-paper-1.pdf',
    downloadName: 'Worksheet Class 2 Test Paper 1.pdf',
    paperPdf: 'assets/worksheet-class2-test-paper-1-questions-only.pdf',
    paperPages: 5
  }
];
