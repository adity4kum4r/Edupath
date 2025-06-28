import React, { useState } from 'react';
import { Clock, Star, Trophy, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const quizzes = [
  {
    id: 1,
    title: 'Algebra Fundamentals',
    subject: 'Mathematics',
    questions: 15,
    duration: 20,
    difficulty: 'Easy',
    score: 85,
    completed: true,
    stars: 3
  },
  {
    id: 2,
    title: 'Photosynthesis & Respiration',
    subject: 'Science',
    questions: 12,
    duration: 15,
    difficulty: 'Medium',
    score: null,
    completed: false,
    stars: 0
  },
  {
    id: 3,
    title: 'Grammar & Punctuation',
    subject: 'English',
    questions: 20,
    duration: 25,
    difficulty: 'Medium',
    score: 92,
    completed: true,
    stars: 3
  },
  {
    id: 4,
    title: 'World War I',
    subject: 'History',
    questions: 18,
    duration: 30,
    difficulty: 'Hard',
    score: null,
    completed: false,
    stars: 0
  },
];

const sampleQuestion = {
  id: 1,
  question: "What is the value of x in the equation: 2x + 5 = 15?",
  options: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
  correctAnswer: 0,
  explanation: "To solve 2x + 5 = 15, subtract 5 from both sides: 2x = 10, then divide by 2: x = 5"
};

export default function Quizzes() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === sampleQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    
    // For demo, just show result after first question
    setShowResult(true);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedQuiz && !showResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedQuiz.title}</h1>
              <p className="text-gray-600">Question {currentQuestion + 1} of {selectedQuiz.questions}</p>
            </div>
            <button
              onClick={() => setSelectedQuiz(null)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Exit Quiz
            </button>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / selectedQuiz.questions) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {sampleQuestion.question}
            </h2>

            <div className="space-y-3">
              {sampleQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next Question
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h1>
            <p className="text-gray-600">Great job on completing the quiz</p>
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {Math.round((score / 1) * 100)}%
            </div>
            <p className="text-gray-700">
              You scored {score} out of 1 questions correctly
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setSelectedQuiz(null)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Back to Quizzes
            </button>
            <button
              onClick={() => startQuiz(selectedQuiz)}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Tests</h1>
            <p className="text-gray-600">Test your knowledge and track your progress</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <div className="bg-gradient-to-r from-accent-500 to-green-600 text-white px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span className="font-medium">Current Streak: 5 days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{quiz.title}</h3>
                    {quiz.completed && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3">{quiz.subject}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{quiz.duration} min</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                      {quiz.difficulty}
                    </span>
                  </div>

                  {quiz.completed && (
                    <div className="mt-3 flex items-center space-x-4">
                      <div className="text-sm font-medium text-green-600">
                        Score: {quiz.score}%
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < quiz.stars
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="ml-6">
                  <button
                    onClick={() => startQuiz(quiz)}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      quiz.completed
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {quiz.completed ? 'Retake' : 'Start Quiz'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}