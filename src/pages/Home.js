import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome to Alpha Exam System</h1>
      <p className="mb-4">Follow these steps to take an exam:</p>
      <ol className="list-decimal list-inside mb-4">
        <li>Click on "Take Exam" in the navigation bar</li>
        <li>Enter a topic for your exam</li>
        <li>Select the difficulty level</li>
        <li>Choose the number of questions</li>
        <li>Select the question language (Bangla or English)</li>
        <li>Set a time limit for the exam</li>
        <li>Click "Start Exam" to begin</li>
        <li>Answer all questions before the time runs out</li>
        <li>Submit your answers to see your results</li>
        
      </ol>
      <br/>
      <Link
        to="/exam"
        className="bg-cyan-900 text-white px-6 py-3 rounded hover:bg-cyan-950"
      >
        Start an Exam
      </Link>
    </div>
  );
};

export default Home;
