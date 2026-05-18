import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ResumeCard from "../components/resume/ResumeCard";
import EmptyState from "../components/resume/EmptyState";
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
    console.log("CREATE CLICKED");

    try {
      const response = await createResume("Untitled Resume");

      console.log("CREATE RESPONSE:", response);

      await fetchResumes();
    } catch (err) {
      console.error("CREATE ERROR:", err);
    }
  };

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors if retrying
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

      fetchResumes();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // 2. FIXED: Log 'resumes' state instead of the local 'data' variable
  console.log("Current Resumes:", resumes);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-muted-foreground animate-pulse">
          Loading resumes...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-destructive">
        <p>{error}</p>
        <Button onClick={fetchResumes} variant="outline" className="mt-2">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">My Resumes</h1>
          <p className="text-muted-foreground mt-1">
            Manage and create AI-powered resumes
          </p>
        </div>

        <Button onClick={handleCreateResume}>Create Resume</Button>
      </div>

      {/* --- CONDITIONAL RENDER START --- */}
      {resumes.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
      {/* --- CONDITIONAL RENDER END --- */}
    </div>
  );
}

export default Dashboard;
