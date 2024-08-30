import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExamQuestions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('examQuestions'));
    const examSetup = JSON.parse(localStorage.getItem('examSetup'));
    if (!storedQuestions || !examSetup) {
      navigate('/exam');
      return;
    }
    setQuestions(storedQuestions);
    setTimeLeft(examSetup.timeLimit * 60);
  }, [navigate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (questionIndex, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const handleSubmit = () => {
    const results = questions.map((q, index) => ({
      ...q,
      userAnswer: answers[index] !== undefined ? answers[index] : null,
      isCorrect: answers[index] === q.correctAnswer
    }));
    localStorage.setItem('examResults', JSON.stringify(results));
    // navigate('/results');
  };

  if (questions.length === 0) return <div>Loading...</div>;

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
      <h2 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}</h2>
      <p className="mb-4">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(currentQuestion, index)}
            className={`w-full p-2 text-left border rounded ${answers[currentQuestion] === index ? 'bg-blue-200' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => {handleSubmit();navigate('/results');}}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamQuestions;
