import React from "react";
import { Plus, Trash2 } from "lucide-react";

function CertificationsSection({ formData, addCertification, updateCertification, removeCertification, title = "Certifications" }) {
  return (
    <div className="space-y-4 mt-6 pt-6 border-t border-slate-100">
      <div className="ef-section-header" style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>
        <span className="ef-section-title">{title}</span>
        <button onClick={addCertification} className="ef-add-btn" type="button">
          <Plus className="w-3.5 h-3.5" />
          Add Entry
        </button>
      </div>

      <div className="space-y-3">
        {(formData?.certifications || []).map((cert, index) => (
          <div key={index} className="ef-section-card">
            <div className="flex justify-between items-center mb-3">
              <span className="ef-entry-label">Certification #{index + 1}</span>
              <button type="button" onClick={() => removeCertification(index)} className="ef-remove-btn" title="Remove">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="ef-label">Certification Name</label>
                <input
                  value={cert.name || ""}
                  onChange={(e) => updateCertification(index, "name", e.target.value)}
                  placeholder="e.g. AWS Solutions Architect"
                  className="ef-input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="ef-label">Issuing Organization</label>
                  <input
                    value={cert.issuer || ""}
                    onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                    className="ef-input"
                  />
                </div>
                <div>
                  <label className="ef-label">Issue Date</label>
                  <input
                    value={cert.issueDate || ""}
                    onChange={(e) => updateCertification(index, "issueDate", e.target.value)}
                    placeholder="e.g. January 2025"
                    className="ef-input"
                  />
                </div>
              </div>

              <div>
                <label className="ef-label">Credential URL</label>
                <input
                  value={cert.credentialUrl || ""}
                  onChange={(e) => updateCertification(index, "credentialUrl", e.target.value)}
                  placeholder="https://credentials.example.com/..."
                  className="ef-input"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CertificationsSection;