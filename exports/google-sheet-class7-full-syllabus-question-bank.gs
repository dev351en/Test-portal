/** D3V3NDRA Classes — Class 7 Full Syllabus Comprehensive Olympiad
 * Paste into Google Sheets > Extensions > Apps Script. Save, reload the sheet,
 * then D3V3NDRA > Fill everything. Illustration cells contain clickable URLs.
 */
const QUESTION_ROWS = [
  {
    "no": 1,
    "id": 1,
    "question": "Find the next number in the pattern: $3, 7, 13, 21, 31, ?$ (Differences increase by 2: $+4, +6, +8, +10, \\dots$)",
    "options": [
      "39",
      "41",
      "42",
      "43"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "43",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Differences between consecutive terms are: $7 - 3 = 4$, $13 - 7 = 6$, $21 - 13 = 8$, $31 - 21 = 10$. The differences form an arithmetic sequence of consecutive even numbers: $4, 6, 8, 10, \\dots$. The next difference is $10 + 2 = 12$. Therefore, next term $= 31 + 12 = 43$."
  },
  {
    "no": 2,
    "id": 2,
    "question": "Find the missing number in the descending sequence: $50, 47, 43, 38, 32, ?$",
    "options": [
      "24",
      "25",
      "26",
      "27"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "25",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Differences between consecutive terms are: $50 - 47 = 3$, $47 - 43 = 4$, $43 - 38 = 5$, $38 - 32 = 6$. The subtracted amounts increase by 1 at each step: $3, 4, 5, 6, \\dots$. The next subtracted amount is $7$. Therefore, next term $= 32 - 7 = 25$."
  },
  {
    "no": 3,
    "id": 3,
    "question": "Find the next number in the alternating sequence: $5, 10, 8, 16, 14, 28, ?$",
    "options": [
      "24",
      "25",
      "26",
      "30"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "26",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "The sequence alternates between two distinct arithmetic rules: $\\times 2$ and $- 2$. Step 1: $5 \\times 2 = 10$. Step 2: $10 - 2 = 8$. Step 3: $8 \\times 2 = 16$. Step 4: $16 - 2 = 14$. Step 5: $14 \\times 2 = 28$. Step 6: $28 - 2 = 26$. Thus, the next number is 26."
  },
  {
    "no": 4,
    "id": 4,
    "question": "Every letter in a word is shifted forward by two places in the alphabet (A $\\rightarrow$ C, B $\\rightarrow$ D, etc.). If BALL is coded as DCNN, how is NOSE coded?",
    "options": [
      "PQUG",
      "PQTH",
      "OPUG",
      "PQTI"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "PQUG",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Shift each letter of NOSE forward by 2 alphabetical positions: N $+ 2 = $ P; O $+ 2 = $ Q; S $+ 2 = $ U; E $+ 2 = $ G. Combining the transformed letters gives PQUG."
  },
  {
    "no": 5,
    "id": 5,
    "question": "A word is first reversed, and then every letter is moved forward by one alphabetical position. If STOP is reversed to POTS and then coded as QPUt, how is TRIP coded?",
    "options": [
      "QJSU",
      "QSJT",
      "QUJS",
      "RTJU"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "QJSU",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Step 1: Reverse the word TRIP $\\rightarrow$ PIRT. Step 2: Shift each letter forward by one alphabetical position (+1): P $+ 1 = $ Q; I $+ 1 = $ J; R $+ 1 = $ S; T $+ 1 = $ U. Combining the shifted letters gives QJSU."
  },
  {
    "no": 6,
    "id": 6,
    "question": "In a secret cipher, letters in positions 1 and 3 move forward two places (+2), while letters in positions 2 and 4 move backward one place (-1). What is the code for the word BIRD?",
    "options": [
      "DHSC",
      "DHTC",
      "DHTB",
      "EHTC"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "DHTC",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Apply the rule to BIRD: Position 1: B $+ 2 = $ D. Position 2: I $- 1 = $ H. Position 3: R $+ 2 = $ T. Position 4: D $- 1 = $ C. Combining gives DHTC."
  },
  {
    "no": 7,
    "id": 7,
    "question": "Asha is the mother of Rohan. Rohan is the father of Meera. How is Asha related to Meera?",
    "options": [
      "Mother",
      "Aunt",
      "Paternal grandmother",
      "Sister"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "Paternal grandmother",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Rohan is Meera's father. Asha is Rohan's mother. The mother of one's father is their paternal grandmother. Therefore, Asha is the paternal grandmother of Meera."
  },
  {
    "no": 8,
    "id": 8,
    "question": "Neel is the brother of Kavya. Kavya is the mother of her daughter Isha. How is Neel related to Isha?",
    "options": [
      "Maternal uncle",
      "Father",
      "Paternal uncle",
      "Brother"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "Maternal uncle",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Kavya is Isha's mother. Neel is Kavya's brother. The brother of one's mother is their maternal uncle (Mama). Thus, Neel is the maternal uncle of Isha."
  },
  {
    "no": 9,
    "id": 9,
    "question": "Pointing to a woman in a photograph, Sameer says: 'Her father is my mother's father's only son.' How is the woman related to Sameer?",
    "options": [
      "Sister",
      "Cousin",
      "Mother",
      "Aunt"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "Sister",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": ""
  },
  {
    "no": 10,
    "id": 10,
    "question": "A child starts walking from point P, walks $4\\text{ m}$ North, and then turns right and walks $3\\text{ m}$ East to reach point Q. In which direction is point Q relative to starting point P?",
    "options": [
      "North",
      "East",
      "South-East",
      "North-East"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "North-East",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "From P, moving North establishes a positive vertical displacement (+4), and moving East establishes a positive horizontal displacement (+3). The resulting position lies in the first quadrant relative to P, which is North-East."
  },
  {
    "no": 11,
    "id": 11,
    "question": "Omar faces West. He makes three consecutive quarter-turns ($270^\\circ$) clockwise. Which direction is he facing now?",
    "options": [
      "North",
      "East",
      "South",
      "West"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "South",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Starting facing West: First quarter-turn ($90^\\circ$ CW) $\\rightarrow$ North. Second quarter-turn ($90^\\circ$ CW) $\\rightarrow$ East. Third quarter-turn ($90^\\circ$ CW) $\\rightarrow$ South. Therefore, Omar faces South."
  },
  {
    "no": 12,
    "id": 12,
    "question": "Arun faces North. He turns $180^\\circ$, and then makes a quarter-turn ($90^\\circ$) anti-clockwise. Which direction does he face now?",
    "options": [
      "North",
      "South",
      "West",
      "East"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "East",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Starting facing North: Turning $180^\\circ$ reverses direction to face South. From South, a quarter-turn ($90^\\circ$) anti-clockwise (left) points towards East. Thus, Arun faces East."
  },
  {
    "no": 13,
    "id": 13,
    "question": "A school bus must reach school at $8\\text{:}15\\text{ a.m.}$ The journey takes exactly $50\\text{ minutes}$. At what time must the bus depart?",
    "options": [
      "7:15 a.m.",
      "7:20 a.m.",
      "7:30 a.m.",
      "7:25 a.m."
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "7:25 a.m.",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Subtract 50 minutes from 8:15 a.m.: $8\\text{:}15 - 15\\text{ min} = 8\\text{:}00\\text{ a.m.}$ Then $8\\text{:}00 - 35\\text{ min} = 7\\text{:}25\\text{ a.m.}$ The bus must depart at 7:25 a.m."
  },
  {
    "no": 14,
    "id": 14,
    "question": "What is the smaller angle between the hour hand and the minute hand of an accurate clock at exactly $6\\text{:}30$?",
    "options": [
      "15°",
      "20°",
      "25°",
      "30°"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "15°",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "At 6:30, the minute hand points directly at 6 ($180^\\circ$). In 30 minutes, the hour hand moves half a degree per minute: $30 \\times 0.5^\\circ = 15^\\circ$ past 6 ($180^\\circ + 15^\\circ = 195^\\circ$). The angle between them is $195^\\circ - 180^\\circ = 15^\\circ$."
  },
  {
    "no": 15,
    "id": 15,
    "question": "At a stationary shop, 12 stickers cost as much as 3 badges. If one badge costs Rs 20, what is the cost of one sticker?",
    "options": [
      "Rs 5",
      "Rs 6",
      "Rs 8",
      "Rs 10"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "Rs 5",
    "marks": 2,
    "category": "Logical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Cost of 3 badges $= 3 \\times 20 = \\text{Rs } 60$. Since 12 stickers cost the same as 3 badges, 12 stickers cost Rs 60. Cost of 1 sticker $= 60 \\div 12 = \\text{Rs } 5$."
  },
  {
    "no": 16,
    "id": 16,
    "question": "Evaluate using the correct order of operations (BODMAS): $(-18) \\times [(-4) + (-6)] \\div [(-5) \\times 2 - (-10) + 9]$.",
    "options": [
      "-20",
      "18",
      "20",
      "-18"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "20",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Step 1 (Brackets): $[(-4) + (-6)] = -10$. Denominator: $[(-5) \\times 2 - (-10) + 9] = [-10 + 10 + 9] = 9$. Step 2 (Multiplication & Division): Numerator $= (-18) \\times (-10) = 180$. Result $= 180 \\div 9 = 20$."
  },
  {
    "no": 17,
    "id": 17,
    "question": "Find the value of the mixed decimal-fraction expression: $\\left(3\\frac{1}{4} - 1.75\\right) \\times 2.4 + \\frac{3}{5} \\div 0.15$.",
    "options": [
      "6.8",
      "7.6",
      "7.2",
      "8.4"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "7.6",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Convert fractions to decimals: $3\\frac{1}{4} = 3.25$. Then $3.25 - 1.75 = 1.5$. Next, $1.5 \\times 2.4 = 3.6$. For the second term, $\\frac{3}{5} = 0.6$, and $0.6 \\div 0.15 = 4$. Sum $= 3.6 + 4 = 7.6$."
  },
  {
    "no": 18,
    "id": 18,
    "question": "The HCF and LCM of two numbers are 18 and 1080 respectively. If one of the numbers is 216, find the other number.",
    "options": [
      "72",
      "90",
      "84",
      "108"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "90",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Property: $\\text{Product of two numbers} = \\text{HCF} \\times \\text{LCM}$. Let the other number be $N$. Then $216 \\times N = 18 \\times 1080 \\implies N = \\frac{18 \\times 1080}{216} = \\frac{1080}{12} = 90$."
  },
  {
    "no": 19,
    "id": 19,
    "question": "How many three-digit natural numbers are simultaneously divisible by both 6 and 15?",
    "options": [
      "28",
      "29",
      "31",
      "30"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "30",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "A number divisible by both 6 and 15 must be divisible by $\\operatorname{LCM}(6, 15) = 30$. Three-digit numbers range from 100 to 999. The smallest 3-digit multiple of 30 is $30 \\times 4 = 120$. The largest 3-digit multiple of 30 is $30 \\times 33 = 990$. The total number of terms is $33 - 4 + 1 = 30$."
  },
  {
    "no": 20,
    "id": 20,
    "question": "If $a = -2$, $b = 3$, and $c = -1$, evaluate the algebraic expression: $\\frac{a^3 - b^2 + 4c}{2a - 3b + c}$.",
    "options": [
      "-1.5",
      "-2.0",
      "1.5",
      "2.5"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "1.5",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Numerator $= (-2)^3 - 3^2 + 4(-1) = -8 - 9 - 4 = -21$. Denominator $= 2(-2) - 3(3) + (-1) = -4 - 9 - 1 = -14$. Therefore, $\\frac{-21}{-14} = \\frac{3}{2} = 1.5$."
  },
  {
    "no": 21,
    "id": 21,
    "question": "Solve the linear equation for $x$: $\\frac{3x - 1}{4} - \\frac{x - 2}{3} = \\frac{x + 7}{6}$.",
    "options": [
      "3",
      "2",
      "4",
      "5"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "3",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Multiply both sides by $\\operatorname{LCM}(4, 3, 6) = 12$: $3(3x - 1) - 4(x - 2) = 2(x + 7) \\implies 9x - 3 - 4x + 8 = 2x + 14 \\implies 5x + 5 = 2x + 14 \\implies 3x = 9 \\implies x = 3$."
  },
  {
    "no": 22,
    "id": 22,
    "question": "Two parallel lines $AB$ and $CD$ are intersected by a transversal $EF$. Two consecutive interior angles on the same side of the transversal are $(3x - 10)^\\circ$ and $(2x + 35)^\\circ$. What is the measure of the smaller angle?",
    "options": [
      "83°",
      "75°",
      "31°",
      "97°"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "83°",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Consecutive interior angles on the same side of a transversal are supplementary: $(3x - 10) + (2x + 35) = 180 \\implies 5x + 25 = 180 \\implies 5x = 155 \\implies x = 31^\\circ$. The two angles are $3(31) - 10 = 83^\\circ$ and $2(31) + 35 = 97^\\circ$. The smaller angle is $83^\\circ$."
  },
  {
    "no": 23,
    "id": 23,
    "question": "In $\\triangle ABC$, $\\angle B$ is twice $\\angle A$, and $\\angle C$ is $20^\\circ$ greater than $\\angle B$. Find the measure of the exterior angle at vertex $A$.",
    "options": [
      "132°",
      "148°",
      "144°",
      "152°"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "148°",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Let $\\angle A = x$. Then $\\angle B = 2x$, and $\\angle C = 2x + 20^\\circ$. Angle sum of a triangle $= 180^\\circ$: $x + 2x + (2x + 20) = 180 \\implies 5x + 20 = 180 \\implies 5x = 160 \\implies x = 32^\\circ$. The interior angle at $A$ is $32^\\circ$. The exterior angle at $A = 180^\\circ - 32^\\circ = 148^\\circ$ (or $\\angle B + \\angle C = 64^\\circ + 84^\\circ = 148^\\circ$)."
  },
  {
    "no": 24,
    "id": 24,
    "question": "A 15 m long ladder reaches a window 12 m above the ground on one side of a street. Keeping its foot at the same point, the ladder is turned to the other side of the street, where it reaches a window 9 m high. What is the total width of the street?",
    "options": [
      "18 m",
      "21 m",
      "24 m",
      "25 m"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "21 m",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "By Pythagoras theorem, the distance from the foot to the first wall is $\\sqrt{15^2 - 12^2} = \\sqrt{225 - 144} = \\sqrt{81} = 9\\text{ m}$. The distance from the foot to the second wall is $\\sqrt{15^2 - 9^2} = \\sqrt{225 - 81} = \\sqrt{144} = 12\\text{ m}$. The width of the street is $9 + 12 = 21\\text{ m}$."
  },
  {
    "no": 25,
    "id": 25,
    "question": "In $\\triangle PQR$ and $\\triangle XYZ$, $PQ = XY$, $QR = YZ$, and $\\angle Q = \\angle Y = 65^\\circ$. If $\\angle P = (2x + 15)^\\circ$ and $\\angle X = (3x - 10)^\\circ$, find the measure of $\\angle R$.",
    "options": [
      "45°",
      "50°",
      "55°",
      "65°"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "50°",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "By SAS congruence criterion, $\\triangle PQR \\cong \\triangle XYZ$. Corresponding angles are equal: $\\angle P = \\angle X \\implies 2x + 15 = 3x - 10 \\implies x = 25^\\circ$. Thus $\\angle P = 2(25) + 15 = 65^\\circ$. In $\\triangle PQR$, the sum of angles is $180^\\circ$: $\\angle R = 180^\\circ - (\\angle P + \\angle Q) = 180^\\circ - (65^\\circ + 65^\\circ) = 180^\\circ - 130^\\circ = 50^\\circ$."
  },
  {
    "no": 26,
    "id": 26,
    "question": "A circular lawn of radius 14 m has a gravel path of uniform width 3.5 m running around its exterior boundary. Find the area of the gravel path. (Use $\\pi = \\frac{22}{7}$).",
    "options": [
      "308.5 sq m",
      "346.5 sq m",
      "385.0 sq m",
      "412.5 sq m"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "346.5 sq m",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Inner radius $r = 14\\text{ m}$. Outer radius $R = 14 + 3.5 = 17.5\\text{ m}$. Path Area $= \\pi(R^2 - r^2) = \\pi(R - r)(R + r) = \\frac{22}{7} \\times 3.5 \\times (17.5 + 14) = 11 \\times 31.5 = 346.5\\text{ m}^2$."
  },
  {
    "no": 27,
    "id": 27,
    "question": "The arithmetic mean of 5 numbers is 24. If one number is excluded, the mean of the remaining 4 numbers becomes 22. What was the excluded number?",
    "options": [
      "28",
      "30",
      "36",
      "32"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "32",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Sum of all 5 numbers $= 5 \\times 24 = 120$. Sum of the 4 remaining numbers $= 4 \\times 22 = 88$. The excluded number $= 120 - 88 = 32$."
  },
  {
    "no": 28,
    "id": 28,
    "question": "Two fair standard six-faced dice are rolled simultaneously. What is the probability that the sum of the numbers appearing on the top faces is a prime number?",
    "options": [
      "1/3",
      "1/2",
      "7/18",
      "5/12"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "5/12",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Total outcomes $= 36$. Prime sums possible are 2, 3, 5, 7, 11. Sum 2: (1,1) [1]. Sum 3: (1,2), (2,1) [2]. Sum 5: (1,4), (2,3), (3,2), (4,1) [4]. Sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) [6]. Sum 11: (5,6), (6,5) [2]. Total favorable $= 1 + 2 + 4 + 6 + 2 = 15$. Probability $= \\frac{15}{36} = \\frac{5}{12}$."
  },
  {
    "no": 29,
    "id": 29,
    "question": "Two numbers are in the ratio $5 : 8$. If 6 is added to each of the numbers, the ratio becomes $2 : 3$. What is the positive difference between the two original numbers?",
    "options": [
      "12",
      "15",
      "18",
      "24"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "18",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Let the numbers be $5x$ and $8x$. Then $\\frac{5x + 6}{8x + 6} = \\frac{2}{3} \\implies 3(5x + 6) = 2(8x + 6) \\implies 15x + 18 = 16x + 12 \\implies x = 6$. The numbers are $5(6) = 30$ and $8(6) = 48$. Their difference is $48 - 30 = 18$."
  },
  {
    "no": 30,
    "id": 30,
    "question": "A regular polygon has a rotational symmetry of order 8. What is the measure of each interior angle of this polygon?",
    "options": [
      "120°",
      "140°",
      "135°",
      "144°"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "135°",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "For any regular polygon, the order of rotational symmetry equals its number of sides $n = 8$ (regular octagon). The measure of each interior angle is $\\frac{(n - 2) \\times 180^\\circ}{n} = \\frac{6 \\times 180^\\circ}{8} = \\frac{1080^\\circ}{8} = 135^\\circ$."
  },
  {
    "no": 31,
    "id": 31,
    "question": "In the Cartesian plane, points $A(2, 3)$, $B(8, 3)$, and $C(5, 7)$ form a triangle. What is the area of $\\triangle ABC$?",
    "options": [
      "10 sq units",
      "16 sq units",
      "14 sq units",
      "12 sq units"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "12 sq units",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Base $AB$ lies on horizontal line $y = 3$, with length $= 8 - 2 = 6\\text{ units}$. The height from $C(5, 7)$ to $y = 3$ is $7 - 3 = 4\\text{ units}$. $\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times 6 \\times 4 = 12\\text{ sq units}$."
  },
  {
    "no": 32,
    "id": 32,
    "question": "Consider the arithmetic sequence $7, 13, 19, 25, 31, \\dots$. Which term of this sequence is equal to $181$?",
    "options": [
      "30th",
      "29th",
      "28th",
      "31st"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "30th",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "First term $a = 7$, common difference $d = 6$. The $n$-th term is $T_n = a + (n - 1)d = 7 + 6(n - 1) = 6n + 1$. Setting $6n + 1 = 181 \\implies 6n = 180 \\implies n = 30$."
  },
  {
    "no": 33,
    "id": 33,
    "question": "Ten years ago, a father was four times as old as his son. Ten years from now, the father will be twice as old as his son. What is the father's present age?",
    "options": [
      "45 years",
      "50 years",
      "55 years",
      "60 years"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "50 years",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Let the son's age 10 years ago be $x$; father's age was $4x$. Present ages: son is $x + 10$, father is $4x + 10$. In 10 years: son will be $x + 20$, father will be $4x + 20$. Equation: $4x + 20 = 2(x + 20) \\implies 4x + 20 = 2x + 40 \\implies 2x = 20 \\implies x = 10$. Present age of father $= 4(10) + 10 = 50\\text{ years}$."
  },
  {
    "no": 34,
    "id": 34,
    "question": "A square sheet of paper of side 20 cm has four identical small squares of side $2\\frac{1}{2}\\text{ cm}$ cut out from each of its four corners. What fraction of the original square's area remains?",
    "options": [
      "7/8",
      "13/16",
      "15/16",
      "31/32"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "15/16",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Total original area $= 20 \\times 20 = 400\\text{ cm}^2$. Area of each cut corner square $= 2.5 \\times 2.5 = 6.25\\text{ cm}^2$. Total area removed $= 4 \\times 6.25 = 25\\text{ cm}^2$. Remaining area $= 400 - 25 = 375\\text{ cm}^2$. Remaining fraction $= \\frac{375}{400} = \\frac{15}{16}$."
  },
  {
    "no": 35,
    "id": 35,
    "question": "Simplify the decimal expression using algebraic identities: $\\frac{0.36 \\times 0.36 - 0.14 \\times 0.14}{0.5 \\times 0.22}$.",
    "options": [
      "1.0",
      "0.5",
      "0.1",
      "2.0"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "1.0",
    "marks": 2,
    "category": "Mathematical Reasoning",
    "diagram": "",
    "optionImages": [],
    "solution": "Numerator is difference of squares: $a^2 - b^2 = (a - b)(a + b)$ where $a = 0.36, b = 0.14$. $(a - b) = 0.36 - 0.14 = 0.22$ and $(a + b) = 0.36 + 0.14 = 0.50$. Numerator $= 0.22 \\times 0.50$. Denominator $= 0.5 \\times 0.22$. The expression simplifies to $\\frac{0.22 \\times 0.50}{0.50 \\times 0.22} = 1$."
  },
  {
    "no": 36,
    "id": 36,
    "question": "A bookstore offers a discount of $\\frac{1}{5}$ on the marked price of a book. During a holiday promotion, an additional discount of $10\\%$ is given on the reduced price. If the marked price is Rs 800, what is the final price paid?",
    "options": [
      "Rs 560",
      "Rs 584",
      "Rs 576",
      "Rs 600"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "Rs 576",
    "marks": 2,
    "category": "Everyday Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "First discount $= \\frac{1}{5} \\times 800 = \\text{Rs } 160$. Reduced price $= 800 - 160 = \\text{Rs } 640$. Additional discount $= 10\\% \\text{ of } 640 = \\text{Rs } 64$. Final price $= 640 - 64 = \\text{Rs } 576$."
  },
  {
    "no": 37,
    "id": 37,
    "question": "A passenger train travels a total distance of 180 km at uniform speed. It covers $\\frac{2}{5}$ of the journey in $1\\frac{1}{2}\\text{ hours}$. How much more time will it take to complete the remaining journey?",
    "options": [
      "2 hours",
      "2 hours 45 mins",
      "2 hours 30 mins",
      "2 hours 15 mins"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "2 hours 15 mins",
    "marks": 2,
    "category": "Everyday Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "First portion $= \\frac{2}{5} \\times 180 = 72\\text{ km}$ in $1.5\\text{ h} \\implies \\text{Speed} = 72 \\div 1.5 = 48\\text{ km/h}$. Remaining distance $= 180 - 72 = 108\\text{ km}$. Time required $= 108 \\div 48 = 2.25\\text{ hours} = 2\\text{ hours }15\\text{ minutes}$."
  },
  {
    "no": 38,
    "id": 38,
    "question": "Inflow pipe A fills a tank at $45\\text{ litres/min}$ while outflow pipe B empties it at $30\\text{ litres/min}$. Both pipes are opened together into an empty tank. In 40 minutes, $\\frac{2}{3}$ of the tank is filled. What is the total capacity of the tank?",
    "options": [
      "900 L",
      "850 L",
      "800 L",
      "960 L"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "900 L",
    "marks": 2,
    "category": "Everyday Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "Net filling rate $= 45 - 30 = 15\\text{ L/min}$. In 40 minutes, water accumulated $= 40 \\times 15 = 600\\text{ L}$. This equals $\\frac{2}{3}$ of total capacity: $\\frac{2}{3} C = 600 \\implies C = 600 \\times \\frac{3}{2} = 900\\text{ litres}$."
  },
  {
    "no": 39,
    "id": 39,
    "question": "A rectangular playground has length $64.5\\text{ m}$ and width $35.5\\text{ m}$. It is fenced with 3 complete rounds of wire. If the wire costs Rs 8.50 per metre, find the total cost of fencing.",
    "options": [
      "Rs 4800",
      "Rs 5650",
      "Rs 5400",
      "Rs 5100"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "Rs 5100",
    "marks": 2,
    "category": "Everyday Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "Perimeter $= 2(64.5 + 35.5) = 2(100) = 200\\text{ m}$. Total wire for 3 rounds $= 3 \\times 200 = 600\\text{ m}$. Total cost $= 600 \\times 8.50 = \\text{Rs } 5100$."
  },
  {
    "no": 40,
    "id": 40,
    "question": "At a mountain station, midnight temperature was $-6^\\circ\\text{C}$. By noon the next day it rose by $14^\\circ\\text{C}$, but by 8 p.m. it dropped by $9^\\circ\\text{C}$. If the next day's noon temperature was $5^\\circ\\text{C}$ higher than the previous day's 8 p.m. temperature, what was it?",
    "options": [
      "2°C",
      "4°C",
      "3°C",
      "5°C"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "4°C",
    "marks": 2,
    "category": "Everyday Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "Midnight: $-6^\\circ\\text{C}$. Noon Day 1: $-6 + 14 = +8^\\circ\\text{C}$. 8 p.m. Day 1: $8 - 9 = -1^\\circ\\text{C}$. Noon Day 2: $-1 + 5 = +4^\\circ\\text{C}$."
  },
  {
    "no": 41,
    "id": 41,
    "question": "Three partners Aman, Bharat, and Chetan share annual business profits. Aman gets $\\frac{3}{8}$, Bharat gets $\\frac{1}{3}$, and Chetan gets the remainder. If Chetan's share is Rs 35,000, find the total profit.",
    "options": [
      "Rs 105,000",
      "Rs 120,000",
      "Rs 112,000",
      "Rs 140,000"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "Rs 120,000",
    "marks": 2,
    "category": "Everyday Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "Combined share of Aman and Bharat $= \\frac{3}{8} + \\frac{1}{3} = \\frac{9 + 8}{24} = \\frac{17}{24}$. Chetan's fraction $= 1 - \\frac{17}{24} = \\frac{7}{24}$. Total profit $P = 35000 \\times \\frac{24}{7} = 5000 \\times 24 = \\text{Rs } 120,000$."
  },
  {
    "no": 42,
    "id": 42,
    "question": "A recipe for 18 cupcakes requires $2\\frac{1}{4}\\text{ cups}$ of flour and $\\frac{3}{4}\\text{ cup}$ of sugar. How many cups of flour and sugar combined are needed to make 30 cupcakes?",
    "options": [
      "4 1/2 cups",
      "6 cups",
      "5 1/4 cups",
      "5 cups"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "5 cups",
    "marks": 2,
    "category": "Everyday Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "For 18 cupcakes: Flour $= \\frac{9}{4}\\text{ c}$, Sugar $= \\frac{3}{4}\\text{ c}$. Total for 18 cupcakes $= \\frac{9}{4} + \\frac{3}{4} = \\frac{12}{4} = 3\\text{ cups}$. For 30 cupcakes, scale by $\\frac{30}{18} = \\frac{5}{3}$: Combined amount $= 3 \\times \\frac{5}{3} = 5\\text{ cups}$."
  },
  {
    "no": 43,
    "id": 43,
    "question": "Rohan traveled a total distance of 450 km. He covered $\\frac{4}{9}$ of the distance by train, $\\frac{2}{5}$ of the remaining distance by bus, and the rest by taxi. How many kilometres did he travel by taxi?",
    "options": [
      "150 km",
      "135 km",
      "120 km",
      "160 km"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "150 km",
    "marks": 2,
    "category": "Everyday Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "Train $= \\frac{4}{9} \\times 450 = 200\\text{ km}$. Remaining $= 450 - 200 = 250\\text{ km}$. Bus $= \\frac{2}{5} \\times 250 = 100\\text{ km}$. Taxi $= 250 - 100 = 150\\text{ km}$."
  },
  {
    "no": 44,
    "id": 44,
    "question": "A family car gives a fuel efficiency of $14.4\\text{ km}$ per litre of petrol. If petrol costs Rs 96 per litre, what is the fuel cost for a journey of $540\\text{ km}$?",
    "options": [
      "Rs 3600",
      "Rs 3450",
      "Rs 3750",
      "Rs 3840"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "Rs 3600",
    "marks": 2,
    "category": "Everyday Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "Petrol required $= 540 \\div 14.4 = 37.5\\text{ litres}$. Total cost $= 37.5 \\times 96 = \\text{Rs } 3600$."
  },
  {
    "no": 45,
    "id": 45,
    "question": "In five subjects, Meena scored an average of 78 marks across her first 4 subjects. What score must she achieve in her fifth subject to raise her overall average to 82 marks?",
    "options": [
      "92",
      "94",
      "98",
      "96"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "98",
    "marks": 2,
    "category": "Everyday Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "Total in first 4 subjects $= 4 \\times 78 = 312$. Target total across 5 subjects $= 5 \\times 82 = 410$. Required score $= 410 - 312 = 98\\text{ marks}$."
  },
  {
    "no": 46,
    "id": 46,
    "question": "[Diophantine Fractions] How many ordered pairs of positive integers $(x, y)$ satisfy the symmetric fractional equation: $\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{12}$?",
    "options": [
      "11",
      "13",
      "15",
      "17"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "15",
    "marks": 2,
    "category": "HOTS",
    "diagram": "",
    "optionImages": [],
    "solution": "Multiply by $12xy$: $12x + 12y = xy \\implies xy - 12x - 12y = 0$. Apply Simon's Favorite Factoring Trick by adding $12^2 = 144$ to both sides: $(x - 12)(y - 12) = 144$. For $x, y > 0$, $(x - 12)$ and $(y - 12)$ must be positive factors of 144. Prime factorisation: $144 = 2^4 \\times 3^2$. The number of positive divisors is $(4 + 1)(2 + 1) = 5 \\times 3 = 15$. Each divisor $d$ gives a unique positive integer pair $(x, y) = (d + 12, \\frac{144}{d} + 12)$. Thus, there are 15 pairs."
  },
  {
    "no": 47,
    "id": 47,
    "question": "[Triangle Optimization] In $\\triangle ABC$, the side lengths are integers with $AB = 7$ and $BC = 11$. If $\\triangle ABC$ is strictly acute-angled, how many possible integer values can the third side $AC$ take?",
    "options": [
      "4",
      "5",
      "6",
      "7"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "5",
    "marks": 2,
    "category": "HOTS",
    "diagram": "",
    "optionImages": [],
    "solution": "Let $AC = c \\in \\mathbb{Z}^+$. By triangle inequality, $11 - 7 < c < 11 + 7 \\implies 4 < c < 18$. For the triangle to be strictly acute, the square of the longest side must be strictly less than the sum of the squares of the other two sides. Case 1 ($c \\le 11$): $11^2 < 7^2 + c^2 \\implies 121 < 49 + c^2 \\implies c^2 > 72 \\implies c \\ge 9$. So $c \\in \\{9, 10, 11\\}$. Case 2 ($c > 11$): $c^2 < 7^2 + 11^2 = 49 + 121 = 170 \\implies c \\le 13$ (since $13^2 = 169 < 170$). So $c \\in \\{12, 13\\}$. The valid integer values are $\\{9, 10, 11, 12, 13\\}$, giving exactly 5 possible values."
  },
  {
    "no": 48,
    "id": 48,
    "question": "[Combinatorial Invariants] The integers $1, 2, 3, \\dots, 25$ are written on a blackboard. At each step, any two numbers $a$ and $b$ are erased and replaced by $|a - b|$. This process is repeated until only one number remains. Which of the following numbers could be the final number?",
    "options": [
      "0",
      "6",
      "7",
      "8"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "7",
    "marks": 2,
    "category": "HOTS",
    "diagram": "",
    "optionImages": [],
    "solution": "Notice the parity invariant: Replacing $a$ and $b$ by $|a - b|$ changes the total sum by $\\Delta S = |a - b| - (a + b) = -2\\min(a, b)$, which is an even integer. Therefore, the parity of the sum of numbers remains invariant at every step. Initial sum $= \\sum_{k=1}^{25} k = \\frac{25 \\times 26}{2} = 325$, which is ODD. Hence, the final remaining number must be ODD. Among the options $\\{0, 6, 7, 8\\}$, only 7 is odd."
  },
  {
    "no": 49,
    "id": 49,
    "question": "[Telescoping Products] Evaluate the finite product of difference of squares: $P = \\left(1 - \\frac{1}{4}\\right)\\left(1 - \\frac{1}{9}\\right)\\left(1 - \\frac{1}{16}\\right) \\dots \\left(1 - \\frac{1}{50^2}\\right)$.",
    "options": [
      "49/100",
      "1/2",
      "51/100",
      "53/100"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "51/100",
    "marks": 2,
    "category": "HOTS",
    "diagram": "",
    "optionImages": [],
    "solution": "Factor each term: $1 - \\frac{1}{k^2} = \\frac{(k - 1)(k + 1)}{k^2} = \\frac{k - 1}{k} \\times \\frac{k + 1}{k}$. Decompose the product into two telescoping chains: $P = \\left(\\frac{1}{2} \\times \\frac{2}{3} \\times \\dots \\times \\frac{49}{50}\\right) \\times \\left(\\frac{3}{2} \\times \\frac{4}{3} \\times \\dots \\times \\frac{51}{50}\\right)$. The first chain telescopes to $\\frac{1}{50}$; the second chain telescopes to $\\frac{51}{2}$. Their product is $P = \\frac{1}{50} \\times \\frac{51}{2} = \\frac{51}{100}$."
  },
  {
    "no": 50,
    "id": 50,
    "question": "[Modular Number Theory] Find the remainder when $2^{2026} + 3^{2026}$ is divided by 7.",
    "options": [
      "1",
      "3",
      "5",
      "6"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "6",
    "marks": 2,
    "category": "HOTS",
    "diagram": "",
    "optionImages": [],
    "solution": "By Fermat's Little Theorem or cycle analysis modulo 7: Powers of 2: $2^1 \\equiv 2$, $2^2 \\equiv 4$, $2^3 \\equiv 1 \\pmod 7$. Period is 3. Since $2026 = 3 \\times 675 + 1 \\equiv 1 \\pmod 3$, $2^{2026} \\equiv 2^1 \\equiv 2 \\pmod 7$. Powers of 3: $3^1 \\equiv 3$, $3^2 \\equiv 2$, $3^3 \\equiv 6 \\equiv -1$, $3^6 \\equiv 1 \\pmod 7$. Period is 6. Since $2026 = 6 \\times 337 + 4 \\equiv 4 \\pmod 6$, $3^{2026} \\equiv 3^4 = 81 = 7 \\times 11 + 4 \\equiv 4 \\pmod 7$. The sum is $2^{2026} + 3^{2026} \\equiv 2 + 4 = 6 \\pmod 7$. The remainder is 6."
  }
];
const QUESTION_HEADERS = ["No.","ID","Question","Option A","Option B","Option C","Option D","Correct Option","Correct Answer","Marks","Section","Diagram","Solution"];
const ANSWER_HEADERS = ["No.","Correct Option","Correct Answer","Marks"];
function onOpen() {
  SpreadsheetApp.getUi().createMenu('D3V3NDRA').addItem('Fill everything', 'fillEverything').addToUi();
}
function writeSheet_(name, headers, values, widths) {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName(name) || book.insertSheet(name);
  if (sheet.getFilter()) sheet.getFilter().remove();
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground('#0d2a5e').setFontColor('#ffffff').setFontWeight('bold');
  // Plain text preserves source currency and avoids spreadsheet formula parsing.
  sheet.getRange(2, 1, values.length, headers.length).setNumberFormat('@').setValues(values)
    .setWrap(true).setVerticalAlignment('top');
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 34);
  widths.forEach((width, index) => sheet.setColumnWidth(index + 1, width));
  sheet.getRange(1, 1, values.length + 1, headers.length).createFilter();
  return sheet;
}
function fillEverything() {
  const questions = QUESTION_ROWS.map(r => [r.no, r.id, r.question, ...r.options, r.correctOption, r.correctAnswer, r.marks, r.category, r.diagram, r.solution]);
  const key = QUESTION_ROWS.map(r => [r.no, r.correctOption, r.correctAnswer, r.marks]);
  const sheet = writeSheet_('Question Bank', QUESTION_HEADERS, questions, [45,45,380,180,180,180,180,95,200,65,140,220,380]);
  QUESTION_ROWS.forEach((r, i) => sheet.getRange(i + 2, 4 + r.correctIndex).setBackground('#e9f9ef').setFontColor('#15803d').setFontWeight('bold'));
  writeSheet_('Answer Key', ANSWER_HEADERS, key, [45,95,260,65]);
  const notes = [
    ["Class 7 · Full Syllabus Comprehensive Olympiad · 50 questions · 100 marks"],
    ['The live portal preserves the original worksheet question and option order.'],
    ["This export matches the live portal order."],
    ['Illustrations are linked in the diagram and option cells.'],
    ["Worksheet + answer key: https://mest-porutal.vercel.app/assets/worksheet-full-syllabus-comprehensive.pdf"],
    ['Regenerate with npm run export:sheet.']
  ];
  writeSheet_('Read Me', ['D3V3NDRA Testing Portal'], notes, [720]);
  SpreadsheetApp.getActiveSpreadsheet().setActiveSheet(sheet);
}
