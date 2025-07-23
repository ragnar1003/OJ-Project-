const problem = [
     
  {
    "title": "Sum of Two Numbers",
    "description": "Given two integers, return their sum.",
    "difficulty": "Easy",
    
    "sampleTestCases": [
      { "input": "2 3", "output": "5" }
    ],
    "judgeTestCases": [
      { "input": "100000 200000", "output": "300000" },
      { "input": "-999999 -1", "output": "-1000000" }
    ]
  },
  {
    "title": "Check Palindrome",
    "description": "Check whether the given string is a palindrome.",
    "difficulty": "Easy",
    
    "sampleTestCases": [
      { "input": "madam", "output": "true" }
    ],
    "judgeTestCases": [
      { "input": "racecar", "output": "true" },
      { "input": "a", "output": "true" },
      { "input": "abcdefg", "output": "false" }
    ]
  },
  {
    "title": "Largest Number in Array",
    "description": "Find the largest number in the given array.",
    "difficulty": "Easy",
    
    "sampleTestCases": [
      { "input": "5\n1 2 3 4 5", "output": "5" }
    ],
    "judgeTestCases": [
      { "input": "3\n-1 -2 -3", "output": "-1" },
      { "input": "100000\n" + " ".repeat(99999) + "999999", "output": "999999" }
    ]
  },
  {
    "title": "Fibonacci Nth Term",
    "description": "Return the Nth Fibonacci number (0-indexed).",
    "difficulty": "Medium",
    
    "sampleTestCases": [
      { "input": "5", "output": "5" }
    ],
    "judgeTestCases": [
      { "input": "10", "output": "55" },
      { "input": "45", "output": "1134903170" }
    ]
  },
  {
    "title": "Is Prime?",
    "description": "Check if the number is a prime number.",
    "difficulty": "Easy",
   
    "sampleTestCases": [
      { "input": "7", "output": "true" }
    ],
    "judgeTestCases": [
      { "input": "999983", "output": "true" },
      { "input": "1000000", "output": "false" }
    ]
  },
  {
    "title": "Reverse String",
    "description": "Given a string, reverse it.",
    "difficulty": "Easy",
   
    "sampleTestCases": [
      { "input": "hello", "output": "olleh" }
    ],
    "judgeTestCases": [
      { "input": "a", "output": "a" },
      { "input": "abcdefghijklmnopqrstuvwxyz", "output": "zyxwvutsrqponmlkjihgfedcba" }
    ]
  },
  {
    "title": "Sum of Array",
    "description": "Calculate the sum of all integers in an array.",
    "difficulty": "Easy",
    
    "sampleTestCases": [
      { "input": "3\n1 2 3", "output": "6" }
    ],
    "judgeTestCases": [
      { "input": "100000\n" + "1 ".repeat(99999) + "1", "output": "100000" }
    ]
  },
  {
    "title": "Count Set Bits",
    "description": "Count the number of 1s in the binary representation of a number.",
    "difficulty": "Medium",
    
    "sampleTestCases": [
      { "input": "5", "output": "2" }
    ],
    "judgeTestCases": [
      { "input": "255", "output": "8" },
      { "input": "1023", "output": "10" }
    ]
  },
  {
    "title": "Sort Array",
    "description": "Sort the given array in ascending order.",
    "difficulty": "Easy",
   
    "sampleTestCases": [
      { "input": "4\n3 1 2 4", "output": "1 2 3 4" }
    ],
    "judgeTestCases": [
      { "input": "5\n5 4 3 2 1", "output": "1 2 3 4 5" },
      { "input": "5\n1 2 3 4 5", "output": "1 2 3 4 5" }
    ]
  },
  {
    "title": "Count Frequencies",
    "description": "Given an array, count frequency of each element.",
    "difficulty": "Medium",
    
    "sampleTestCases": [
      { "input": "6\n1 2 2 3 3 3", "output": "1:1 2:2 3:3" }
    ],
    "judgeTestCases": [
      { "input": "3\n1 1 1", "output": "1:3" },
      { "input": "5\n5 4 3 2 1", "output": "5:1 4:1 3:1 2:1 1:1" }
    ]
  }


];
export default problem;