import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  FileText, 
  HelpCircle, 
  ChevronRight, 
  X 
} from "lucide-react";

const TOUR_STEPS = [
  {
    title: "Welcome to AI Resume Pro",
    desc: "Let's take a quick 45-second tour to show you how to build and optimize your resumes using Gemini AI.",
    icon: <Sparkles className="w-8 h-8 text-indigo-500 animate-bounce" />,
    btnText: "Start Tour"
  },
  {
    title: "1. Create Profession-Aware Resumes",
    desc: "Click 'Create Resume' in your dashboard. You can select your target profession (e.g. software engineer, nurse, teacher). The forms and PDF templates will dynamically adapt their labels and section requirements on-the-fly.",
    icon: <Sparkles className="w-8 h-8 text-indigo-500" />,
    btnText: "Next Step"
  },
  {
    title: "2. Scan Existing Resumes (ATS Analyzer)",
    desc: "Have a resume already? Go to the 'Analyzer' page. Drop in your PDF file, paste a target job description, and get an instant ATS scorecard, missing keyword suggestions, and side-by-side phrasing rewrites.",
    icon: <FileText className="w-8 h-8 text-rose-500" />,
    btnText: "Next Step"
  },
  {
    title: "3. Read the ATS Secrets Guide",
    desc: "Check out the new 'ATS Guide' page. It contains formatting rules (such as avoiding double columns) and list tables comparing passive phrasing vs. accomplishment power verbs to help you stand out.",
    icon: <HelpCircle className="w-8 h-8 text-emerald-500" />,
    btnText: "Finish Tour"
  }
];

function FeatureTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const completed = localStorage.getItem("ai_resume_tour_completed");
    if (!completed) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    localStorage.setItem("ai_resume_tour_completed", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs select-none">
      <div className="glass-panel max-w-md w-full mx-4 p-6 rounded-2xl border shadow-2xl relative flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
        
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dynamic Icon */}
        <div className="p-4 bg-white rounded-full border border-slate-100 shadow-sm mt-2">
          {step.icon}
        </div>

        {/* Step Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">
            {step.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            {step.desc}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-1.5 pt-2">
          {TOUR_STEPS.map((_, idx) => (
            <div 
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentStep ? "w-6 bg-indigo-600" : "w-2 bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Navigation Button */}
        <button
          onClick={handleNext}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
        >
          {step.btnText}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default FeatureTour;
