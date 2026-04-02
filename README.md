# Shiksha Dakshaka - MERN Quiz Application

A full-stack quiz application built with MERN stack featuring user authentication, multiple quiz categories, leaderboard, and online code compiler.

## Features

- User registration and login with JWT authentication
- Quiz categories: HTML, CSS, Java, JavaScript, Python, C, C++, Aptitude
- Timer-based MCQ questions
- Score tracking and leaderboard
- Online code compiler for C, C++, Java, Python, JavaScript
- Responsive UI with TailwindCSS

## Tech Stack

- **Frontend:** React.js, React Router, TailwindCSS, Axios, React Toastify, React Ace
- **Backend:** Node.js, Express.js, JWT, bcryptjs
- **Database:** MongoDB with Mongoose
- **Compiler API:** Judge0

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```
   cd quiz-app/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create .env file with:
   ```
   MONGO_URI=mongodb://localhost:27017/shiksha-dakshaka
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```

4. Start MongoDB service

5. Seed the database with quiz questions:
   ```
   node seed.js
   ```

6. Run the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```
   cd quiz-app/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React app:
   ```
   npm start
   ```

The application will be available at http://localhost:3000

## API Endpoints

- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/quiz/:category - Get quiz questions
- POST /api/score - Submit quiz score
- GET /api/score/leaderboard - Get leaderboard
- POST /api/compile - Compile code (enhanced mock compiler with basic code execution)

## Database Models

- User: name, email, password, totalScore
- Quiz: category, questions[] (15 questions per category)
- Result: userId, category, score, date

The database is pre-seeded with 15 MCQ questions for each of the 8 categories: HTML, CSS, JavaScript, Python, Java, C, C++, and Aptitude (total: 120 questions).

## Compiler Features

The application includes an **enhanced mock compiler** that can execute basic code patterns for learning purposes:

### Supported Code Execution:

**Java:**
- `System.out.println("Hello, World!");` → Outputs: `Hello, World!`
- `System.out.println("Value: " + (5 + 3));` → Outputs: `Value: 8`
- Multiple print statements are supported

**Python:**
- `print("Hello, World!")` → Outputs: `Hello, World!`
- `print(5 + 3)` → Outputs: `8`
- Input handling with `input()` function

**JavaScript:**
- `console.log("Hello, World!");` → Outputs: `Hello, World!`
- Basic expressions and multiple statements

**C/C++:**
- `printf("Hello, World!");` → Outputs: `Hello, World!`
- `cout << "Hello, World!";` → Outputs: `Hello, World!`

### Real Compiler Setup (Optional)

To enable full code compilation with real execution:

### Option 1: Judge0 API (Recommended)
1. Sign up at [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce)
2. Get your API key
3. Add to `.env`: `JUDGE0_API_KEY=your_api_key_here`
4. Uncomment the Judge0 code in `backend/routes/compile.js`

### Option 2: JDoodle API
1. Sign up at [JDoodle](https://www.jdoodle.com/compiler-api)
2. Get your API credentials
3. Update the compile route to use JDoodle endpoints

## Usage

1. Register/Login to access quizzes
2. Select a quiz category from home page
3. Answer questions within time limit
4. View score and leaderboard
5. Use compiler to test code snippets (currently using mock compiler)