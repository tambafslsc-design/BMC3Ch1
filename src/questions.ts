export interface Question {
  questionNumber: number;
  reference: string;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export const questions: Question[] = [
  {
    questionNumber: 1,
    reference: "BAFS600C3Ch1-1",
    text: "Under the concept of time value of money, ________.",
    options: {
      A: "the later the money is received, the larger the present value of money",
      B: "the earlier the money is received, the larger the present value of money",
      C: "the earlier the money is received, the smaller the present value of money",
      D: "the value of money is the same regardless of time"
    },
    answer: "B",
    explanation: "Time value of money means money received today is worth more than that received tomorrow. This is because the money received today could have been used to make investments and earn interest had it been received earlier."
  },
  {
    questionNumber: 2,
    reference: "BAFS600C3Ch1-2",
    text: "Which of the following is the meaning of compounding?",
    options: {
      A: "the present value of money",
      B: "the future value of money",
      C: "the calculation process of turning present values into future values",
      D: "the calculation process of turning future values into present values"
    },
    answer: "C",
    explanation: "By definition, compounding is a process of turning present values into future values."
  },
  {
    questionNumber: 3,
    reference: "BAFS600C3Ch1-3",
    text: "Which of the following is the meaning of discounting?",
    options: {
      A: "the present value of money",
      B: "the future value of money",
      C: "the calculation process of turning present value into future value",
      D: "the calculation process of turning future value into present value"
    },
    answer: "D",
    explanation: "By definition, discounting is a process of turning future values into present values."
  },
  {
    questionNumber: 4,
    reference: "BAFS600C3Ch1-4",
    text: "If Mr. Chan deposits $100 into a bank for one year at an annual interest rate of 5% compounded yearly, what is the present value of the deposit?",
    options: {
      A: "$95",
      B: "$100",
      C: "$105",
      D: "$110"
    },
    answer: "B",
    explanation: "Since the question is asking about the present value of the money, it is simply the amount deposited, i.e. $100."
  },
  {
    questionNumber: 5,
    reference: "BAFS600C3Ch1-5",
    text: "Refer to Question 4, what is the future value of the money deposited after one year?",
    options: {
      A: "$95",
      B: "$100",
      C: "$105",
      D: "$110"
    },
    answer: "C",
    explanation: "Future value = Present value * (1 + r), where r is the annual interest rate. The future value will be $100 * (1 + 0.05) = $105."
  },
  {
    questionNumber: 6,
    reference: "BAFS600C3Ch1-6",
    text: "Suppose Mr. Chan bought $5,000 bonds and one year later he got a return of $6,000. Which of the following statements is correct?",
    options: {
      A: "Interests are not provided by this $5,000 bonds investment.",
      B: "Time value of money is applied in the above case.",
      C: "Compounding is not applied in the above case.",
      D: "Discounting is applied in the above case."
    },
    answer: "B",
    explanation: "Mr. Chan used $5,000 to buy bonds and he sold the bonds with a return of $6,000 one year later. Time value of money is applied as the $5,000 worth more one year later."
  },
  {
    questionNumber: 7,
    reference: "BAFS600C3Ch1-7",
    text: "Suppose Mr. Lee deposits $2,000 into the bank for one year with an annual interest rate of 10% compounded yearly, what is the amount he can get after one year?",
    options: {
      A: "$1,800",
      B: "$2,000",
      C: "$2,200",
      D: "$2,400"
    },
    answer: "C",
    explanation: "Future value of money = Present value of money * (1 + r), where r is the annual interest rate. Therefore, the future value = $2,000 * (1 + 0.1) = $2,200."
  },
  {
    questionNumber: 8,
    reference: "BAFS600C3Ch1-8",
    text: "Suppose Mr. Chan deposits $300 into the bank for three years with an annual interest rate of 8% compounded yearly, what is the total amount he can get when the deposit matures? (Correct to the nearest dollar)",
    options: {
      A: "$238",
      B: "$257",
      C: "$350",
      D: "$378"
    },
    answer: "D",
    explanation: "The present value is $300 and the annual interest rate is 8%. As it is compounded yearly, the future value will be $300 * (1 + 0.08)^3 = $377.91 ≈ $378."
  },
  {
    questionNumber: 9,
    reference: "BAFS600C3Ch1-9",
    text: "Suppose Mr. Chan deposits $5,000 into the bank for three years with an annual interest rate of 5% compounded yearly, what is the total amount he can get after three years? (Correct to the nearest dollar)",
    options: {
      A: "$5,500",
      B: "$5,513",
      C: "$5,788",
      D: "$6,078"
    },
    answer: "C",
    explanation: "The present value is $5,000 and the annual interest rate is 5%. As a result, the total amount he can get after three years is given by $5,000 * (1 + 0.05)^3 = $5,788.125 ≈ $5,788."
  },
  {
    questionNumber: 10,
    reference: "BAFS600C3Ch1-10",
    text: "Suppose Terrence saves $x in his bank account at the beginning of the first year and then saves a double amount at the beginning of the second year. Given the annual interest rate is 10% compounded yearly, what is the value of x if he wants to obtain $300,000 at the end of the second year? (Correct to the nearest dollar)",
    options: {
      A: "43,988",
      B: "87,977",
      C: "131,965",
      D: "154,759"
    },
    answer: "B",
    explanation: "x * (1.1)^2 + 2x * (1.1) = 300,000 => 1.21x + 2.2x = 300,000 => 3.41x = 300,000 => x = 87,976.5 ≈ 87,977."
  },
  {
    questionNumber: 11,
    reference: "BAFS600C3Ch1-11",
    text: "There is no difference between nominal and effective rates of return when interest is compounded ________.",
    options: {
      A: "weekly",
      B: "monthly",
      C: "quarterly",
      D: "yearly"
    },
    answer: "D",
    explanation: "As the nominal rate is an annual rate, it indicates that if the interest is calculated based on yearly compounding, the effective rate of return would be the same as the nominal rate."
  },
  {
    questionNumber: 12,
    reference: "BAFS600C3Ch1-12",
    text: "Which of the following is/are correct for effective rate of return?\n\n(1) Effective rate of return means the actual rate of return from a given interest rate and a given compounding period.\n(2) Effective rate of return is less useful than the nominal rate of return in decision making.\n(3) Effective rate of return is equal to the nominal rate of return.",
    options: {
      A: "(1) only",
      B: "(2) only",
      C: "(1) and (3) only",
      D: "(2) and (3) only"
    },
    answer: "A",
    explanation: "(1) is correct. It is true by definition. (2) is incorrect. The effective rate of return reflects the actual return of an investment while the nominal rate of return may not. (3) is incorrect. The effective rate of return can be larger than the nominal rate of return, when the amount is compounded more than once within a year."
  },
  {
    questionNumber: 13,
    reference: "BAFS600C3Ch1-13",
    text: "\"Effective rate of return must be greater than nominal rate of return.\" This statement is ________.",
    options: {
      A: "correct as effective rate of return is given by yearly compounding",
      B: "correct by mathematical calculations",
      C: "incorrect as effective rate of return can be the same as nominal rate of return if the interest is compounded yearly",
      D: "incorrect as effective rate of return may be smaller than nominal rate of return"
    },
    answer: "C",
    explanation: "If the effective rate of return (ERR) is compounded yearly, it will be equal to nominal rate of return."
  },
  {
    questionNumber: 14,
    reference: "BAFS600C3Ch1-14",
    text: "If the nominal rate of return is 2% per annum compounded quarterly, what is the effective rate of return? (Correct to 2 decimal places)",
    options: {
      A: "0.50%",
      B: "2.02%",
      C: "2.05%",
      D: "8.24%"
    },
    answer: "B",
    explanation: "Effective rate of return = (1 + 0.02/4)^4 - 1 = (1.005)^4 - 1 ≈ 0.02015 ≈ 2.02%."
  },
  {
    questionNumber: 15,
    reference: "BAFS600C3Ch1-15",
    text: "If the nominal rate of return is 4% per annum compounded monthly, what is the effective rate of return? (Correct to 2 decimal places)",
    options: {
      A: "0.33%",
      B: "4.07%",
      C: "12.68%",
      D: "60.10%"
    },
    answer: "B",
    explanation: "Effective rate of return = (1 + 0.04/12)^12 - 1 ≈ (1.00333)^12 - 1 ≈ 0.04074 ≈ 4.07%."
  },
  {
    questionNumber: 16,
    reference: "BAFS600C3Ch1-16",
    text: "If the effective rate of return is 10%, what is the nominal rate of return if it is compounded yearly?",
    options: {
      A: "0.8%",
      B: "10%",
      C: "20%",
      D: "cannot be determined"
    },
    answer: "B",
    explanation: "Effective rate of return compounded yearly is equal to the nominal rate of return."
  },
  {
    questionNumber: 17,
    reference: "BAFS600C3Ch1-17",
    text: "Which of the following is the difference between effective and nominal rates of return?",
    options: {
      A: "The former considers the effect of inflation while the latter does not.",
      B: "The former is affected by the interest rate while the latter is not.",
      C: "The former includes the effect reinvested during the year while the latter does not.",
      D: "The former is less widely used in daily life than the latter."
    },
    answer: "C",
    explanation: "It is true by definition."
  },
  {
    questionNumber: 18,
    reference: "BAFS600C3Ch1-18",
    text: "Which of the following is the correct definition of net present value (NPV)?",
    options: {
      A: "sum of the present values of future cash inflow less the initial cost",
      B: "sum of all cash inflows less all cash outflows",
      C: "sum of all cash outflows less all cash inflows",
      D: "all cash inflows discounted to present values"
    },
    answer: "A",
    explanation: "It is true by definition."
  },
  {
    questionNumber: 19,
    reference: "BAFS600C3Ch1-19",
    text: "When considering an investment decision, the option with ________ should be chosen.",
    options: {
      A: "the highest net present value",
      B: "the highest cost of capital",
      C: "the highest nominal rate of return",
      D: "the highest future value"
    },
    answer: "A",
    explanation: "An investment with the highest net present value means it is the most profitable."
  },
  {
    questionNumber: 20,
    reference: "BAFS600C3Ch1-20",
    text: "June is using the net present value to decide whether to purchase a piece of office furniture. Which of the following pieces of information does she need to use when making the decision?\n\n(1) residual value of the office furniture at the end of their useful life\n(2) all cash flows originated from the purchase and use of the office furniture\n(3) cost of capital",
    options: {
      A: "(1) and (2) only",
      B: "(1) and (3) only",
      C: "(2) and (3) only",
      D: "(1), (2) and (3)"
    },
    answer: "D",
    explanation: "(1), (2) and (3) are correct. Net present value is the present value of future cash inflows less the original capital."
  },
  {
    questionNumber: 21,
    reference: "BAFS600C3Ch1-21",
    text: "Amy deposited $5,000 into a fixed-interest bank account. If the interest rate on the deposit is 5% per annum compounded quarterly, find (to the nearest dollar) the total amount she could withdraw after 3 years.",
    options: {
      A: "$5,255",
      B: "$5,526",
      C: "$5,804",
      D: "$8,978"
    },
    answer: "C",
    explanation: "The amount she could get = $5,000 * (1 + 0.05/4)^(3*4) = $5,000 * (1.0125)^12 ≈ $5,803.77 ≈ $5,804."
  },
  {
    questionNumber: 22,
    reference: "BAFS600C3Ch1-22",
    text: "The effective rate of return of a bank deposit will increase when there is ________.",
    options: {
      A: "a decrease in the cost of capital",
      B: "a decrease in the period of deposit",
      C: "an increase in the principal",
      D: "an increase in the frequency compounding"
    },
    answer: "D",
    explanation: "When the frequency of compounding is higher, the effective rate of return will increase."
  },
  {
    questionNumber: 23,
    reference: "BAFS600C3Ch1-23",
    text: "The budgeted price of a flat is $2,000,000. The down payment will be 20% of the flat's price. Jinny decides to deposit an amount of money in the bank so that she can afford to make the down payment in 3 years. If the bank provides an annual interest rate of 3% compounded monthly for the deposit, how much money does she need to deposit today? (Correct to the nearest dollar)",
    options: {
      A: "$36,561",
      B: "$365,614",
      C: "$396,417",
      D: "$437,621"
    },
    answer: "B",
    explanation: "Down payment = $2,000,000 * 20% = $400,000. Deposit needed = $400,000 / (1 + 0.03/12)^(3*12) = $400,000 / (1.0025)^36 ≈ $365,614."
  },
  {
    questionNumber: 24,
    reference: "BAFS600C3Ch1-24",
    text: "A bank provides four saving plans for the public. Tracy decides to invest an amount of $5,000 into one of them for two years.\nPlan A: 10% Yearly\nPlan B: 9.8% Half-yearly\nPlan C: 9.6% Quarterly\nPlan D: 9.4% Monthly\nWhich plan offers the highest return after two years?",
    options: {
      A: "Plan A",
      B: "Plan B",
      C: "Plan C",
      D: "Plan D"
    },
    answer: "B",
    explanation: "Plan A: $5,000 * (1.1)^2 = $6,050. Plan B: $5,000 * (1 + 0.098/2)^4 = $5,000 * (1.049)^4 ≈ $6,054. Plan C: $5,000 * (1 + 0.096/4)^8 ≈ $6,045. Plan D: $5,000 * (1 + 0.094/12)^24 ≈ $6,030. Plan B is highest."
  },
  {
    questionNumber: 25,
    reference: "BAFS600C3Ch1-25",
    text: "Betty is going to purchase a flat with a cash price of $1,500,000. Proposal A: Borrow a loan of $1,500,000 from a bank on 1 January 20X4. The loan is repayable by a lump sum of $2,500,000 at the end of 20X6. The cost of capital is 12% per annum. What is the present value of the amount to be paid for Proposal A? (Correct to the nearest dollar)",
    options: {
      A: "$1,446,759",
      B: "$1,500,000",
      C: "$1,779,451",
      D: "$1,992,955"
    },
    answer: "C",
    explanation: "PV = $2,500,000 / (1.12)^3 ≈ $1,779,451."
  },
  {
    questionNumber: 26,
    reference: "BAFS600C3Ch1-26",
    text: "Proposal B: Purchase the flat from the developer by instalments as follows: Deposit (1 Jan 20X4): $700,000; End of 20X4: $600,000; End of 20X5: $500,000; End of 20X6: $400,000. Total: $2,200,000. The cost of capital is 12% per annum. What is the present value of the amount to be paid for Proposal B? (Correct to the nearest dollar)",
    options: {
      A: "$1,563,017",
      B: "$1,919,023",
      C: "$2,065,306",
      D: "$2,103,571"
    },
    answer: "B",
    explanation: "PV = $700,000 + $600,000/1.12 + $500,000/1.12^2 + $400,000/1.12^3 ≈ $1,919,023."
  },
  {
    questionNumber: 27,
    reference: "BAFS600C3Ch1-27",
    text: "Betty should adopt ________ because ________.",
    options: {
      A: "Proposal A ... the present value of the amount to be paid is lower",
      B: "Proposal A ... no instalments need to be paid",
      C: "Proposal B ... the present value of the amount to be paid is higher",
      D: "Proposal B ... the cost of loans under proposal B is $300,000 lower"
    },
    answer: "A",
    explanation: "The present value of the amount to be paid for Proposal A ($1,779,451) is lower than that of Proposal B ($1,919,023). Lower costs are incurred if it is adopted."
  },
  {
    questionNumber: 28,
    reference: "BAFS600C3Ch1-28",
    text: "A credit company is offering Fiona a three-year instalment plan for a $12,000 loan under a flat rate agreement. At the end of each year, she needs to repay $5,000. What is the annual flat rate of this instalment loan plan?",
    options: {
      A: "10.33%",
      B: "8.33%",
      C: "10.67%",
      D: "8.67%"
    },
    answer: "B",
    explanation: "Total repayment = $5,000 * 3 = $15,000. Total interest = $15,000 - $12,000 = $3,000. Interest per year = $3,000 / 3 = $1,000. Annual flat rate = ($1,000 / $12,000) * 100% = 8.33%."
  },
  {
    questionNumber: 29,
    reference: "BAFS600C3Ch1-29",
    text: "Iverson lent $25,000 to Gloria on 1 January 20X6. In each of the following three years, Gloria will pay back Iverson $12,000, $11,000 and $10,000 on 31 December respectively. The costs of capital of the three years are estimated to be 5%, 7% and 3% respectively. Find the net present value of the lending decision, correct to the nearest dollar.",
    options: {
      A: "$3,517",
      B: "$4,861",
      C: "$6,418",
      D: "$8,000"
    },
    answer: "B",
    explanation: "PV of inflows = $12,000/1.05 + $11,000/(1.05*1.07) + $10,000/(1.05*1.07*1.03) ≈ $29,861. NPV = $29,861 - $25,000 = $4,861."
  },
  {
    questionNumber: 30,
    reference: "BAFS600C3Ch1-30",
    text: "Johnathan wants to make a $800,000 compounded deposit in a bank for half a year. The deposit plan offered is \"interest being compounded half-yearly, at a rate of 4% p.a.\". Which of the following alternatives should Johnathan suggest to earn a higher interest income?",
    options: {
      A: "an interest payment of $15,000 at the period end",
      B: "interest being compounded monthly, at the same rate",
      C: "interest being compounded yearly at 8%",
      D: "none of the above"
    },
    answer: "B",
    explanation: "The frequency of compounding of the original plan is lower than that of Choice B. The higher the frequency, the higher the return."
  },
  {
    questionNumber: 31,
    reference: "BAFS600C3Ch1-31",
    text: "Mr. Leung plans to purchase three machines costing $86,000 each. He needs to pay a down payment of 30% of the total cost. He decides to pay the down payment in cash and apply for a bank loan with an annual interest rate of 5% for the remaining balance, which will be repaid in full after four years. Interest is compounded half-yearly. What is the total amount paid by Mr. Leung for the machines (Correct to the nearest dollar)?",
    options: {
      A: "$73,348",
      B: "$219,520",
      C: "$220,044",
      D: "$297,444"
    },
    answer: "D",
    explanation: "Total cost = $86,000 * 3 = $258,000. Down payment = $258,000 * 30% = $77,400. Loan = $180,600. Repayment = $180,600 * (1 + 0.05/2)^8 ≈ $220,044. Total paid = $77,400 + $220,044 = $297,444."
  },
  {
    questionNumber: 32,
    reference: "BAFS600C3Ch1-32",
    text: "Chris wants to apply for a bank loan that will be repaid in two years. He is interested in the loan offered by Banks A, B and C. Based on the following information, suggest the most appropriate one for him.\nBank A: 5% p.a. compounded monthly\nBank B: 5.1% p.a. compounded half-yearly\nBank C: 5.2% p.a. compounded yearly",
    options: {
      A: "Bank A",
      B: "Bank B",
      C: "Bank C",
      D: "cannot be determined"
    },
    answer: "A",
    explanation: "For applying a loan, the one with lowest effective interest should be chosen. Effective rates: A ≈ 5.116%, B ≈ 5.165%, C = 5.2%. Bank A is the lowest."
  },
  {
    questionNumber: 33,
    reference: "BAFS600C3Ch1-33",
    text: "Michael lent $450,000 to his friend Tony. Tony repaid the amount in a lump sum two years later. Interest rate is 5% per annum and interest is compounded monthly. Cost of capital is 2.5% per annum. Calculate the net present value of the loan for Michael (Correct to the nearest dollar).",
    options: {
      A: "$23,265",
      B: "$47,224",
      C: "$473,265",
      D: "$497,224"
    },
    answer: "A",
    explanation: "Future value = $450,000 * (1 + 0.05/12)^24 ≈ $497,224. PV of this = $497,224 / (1.025)^2 ≈ $473,265. NPV = $473,265 - $450,000 = $23,265."
  },
  {
    questionNumber: 34,
    reference: "BAFS600C3Ch1-34",
    text: "Mr. Chan wants to buy a house for $4,000,000 in three years. He is going to put his savings in a time deposit of interest rate 4% per annum. Interest is compounded yearly. What is the minimum amount that Mr. Chan should put in the time deposit so that he can buy the house in three years (Correct to nearest dollar)?",
    options: {
      A: "$3,555,985",
      B: "$3,555,986",
      C: "$3,571,429",
      D: "$3,846,154"
    },
    answer: "A",
    explanation: "Minimum amount = $4,000,000 / (1.04)^3 ≈ $3,555,985."
  }
];
