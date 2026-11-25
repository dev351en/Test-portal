/* Each login opens one paper. Keep IDs stable: they scope local/remote attempts.
   A new test paper gets a fresh ID so earlier attempts cannot block re-sits. */
window.TEST_PAPERS = [
  {
    id: 'class7-full-syllabus',
    loginId: 'DSMG7@012',
    password: '12345678',
    grade: 7,
    enabled: true,
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
    paperPages: 3
  },
  {
    id: 'class2-olympiad-35',
    loginId: 'DSMG2@001',
    password: '12345678',
    grade: 2,
    enabled: false,
    title: 'Joyful Mathematics Olympiad Benchmark',
    subtitle: 'Class 2 Mathematics — Full Syllabus Olympiad (35 MCQs)',
    bank: 'CLASS2_QUESTIONS',
    questionCount: 35,
    totalMarks: 70,
    defaultMarks: 2,
    totalMinutes: 45,
    marking: '+2 for every correct answer',
    textFormat: 'plain',
    worksheet: 'assets/worksheet-class2-olympiad.pdf',
    downloadName: 'Worksheet Class 2 Mathematics Olympiad.pdf',
    paperPdf: 'assets/worksheet-class2-olympiad-questions-only.pdf',
    paperPages: 7
  }
];
