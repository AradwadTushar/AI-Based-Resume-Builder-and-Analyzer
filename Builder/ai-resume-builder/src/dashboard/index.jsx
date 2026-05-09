import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-#284E78 px-4">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-center mb-4">
        "Hey there Job Seeker, unleash your potential! 😁"
      </h1>
      <p className="text-lg text-center mb-8">
        "Use these tools to create an impressive resume or analyze your existing one. Your dream job is just a step away! 🏆"
      </p>

      {/* Buttons Section */}
      <div className="flex flex-col space-y-4">
        {/* Resume Analyzer Button */}
        <a
          href="http://localhost:8501/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex justify-center"
        >
          <Button className="w-64 text-lg" size="lg">
            Resume Analyzer
          </Button>
        </a>

        {/* Resume Builder Button */}
        <Link to="/ResumeCreator" className="w-full flex justify-center">
          <Button className="w-64 text-lg" size="lg">
            Resume Builder
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
