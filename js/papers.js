/* Each login opens one paper. Keep IDs stable: they scope local/remote attempts.
   A new test paper gets a fresh ID so earlier attempts cannot block re-sits.
   The two Class 7 papers share a login but have separate time windows, banks,
   PDFs and attempt registries; the portal picks the paper open at login time. */
window.TEST_PAPERS = [
  {
    id: 'class7-combined-worksheet-3',
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
    paperPages: 3,
    window: {
      start: '2026-11-25T05:30:00.000Z',
      end: '2026-11-25T09:30:00.000Z'
    }
  },
  {
    id: 'class7-combined-worksheet-4',
    loginId: 'DSMG7@012',
    password: '12345678',
    grade: 7,
    enabled: true,
    title: 'Full Syllabus Comprehensive Olympiad',
    subtitle: 'Grand Olympiad Benchmark — Combined All Chapters (50 MCQs)',
    bank: 'QUESTIONS_WORKSHEET_4',
    questionCount: 50,
    totalMarks: 100,
    defaultMarks: 2,
    totalMinutes: 60,
    marking: '+2 for every correct answer',
    textFormat: 'math',
    worksheet: 'assets/worksheet-combined-worksheet-4.pdf',
    downloadName: 'Worksheet Full Syllabus Comprehensive Olympiad.pdf',
    paperPdf: 'assets/worksheet-combined-worksheet-4-questions-only.pdf',
    paperPages: 3,
    window: {
      start: '2026-11-25T10:30:00.000Z',
      end: '2026-11-25T15:30:00.000Z'
    }
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
