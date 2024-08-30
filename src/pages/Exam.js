import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateQuestions } from '../utils/geminiApi';
import LoadingSpinner from '../components/LoadingSpinner';

const Exam = () => {
  const navigate = useNavigate();
  const [examSetup, setExamSetup] = useState({
    topic: '',
    difficulty: 'medium',
    questionCount: 5,
    language: 'english',
    timeLimit: 10
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamSetup(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const questions = await generateQuestions(
        examSetup.topic,
        examSetup.difficulty,
        examSetup.questionCount,
        examSetup.language
      );
      localStorage.setItem('examQuestions', JSON.stringify(questions));
      localStorage.setItem('examSetup', JSON.stringify(examSetup));
      navigate('/exam/questions');
    } catch (error) {
      console.error('Error generating questions:', error);
      setError(`Failed to generate questions. Please try again. Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Set Up Your Exam</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="topic" className="block mb-1">Topic:</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={examSetup.topic}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="difficulty" className="block mb-1">Difficulty:</label>
          <select
            id="difficulty"
            name="difficulty"
            value={examSetup.difficulty}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label htmlFor="questionCount" className="block mb-1">Number of Questions:</label>
          <input
            type="number"
            id="questionCount"
            name="questionCount"
            value={examSetup.questionCount}
            onChange={handleInputChange}
            min="1"
            max="20"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="language" className="block mb-1">Language:</label>
          <select
            id="language"
            name="language"
            value={examSetup.language}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="english">English</option>
            <option value="bangla">Bangla</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeLimit" className="block mb-1">Time Limit (minutes):</label>
          <input
            type="number"
            id="timeLimit"
            name="timeLimit"
            value={examSetup.timeLimit}
            onChange={handleInputChange}
            min="1"
            max="120"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <br/>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <button 
            type="submit" 
            className="bg-cyan-900 text-white px-6 py-3 rounded hover:bg-cyan-950"
          >
            Start Exam
          </button>
        )}
      </form>
    </div>
  );
};

export default Exam;