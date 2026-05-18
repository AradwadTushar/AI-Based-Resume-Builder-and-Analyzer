import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResume, updateResume } from "@/api/resumeApi";

// Core Form Section Component Imports
import PersonalInfoSection from "../components/editor/PersonalInfoSection";
import SkillsSection from "../components/editor/SkillsSection";
import ExperienceSection from "../components/editor/ExperienceSection";
import EducationSection from "../components/editor/EducationSection";
import ProjectsSection from "../components/editor/ProjectsSection";
import CertificationsSection from "../components/editor/CertificationsSection";

// Decoupled Preview Engine System Import
import ResumePreview from "../components/preview/ResumePreview";

function ResumeEditor() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] =
  useState("Saved");

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const data = await getResume(id);
        setResume(data);
        setFormData({
          title: data.title || "Untitled Resume",
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

  const timeout = setTimeout(
    async () => {
      try {
        await updateResume(id, {
          title: formData.title,

          data: formData,
        });

        setSaveStatus("Saved");
      } catch (err) {
        console.error(err);

        setSaveStatus("Error saving");
      }
    },

    1000
  );

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
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [field]: value,
      },
    });
  };

  const addSkill = (newSkill) => {
    setFormData({
      ...formData,
      skills: [...(formData.skills || []), newSkill],
    });
  };

  const removeSkill = (indexToRemove) => {
    setFormData({
      ...formData,
      skills: (formData.skills || []).filter((_, index) => index !== indexToRemove),
    });
  };

  // EXPERIENCE MUTATORS
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...(formData.experience || []),
        { company: "", role: "", duration: "", description: "" },
      ],
    });
  };

  const updateExperience = (index, field, value) => {
    const updatedExperience = [...(formData.experience || [])];
    updatedExperience[index][field] = value;
    setFormData({ ...formData, experience: updatedExperience });
  };

  const removeExperience = (indexToRemove) => {
    setFormData({
      ...formData,
      experience: (formData.experience || []).filter((_, index) => index !== indexToRemove),
    });
  };

  // EDUCATION MUTATORS
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...(formData.education || []),
        { institution: "", degree: "", duration: "", description: "" },
      ],
    });
  };

  const updateEducation = (index, field, value) => {
    const updatedEducation = [...(formData.education || [])];
    updatedEducation[index][field] = value;
    setFormData({ ...formData, education: updatedEducation });
  };

  const removeEducation = (indexToRemove) => {
    setFormData({
      ...formData,
      education: (formData.education || []).filter((_, index) => index !== indexToRemove),
    });
  };

  // PROJECTS MUTATORS
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...(formData.projects || []),
        { name: "", techStack: "", githubLink: "", demoLink: "", description: "" },
      ],
    });
  };

  const updateProject = (index, field, value) => {
    const updatedProjects = [...(formData.projects || [])];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const removeProject = (indexToRemove) => {
    setFormData({
      ...formData,
      projects: (formData.projects || []).filter((_, index) => index !== indexToRemove),
    });
  };

  // CERTIFICATIONS MUTATORS
  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...(formData.certifications || []),
        { name: "", issuer: "", issueDate: "", credentialUrl: "" },
      ],
    });
  };

  const updateCertification = (index, field, value) => {
    const updatedCertifications = [...(formData.certifications || [])];
    updatedCertifications[index][field] = value;
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  const removeCertification = (indexToRemove) => {
    setFormData({
      ...formData,
      certifications: (formData.certifications || []).filter((_, index) => index !== indexToRemove),
    });
  };

  if (loading) return <div className="p-6 text-center text-gray-500 font-sans">Loading editor...</div>;
  if (error) return <div className="p-6 text-center text-red-500 font-sans">{error}</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-gray-100 print:block">
      
      {/* LEFT PANEL: CONFIGURATION ACTIONS FORMS */}
      <div className="border-r border-gray-200 p-6 h-screen overflow-y-auto bg-white print:hidden">
        <div className="flex justify-between items-center mb-6">
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
          <p className="text-sm text-gray-500">
  {saveStatus}
</p>
        <div className="space-y-6 pb-12">
          <PersonalInfoSection 
            formData={formData} 
            setFormData={setFormData} 
            updatePersonalInfo={updatePersonalInfo} 
          />
          <SkillsSection 
            formData={formData} 
            addSkill={addSkill} 
            removeSkill={removeSkill} 
          />
          <ExperienceSection 
            formData={formData} 
            addExperience={addExperience} 
            updateExperience={updateExperience} 
            removeExperience={removeExperience} 
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
        </div>
      </div>

      {/* RIGHT PANEL: HOT LIVE PREVIEW WORKSPACE */}
      <div className="p-4 sm:p-8 overflow-y-auto h-screen bg-gray-100 flex items-start justify-center print:bg-white print:p-0 print:h-auto">
        <div className="w-full max-w-2xl">
          <ResumePreview formData={formData} resume={resume} />
        </div>
      </div>

    </div>
  );
}

export default ResumeEditor;