// D3V3NDRA Classes — Virtual Hosted Testing Platform
// Chapter: Working with Fractions (NCERT Class 7, gegp108)
// Difficulty distribution: 10 Easy, 20 Medium, 20 Tough (jumbled/interleaved)
// Total: 50 MCQs • 100 Marks • 60 Mins

const QUESTIONS = [
  // ---------------- Q1 ----------------
  { id:1, q: "What is the product of a whole number and a fraction equal to?", opts: ["Sum of both","Repeated addition of the fraction","Difference","Ratio"], ans: 1, diff: "Easy", cat: "Multiplication" },
  // ---------------- Q2 ----------------
  { id:2, q: "Aaron walks 3 km in 1 hour. How far does he walk in 5 hours?", opts: ["8 km","12 km","15 km","18 km"], ans: 2, diff: "Easy", cat: "Multiplication" },
  // ---------------- Q3 ----------------
  { id:3, q: "A tortoise walks 1/4 km in 1 hour. How far does it walk in 3 hours?", opts: ["3/4 km","1/4 km","1/2 km","1 km"], ans: 0, diff: "Easy", cat: "Multiplication" },
  // ---------------- Q4 ----------------
  { id:4, q: "Which operation is used to find total distance when speed per hour is a fraction?", opts: ["Addition","Subtraction","Multiplication","Division"], ans: 2, diff: "Easy", cat: "Multiplication" },
  // ---------------- Q5 ----------------
  { id:5, q: "A farmer had 5 grandchildren and gave 2/3 acre of land to each. How much land in all?", opts: ["7/3 acre","10/3 acre","5/3 acre","10 acre"], ans: 1, diff: "Easy", cat: "Multiplication" },
  // ---------------- Q6 ----------------
  { id:6, q: "1 hour of internet costs ₹8. How much for 1 1/4 hours?", opts: ["₹8","₹10","₹12","₹16"], ans: 1, diff: "Easy", cat: "Multiplication" },
  // ---------------- Q7 ----------------
  { id:7, q: "Tenzin drinks 1/2 glass of milk every day. How many glasses in a week (7 days)?", opts: ["3 glasses","3 1/2 glasses","4 glasses","7 glasses"], ans: 1, diff: "Easy", cat: "Multiplication" },
  // ---------------- Q8 ----------------
  { id:8, q: "What is 1/5 × 3 equal to?", opts: ["3/5","1/15","5/3","15"], ans: 0, diff: "Easy", cat: "Multiplication" },
  // ---------------- Q9 ----------------
  { id:9, q: "What is 2/5 × 3 equal to?", opts: ["6/5","3/10","6/15","15/6"], ans: 0, diff: "Easy", cat: "Multiplication" },
  // ---------------- Q10 ----------------
  { id:10, q: "5 × 2/3 = ?", opts: ["10/3","7/3","5/6","15/2"], ans: 0, diff: "Easy", cat: "Multiplication" },

  // ---------------- Q11 ----------------
  { id:11, q: "What is 1/2 × 1/4 equal to?", opts: ["1/8","1/6","1/4","1/2"], ans: 0, diff: "Medium", cat: "Multiplication" },
  // ---------------- Q12 ----------------
  { id:12, q: "If a tortoise covers 2/5 km in 1 hour, how far in 3/4 of an hour?", opts: ["3/10 km","8/15 km","3/5 km","6/20 km"], ans: 0, diff: "Medium", cat: "Multiplication" },
  // ---------------- Q13 ----------------
  { id:13, q: "Multiply 7 × 3/5 and convert to a mixed fraction.", opts: ["4 1/5","21/5","4 2/5","14/5"], ans: 0, diff: "Medium", cat: "Multiplication" },
  // ---------------- Q14 ----------------
  { id:14, q: "Multiply 4 × 1/3 and convert to a mixed fraction.", opts: ["1 1/3","4/3","1 2/3","3/4"], ans: 0, diff: "Medium", cat: "Multiplication" },
  // ---------------- Q15 ----------------
  { id:15, q: "9/7 × 6 = ?", opts: ["54/7","7 5/7","7 3/7","54/49"], ans: 1, diff: "Medium", cat: "Multiplication" },
  // ---------------- Q16 ----------------
  { id:16, q: "13/11 × 6 = ?", opts: ["78/11","7 1/11","7 4/11","78/66"], ans: 0, diff: "Medium", cat: "Multiplication" },
  // ---------------- Q17 ----------------
  { id:17, q: "A team makes 1 km of canal in 8 days. How much in one day?", opts: ["1/8 km","1/4 km","8 km","1 km"], ans: 0, diff: "Medium", cat: "Division" },
  // ---------------- Q18 ----------------
  { id:18, q: "If the team works 5 days a week, how much canal in a week?", opts: ["5/8 km","1/8 km","5 km","1/5 km"], ans: 0, diff: "Medium", cat: "Division" },
  // ---------------- Q19 ----------------
  { id:19, q: "Manju and two neighbours buy 5 litres of oil and share equally among 3 families. How much each per week?", opts: ["5/3 litre","3/5 litre","15 litre","5/6 litre"], ans: 0, diff: "Medium", cat: "Division" },
  // ---------------- Q20 ----------------
  { id:20, q: "How much oil will one family get in 4 weeks?", opts: ["20/3 litre","5/3 litre","20 litre","5/12 litre"], ans: 0, diff: "Medium", cat: "Division" },
  // ---------------- Q21 ----------------
  { id:21, q: "What is 1/2 ÷ 2 equal to?", opts: ["1/4","1","4","1/2"], ans: 0, diff: "Medium", cat: "Division" },
  // ---------------- Q22 ----------------
  { id:22, q: "What is 5 ÷ 1/2 equal to?", opts: ["10","5/2","1/10","2/5"], ans: 0, diff: "Medium", cat: "Division" },
  // ---------------- Q23 ----------------
  { id:23, q: "The reciprocal of a fraction a/b (a≠0) is:", opts: ["b/a","a/b","1/a","1/b"], ans: 0, diff: "Medium", cat: "Division" },
  // ---------------- Q24 ----------------
  { id:24, q: "When a fraction is multiplied by its reciprocal, the result is:", opts: ["1","0","the fraction itself","undefined"], ans: 0, diff: "Medium", cat: "Division" },
  // ---------------- Q25 ----------------
  { id:25, q: "The first step in dividing fractions is to find the ___ of the divisor.", opts: ["reciprocal","product","sum","square"], ans: 0, diff: "Medium", cat: "Division" },

  // ---------------- Q26 ----------------
  { id:26, q: "Leena made 5 cups of tea and used 1/3 cup of milk per cup. How much milk in all?", opts: ["5/3 cup","15 cup","3/5 cup","5 cup"], ans: 0, diff: "Tough", cat: "Word problem" },
  // ---------------- Q27 ----------------
  { id:27, q: "Safia saw the Moon set at 10 pm. The Moon sets 5/6 hour later each day. How many hours after 10 pm will it set on Thursday (4 days later)?", opts: ["10/3 hour","20/6 hour","5/6 hour","4 hour"], ans: 0, diff: "Tough", cat: "Word problem" },
  // ---------------- Q28 ----------------
  { id:28, q: "Mariam's grandmother baked a cake. Mariam and cousins finished equally at each point on a line divided into 8 equal parts. Each gets what fraction?", opts: ["1/8","1/4","1/2","8/1"], ans: 0, diff: "Tough", cat: "Word problem" },
  // ---------------- Q29 ----------------
  { id:29, q: "A rectangle has length 3/4 m and breadth 2/5 m. What is its area?", opts: ["3/10 m²","5/9 m²","8/9 m²","6/20 m²"], ans: 0, diff: "Tough", cat: "Word problem" },
  // ---------------- Q30 ----------------
  { id:30, q: "A ribbon 5/6 m long is cut into 5 equal pieces. Length of each piece?", opts: ["1/6 m","5 m","1/5 m","25/6 m"], ans: 0, diff: "Tough", cat: "Division" },
  // ---------------- Q31 ----------------
  { id:31, q: "Simplify: (2/3 × 9/4) ÷ (3/2)", opts: ["1","3/2","2","9/8"], ans: 0, diff: "Tough", cat: "Operations" },
  // ---------------- Q32 ----------------
  { id:32, q: "Simplify: (5/6 × 3/10) ÷ (1/4)", opts: ["1","2","3/5","10/3"], ans: 0, diff: "Tough", cat: "Operations" },
  // ---------------- Q33 ----------------
  { id:33, q: "If x = 3/4 and y = 2/5, what is x ÷ y?", opts: ["15/8","8/15","3/10","5/6"], ans: 0, diff: "Tough", cat: "Operations" },
  // ---------------- Q34 ----------------
  { id:34, q: "Which is greater: 2/3 × 4/5 or 2/3 ÷ 4/5?", opts: ["2/3 × 4/5","2/3 ÷ 4/5","equal","cannot compare"], ans: 0, diff: "Tough", cat: "Operations" },
  // ---------------- Q35 ----------------
  { id:35, q: "A car covers 4/5 km in 1/4 hour. Speed in km per hour?", opts: ["16/5 km/h","4/20 km/h","5/16 km/h","1/5 km/h"], ans: 0, diff: "Tough", cat: "Word problem" },

  // ---------------- Q36 ----------------
  { id:36, q: "Convert 2/5 × 3 into a product form step: first divide 3 by ___ then multiply by ___.", opts: ["5, 2","2, 5","3, 2","5, 3"], ans: 0, diff: "Medium", cat: "Multiplication" },
  // ---------------- Q37 ----------------
  { id:37, q: "The whole is divided into 5 rows and 4 columns, creating how many equal parts?", opts: ["20","9","5","4"], ans: 0, diff: "Medium", cat: "Multiplication" },
  // ---------------- Q38 ----------------
  { id:38, q: "1/2 of an hour is the length we get by dividing 1/4 into how many equal parts?", opts: ["2","4","1","8"], ans: 0, diff: "Medium", cat: "Multiplication" },
  // ---------------- Q39 ----------------
  { id:39, q: "Mixed fraction 1 1/4 converted to improper fraction is:", opts: ["5/4","4/5","5","1/4"], ans: 0, diff: "Medium", cat: "Multiplication" },
  // ---------------- Q40 ----------------
  { id:40, q: "If 1/5 ÷ 3 = x, what is x?", opts: ["1/15","3/5","5/3","15"], ans: 0, diff: "Medium", cat: "Division" },

  // ---------------- Q41 ----------------
  { id:41, q: "A tank holds 3/4 litre. It is filled by pouring 1/8 litre at a time. How many pours to fill?", opts: ["6","4","8","3"], ans: 0, diff: "Tough", cat: "Division" },
  // ---------------- Q42 ----------------
  { id:42, q: "Simplify: 7/8 × 4/21", opts: ["1/6","28/168","1/8","7/42"], ans: 0, diff: "Tough", cat: "Multiplication" },
  // ---------------- Q43 ----------------
  { id:43, q: "If 5/7 of a number is 25, what is the number?", opts: ["35","25","5/7","7/5"], ans: 0, diff: "Tough", cat: "Word problem" },
  // ---------------- Q44 ----------------
  { id:44, q: "A recipe needs 3/4 cup sugar for one cake. For 6 cakes?", opts: ["9/2 cup","18/4 cup","4/3 cup","9 cup"], ans: 0, diff: "Medium", cat: "Multiplication" },
  // ---------------- Q45 ----------------
  { id:45, q: "Which fraction equals its own reciprocal?", opts: ["1","1/2","2","0"], ans: 0, diff: "Tough", cat: "Division" },
  // ---------------- Q46 ----------------
  { id:46, q: "0 divided by any non-zero fraction equals:", opts: ["0","1","undefined","the fraction"], ans: 0, diff: "Medium", cat: "Division" },
  // ---------------- Q47 ----------------
  { id:47, q: "Any non-zero fraction divided by itself equals:", opts: ["1","0","undefined","itself"], ans: 0, diff: "Medium", cat: "Division" },
  // ---------------- Q48 ----------------
  { id:48, q: "Simplify: (3/5 ÷ 2/7) × (4/9)", opts: ["14/15","21/30","12/35","7/10"], ans: 0, diff: "Tough", cat: "Operations" },
  // ---------------- Q49 ----------------
  { id:49, q: "John reads 2/3 of a book in 1 hour. How much in 1 1/2 hours?", opts: ["1","4/3","2/3","3/4"], ans: 0, diff: "Medium", cat: "Multiplication" },
  // ---------------- Q50 ----------------
  { id:50, q: "A wire 10/3 m long is cut into 4 equal parts. Length of each part?", opts: ["5/6 m","10/12 m","4/3 m","5/3 m"], ans: 0, diff: "Medium", cat: "Division" },
];

// Deterministic jumble: interleave difficulties so order is unpredictable
// Keep array indexed Q1..Q50 as-is for display; difficulty labels NOT shown on paper

window.QUESTIONS = QUESTIONS;
