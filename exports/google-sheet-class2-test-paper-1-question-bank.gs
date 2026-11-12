/** D3V3NDRA Classes — Class 2 Mathematics · Test Paper 1
 * Paste into Google Sheets > Extensions > Apps Script. Save, reload the sheet,
 * then D3V3NDRA > Fill everything. Illustration cells contain clickable URLs.
 */
const QUESTION_ROWS = [
  {
    "no": 1,
    "id": 1,
    "question": "Mia had $100 with her. Her father gave her $50 as pocket money. Her grandmother gave her $100 as a birthday gift. How much money does she have altogether?",
    "options": [
      "$150",
      "$200",
      "$100",
      "$250"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "$250",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "Add Mia's money and both gifts: $100 + $50 + $100. The total is $250."
  },
  {
    "no": 2,
    "id": 2,
    "question": "Roger started his homework at the time mentioned on the clock. He finished his homework in 3 hours and 15 minutes. At what time did he finish his homework?",
    "options": [
      "https://mest-porutal.vercel.app/assets/class2-test1/q02-a.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q02-b.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q02-c.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q02-d.png"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "https://mest-porutal.vercel.app/assets/class2-test1/q02-a.png",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q02.png",
    "optionImages": [
      "https://mest-porutal.vercel.app/assets/class2-test1/q02-a.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q02-b.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q02-c.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q02-d.png"
    ],
    "solution": "The given clock shows 7:00. Three hours later it is 10:00. Add 15 minutes to get 10:15, which is the clock in option A."
  },
  {
    "no": 3,
    "id": 3,
    "question": "If Mango = 400 grams, Apple = 200 grams and Mango + Apple + Grapes = 800 grams, then what will be the weight of Grapes?",
    "options": [
      "100 grams",
      "200 grams",
      "300 grams",
      "400 grams"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "200 grams",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "Mango and apple together weigh 400 + 200 = 600 grams. Grapes weigh 800 − 600 = 200 grams."
  },
  {
    "no": 4,
    "id": 4,
    "question": "Which of the following shapes has maximum number of sides?",
    "options": [
      "https://mest-porutal.vercel.app/assets/class2-test1/q04-a.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q04-b.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q04-c.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q04-d.png"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "https://mest-porutal.vercel.app/assets/class2-test1/q04-d.png",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [
      "https://mest-porutal.vercel.app/assets/class2-test1/q04-a.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q04-b.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q04-c.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q04-d.png"
    ],
    "solution": "Count the sides: A has 7, B has 5, C has 6 and D has 8. The largest count is 8, so choose D."
  },
  {
    "no": 5,
    "id": 5,
    "question": "Based on the image given below answer the following question: Who has the maximum number of crayons?",
    "options": [
      "Tia",
      "Milo",
      "Bruce",
      "Tom"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "Tia",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q05.png",
    "optionImages": [],
    "solution": "Tia has 4 crayon symbols; Milo has 2, Bruce has 3 and Tom has 2. Tia has the most symbols, so she has the most crayons (4 × 5 = 20)."
  },
  {
    "no": 6,
    "id": 6,
    "question": "Oscar has to board a train that arrives at the station at 4:20 p.m. If he reaches the station at 3:45 pm, then how long will he have to wait at the platform?",
    "options": [
      "45 minutes",
      "40 minutes",
      "50 minutes",
      "35 minutes"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "35 minutes",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "From 3:45 p.m. to 4:00 p.m. is 15 minutes. From 4:00 to 4:20 is 20 minutes. Total waiting time: 15 + 20 = 35 minutes."
  },
  {
    "no": 7,
    "id": 7,
    "question": "I am a two-digit number between 20 and 30. My ten's place digit is greater than one's place digit. Who am I?",
    "options": [
      "28",
      "27",
      "21",
      "23"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "21",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "The tens digit of a number between 20 and 30 is 2. In 21, the ones digit is 1 and 2 > 1. The other choices do not satisfy this."
  },
  {
    "no": 8,
    "id": 8,
    "question": "George wants to find the odd one out among the choices below. Help him find it.",
    "options": [
      "Weight of stone = 2 kg",
      "Height of chair = 52 cm",
      "Height of building = 12 m",
      "Length of rod = 25 cm"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "Weight of stone = 2 kg",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "Kilograms measure weight. Centimetres and metres measure length or height. The stone's weight is the only measurement of weight, so it is the odd one out."
  },
  {
    "no": 9,
    "id": 9,
    "question": "What is 12ºC more than the temperature given in the thermometer?",
    "options": [
      "25ºC",
      "13ºC",
      "10ºC",
      "1ºC"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "25ºC",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q09.png",
    "optionImages": [],
    "solution": "Read the thermometer: it shows 13ºC. Add 12ºC: 13 + 12 = 25ºC."
  },
  {
    "no": 10,
    "id": 10,
    "question": "Peter is taller than Siel by 38 cm. If Siel is 118 cm tall, then what is Peter's height?",
    "options": [
      "172 cm",
      "132 cm",
      "156 cm",
      "148 cm"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "156 cm",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "Peter is 38 cm taller than Siel, who is 118 cm tall. Add 118 + 38 = 156 cm."
  },
  {
    "no": 11,
    "id": 11,
    "question": "Fill in the blank: 127, ____, 141, 148, 155",
    "options": [
      "132",
      "134",
      "131",
      "133"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "134",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "The pattern increases by 7 each time: 141, 148, 155. 127 + 7 = 134. Check: 134 + 7 = 141."
  },
  {
    "no": 12,
    "id": 12,
    "question": "Which of these correctly represents 973?",
    "options": [
      "Nine hundred and seventy-three",
      "Nine hundred and thirty-seven",
      "Nine hundred and thirty",
      "Nine hundred and seven"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "Nine hundred and seventy-three",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "973 has 9 hundreds, 7 tens and 3 ones. Its number name is nine hundred and seventy-three."
  },
  {
    "no": 13,
    "id": 13,
    "question": "If the position of R and U is interchanged, then who will be second from the left?",
    "options": [
      "P",
      "Q",
      "R",
      "W"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "Q",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q13.png",
    "optionImages": [],
    "solution": "Before the swap, the order is P, Q, R, S, T, U, V, W. After swapping R and U: P, Q, U, S, T, R, V, W. Q is still second from the left."
  },
  {
    "no": 14,
    "id": 14,
    "question": "Fill in the blank: 135 + 48 + ___ = 534 - 123 + 42",
    "options": [
      "135",
      "183",
      "270",
      "453"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "270",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "First calculate the right side: 534 − 123 + 42 = 453. The known numbers on the left total 135 + 48 = 183. Missing number: 453 − 183 = 270."
  },
  {
    "no": 15,
    "id": 15,
    "question": "How many straight lines are there in the picture given below?",
    "options": [
      "6",
      "7",
      "8",
      "9"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "9",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q15.png",
    "optionImages": [],
    "solution": "Trace the outside edges and the inside folds of the paper plane. Counting the straight line segments gives 9, matching option D."
  },
  {
    "no": 16,
    "id": 16,
    "question": "What is the sum of the temperatures shown in the two thermometers?",
    "options": [
      "27ºC",
      "17ºC",
      "33ºC",
      "43ºC"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "43ºC",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q16.png",
    "optionImages": [],
    "solution": "The thermometers show 30ºC and 13ºC. Their sum is 30 + 13 = 43ºC."
  },
  {
    "no": 17,
    "id": 17,
    "question": "Which one of these has maximum number of straight lines?",
    "options": [
      "https://mest-porutal.vercel.app/assets/class2-test1/q17-a.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q17-b.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q17-c.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q17-d.png"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "https://mest-porutal.vercel.app/assets/class2-test1/q17-b.png",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [
      "https://mest-porutal.vercel.app/assets/class2-test1/q17-a.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q17-b.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q17-c.png",
      "https://mest-porutal.vercel.app/assets/class2-test1/q17-d.png"
    ],
    "solution": "Count the straight sides: A has 10, B has 12, C has 7 and D has 5. Option B has the maximum number: 12."
  },
  {
    "no": 18,
    "id": 18,
    "question": "Peter's school closed for the summer holidays from 18 May 2019. From 1 to 17 May, the teachers attended school every day except Sundays. For the rest of May, they attended school only on Saturdays. Using the calendar, how many days did the teachers attend school in May altogether?",
    "options": [
      "17 days",
      "18 days",
      "19 days",
      "20 days"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "17 days",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q18.png",
    "optionImages": [],
    "solution": "From 1 to 17 May there are 17 days. Exclude Sundays 5 and 12: 17 − 2 = 15. The remaining Saturdays are 18 and 25 May. Total: 15 + 2 = 17 days."
  },
  {
    "no": 19,
    "id": 19,
    "question": "Who is third from the right of T?",
    "options": [
      "V",
      "R",
      "W",
      "Q"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "W",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q19.png",
    "optionImages": [],
    "solution": "Start at T and move to the right: U is first, V is second and W is third. The answer is W."
  },
  {
    "no": 20,
    "id": 20,
    "question": "What is the sum of the largest 3-digit number and the smallest 3-digit number?",
    "options": [
      "1,999",
      "9,999",
      "1,100",
      "1,099"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "1,099",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "The largest 3-digit number is 999. The smallest is 100. Add them: 999 + 100 = 1,099."
  },
  {
    "no": 21,
    "id": 21,
    "question": "Lucy and a friend went to the beach, where Lucy collected 95 pounds of shells. Her friend gathered 15 pounds of shells. How many pounds of shells do they have in total?",
    "options": [
      "100",
      "110",
      "115",
      "120"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "110",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "Lucy collected 95 pounds and her friend collected 15 pounds. Together they collected 95 + 15 = 110 pounds."
  },
  {
    "no": 22,
    "id": 22,
    "question": "Tom enjoys reading. There are four reference bookshelves. There are four reference books on each shelf. How many reference books are there in total?",
    "options": [
      "12",
      "14",
      "16",
      "20"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "16",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "There are 4 shelves, each with 4 reference books. 4 + 4 + 4 + 4 = 4 × 4 = 16 books."
  },
  {
    "no": 23,
    "id": 23,
    "question": "Five friends planned to show off their toys to one another. They had a lot of toys, so they decided to show them in pictograph form, as shown in the image below. Amy and Lucy have how many toys together?",
    "options": [
      "20",
      "40",
      "60",
      "80"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "60",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q23.png",
    "optionImages": [],
    "solution": "Amy has 2 symbols and Lucy has 4, making 6 symbols altogether. Each symbol means 10 toys, so 6 × 10 = 60 toys."
  },
  {
    "no": 24,
    "id": 24,
    "question": "Mike had four quarters and four dimes. How much money did Mike have left after he gave Marshal 50 cents?",
    "options": [
      "50 cents",
      "70 cents",
      "80 cents",
      "90 cents"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "90 cents",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "Four quarters are 4 × 25 = 100 cents. Four dimes are 4 × 10 = 40 cents. Mike had 140 cents. After giving away 50 cents: 140 − 50 = 90 cents."
  },
  {
    "no": 25,
    "id": 25,
    "question": "How many months will be there for 3 years?",
    "options": [
      "12",
      "24",
      "36",
      "48"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "36",
    "marks": 1,
    "category": "Practical Mathematics",
    "diagram": "",
    "optionImages": [],
    "solution": "There are 12 months in one year. For 3 years: 3 × 12 = 36 months."
  },
  {
    "no": 26,
    "id": 26,
    "question": "Which of these statements is correct regarding the picture given?",
    "options": [
      "Cake is heavier than fruits",
      "Fruits are heavier than cake",
      "Cake and fruits are equal in weight",
      "The weight comparison cannot be determined from the picture."
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "Fruits are heavier than cake",
    "marks": 2,
    "category": "Achiever’s Section",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q26.png",
    "optionImages": [],
    "solution": "On a balance, the heavier side goes down. The fruit side is lower, so the fruits are heavier than the cake."
  },
  {
    "no": 27,
    "id": 27,
    "question": "Alice went to the supermarket with 800 cents. She did some shopping for 530 cents and spent 60 cents on the metro for commuting in one direction. If she took the metro for both to and travel, then how much money is left with her?",
    "options": [
      "120 cents",
      "150 cents",
      "130 cents",
      "170 cents"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "150 cents",
    "marks": 2,
    "category": "Achiever’s Section",
    "diagram": "",
    "optionImages": [],
    "solution": "The metro costs 60 cents each way, so the return journey costs 2 × 60 = 120 cents. Money left: 800 − 530 − 120 = 150 cents."
  },
  {
    "no": 28,
    "id": 28,
    "question": "Max went from his home to his school by cycle and then walked from school to the library. He walked back from the library to school to take his cycle and came back home. How much distance did he cycle?",
    "options": [
      "1 km 470 m",
      "1 km 570 m",
      "1 km 200 m",
      "1 km 238 m"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "1 km 570 m",
    "marks": 2,
    "category": "Achiever’s Section",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q28.png",
    "optionImages": [],
    "solution": "Max cycles between home and school: 785 m each way. He walks the library part. Cycling distance: 785 + 785 = 1,570 m = 1 km 570 m."
  },
  {
    "no": 29,
    "id": 29,
    "question": "Find the missing number: 128 + 314 - ? = 653 - 482",
    "options": [
      "271",
      "583",
      "571",
      "143"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "271",
    "marks": 2,
    "category": "Achiever’s Section",
    "diagram": "",
    "optionImages": [],
    "solution": "The right side is 653 − 482 = 171. On the left, 128 + 314 = 442. So 442 − ? = 171. The missing number is 442 − 171 = 271."
  },
  {
    "no": 30,
    "id": 30,
    "question": "Oliver went shopping on the second Sunday of the month. After checking the products, he found two of them faulty and returned them the following Tuesday, as the shop is closed on the second Monday of every month. On which date did he return the products?",
    "options": [
      "January 14",
      "January 15",
      "January 22",
      "January 28"
    ],
    "correctIndex": 1,
    "correctOption": "B",
    "correctAnswer": "January 15",
    "marks": 2,
    "category": "Achiever’s Section",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q30.png",
    "optionImages": [],
    "solution": "The second Sunday in the calendar is 13 January 2019. Monday is 14 January; the following Tuesday is 15 January."
  },
  {
    "no": 31,
    "id": 31,
    "question": "What is the number name for 134 more than 625?",
    "options": [
      "Seven hundred and ninety",
      "Seven hundred and ninety-five",
      "Seventy-nine",
      "Seven hundred and fifty-nine"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "Seven hundred and fifty-nine",
    "marks": 2,
    "category": "Achiever’s Section",
    "diagram": "",
    "optionImages": [],
    "solution": "Add 134 to 625: 625 + 134 = 759. 759 is seven hundred and fifty-nine."
  },
  {
    "no": 32,
    "id": 32,
    "question": "The given picture shows the number of students in sections A, B, C and D of class 2. How many students should be transferred from section C to D so that both sections have the same number of students?",
    "options": [
      "1",
      "2",
      "10",
      "20"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "10",
    "marks": 2,
    "category": "Achiever’s Section",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q32.png",
    "optionImages": [],
    "solution": "Section C has 4 × 10 = 40 students. Section D has 2 × 10 = 20 students. Transfer half the difference: (40 − 20) ÷ 2 = 10. Both sections then have 30 students."
  },
  {
    "no": 33,
    "id": 33,
    "question": "How many circles are there in the picture?",
    "options": [
      "8",
      "10",
      "6",
      "12"
    ],
    "correctIndex": 3,
    "correctOption": "D",
    "correctAnswer": "12",
    "marks": 2,
    "category": "Achiever’s Section",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q33.png",
    "optionImages": [],
    "solution": "Count 2 circular eyes, 2 shoulder circles and 2 hand circles. The legs have 3 circles each. Total: 2 + 2 + 2 + 3 + 3 = 12 circles."
  },
  {
    "no": 34,
    "id": 34,
    "question": "How many circles are there in the picture?",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ],
    "correctIndex": 2,
    "correctOption": "C",
    "correctAnswer": "7",
    "marks": 2,
    "category": "Achiever’s Section",
    "diagram": "https://mest-porutal.vercel.app/assets/class2-test1/q34.png",
    "optionImages": [],
    "solution": "Count the 1 large central circle and the 3 medium circles around it. There are also 3 small circles at the corners. Total: 1 + 3 + 3 = 7."
  },
  {
    "no": 35,
    "id": 35,
    "question": "The organisation is holding a painting activity in which six groups of students have participated. Each group is made up of four students. How many students took part in the painting activity?",
    "options": [
      "24",
      "26",
      "28",
      "30"
    ],
    "correctIndex": 0,
    "correctOption": "A",
    "correctAnswer": "24",
    "marks": 2,
    "category": "Achiever’s Section",
    "diagram": "",
    "optionImages": [],
    "solution": "There are 6 groups, with 4 students in each group. 6 × 4 = 24 students took part."
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
    ["Class 2 · Mathematics · Test Paper 1 · 35 questions · 45 marks"],
    ['The live portal preserves the original worksheet question and option order.'],
    ["This export matches the live portal order."],
    ['Illustrations are linked in the diagram and option cells.'],
    ["Worksheet + answer key: https://mest-porutal.vercel.app/assets/worksheet-class2-test-paper-1.pdf"],
    ['Regenerate with npm run export:sheet.']
  ];
  writeSheet_('Read Me', ['D3V3NDRA Testing Portal'], notes, [720]);
  SpreadsheetApp.getActiveSpreadsheet().setActiveSheet(sheet);
}
