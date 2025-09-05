// Quiz Data - Questions organized by category and difficulty

const QuizData = {
  categories: {
    javascript: {
      name: "JavaScript",
      icon: "💻",
      description: "Test your JavaScript knowledge",
      questions: {
        easy: [
          {
            id: "js_easy_1",
            question: "What is the correct way to declare a variable in JavaScript?",
            type: "multiple-choice",
            options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
            correct: 0,
            explanation: 'The "var" keyword is used to declare variables in JavaScript.',
            points: 10,
          },
          {
            id: "js_easy_2",
            question: "JavaScript is a case-sensitive language.",
            type: "true-false",
            correct: true,
            explanation: 'JavaScript is indeed case-sensitive. "myVariable" and "myvariable" are different.',
            points: 10,
          },
          {
            id: "js_easy_3",
            question: 'What does "console.log()" do?',
            type: "multiple-choice",
            options: [
              "Displays output in the console",
              "Creates a new variable",
              "Deletes a variable",
              "Stops the program",
            ],
            correct: 0,
            explanation: "console.log() is used to display output in the browser console for debugging.",
            points: 10,
          },
          {
            id: "js_easy_4",
            question: "Which symbol is used for single-line comments in JavaScript?",
            type: "multiple-choice",
            options: ["//", "/*", "#", "--"],
            correct: 0,
            explanation: "Double forward slashes (//) are used for single-line comments in JavaScript.",
            points: 10,
          },
          {
            id: "js_easy_5",
            question: "The _____ method adds an element to the end of an array.",
            type: "fill-blank",
            correct: "push",
            explanation: "The push() method adds one or more elements to the end of an array.",
            points: 15,
          },
        ],
        medium: [
          {
            id: "js_med_1",
            question: "What will be the output of: console.log(typeof null)?",
            type: "multiple-choice",
            options: ['"null"', '"undefined"', '"object"', '"boolean"'],
            correct: 2,
            explanation: 'This is a known quirk in JavaScript. typeof null returns "object".',
            points: 15,
          },
          {
            id: "js_med_2",
            question: 'Arrow functions have their own "this" context.',
            type: "true-false",
            correct: false,
            explanation:
              'Arrow functions do not have their own "this" context; they inherit it from the enclosing scope.',
            points: 15,
          },
          {
            id: "js_med_3",
            question: "Which method is used to remove the last element from an array?",
            type: "multiple-choice",
            options: ["pop()", "shift()", "splice()", "slice()"],
            correct: 0,
            explanation: "The pop() method removes and returns the last element from an array.",
            points: 15,
          },
          {
            id: "js_med_4",
            question: 'What is the result of: "5" + 3 in JavaScript?',
            type: "multiple-choice",
            options: ["8", '"53"', "53", "Error"],
            correct: 1,
            explanation: 'JavaScript performs string concatenation when one operand is a string, resulting in "53".',
            points: 15,
          },
          {
            id: "js_med_5",
            question: "The _____ operator is used to check both value and type equality.",
            type: "fill-blank",
            correct: "===",
            explanation: "The strict equality operator (===) checks both value and type without type coercion.",
            points: 20,
          },
        ],
        hard: [
          {
            id: "js_hard_1",
            question: "What is a closure in JavaScript?",
            type: "multiple-choice",
            options: [
              "A function that returns another function",
              "A function that has access to variables in its outer scope",
              "A function that is immediately invoked",
              "A function that cannot be called",
            ],
            correct: 1,
            explanation:
              "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.",
            points: 20,
          },
          {
            id: "js_hard_2",
            question: "Event delegation works by utilizing event bubbling.",
            type: "true-false",
            correct: true,
            explanation:
              "Event delegation relies on event bubbling to handle events on child elements through a parent element.",
            points: 20,
          },
          {
            id: "js_hard_3",
            question: 'What does the "bind()" method do?',
            type: "multiple-choice",
            options: [
              "Calls a function immediately",
              'Creates a new function with a specific "this" context',
              "Binds two variables together",
              "Prevents a function from being called",
            ],
            correct: 1,
            explanation:
              'The bind() method creates a new function with a specific "this" context and optionally pre-filled arguments.',
            points: 20,
          },
          {
            id: "js_hard_4",
            question: 'What is the difference between "call()" and "apply()"?',
            type: "multiple-choice",
            options: [
              "No difference",
              "call() takes arguments individually, apply() takes an array",
              "apply() is faster than call()",
              "call() is for objects, apply() is for arrays",
            ],
            correct: 1,
            explanation: "call() takes arguments individually, while apply() takes arguments as an array.",
            points: 20,
          },
          {
            id: "js_hard_5",
            question: "The _____ pattern is used to avoid polluting the global namespace.",
            type: "fill-blank",
            correct: "IIFE",
            explanation:
              "IIFE (Immediately Invoked Function Expression) is used to create a private scope and avoid global namespace pollution.",
            points: 25,
          },
        ],
      },
    },

    html: {
      name: "HTML",
      icon: "🌐",
      description: "Test your HTML knowledge",
      questions: {
        easy: [
          {
            id: "html_easy_1",
            question: "What does HTML stand for?",
            type: "multiple-choice",
            options: [
              "Hyper Text Markup Language",
              "High Tech Modern Language",
              "Home Tool Markup Language",
              "Hyperlink and Text Markup Language",
            ],
            correct: 0,
            explanation: "HTML stands for Hyper Text Markup Language.",
            points: 10,
          },
          {
            id: "html_easy_2",
            question: "HTML tags are case-sensitive.",
            type: "true-false",
            correct: false,
            explanation: "HTML tags are not case-sensitive, but it's best practice to use lowercase.",
            points: 10,
          },
          {
            id: "html_easy_3",
            question: "Which tag is used to create a hyperlink?",
            type: "multiple-choice",
            options: ["<link>", "<a>", "<href>", "<url>"],
            correct: 1,
            explanation: "The <a> tag is used to create hyperlinks in HTML.",
            points: 10,
          },
          {
            id: "html_easy_4",
            question: "The _____ tag is used to define the largest heading.",
            type: "fill-blank",
            correct: "h1",
            explanation: "The <h1> tag defines the largest heading in HTML.",
            points: 15,
          },
        ],
        medium: [
          {
            id: "html_med_1",
            question: "Which attribute is used to specify the URL of a hyperlink?",
            type: "multiple-choice",
            options: ["src", "href", "link", "url"],
            correct: 1,
            explanation: "The href attribute specifies the URL of the page the link goes to.",
            points: 15,
          },
          {
            id: "html_med_2",
            question: "The <img> tag requires a closing tag.",
            type: "true-false",
            correct: false,
            explanation: "The <img> tag is a self-closing tag and does not require a closing tag.",
            points: 15,
          },
          {
            id: "html_med_3",
            question: "Which tag is used to create a table row?",
            type: "multiple-choice",
            options: ["<tr>", "<td>", "<th>", "<table>"],
            correct: 0,
            explanation: "The <tr> tag is used to create a table row.",
            points: 15,
          },
        ],
        hard: [
          {
            id: "html_hard_1",
            question: 'What is the purpose of the "data-*" attributes?',
            type: "multiple-choice",
            options: [
              "To store custom data",
              "To define CSS styles",
              "To create JavaScript functions",
              "To validate forms",
            ],
            correct: 0,
            explanation: "Data attributes (data-*) are used to store custom data private to the page or application.",
            points: 20,
          },
          {
            id: "html_hard_2",
            question: "Semantic HTML improves accessibility and SEO.",
            type: "true-false",
            correct: true,
            explanation:
              "Semantic HTML provides meaning to content, improving accessibility for screen readers and SEO.",
            points: 20,
          },
        ],
      },
    },

    css: {
      name: "CSS",
      icon: "🎨",
      description: "Test your CSS knowledge",
      questions: {
        easy: [
          {
            id: "css_easy_1",
            question: "What does CSS stand for?",
            type: "multiple-choice",
            options: [
              "Cascading Style Sheets",
              "Computer Style Sheets",
              "Creative Style Sheets",
              "Colorful Style Sheets",
            ],
            correct: 0,
            explanation: "CSS stands for Cascading Style Sheets.",
            points: 10,
          },
          {
            id: "css_easy_2",
            question: "CSS can be written inline, internal, or external.",
            type: "true-false",
            correct: true,
            explanation:
              "CSS can be applied in three ways: inline (style attribute), internal (<style> tag), or external (separate .css file).",
            points: 10,
          },
          {
            id: "css_easy_3",
            question: "Which property is used to change the text color?",
            type: "multiple-choice",
            options: ["color", "text-color", "font-color", "text-style"],
            correct: 0,
            explanation: 'The "color" property is used to change the text color in CSS.',
            points: 10,
          },
        ],
        medium: [
          {
            id: "css_med_1",
            question: "What is the CSS Box Model?",
            type: "multiple-choice",
            options: [
              "A way to create boxes",
              "Content, padding, border, and margin",
              "A CSS framework",
              "A layout technique",
            ],
            correct: 1,
            explanation: "The CSS Box Model consists of content, padding, border, and margin.",
            points: 15,
          },
          {
            id: "css_med_2",
            question: "Flexbox is a one-dimensional layout method.",
            type: "true-false",
            correct: true,
            explanation: "Flexbox is designed for one-dimensional layouts (either row or column).",
            points: 15,
          },
        ],
        hard: [
          {
            id: "css_hard_1",
            question: "What is CSS specificity?",
            type: "multiple-choice",
            options: [
              "How specific a CSS rule is",
              "The order of CSS rules",
              "A way to calculate which CSS rule applies",
              "All of the above",
            ],
            correct: 3,
            explanation:
              "CSS specificity determines which CSS rule applies when multiple rules target the same element.",
            points: 20,
          },
        ],
      },
    },

    react: {
      name: "React",
      icon: "⚛️",
      description: "Test your React knowledge",
      questions: {
        easy: [
          {
            id: "react_easy_1",
            question: "React is a JavaScript library for building user interfaces.",
            type: "true-false",
            correct: true,
            explanation: "React is indeed a JavaScript library focused on building user interfaces.",
            points: 10,
          },
          {
            id: "react_easy_2",
            question: "What is JSX?",
            type: "multiple-choice",
            options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"],
            correct: 0,
            explanation: "JSX stands for JavaScript XML and allows you to write HTML-like syntax in JavaScript.",
            points: 10,
          },
        ],
        medium: [
          {
            id: "react_med_1",
            question: "What is the purpose of useState hook?",
            type: "multiple-choice",
            options: [
              "To manage component state",
              "To handle side effects",
              "To optimize performance",
              "To create components",
            ],
            correct: 0,
            explanation: "useState is a React hook that allows you to add state to functional components.",
            points: 15,
          },
        ],
        hard: [
          {
            id: "react_hard_1",
            question: "What is the Virtual DOM?",
            type: "multiple-choice",
            options: [
              "A copy of the real DOM in memory",
              "A faster version of the DOM",
              "A React component",
              "A JavaScript framework",
            ],
            correct: 0,
            explanation: "The Virtual DOM is a JavaScript representation of the real DOM kept in memory.",
            points: 20,
          },
        ],
      },
    },

    general: {
      name: "General Programming",
      icon: "🔧",
      description: "Test your general programming knowledge",
      questions: {
        easy: [
          {
            id: "gen_easy_1",
            question: "What is an algorithm?",
            type: "multiple-choice",
            options: [
              "A step-by-step procedure to solve a problem",
              "A programming language",
              "A type of computer",
              "A software application",
            ],
            correct: 0,
            explanation: "An algorithm is a step-by-step procedure or formula for solving a problem.",
            points: 10,
          },
          {
            id: "gen_easy_2",
            question: "Programming languages are case-sensitive.",
            type: "true-false",
            correct: false,
            explanation: "Not all programming languages are case-sensitive. It depends on the specific language.",
            points: 10,
          },
        ],
        medium: [
          {
            id: "gen_med_1",
            question: "What is the time complexity of binary search?",
            type: "multiple-choice",
            options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
            correct: 1,
            explanation: "Binary search has O(log n) time complexity as it halves the search space each iteration.",
            points: 15,
          },
        ],
        hard: [
          {
            id: "gen_hard_1",
            question: "What is polymorphism in object-oriented programming?",
            type: "multiple-choice",
            options: [
              "Having multiple forms",
              "Inheritance from multiple classes",
              "Creating multiple objects",
              "Using multiple programming languages",
            ],
            correct: 0,
            explanation: "Polymorphism allows objects of different types to be treated as instances of the same type.",
            points: 20,
          },
        ],
      },
    },
  },

  // Get questions by category and difficulty
  getQuestions(category, difficulty, count = 10) {
    const categoryData = this.categories[category]
    if (!categoryData) return []

    let questions = []

    if (difficulty === "mixed") {
      // Mix questions from all difficulties
      const easyQuestions = categoryData.questions.easy || []
      const mediumQuestions = categoryData.questions.medium || []
      const hardQuestions = categoryData.questions.hard || []

      questions = [...easyQuestions, ...mediumQuestions, ...hardQuestions]
    } else {
      questions = categoryData.questions[difficulty] || []
    }

    // Shuffle and return requested count
    return this.shuffleArray([...questions]).slice(0, count)
  },

  // Get all categories
  getCategories() {
    return Object.keys(this.categories).map((key) => ({
      id: key,
      ...this.categories[key],
      totalQuestions: this.getTotalQuestions(key),
    }))
  },

  // Get total questions for a category
  getTotalQuestions(category) {
    const categoryData = this.categories[category]
    if (!categoryData) return 0

    const easy = categoryData.questions.easy?.length || 0
    const medium = categoryData.questions.medium?.length || 0
    const hard = categoryData.questions.hard?.length || 0

    return easy + medium + hard
  },

  // Shuffle array utility
  shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  },

  // Get question by ID
  getQuestionById(id) {
    for (const category of Object.values(this.categories)) {
      for (const difficulty of Object.values(category.questions)) {
        const question = difficulty.find((q) => q.id === id)
        if (question) return question
      }
    }
    return null
  },

  // Validate answer
  validateAnswer(questionId, userAnswer) {
    const question = this.getQuestionById(questionId)
    if (!question) return false

    if (question.type === "fill-blank") {
      // Case-insensitive comparison for fill-in-the-blank
      return userAnswer.toLowerCase().trim() === question.correct.toLowerCase().trim()
    } else if (question.type === "true-false") {
      return userAnswer === question.correct
    } else {
      // Multiple choice
      return userAnswer === question.correct
    }
  },
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = QuizData
}
