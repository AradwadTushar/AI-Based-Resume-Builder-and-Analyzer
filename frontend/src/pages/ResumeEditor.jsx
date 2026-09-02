import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getResume, updateResume, downloadResumePdf } from "@/api/resumeApi";
import {
  generateSummary,
  rewriteExperience,
  matchJobDescription,
  analyzeATS,
} from "@/api/aiApi";
import { 
  Eye, 
  EyeOff, 
  LayoutDashboard, 
  Sparkles, 
  HelpCircle, 
  Save, 
  Download, 
  FileText, 
  Check, 
  RefreshCw 
} from "lucide-react";

// Core Form Section Component Imports
import PersonalInfoSection from "../components/editor/PersonalInfoSection";
import SkillsSection from "../components/editor/SkillsSection";
import ExperienceSection from "../components/editor/ExperienceSection";
import EducationSection from "../components/editor/EducationSection";
import ProjectsSection from "../components/editor/ProjectsSection";
import CertificationsSection from "../components/editor/CertificationsSection";
import SummarySection from "../components/editor/SummarySection";
import TemplateSelector from "../components/editor/TemplateSelector";
import ExportPreviewModal from "../components/editor/ExportPreviewModal";
import RoleCategorySelector from "../components/editor/RoleCategorySelector";
// Modal Imports
import ATSAnalysisModal from "../components/editor/ATSAnalysisModal";
import JDMatchModal from "../components/editor/JDMatchSection";
import CoverLetterModal from "../components/editor/CoverLetterModal";

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
  const [coverLetterOpen, setCoverLetterOpen] = useState(false);

  // Panel layout & tabs state
  const [previewExpanded, setPreviewExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");

  // ATS state
  const [atsData, setAtsData] = useState(null);
  const [atsLoading, setAtsLoading] = useState(false);

  // JD Match state
  const [jobDescription, setJobDescription] = useState("");
  const [jdAnalysis, setJdAnalysis] = useState(null);
  const [jdLoading, setJdLoading] = useState(false);

  const [aiError, setAiError] =
  useState("");

  const [

  isPreviewOpen,

  setIsPreviewOpen

] = useState(false);

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
        await updateResume(id, {

  title: formData.title,

  data: formData,

  template:
    formData.template || "engineer"
});
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

const handleDownload = () => {

  setIsPreviewOpen(true);
};

const handleFinalDownload =
async () => {

  try {

    await downloadResumePdf(id);

  } catch (error) {

    console.error(
      "PDF download failed",
      error
    );
  }
};

const handleTemplateChange =
(templateId) => {

  setFormData((prev) => ({
    ...prev,
    template: templateId
  }))
}


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] h-screen space-y-3 font-sans">
        <RefreshCw className="animate-spin w-8 h-8 text-indigo-600" />
        <p className="text-slate-400 text-sm animate-pulse">Loading resume editor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-12 px-6 glass-card border border-red-100 rounded-xl mt-12 space-y-4 font-sans">
        <p className="text-sm font-semibold text-rose-600">{error}</p>
        <Link to="/dashboard" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-xs transition">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: "personal", label: "👤 Profile" },
    { id: "work", label: "💼 Work" },
    { id: "skills", label: "🎓 Skills" },
    { id: "projects", label: "🚀 Projects" }
  ];

  return (
    <div className="h-screen bg-white dark:bg-slate-950 flex flex-col font-sans select-none print:bg-white print:block overflow-hidden">
      
      {/* ── STICKY GLASSMORPHIC HEADER CONTROL BAR ── */}
      <header className="z-45 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 px-4 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 shrink-0 print:hidden">
        {/* Left Info & Mobile Template Selector */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <div className="flex items-center gap-3">
            <Link 
              to="/dashboard"
              className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              title="Back to Dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
            </Link>
            <div className="text-left">
              <input 
                type="text"
                value={formData?.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-base font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1.5 py-0.5 bg-transparent border-0 hover:bg-slate-100 dark:hover:bg-slate-800 transition truncate max-w-[120px] sm:max-w-[200px]"
              />
              <p className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 pl-2 mt-0.5">
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${saveStatus === "Saving..." ? "bg-amber-500 animate-ping" : "bg-emerald-500"}`} />
                {saveStatus}
              </p>
            </div>
          </div>

          <div className="w-32 sm:hidden">
            <TemplateSelector
              selectedTemplate={formData.template || "engineer"}
              onSelect={handleTemplateChange}
            />
          </div>
        </div>

        {/* Center Template Selector for Desktop */}
        <div className="hidden sm:block w-44">
          <TemplateSelector
            selectedTemplate={formData.template || "engineer"}
            onSelect={handleTemplateChange}
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {/* AI Scan Actions */}
          <button
            onClick={handleOpenATS}
            className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition shadow-xs disabled:opacity-50 shrink-0"
            disabled={!hasResumeContent()}
            title={!hasResumeContent() ? "Add resume content first" : "Run ATS Scan"}
          >
            <Sparkles className="text-indigo-500 w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">Analyze</span>
          </button>
          
          <button
            onClick={() => setJdModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition shadow-xs disabled:opacity-50 shrink-0"
            disabled={!hasResumeContent()}
            title={!hasResumeContent() ? "Add resume content first" : "Test Match against Job Desc"}
          >
            <HelpCircle className="text-emerald-500 w-3.5 h-3.5" />
            <span className="hidden sm:inline">Job Match</span>
          </button>

          <button
            onClick={() => setCoverLetterOpen(true)}
            className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition shadow-xs disabled:opacity-50 shrink-0"
            disabled={!hasResumeContent()}
            title={!hasResumeContent() ? "Add resume content first" : "Generate Cover Letter"}
          >
            <Sparkles className="text-violet-500 w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cover Letter</span>
          </button>

          {/* Toggle Live Preview */}
          <button
            onClick={() => setPreviewExpanded(!previewExpanded)}
            className={`p-2 rounded-lg border transition shadow-xs shrink-0 ${previewExpanded ? "bg-indigo-50 text-indigo-600 border-indigo-200" : "bg-white text-slate-400 border-slate-200 hover:text-slate-600"}`}
            title={previewExpanded ? "Collapse Live Preview" : "Expand Live Preview"}
          >
            {previewExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          {/* Export PDF Modal trigger */}
          <button
            onClick={handleDownload}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-3 sm:px-3.5 rounded-lg text-xs transition shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </header>

      {/* ── MAIN WORKSPACE PANELS ── */}
      <div className={`grid grid-cols-1 ${previewExpanded ? "lg:grid-cols-12" : "lg:grid-cols-1"} flex-1 overflow-hidden print:block`}>
        
        {/* LEFT PANEL: EDITOR FORMS */}
        <div className={`p-5 border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-y-auto h-full print:hidden ${previewExpanded ? "hidden lg:block lg:col-span-6 xl:col-span-5" : "lg:col-span-1 max-w-4xl mx-auto w-full"}`}>
          
          {/* Tabs switch navigation */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 pb-px mb-6 overflow-x-auto gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 border-b-2 font-bold text-xs transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                    : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-6 pb-12">
            {/* TAB 1: PROFILE */}
            {activeTab === "personal" && (
              <>
                <RoleCategorySelector
                  selectedCategory={formData?.roleCategory || "software_engineering"}
                  onChange={(category) => setFormData({ ...formData, roleCategory: category })}
                />
                <PersonalInfoSection
                  formData={formData}
                  setFormData={setFormData}
                  updatePersonalInfo={updatePersonalInfo}
                />
              </>
            )}

            {/* TAB 2: WORK EXPERIENCE & SUMMARY */}
            {activeTab === "work" && (
              <>
                <SummarySection
                  summary={formData.summary || ""}
                  loading={summaryLoading}
                  onGenerate={handleGenerateSummary}
                  onChange={(value) => setFormData((prev) => ({ ...prev, summary: value }))}
                />
                <ExperienceSection
                  formData={formData}
                  addExperience={addExperience}
                  updateExperience={updateExperience}
                  removeExperience={removeExperience}
                  handleRewriteExperience={handleRewriteExperience}
                  aiLoadingIndex={aiLoadingIndex}
                  title={
                    formData?.roleCategory === "medical"
                      ? "Clinical Experience"
                      : formData?.roleCategory === "education"
                      ? "Teaching Experience"
                      : "Experience"
                  }
                />
              </>
            )}

            {/* TAB 3: SKILLS & EDUCATION */}
            {activeTab === "skills" && (
              <>
                <SkillsSection formData={formData} addSkill={addSkill} removeSkill={removeSkill} />
                <EducationSection
                  formData={formData}
                  addEducation={addEducation}
                  updateEducation={updateEducation}
                  removeEducation={removeEducation}
                />
              </>
            )}

            {/* TAB 4: PROJECTS & CERTIFICATIONS */}
            {activeTab === "projects" && (
              <>
                {(formData?.roleCategory === "software_engineering" ||
                  formData?.roleCategory === "design" ||
                  formData?.roleCategory === "general" ||
                  !formData?.roleCategory) && (
                  <ProjectsSection
                    formData={formData}
                    addProject={addProject}
                    updateProject={updateProject}
                    removeProject={removeProject}
                    title={formData?.roleCategory === "design" ? "Portfolio & Design Projects" : "Projects"}
                  />
                )}
                <CertificationsSection
                  formData={formData}
                  addCertification={addCertification}
                  updateCertification={updateCertification}
                  removeCertification={removeCertification}
                  title={formData?.roleCategory === "medical" ? "Licenses & Certifications" : "Certifications"}
                />
              </>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: LIVE PREVIEW CONTAINER */}
        {previewExpanded && (
          <div className="lg:col-span-6 xl:col-span-7 p-4 sm:p-8 overflow-y-auto h-full bg-slate-50 dark:bg-slate-900/40 flex items-start justify-center print:bg-white print:p-0 print:h-auto">
            <div className="w-full max-w-2xl bg-white shadow-lg border dark:border-slate-800 rounded-lg p-2 print:shadow-none print:border-0">
              <ResumePreview formData={formData} resume={resume} />
            </div>
          </div>
        )}
      </div>

      {/* MODALS SECTION */}
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
      <ExportPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        resumeId={id}
        onDownload={handleFinalDownload}
        formData={formData}
      />
      <CoverLetterModal
        isOpen={coverLetterOpen}
        onClose={() => setCoverLetterOpen(false)}
        formData={formData}
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
      />
    </div>
  );
}

export default ResumeEditor;