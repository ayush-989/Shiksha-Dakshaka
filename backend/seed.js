const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const sampleQuizzes = [
  {
    category: 'HTML',
    questions: [
      {
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
        correctAnswer: 'Hyper Text Markup Language'
      },
      {
        question: 'Which tag is used for headings?',
        options: ['<h1>', '<p>', '<div>', '<span>'],
        correctAnswer: '<h1>'
      },
      {
        question: 'What is the correct HTML element for inserting a line break?',
        options: ['<br>', '<lb>', '<break>', '<newline>'],
        correctAnswer: '<br>'
      },
      {
        question: 'Which HTML attribute is used to define inline styles?',
        options: ['style', 'class', 'id', 'font'],
        correctAnswer: 'style'
      },
      {
        question: 'What is the correct HTML for creating a hyperlink?',
        options: ['<a href="url">link</a>', '<link href="url">', '<href="url">link</href>', '<a url="link">'],
        correctAnswer: '<a href="url">link</a>'
      },
      {
        question: 'Which HTML element defines the title of a document?',
        options: ['<title>', '<head>', '<meta>', '<body>'],
        correctAnswer: '<title>'
      },
      {
        question: 'What is the correct HTML element for the largest heading?',
        options: ['<h1>', '<h6>', '<heading>', '<head>'],
        correctAnswer: '<h1>'
      },
      {
        question: 'Which HTML element is used to specify a footer for a document or section?',
        options: ['<footer>', '<bottom>', '<section>', '<div>'],
        correctAnswer: '<footer>'
      },
      {
        question: 'What does the <meta> tag do?',
        options: ['Provides metadata about the HTML document', 'Creates a navigation menu', 'Defines a section in the document', 'Inserts an image'],
        correctAnswer: 'Provides metadata about the HTML document'
      },
      {
        question: 'Which attribute specifies an alternate text for an image?',
        options: ['alt', 'src', 'title', 'href'],
        correctAnswer: 'alt'
      },
      {
        question: 'What is the correct HTML for making a checkbox?',
        options: ['<input type="checkbox">', '<checkbox>', '<check>', '<input type="check">'],
        correctAnswer: '<input type="checkbox">'
      },
      {
        question: 'Which HTML element is used to define a table?',
        options: ['<table>', '<tab>', '<tr>', '<td>'],
        correctAnswer: '<table>'
      },
      {
        question: 'What does the <ol> tag stand for?',
        options: ['Ordered List', 'Option List', 'Open List', 'Object List'],
        correctAnswer: 'Ordered List'
      },
      {
        question: 'Which HTML element is used for the main content of the document?',
        options: ['<main>', '<content>', '<body>', '<section>'],
        correctAnswer: '<main>'
      },
      {
        question: 'What is the purpose of the <DOCTYPE> declaration?',
        options: ['To tell the browser what version of HTML the page is using', 'To define the document title', 'To link external stylesheets', 'To create a comment'],
        correctAnswer: 'To tell the browser what version of HTML the page is using'
      }
    ]
  },
  {
    category: 'CSS',
    questions: [
      {
        question: 'What does CSS stand for?',
        options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
        correctAnswer: 'Cascading Style Sheets'
      },
      {
        question: 'Which CSS property is used to change the text color?',
        options: ['color', 'text-color', 'font-color', 'background-color'],
        correctAnswer: 'color'
      },
      {
        question: 'How do you select an element with id "demo"?',
        options: ['#demo', '.demo', 'demo', '*demo'],
        correctAnswer: '#demo'
      },
      {
        question: 'Which CSS property controls the text size?',
        options: ['font-size', 'text-size', 'size', 'font-style'],
        correctAnswer: 'font-size'
      },
      {
        question: 'What is the correct CSS syntax for making all p elements bold?',
        options: ['p {font-weight: bold;}', 'p {text-weight: bold;}', '<p style="font-weight: bold;">', 'p {bold: true;}'],
        correctAnswer: 'p {font-weight: bold;}'
      },
      {
        question: 'How do you make each word in a text start with a capital letter?',
        options: ['text-transform: capitalize', 'text-transform: uppercase', 'text-transform: lowercase', 'text-style: capitalize'],
        correctAnswer: 'text-transform: capitalize'
      },
      {
        question: 'Which property is used to change the background color?',
        options: ['background-color', 'color', 'bgcolor', 'background'],
        correctAnswer: 'background-color'
      },
      {
        question: 'How do you select all p elements inside a div element?',
        options: ['div p', 'div.p', 'div + p', 'div > p'],
        correctAnswer: 'div p'
      },
      {
        question: 'Which CSS property is used to control the spacing between elements?',
        options: ['margin', 'padding', 'spacing', 'border'],
        correctAnswer: 'margin'
      },
      {
        question: 'What does the "box-sizing" property do?',
        options: ['Controls how the total width and height of an element is calculated', 'Sets the size of the box', 'Changes the box color', 'Adds a border to the box'],
        correctAnswer: 'Controls how the total width and height of an element is calculated'
      },
      {
        question: 'Which CSS property is used to make text italic?',
        options: ['font-style: italic', 'text-style: italic', 'font-italic: true', 'style: italic'],
        correctAnswer: 'font-style: italic'
      },
      {
        question: 'How do you center a div horizontally?',
        options: ['margin: 0 auto', 'text-align: center', 'align: center', 'center: true'],
        correctAnswer: 'margin: 0 auto'
      },
      {
        question: 'What is the correct way to include an external CSS file?',
        options: ['<link rel="stylesheet" href="styles.css">', '<style src="styles.css">', '<css href="styles.css">', '<link href="styles.css">'],
        correctAnswer: '<link rel="stylesheet" href="styles.css">'
      },
      {
        question: 'Which CSS property is used to add shadows to text?',
        options: ['text-shadow', 'shadow', 'text-effect', 'font-shadow'],
        correctAnswer: 'text-shadow'
      },
      {
        question: 'How do you make a list that lists its items with squares?',
        options: ['list-style-type: square', 'list-type: square', 'list-style: square', 'ul-style: square'],
        correctAnswer: 'list-style-type: square'
      }
    ]
  },
  {
    category: 'JavaScript',
    questions: [
      {
        question: 'What is the correct way to declare a variable in JavaScript?',
        options: ['var myVar;', 'variable myVar;', 'v myVar;', 'declare myVar;'],
        correctAnswer: 'var myVar;'
      },
      {
        question: 'Which operator is used for strict equality comparison?',
        options: ['===', '==', '=', '!='],
        correctAnswer: '==='
      },
      {
        question: 'How do you write a comment in JavaScript?',
        options: ['// comment', '/* comment */', '# comment', '<!-- comment -->'],
        correctAnswer: '// comment'
      },
      {
        question: 'Which method is used to add an element to the end of an array?',
        options: ['push()', 'add()', 'append()', 'insert()'],
        correctAnswer: 'push()'
      },
      {
        question: 'What does "NaN" stand for?',
        options: ['Not a Number', 'No and No', 'New and Null', 'None and Nothing'],
        correctAnswer: 'Not a Number'
      },
      {
        question: 'How do you check if a variable is an array?',
        options: ['Array.isArray(variable)', 'variable.isArray()', 'typeof variable === "array"', 'variable instanceof Array'],
        correctAnswer: 'Array.isArray(variable)'
      },
      {
        question: 'Which function is used to parse a string to an integer?',
        options: ['parseInt()', 'parseInteger()', 'toInt()', 'stringToInt()'],
        correctAnswer: 'parseInt()'
      },
      {
        question: 'What is the correct syntax for a for loop?',
        options: ['for (i = 0; i < 5; i++)', 'for i in range(5)', 'foreach i in 5', 'loop i from 0 to 5'],
        correctAnswer: 'for (i = 0; i < 5; i++)'
      },
      {
        question: 'Which keyword is used to define a function?',
        options: ['function', 'def', 'func', 'define'],
        correctAnswer: 'function'
      },
      {
        question: 'How do you access the first element of an array?',
        options: ['array[0]', 'array.first', 'array[1]', 'array.get(0)'],
        correctAnswer: 'array[0]'
      },
      {
        question: 'What does the "this" keyword refer to?',
        options: ['The current object', 'The global object', 'The parent object', 'The next object'],
        correctAnswer: 'The current object'
      },
      {
        question: 'Which method is used to remove the last element from an array?',
        options: ['pop()', 'remove()', 'delete()', 'splice()'],
        correctAnswer: 'pop()'
      },
      {
        question: 'How do you create an object in JavaScript?',
        options: ['var obj = {};', 'var obj = [];', 'var obj = "";', 'var obj = 0;'],
        correctAnswer: 'var obj = {};'
      },
      {
        question: 'Which operator is used for logical AND?',
        options: ['&&', '||', '&', '|'],
        correctAnswer: '&&'
      },
      {
        question: 'What is the purpose of the "return" statement?',
        options: ['To exit a function and return a value', 'To print to console', 'To declare a variable', 'To create a loop'],
        correctAnswer: 'To exit a function and return a value'
      }
    ]
  },
  {
    category: 'Python',
    questions: [
      {
        question: 'What is the correct way to print "Hello World" in Python?',
        options: ['print("Hello World")', 'echo "Hello World"', 'console.log("Hello World")', 'printf("Hello World")'],
        correctAnswer: 'print("Hello World")'
      },
      {
        question: 'Which data type is used to store a sequence of characters?',
        options: ['str', 'int', 'list', 'dict'],
        correctAnswer: 'str'
      },
      {
        question: 'How do you create a list in Python?',
        options: ['myList = []', 'myList = {}', 'myList = ()', 'myList = <>'],
        correctAnswer: 'myList = []'
      },
      {
        question: 'Which keyword is used for conditional statements?',
        options: ['if', 'when', 'switch', 'case'],
        correctAnswer: 'if'
      },
      {
        question: 'How do you define a function in Python?',
        options: ['def myFunction():', 'function myFunction():', 'func myFunction():', 'define myFunction():'],
        correctAnswer: 'def myFunction():'
      },
      {
        question: 'Which method is used to add an item to a list?',
        options: ['append()', 'add()', 'insert()', 'push()'],
        correctAnswer: 'append()'
      },
      {
        question: 'What does "len()" function do?',
        options: ['Returns the length of an object', 'Returns the type of an object', 'Returns the value of an object', 'Returns the id of an object'],
        correctAnswer: 'Returns the length of an object'
      },
      {
        question: 'How do you create a dictionary in Python?',
        options: ['myDict = {}', 'myDict = []', 'myDict = ()', 'myDict = <>'],
        correctAnswer: 'myDict = {}'
      },
      {
        question: 'Which operator is used for exponentiation?',
        options: ['**', '^', '^^', 'exp'],
        correctAnswer: '**'
      },
      {
        question: 'How do you import a module in Python?',
        options: ['import module_name', 'include module_name', 'require module_name', 'using module_name'],
        correctAnswer: 'import module_name'
      },
      {
        question: 'What is the correct way to handle exceptions?',
        options: ['try-except', 'try-catch', 'catch-except', 'handle-error'],
        correctAnswer: 'try-except'
      },
      {
        question: 'Which method is used to read input from user?',
        options: ['input()', 'read()', 'get()', 'scan()'],
        correctAnswer: 'input()'
      },
      {
        question: 'How do you create a tuple in Python?',
        options: ['myTuple = ()', 'myTuple = []', 'myTuple = {}', 'myTuple = <>'],
        correctAnswer: 'myTuple = ()'
      },
      {
        question: 'Which keyword is used to create a class?',
        options: ['class', 'def', 'object', 'type'],
        correctAnswer: 'class'
      },
      {
        question: 'What does the "range()" function return?',
        options: ['An iterator of numbers', 'A list of numbers', 'A string of numbers', 'A dictionary of numbers'],
        correctAnswer: 'An iterator of numbers'
      }
    ]
  },
  {
    category: 'Java',
    questions: [
      {
        question: 'What is the correct way to declare a variable in Java?',
        options: ['int myVar;', 'var myVar;', 'variable myVar;', 'declare myVar;'],
        correctAnswer: 'int myVar;'
      },
      {
        question: 'Which method is the entry point of a Java program?',
        options: ['main()', 'start()', 'run()', 'execute()'],
        correctAnswer: 'main()'
      },
      {
        question: 'How do you create an object in Java?',
        options: ['MyClass obj = new MyClass();', 'MyClass obj = MyClass();', 'obj = new MyClass();', 'create MyClass obj;'],
        correctAnswer: 'MyClass obj = new MyClass();'
      },
      {
        question: 'Which keyword is used to inherit a class?',
        options: ['extends', 'implements', 'inherits', 'super'],
        correctAnswer: 'extends'
      },
      {
        question: 'What is the correct syntax for a for loop in Java?',
        options: ['for (int i = 0; i < 5; i++)', 'for i in range(5)', 'foreach i in 5', 'loop i from 0 to 5'],
        correctAnswer: 'for (int i = 0; i < 5; i++)'
      },
      {
        question: 'Which data type is used to store decimal numbers?',
        options: ['double', 'int', 'char', 'boolean'],
        correctAnswer: 'double'
      },
      {
        question: 'How do you write a comment in Java?',
        options: ['// comment', '/* comment */', '# comment', '<!-- comment -->'],
        correctAnswer: '// comment'
      },
      {
        question: 'Which method is used to get the length of a string?',
        options: ['length()', 'size()', 'getLength()', 'count()'],
        correctAnswer: 'length()'
      },
      {
        question: 'What does "public" access modifier mean?',
        options: ['Accessible from anywhere', 'Accessible only within the class', 'Accessible within the package', 'Accessible by subclasses'],
        correctAnswer: 'Accessible from anywhere'
      },
      {
        question: 'Which keyword is used to define a constant?',
        options: ['final', 'const', 'static', 'constant'],
        correctAnswer: 'final'
      },
      {
        question: 'How do you handle exceptions in Java?',
        options: ['try-catch', 'try-except', 'catch-throw', 'handle-error'],
        correctAnswer: 'try-catch'
      },
      {
        question: 'Which collection is ordered and allows duplicates?',
        options: ['ArrayList', 'HashSet', 'HashMap', 'TreeSet'],
        correctAnswer: 'ArrayList'
      },
      {
        question: 'What is the correct way to import a class?',
        options: ['import java.util.List;', 'include java.util.List;', 'using java.util.List;', 'require java.util.List;'],
        correctAnswer: 'import java.util.List;'
      },
      {
        question: 'Which operator is used for string concatenation?',
        options: ['+', '&', 'concat', 'join'],
        correctAnswer: '+'
      },
      {
        question: 'What does JVM stand for?',
        options: ['Java Virtual Machine', 'Java Variable Manager', 'Java Version Manager', 'Java Virtual Memory'],
        correctAnswer: 'Java Virtual Machine'
      },
      {
        question: 'What is bytecode in Java?',
        options: ['Compiled Java source code', 'Machine code for Java', 'Intermediate code executed by JVM', 'Encrypted Java code'],
        correctAnswer: 'Intermediate code executed by JVM'
      },
      {
        question: 'Which command compiles a Java source file?',
        options: ['javac', 'java', 'jvm', 'compile'],
        correctAnswer: 'javac'
      },
      {
        question: 'What is the extension of compiled Java class files?',
        options: ['.java', '.class', '.jar', '.exe'],
        correctAnswer: '.class'
      },
      {
        question: 'What does JIT stand for in Java?',
        options: ['Just In Time', 'Java Instant Translation', 'Just In Translation', 'Java Immediate Translation'],
        correctAnswer: 'Just In Time'
      },
      {
        question: 'Which component is responsible for loading classes in Java?',
        options: ['ClassLoader', 'JVM', 'Compiler', 'Interpreter'],
        correctAnswer: 'ClassLoader'
      }
    ]
  },
  {
    category: 'C',
    questions: [
      {
        question: 'What is the correct way to declare a variable in C?',
        options: ['int myVar;', 'var myVar;', 'variable myVar;', 'declare myVar;'],
        correctAnswer: 'int myVar;'
      },
      {
        question: 'Which function is used to print output in C?',
        options: ['printf()', 'print()', 'cout', 'echo()'],
        correctAnswer: 'printf()'
      },
      {
        question: 'What does the "include" directive do?',
        options: ['Includes header files', 'Includes source files', 'Includes libraries', 'Includes comments'],
        correctAnswer: 'Includes header files'
      },
      {
        question: 'Which operator is used for pointer dereferencing?',
        options: ['*', '&', '->', '.'],
        correctAnswer: '*'
      },
      {
        question: 'What is the correct syntax for a for loop in C?',
        options: ['for (int i = 0; i < 5; i++)', 'for i in range(5)', 'foreach i in 5', 'loop i from 0 to 5'],
        correctAnswer: 'for (int i = 0; i < 5; i++)'
      },
      {
        question: 'Which header file is required for string functions?',
        options: ['<string.h>', '<strings.h>', '<str.h>', '<text.h>'],
        correctAnswer: '<string.h>'
      },
      {
        question: 'How do you allocate memory dynamically in C?',
        options: ['malloc()', 'alloc()', 'new', 'create()'],
        correctAnswer: 'malloc()'
      },
      {
        question: 'What does "void" return type mean?',
        options: ['Function returns nothing', 'Function returns any type', 'Function returns void', 'Function is empty'],
        correctAnswer: 'Function returns nothing'
      },
      {
        question: 'Which operator is used for logical AND?',
        options: ['&&', '&', 'and', 'AND'],
        correctAnswer: '&&'
      },
      {
        question: 'How do you define a constant in C?',
        options: ['#define CONSTANT value', 'const int CONSTANT = value;', 'Both A and B', 'Neither A nor B'],
        correctAnswer: 'Both A and B'
      },
      {
        question: 'Which function is used to read input from user?',
        options: ['scanf()', 'read()', 'input()', 'get()'],
        correctAnswer: 'scanf()'
      },
      {
        question: 'What is the size of int data type in C?',
        options: ['Depends on compiler', '4 bytes', '2 bytes', '8 bytes'],
        correctAnswer: 'Depends on compiler'
      },
      {
        question: 'Which loop is guaranteed to execute at least once?',
        options: ['do-while', 'while', 'for', 'none'],
        correctAnswer: 'do-while'
      },
      {
        question: 'How do you access structure members?',
        options: ['.', '->', '::', '::'],
        correctAnswer: '.'
      },
      {
        question: 'What does "static" keyword do for a variable inside a function?',
        options: ['Retains value between function calls', 'Makes variable global', 'Makes variable constant', 'Allocates memory statically'],
        correctAnswer: 'Retains value between function calls'
      }
    ]
  },
  {
    category: 'C++',
    questions: [
      {
        question: 'What is the correct way to declare a variable in C++?',
        options: ['int myVar;', 'var myVar;', 'variable myVar;', 'declare myVar;'],
        correctAnswer: 'int myVar;'
      },
      {
        question: 'Which header is used for input/output operations?',
        options: ['<iostream>', '<stdio.h>', '<io.h>', '<input.h>'],
        correctAnswer: '<iostream>'
      },
      {
        question: 'How do you create an object in C++?',
        options: ['MyClass obj;', 'MyClass obj = new MyClass();', 'obj = MyClass();', 'create MyClass obj;'],
        correctAnswer: 'MyClass obj;'
      },
      {
        question: 'Which keyword is used for inheritance?',
        options: ['public', 'extends', 'inherits', 'class'],
        correctAnswer: 'public'
      },
      {
        question: 'What is the correct syntax for a for loop in C++?',
        options: ['for (int i = 0; i < 5; i++)', 'for i in range(5)', 'foreach i in 5', 'loop i from 0 to 5'],
        correctAnswer: 'for (int i = 0; i < 5; i++)'
      },
      {
        question: 'Which operator is used for dynamic memory allocation?',
        options: ['new', 'malloc', 'alloc', 'create'],
        correctAnswer: 'new'
      },
      {
        question: 'How do you write a comment in C++?',
        options: ['// comment', '/* comment */', '# comment', '<!-- comment -->'],
        correctAnswer: '// comment'
      },
      {
        question: 'What does "const" keyword do?',
        options: ['Makes variable constant', 'Makes variable static', 'Makes variable global', 'Makes variable private'],
        correctAnswer: 'Makes variable constant'
      },
      {
        question: 'Which STL container is used for dynamic arrays?',
        options: ['vector', 'array', 'list', 'deque'],
        correctAnswer: 'vector'
      },
      {
        question: 'How do you define a class in C++?',
        options: ['class MyClass {};', 'def class MyClass {};', 'struct MyClass {};', 'object MyClass {};'],
        correctAnswer: 'class MyClass {};'
      },
      {
        question: 'Which operator is used for scope resolution?',
        options: ['::', '.', '->', '::'],
        correctAnswer: '::'
      },
      {
        question: 'What is the purpose of "virtual" keyword?',
        options: ['Enables polymorphism', 'Makes function static', 'Makes function constant', 'Makes function global'],
        correctAnswer: 'Enables polymorphism'
      },
      {
        question: 'Which header is required for string operations?',
        options: ['<string>', '<cstring>', '<strings.h>', '<text.h>'],
        correctAnswer: '<string>'
      },
      {
        question: 'How do you handle exceptions in C++?',
        options: ['try-catch', 'try-except', 'catch-throw', 'handle-error'],
        correctAnswer: 'try-catch'
      },
      {
        question: 'What does "namespace" do?',
        options: ['Groups related code', 'Defines a class', 'Creates a function', 'Allocates memory'],
        correctAnswer: 'Groups related code'
      }
    ]
  },
  {
    category: 'Aptitude',
    questions: [
      {
        question: 'If a train travels at 60 km/h, how long will it take to cover 180 km?',
        options: ['2 hours', '3 hours', '4 hours', '5 hours'],
        correctAnswer: '3 hours'
      },
      {
        question: 'What is 25% of 200?',
        options: ['25', '50', '75', '100'],
        correctAnswer: '50'
      },
      {
        question: 'If 3 apples cost $6, how much do 9 apples cost?',
        options: ['$12', '$18', '$24', '$30'],
        correctAnswer: '$18'
      },
      {
        question: 'What comes next in the sequence: 2, 4, 8, 16, ___?',
        options: ['20', '24', '32', '64'],
        correctAnswer: '32'
      },
      {
        question: 'If a rectangle has length 10 cm and width 5 cm, what is its area?',
        options: ['15 cm²', '30 cm²', '50 cm²', '100 cm²'],
        correctAnswer: '50 cm²'
      },
      {
        question: 'What is the square root of 144?',
        options: ['10', '11', '12', '13'],
        correctAnswer: '12'
      },
      {
        question: 'If x + 5 = 15, what is the value of x?',
        options: ['5', '10', '15', '20'],
        correctAnswer: '10'
      },
      {
        question: 'A shop sells an item for $120 after a 25% discount. What was the original price?',
        options: ['$150', '$160', '$140', '$130'],
        correctAnswer: '$160'
      },
      {
        question: 'What is the next prime number after 7?',
        options: ['8', '9', '10', '11'],
        correctAnswer: '11'
      },
      {
        question: 'If a clock shows 3:15, what is the angle between the hour and minute hands?',
        options: ['0°', '7.5°', '15°', '22.5°'],
        correctAnswer: '7.5°'
      },
      {
        question: 'What is 40% of 250?',
        options: ['80', '100', '120', '150'],
        correctAnswer: '100'
      },
      {
        question: 'If A is taller than B, and B is taller than C, who is the shortest?',
        options: ['A', 'B', 'C', 'Cannot determine'],
        correctAnswer: 'C'
      },
      {
        question: 'What is the perimeter of a square with side length 6 cm?',
        options: ['12 cm', '18 cm', '24 cm', '36 cm'],
        correctAnswer: '24 cm'
      },
      {
        question: 'If 5 workers can complete a job in 10 days, how many days will 10 workers take?',
        options: ['2 days', '5 days', '10 days', '20 days'],
        correctAnswer: '5 days'
      },
      {
        question: 'What is the value of π (pi) approximately?',
        options: ['2.14', '3.14', '4.14', '5.14'],
        correctAnswer: '3.14'
      }
    ]
  }
];

const seedDB = async () => {
  await Quiz.deleteMany({});
  await Quiz.insertMany(sampleQuizzes);
  console.log('Database seeded');
  process.exit();
};

seedDB();