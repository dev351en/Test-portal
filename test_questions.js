// D3V3NDRA Classes — Fractions Test Series
// Chapter: Working with Fractions (NCERT Class 7, gegp108)
// 50 MCQs • 2 marks each • 100 marks • 60 minutes
// The paper is shuffled per student/date in js/app.js; order below is the source bank.

const QUESTIONS = [
  { id:1, q: "What is the product of a whole number and a fraction equal to?", opts: ["Sum of both","Repeated addition of the fraction","Difference","Ratio"], ans: 1, diff: "Easy", cat: "Multiplication" },
  { id:2, q: "Aaron walks 3 km in 1 hour. How far does he walk in 5 hours?", opts: ["8 km","12 km","15 km","18 km"], ans: 2, diff: "Easy", cat: "Multiplication" },
  { id:3, q: "A tortoise walks 1/4 km in 1 hour. How far does it walk in 3 hours?", opts: ["3/4 km","1/4 km","1/2 km","1 km"], ans: 0, diff: "Easy", cat: "Multiplication" },
  { id:4, q: "Which operation is used to find total distance when speed per hour is a fraction?", opts: ["Addition","Subtraction","Multiplication","Division"], ans: 2, diff: "Easy", cat: "Multiplication" },
  { id:5, q: "A farmer had 5 grandchildren and gave 2/3 acre of land to each. How much land in all?", opts: ["7/3 acre","10/3 acre","5/3 acre","10 acre"], ans: 1, diff: "Easy", cat: "Multiplication" },
  { id:6, q: "1 hour of internet costs ₹8. How much for 1 1/4 hours?", opts: ["₹8","₹10","₹12","₹16"], ans: 1, diff: "Easy", cat: "Multiplication" },
  { id:7, q: "Tenzin drinks 1/2 glass of milk every day. How many glasses in a week (7 days)?", opts: ["3 glasses","3 1/2 glasses","4 glasses","7 glasses"], ans: 1, diff: "Easy", cat: "Multiplication" },
  { id:8, q: "What is 1/5 × 3 equal to?", opts: ["3/5","1/15","5/3","15"], ans: 0, diff: "Easy", cat: "Multiplication" },
  { id:9, q: "What is 2/5 × 3 equal to?", opts: ["6/5","3/10","6/15","15/6"], ans: 0, diff: "Easy", cat: "Multiplication" },
  { id:10, q: "5 × 2/3 = ?", opts: ["10/3","7/3","5/6","15/2"], ans: 0, diff: "Easy", cat: "Multiplication" },

  { id:11, q: "What is 1/2 × 1/4 equal to?", opts: ["1/8","1/6","1/4","1/2"], ans: 0, diff: "Medium", cat: "Multiplication" },
  { id:12, q: "If a tortoise covers 2/5 km in 1 hour, how far does it cover in 3/4 of an hour?", opts: ["3/10 km","8/15 km","3/5 km","3/20 km"], ans: 0, diff: "Medium", cat: "Multiplication" },
  { id:13, q: "Multiply 7 × 3/5 and choose the mixed fraction.", opts: ["4 1/5","5 1/5","4 2/5","14/5"], ans: 0, diff: "Medium", cat: "Multiplication" },
  { id:14, q: "Multiply 4 × 1/3 and choose the mixed fraction.", opts: ["1 1/3","1 2/3","3/4","5/3"], ans: 0, diff: "Medium", cat: "Multiplication" },
  { id:15, q: "9/7 × 6 = ?", opts: ["7 5/7","8 1/7","7 3/7","54/49"], ans: 0, diff: "Medium", cat: "Multiplication" },
  { id:16, q: "13/11 × 6 = ?", opts: ["7 1/11","7 4/11","78/66","8 1/11"], ans: 0, diff: "Medium", cat: "Multiplication" },
  { id:17, q: "A team makes 1 km of canal in 8 days. How much does it make in one day?", opts: ["1/8 km","1/4 km","8 km","1 km"], ans: 0, diff: "Medium", cat: "Division" },
  { id:18, q: "If the team works 5 days a week, how much canal does it make in a week?", opts: ["5/8 km","1/8 km","5 km","1/5 km"], ans: 0, diff: "Medium", cat: "Division" },
  { id:19, q: "Manju and two neighbours buy 5 litres of oil and share it equally among 3 families. How much does each family get for the week?", opts: ["5/3 litre","3/5 litre","15 litre","5/6 litre"], ans: 0, diff: "Medium", cat: "Division" },
  { id:20, q: "How much oil will one family get in 4 weeks at the same rate?", opts: ["20/3 litre","5/3 litre","20 litre","5/12 litre"], ans: 0, diff: "Medium", cat: "Division" },
  { id:21, q: "What is 1/2 ÷ 2 equal to?", opts: ["1/4","1","4","1/2"], ans: 0, diff: "Medium", cat: "Division" },
  { id:22, q: "What is 5 ÷ 1/2 equal to?", opts: ["10","5/2","1/10","2/5"], ans: 0, diff: "Medium", cat: "Division" },
  { id:23, q: "The reciprocal of a fraction a/b (a ≠ 0, b ≠ 0) is:", opts: ["b/a","a/b","1/a","1/b"], ans: 0, diff: "Medium", cat: "Division" },
  { id:24, q: "When a non-zero fraction is multiplied by its reciprocal, the result is:", opts: ["1","0","the fraction itself","undefined"], ans: 0, diff: "Medium", cat: "Division" },
  { id:25, q: "The first step in dividing fractions is to find the ___ of the divisor.", opts: ["reciprocal","product","sum","square"], ans: 0, diff: "Medium", cat: "Division" },

  { id:26, q: "Leena made 5 cups of tea and used 1/3 cup of milk per cup. How much milk did she use in all?", opts: ["5/3 cup","15 cup","3/5 cup","5 cup"], ans: 0, diff: "Tough", cat: "Word problem" },
  { id:27, q: "Safia saw the Moon set at 10 pm. The Moon sets 5/6 hour later each day. How many hours after 10 pm will it set on Thursday (4 days later)?", opts: ["10/3 hour","4 hour","5/6 hour","10 hour"], ans: 0, diff: "Tough", cat: "Word problem" },
  { id:28, q: "A cake is cut into 8 equal slices. Mariam takes one slice. What fraction of the whole cake does she take?", opts: ["1/8","1/4","1/2","1/7"], ans: 0, diff: "Tough", cat: "Word problem" },
  { id:29, q: "A rectangle has length 3/4 m and breadth 2/5 m. What is its area?", opts: ["3/10 m²","5/9 m²","8/9 m²","3/5 m²"], ans: 0, diff: "Tough", cat: "Word problem" },
  { id:30, q: "A ribbon 5/6 m long is cut into 5 equal pieces. What is the length of each piece?", opts: ["1/6 m","5 m","1/5 m","25/6 m"], ans: 0, diff: "Tough", cat: "Division" },
  { id:31, q: "Simplify: (2/3 × 9/4) ÷ (3/2)", opts: ["1","3/2","2","9/8"], ans: 0, diff: "Tough", cat: "Operations" },
  { id:32, q: "Simplify: (5/6 × 3/10) ÷ (1/4)", opts: ["1","2","3/5","10/3"], ans: 0, diff: "Tough", cat: "Operations" },
  { id:33, q: "If x = 3/4 and y = 2/5, what is x ÷ y?", opts: ["15/8","8/15","3/10","5/6"], ans: 0, diff: "Tough", cat: "Operations" },
  { id:34, q: "Which is greater: 2/3 × 4/5 or 2/3 ÷ 4/5?", opts: ["2/3 × 4/5","2/3 ÷ 4/5","They are equal","Cannot be compared"], ans: 1, diff: "Tough", cat: "Operations" },
  { id:35, q: "A car covers 4/5 km in 1/4 hour. What is its speed in km per hour?", opts: ["16/5 km/h","4/20 km/h","5/16 km/h","1/5 km/h"], ans: 0, diff: "Tough", cat: "Word problem" },

  { id:36, q: "To calculate 2/5 × 3, we can first divide 3 by 5 and then multiply by 2. Which calculation shows this?", opts: ["3 ÷ 5 × 2","5 ÷ 3 × 2","3 ÷ 2 × 5","2 ÷ 5 × 3"], ans: 0, diff: "Medium", cat: "Multiplication" },
  { id:37, q: "The whole is divided into 5 rows and 4 columns. How many equal parts are created?", opts: ["20","9","5","4"], ans: 0, diff: "Medium", cat: "Multiplication" },
  { id:38, q: "How many 1/4-hour intervals are there in 1/2 hour?", opts: ["2","4","1","8"], ans: 0, diff: "Medium", cat: "Multiplication" },
  { id:39, q: "The mixed fraction 1 1/4 converted to an improper fraction is:", opts: ["5/4","4/5","5","1/4"], ans: 0, diff: "Medium", cat: "Multiplication" },
  { id:40, q: "If 1/5 ÷ 3 = x, what is x?", opts: ["1/15","3/5","5/3","15"], ans: 0, diff: "Medium", cat: "Division" },

  { id:41, q: "A tank holds 3/4 litre. It is filled by pouring 1/8 litre at a time. How many pours are needed to fill it?", opts: ["6","4","8","3"], ans: 0, diff: "Tough", cat: "Division" },
  { id:42, q: "Simplify: 7/8 × 4/21", opts: ["1/6","1/8","2/7","3/7"], ans: 0, diff: "Tough", cat: "Multiplication" },
  { id:43, q: "If 5/7 of a number is 25, what is the number?", opts: ["35","25","5/7","7/5"], ans: 0, diff: "Tough", cat: "Word problem" },
  { id:44, q: "A recipe needs 3/4 cup of sugar for one cake. How much sugar is needed for 6 cakes?", opts: ["9/2 cup","4/3 cup","9 cup","3/2 cup"], ans: 0, diff: "Medium", cat: "Multiplication" },
  { id:45, q: "Which fraction equals its own reciprocal?", opts: ["1","1/2","2","0"], ans: 0, diff: "Tough", cat: "Division" },
  { id:46, q: "0 divided by any non-zero fraction equals:", opts: ["0","1","undefined","the fraction"], ans: 0, diff: "Medium", cat: "Division" },
  { id:47, q: "Any non-zero fraction divided by itself equals:", opts: ["1","0","undefined","itself"], ans: 0, diff: "Medium", cat: "Division" },
  { id:48, q: "Simplify: (3/5 ÷ 2/7) × (4/9)", opts: ["14/15","7/15","12/35","21/20"], ans: 0, diff: "Tough", cat: "Operations" },
  { id:49, q: "John reads 2/3 of a book in 1 hour. How much does he read in 1 1/2 hours?", opts: ["1","4/3","2/3","3/4"], ans: 0, diff: "Medium", cat: "Multiplication" },
  { id:50, q: "A wire 10/3 m long is cut into 4 equal parts. What is the length of each part?", opts: ["5/6 m","4/3 m","5/3 m","2/3 m"], ans: 0, diff: "Medium", cat: "Division" }
];

window.QUESTIONS = QUESTIONS;
