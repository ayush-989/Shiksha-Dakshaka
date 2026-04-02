import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Quiz = () => {
  const { category } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchQuestions();
  }, [category, user, navigate]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNext();
    }
  }, [timeLeft, showResult]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/quiz/${category}`);
      setQuestions(res.data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to load questions');
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion]?.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer('');
    setTimeLeft(30);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitScore();
    }
  };

  const submitScore = async () => {
    try {
      await axios.post('http://localhost:5000/api/score', { category, score });
      setShowResult(true);
    } catch (err) {
      toast.error('Failed to submit score');
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setTimeLeft(30);
    setShowResult(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
              <span className="text-4xl animate-pulse">🎉</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-slide-in-left">Quiz Completed!</h1>
            <div className="mb-6 animate-fade-in-up animate-delay-200">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 animate-bounce-in animate-delay-300">
                {score}/{questions.length}
              </div>
              <div className="text-xl text-gray-600 animate-fade-in-up animate-delay-500">{percentage}% Score</div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6 animate-fade-in-up animate-delay-300">
              <p className="text-gray-700 font-medium">
                {percentage >= 80 ? '🏆 Excellent work! You\'re a programming master!' :
                 percentage >= 60 ? '📚 Good job! Keep practicing to improve!' :
                 '💪 Keep learning and try again! Every expert was once a beginner!'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-500">
              <button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 btn-primary shadow-lg"
              >
                🔄 Try Again
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in-up">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 animate-slide-in-left">{category} Quiz</h1>
            <div className="text-right animate-slide-in-right">
              <div className="text-sm text-gray-600">Question</div>
              <div className="text-2xl font-bold text-blue-600 animate-bounce-in">{currentQuestion + 1}/{questions.length}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4 animate-fade-in-up animate-delay-200">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out animate-gradient"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Timer */}
          <div className="flex justify-between items-center animate-fade-in-up animate-delay-300">
            <div className="text-sm text-gray-600 flex items-center">
              <span className="mr-2">🏆</span>
              Score: {score}
            </div>
            <div className={`text-lg font-bold flex items-center ${timeLeft <= 10 ? 'text-red-600 animate-pulse animate-text-glow' : 'text-gray-700'}`}>
              <span className="mr-2">⏱️</span>
              {timeLeft}s
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 animate-fade-in-up">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed animate-slide-in-left">
            {questions[currentQuestion]?.question}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 hover-lift animate-fade-in-up ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md transform scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="font-medium text-blue-600">{String.fromCharCode(65 + index)}.</span> {option}
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <div className="text-center animate-fade-in-up animate-delay-500">
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 btn-primary ${
              selectedAnswer
                ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 transform hover:scale-105 shadow-lg animate-pulse-gentle'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion === questions.length - 1 ? '🏁 Finish Quiz' : '➡️ Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;