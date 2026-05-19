import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResume, updateResume } from "@/api/resumeApi";
import {
  generateSummary,
  rewriteExperience,
  matchJobDescription,
  analyzeATS, // make sure this exists in your aiApi
} from "@/api/aiApi";

// Core Form Section Component Imports
import PersonalInfoSection from "../components/editor/PersonalInfoSection";
import SkillsSection from "../components/editor/SkillsSection";
import ExperienceSection from "../components/editor/ExperienceSection";
import EducationSection from "../components/editor/EducationSection";
import ProjectsSection from "../components/editor/ProjectsSection";
import CertificationsSection from "../components/editor/CertificationsSection";
import SummarySection from "../components/editor/SummarySection";

// Modal Imports
import ATSAnalysisModal from "../components/editor/ATSAnalysisModal";
import JDMatchModal from "../components/editor/JDMatchSection";

// Decoupled Preview Engine System Import
import ResumePreview from "../components/preview/ResumePreview";

function ResumeEditor() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [aiLoadingIndex, setAiLoadingIndex] = useState(null);

  // Modal state
  const [atsModalOpen, setAtsModalOpen] = useState(false);
  const [jdModalOpen, setJdModalOpen] = useState(false);

  // ATS state
  const [atsData, setAtsData] = useState(null);
  const [atsLoading, setAtsLoading] = useState(false);

  // JD Match state
  const [jobDescription, setJobDescription] = useState("");
  const [jdAnalysis, setJdAnalysis] = useState(null);
  const [jdLoading, setJdLoading] = useState(false);

  const [aiError, setAiError] =
  useState("");

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const data = await getResume(id);
        setResume(data);
        setFormData({
          title: data.title || "Untitled Resume",
          summary: "",
          skills: [],
          experience: [],
          education: [],
          projects: [],
          certifications: [],
          ...data.data,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load resume");
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  useEffect(() => {
    if (!formData) return;
    setSaveStatus("Saving...");
    const timeout = setTimeout(async () => {
      try {
        await updateResume(id, { title: formData.title, data: formData });
        setSaveStatus("Saved");
      } catch (err) {
        console.error(err);
        setSaveStatus("Error saving");
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [formData, id]);

  const handleSave = async () => {
    try {
      const updatedResume = await updateResume(id, {
        title: formData.title,
        data: formData,
      });
      setResume(updatedResume);
      alert("Saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving your modifications.");
    }
  };

  const updatePersonalInfo = (field, value) => {
    setFormData({ ...formData, personalInfo: { ...formData.personalInfo, [field]: value } });
  };

  const addSkill = (newSkill) => {
    setFormData({ ...formData, skills: [...(formData.skills || []), newSkill] });
  };

  const removeSkill = (indexToRemove) => {
    setFormData({ ...formData, skills: (formData.skills || []).filter((_, i) => i !== indexToRemove) });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...(formData.experience || []), { company: "", role: "", duration: "", description: "" }],
    });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...(formData.experience || [])];
    updated[index][field] = value;
    setFormData({ ...formData, experience: updated });
  };

  const removeExperience = (indexToRemove) => {
    setFormData({ ...formData, experience: (formData.experience || []).filter((_, i) => i !== indexToRemove) });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...(formData.education || []), { institution: "", degree: "", duration: "", description: "" }],
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...(formData.education || [])];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const removeEducation = (indexToRemove) => {
    setFormData({ ...formData, education: (formData.education || []).filter((_, i) => i !== indexToRemove) });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...(formData.projects || []), { name: "", techStack: "", githubLink: "", demoLink: "", description: "" }],
    });
  };

  const updateProject = (index, field, value) => {
    const updated = [...(formData.projects || [])];
    updated[index][field] = value;
    setFormData({ ...formData, projects: updated });
  };

  const removeProject = (indexToRemove) => {
    setFormData({ ...formData, projects: (formData.projects || []).filter((_, i) => i !== indexToRemove) });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [...(formData.certifications || []), { name: "", issuer: "", issueDate: "", credentialUrl: "" }],
    });
  };

  const updateCertification = (index, field, value) => {
    const updated = [...(formData.certifications || [])];
    updated[index][field] = value;
    setFormData({ ...formData, certifications: updated });
  };

  const removeCertification = (indexToRemove) => {
    setFormData({ ...formData, certifications: (formData.certifications || []).filter((_, i) => i !== indexToRemove) });
  };

  const handleGenerateSummary = async () => {
    try {
      setSummaryLoading(true);
      const response = await generateSummary({
        skills: formData.skills,
        experience: formData.experience,
        education: formData.education,
      });
      setFormData((prev) => ({ ...prev, summary: response.summary }));
    } catch (error) {
      console.error("Failed to generate summary", error);
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleRewriteExperience = async (index) => {
    try {
      setAiLoadingIndex(index);
      const experience = formData.experience[index];
      const response = await rewriteExperience({
        role: experience.role,
        company: experience.company,
        description: experience.description,
      });
      updateExperience(index, "description", response.improved_description);
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoadingIndex(null);
    }
  };

  // Opens modal and triggers ATS analysis immediately
  const handleATSAnalysis = async () => {
  try {
    setAtsLoading(true);
setAiError("");
    const response =
      await analyzeATS(formData);

    setAtsData(response);
  } catch (err) {
    setAiError(
  "Failed to analyze resume"
);
    console.error(err);
  } finally {
    setAtsLoading(false);
  }
};

const handleOpenATS = () => {
  setAtsModalOpen(true);

  if (!atsData) {
    handleATSAnalysis();
  }
};

  const handleJDMatch = async () => {
    try {
      setJdLoading(true);
      setAiError("");
      const response = await matchJobDescription({
        resume_data: formData,
        job_description: jobDescription,
      });
      setJdAnalysis(response);
    } catch (err) {
      setAiError(
  "Failed to analyze JD match"
);
      console.error(err);
    } finally {
      setJdLoading(false);
    }
  };

const hasResumeContent = () => {
  return (
    formData.summary?.trim() ||
    formData.skills?.length > 0 ||
    formData.experience?.length > 0 ||
    formData.projects?.length > 0
  );
};

  if (loading) return <div className="p-6 text-center text-gray-500 font-sans">Loading editor...</div>;
  if (error) return <div className="p-6 text-center text-red-500 font-sans">{error}</div>;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-gray-100 print:block">
        {/* LEFT PANEL */}
        <div className="border-r border-gray-200 p-6 h-screen overflow-y-auto bg-white print:hidden">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Resume Builder</h2>
              <p className="text-xs text-gray-500 mt-0.5">Working on: {formData?.title}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded font-medium text-sm transition"
              >
                Download PDF
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow transition font-medium text-sm"
              >
                Save Progress
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-4">{saveStatus}</p>

          {/* ── AI Analysis Buttons ── */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={handleOpenATS}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors shadow-sm"
              disabled={!hasResumeContent()}
title={
  !hasResumeContent()
    ? "Add resume content first"
    : ""
}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M6.5 3.5v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Analyze Resume
            </button>
            <button
              onClick={() => setJdModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors shadow-sm"
              disabled={!hasResumeContent()}
title={
  !hasResumeContent()
    ? "Add resume content first"
    : ""
}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="1.5" y="1.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="7.5" y="1.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.3"/>
                <rect x="1.5" y="7.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M7.5 9.5h4M9.5 7.5v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Test Against JD
            </button>
          </div>

          {/* Form Sections */}
          <div className="space-y-6 pb-12">
            <PersonalInfoSection
              formData={formData}
              setFormData={setFormData}
              updatePersonalInfo={updatePersonalInfo}
            />
            <SkillsSection formData={formData} addSkill={addSkill} removeSkill={removeSkill} />
            <ExperienceSection
              formData={formData}
              addExperience={addExperience}
              updateExperience={updateExperience}
              removeExperience={removeExperience}
              handleRewriteExperience={handleRewriteExperience}
              aiLoadingIndex={aiLoadingIndex}
            />
            <EducationSection
              formData={formData}
              addEducation={addEducation}
              updateEducation={updateEducation}
              removeEducation={removeEducation}
            />
            <ProjectsSection
              formData={formData}
              addProject={addProject}
              updateProject={updateProject}
              removeProject={removeProject}
            />
            <CertificationsSection
              formData={formData}
              addCertification={addCertification}
              updateCertification={updateCertification}
              removeCertification={removeCertification}
            />
            <SummarySection
              summary={formData.summary || ""}
              loading={summaryLoading}
              onGenerate={handleGenerateSummary}
              onChange={(value) => setFormData((prev) => ({ ...prev, summary: value }))}
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-4 sm:p-8 overflow-y-auto h-screen bg-gray-100 flex items-start justify-center print:bg-white print:p-0 print:h-auto">
          <div className="w-full max-w-2xl">
            <ResumePreview formData={formData} resume={resume} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ATSAnalysisModal
        isOpen={atsModalOpen}
        onClose={() => setAtsModalOpen(false)}
        atsData={atsData}
        loading={atsLoading}
        onRefresh={handleATSAnalysis}
      />
      <JDMatchModal
        isOpen={jdModalOpen}
        onClose={() => setJdModalOpen(false)}
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        handleJDMatch={handleJDMatch}
        jdLoading={jdLoading}
        jdAnalysis={jdAnalysis}
      />
    </>
  );
}

export default ResumeEditor;