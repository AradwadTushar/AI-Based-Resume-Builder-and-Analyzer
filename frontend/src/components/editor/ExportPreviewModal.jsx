import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { Download, FileText, Code2, Copy, Check, X } from "lucide-react";

export function generatePlainTextResume(formData) {
  if (!formData) return "";
  const {
    personalInfo = {},
    summary = "",
    skills = [],
    experience = [],
    projects = [],
    education = [],
    certifications = [],
  } = formData;

  let text = `${personalInfo.fullName || "YOUR NAME"}\n`;
  if (personalInfo.title) text += `${personalInfo.title}\n`;

  const contacts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.github,
    personalInfo.portfolio,
  ].filter(Boolean);
  if (contacts.length > 0) text += `${contacts.join(" | ")}\n`;
  text += `\n${"=".repeat(50)}\n`;

  if (summary) {
    text += `\nPROFESSIONAL SUMMARY\n${"-".repeat(25)}\n${summary}\n`;
  }

  if (skills && skills.length > 0) {
    text += `\nSKILLS\n${"-".repeat(25)}\n`;
    if (skills[0] && typeof skills[0] === "object" && skills[0].category) {
      skills.forEach((g) => {
        const items = Array.isArray(g.items) ? g.items.join(", ") : g.items;
        text += `• ${g.category}: ${items}\n`;
      });
    } else {
      text += skills.join(", ") + "\n";
    }
  }

  if (experience && experience.length > 0) {
    text += `\nEXPERIENCE\n${"-".repeat(25)}\n`;
    experience.forEach((job) => {
      text += `\n${job.title} - ${job.company}${
        job.location ? ` (${job.location})` : ""
      }\n`;
      text += `${job.startDate || ""} - ${job.endDate || "Present"}\n`;
      if (job.bullets && job.bullets.length > 0) {
        job.bullets.forEach((b) => {
          text += `  • ${b}\n`;
        });
      } else if (job.description) {
        text += `  ${job.description}\n`;
      }
    });
  }

  if (projects && projects.length > 0) {
    text += `\nPROJECTS\n${"-".repeat(25)}\n`;
    projects.forEach((p) => {
      text += `\n${p.name}${p.url ? ` [${p.url}]` : ""}${
        p.date ? ` (${p.date})` : ""
      }\n`;
      if (p.techStack) {
        const tech = Array.isArray(p.techStack)
          ? p.techStack.join(", ")
          : p.techStack;
        text += `Technologies: ${tech}\n`;
      }
      if (p.bullets && p.bullets.length > 0) {
        p.bullets.forEach((b) => {
          text += `  • ${b}\n`;
        });
      } else if (p.description) {
        text += `  ${p.description}\n`;
      }
    });
  }

  if (education && education.length > 0) {
    text += `\nEDUCATION\n${"-".repeat(25)}\n`;
    education.forEach((edu) => {
      text += `${edu.degree || ""}${edu.field ? ` in ${edu.field}` : ""} - ${
        edu.institution || ""
      }${edu.location ? ` (${edu.location})` : ""}\n`;
      if (edu.startDate || edu.endDate)
        text += `${edu.startDate || ""} - ${edu.endDate || ""}\n`;
      if (edu.gpa || edu.honors)
        text += `GPA: ${edu.gpa || ""} ${
          edu.honors ? `(${edu.honors})` : ""
        }\n`;
    });
  }

  if (certifications && certifications.length > 0) {
    text += `\nCERTIFICATIONS\n${"-".repeat(25)}\n`;
    certifications.forEach((c) => {
      text += `• ${c.name}${c.issuer ? ` (${c.issuer})` : ""}${
        c.date ? ` - ${c.date}` : ""
      }\n`;
    });
  }

  return text;
}

function ExportPreviewModal({ isOpen, onClose, resumeId, onDownload, formData }) {
  const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
  const [iframeLoading, setIframeLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState("");
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIframeLoading(true);
      axiosClient
        .get(`/api/resumes/${resumeId}/preview`)
        .then((res) => {
          let html = res.data || "";
          if (html.includes("<head>")) {
            html = html.replace("<head>", `<head><base href="${API_BASE_URL}/">`);
          }
          setHtmlContent(html);
          setIframeLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch resume preview:", err);
          setHtmlContent(`
            <div style="font-family: sans-serif; text-align: center; padding: 3rem; color: #ef4444;">
              <h3>Failed to load preview</h3>
              <p>${err.response?.data?.detail || err.message}</p>
            </div>
          `);
          setIframeLoading(false);
        });
    }
  }, [isOpen, resumeId]);

  const handleCopyPlainText = async () => {
    const plainText = generatePlainTextResume(formData);
    try {
      await navigator.clipboard.writeText(plainText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleDownloadJSON = () => {
    if (!formData) return;
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData?.personalInfo?.fullName || "resume"}_data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Export & Preview Resume
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Download as PDF, export raw JSON schema, or copy formatted plain text for ATS portals.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* iframe preview */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-950 relative overflow-hidden">
          {iframeLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
              <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-3" />
              <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                Compiling pixel-perfect PDF preview...
              </p>
            </div>
          )}

          <iframe
            title="Resume Preview"
            srcDoc={htmlContent}
            className="w-full h-full border-0"
          />
        </div>

        {/* Footer with Multi-Format Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            {/* Copy Plain Text */}
            <button
              onClick={handleCopyPlainText}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition cursor-pointer"
              title="Copy plain-text formatted resume to clipboard for job portals"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Copied to Clipboard!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Plain Text</span>
                </>
              )}
            </button>

            {/* Download JSON */}
            <button
              onClick={handleDownloadJSON}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition cursor-pointer"
              title="Download structured JSON schema backup"
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Export JSON</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Back to Editor
            </button>

            <button
              onClick={onDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExportPreviewModal;