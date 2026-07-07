import React, { useEffect, useState } from "react";
import ResumeCard from "../components/resume/ResumeCard";
import EmptyState from "../components/resume/EmptyState";
import FeatureTour from "../components/layout/FeatureTour";
import { Plus, Sparkles, RefreshCw } from "lucide-react";
import PremiumLoader from "../components/ui/PremiumLoader";
import {
  getResumes,
  createResume,
  deleteResume,
} from "@/api/resumeApi";

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCreateResume = async () => {
    try {
      const response = await createResume("Untitled Resume");
      await fetchResumes();
    } catch (err) {
      console.error("CREATE ERROR:", err);
    }
  };

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getResumes();
      setResumes(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async (resumeId) => {
    const confirmed = window.confirm("Delete this resume?");
    if (!confirmed) return;

    try {
      await deleteResume(resumeId);
      await fetchResumes();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <PremiumLoader text="Loading your resumes..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-12 px-6 glass-card border border-red-100 rounded-xl mt-12 space-y-4 font-sans select-none">
        <p className="text-sm font-semibold text-rose-600">{error}</p>
        <button 
          onClick={fetchResumes} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-xs transition shadow-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 font-sans select-none space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/80 pb-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="text-indigo-600 w-7 h-7" />
            My Resumes
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Create, edit, and optimize your profession-aware resumes.
          </p>
        </div>

        <button 
          onClick={handleCreateResume}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow-md hover:shadow-lg flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Create Resume
        </button>
      </div>

      {/* RESUMES LIST / EMPTY STATE */}
      {resumes.length === 0 ? (
        <EmptyState onCreate={handleCreateResume} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              id={resume.id}
              title={resume.title}
              updatedAt={resume.updated_at}
              onDelete={() => handleDeleteResume(resume.id)}
            />
          ))}
        </div>
      )}

      {/* FIRST-TIME USER ONBOARDING TOUR */}
      <FeatureTour />
    </div>
  );
}

export default Dashboard;
