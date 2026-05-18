import React from "react";

function CertificationsSection({ formData, addCertification, updateCertification, removeCertification }) {
  return (
    <div className="space-y-4 mt-6 pt-6 border-t">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl">Certifications</h3>
        <button
          onClick={addCertification}
          className="border px-4 py-1 rounded bg-gray-50 hover:bg-gray-100 transition text-sm"
        >
          Add Certification
        </button>
      </div>

      {(formData?.certifications || []).map((cert, index) => (
        <div key={index} className="border rounded p-4 space-y-2 bg-white relative shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Certification #{index + 1}
            </span>
            <button
              onClick={() => removeCertification(index)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </div>

          <input
            value={cert.name || ""}
            onChange={(e) => updateCertification(index, "name", e.target.value)}
            placeholder="Certification Name"
            className="border p-2 rounded w-full text-sm"
          />

          <input
            value={cert.issuer || ""}
            onChange={(e) => updateCertification(index, "issuer", e.target.value)}
            placeholder="Issuing Organization"
            className="border p-2 rounded w-full text-sm"
          />

          <input
            value={cert.issueDate || ""}
            onChange={(e) => updateCertification(index, "issueDate", e.target.value)}
            placeholder="Issue Date (e.g., January 2025)"
            className="border p-2 rounded w-full text-sm"
          />

          <input
            value={cert.credentialUrl || ""}
            onChange={(e) => updateCertification(index, "credentialUrl", e.target.value)}
            placeholder="Credential URL"
            className="border p-2 rounded w-full text-sm"
          />
        </div>
      ))}
    </div>
  );
}

export default CertificationsSection;