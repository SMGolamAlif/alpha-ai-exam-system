import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('examResults'));
    if (!storedResults) {
      navigate('/exam');
      return;
    }
    setResults(storedResults);
    const correctAnswers = storedResults.filter(q => q.isCorrect).length;
    setScore((correctAnswers / storedResults.length) * 100);
  }, [navigate]);

  const handleTakeAnotherExam = () => {
    localStorage.removeItem('examResults');
    localStorage.removeItem('examQuestions');
    localStorage.removeItem('examSetup');
    navigate('/exam');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Exam Results</h1>
      <div className="mb-6">
        <p className="text-xl">Your Score: {score.toFixed(2)}%</p>
        <p>Correct Answers: {results.filter(q => q.isCorrect).length} out of {results.length}</p>
      </div>
      <div className="space-y-6">
        {results.map((question, index) => (
          <div key={index} className={`p-4 border rounded ${question.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className="font-bold mb-2">Question {index + 1}</h3>
            <p className="mb-2">{question.question}</p>
            <div className="space-y-2 mb-4">
              {question.options.map((option, optionIndex) => (
                <div 
                  key={optionIndex} 
                  className={`p-2 rounded ${
                    optionIndex === question.correctAnswer ? 'bg-green-200' :
                    optionIndex === question.userAnswer ? 'bg-red-200' : 'bg-gray-100'
                  }`}
                >
                  {option}
                  {optionIndex === question.correctAnswer && ' ✓'}
                  {optionIndex === question.userAnswer && optionIndex !== question.correctAnswer && ' ✗'}
                </div>
              ))}
            </div>
            <p className="font-semibold">Explanation:</p>
            <p>{question.explanation}</p>
          </div>
        ))}
      </div>
      <button 
        onClick={handleTakeAnotherExam} 
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Take Another Exam
      </button>
    </div>
  );
};

export default Results;