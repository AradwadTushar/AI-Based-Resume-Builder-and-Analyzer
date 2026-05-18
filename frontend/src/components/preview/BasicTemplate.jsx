import React from "react";

function BasicTemplate({ formData }) {
  if (!formData) return null;

  const { personalInfo, skills, experience, education, projects, certifications } = formData;

  // Optimized sanitization utility: strips protocols, subdomains, and trailing slashes
  const cleanUrlForDisplay = (url) => {
    if (!url) return "";
    return url
      .replace(/^(https?:\/\/)?(www\.)?/, "") // Removes http://, https://, and www.
      .replace(/\/$/, "");                  // Removes trailing slash
  };

  return (
    <div className="p-8 md:p-12 text-gray-900 font-serif leading-relaxed text-sm bg-white min-h-[297mm] print:p-0">
      
      {/* PERSONAL INFO / ATS HEADER */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-gray-900 mb-1">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        
        {/* Contact Strip: Using standard character dividers instead of graphics */}
        <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-gray-600 font-sans print:text-black">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          
          {personalInfo?.phone && (
            <>
              <span className="text-gray-400" aria-hidden="true">•</span>
              <span>{personalInfo.phone}</span>
            </>
          )}

          {personalInfo?.portfolio && (
            <>
              <span className="text-gray-400" aria-hidden="true">•</span>
              <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="hover:text-blue-800 hover:underline">
                {cleanUrlForDisplay(personalInfo.portfolio)}
              </a>
            </>
          )}
        </div>

        {/* Professional Profile Links: Clean, standardized, and text-safe */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-sans mt-1 text-gray-700 print:text-black">
          {personalInfo?.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-800 hover:underline">
              {cleanUrlForDisplay(personalInfo.linkedin)}
            </a>
          )}
          
          {personalInfo?.github && (
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-blue-800 hover:underline">
              {cleanUrlForDisplay(personalInfo.github)}
            </a>
          )}
        </div>
      </header>

      {/* CORE SKILLS SECTION */}
      {skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-2 font-sans">
            Technical Skills
          </h2>
          <p className="text-gray-800 text-xs sm:text-sm font-sans">
            {skills.join(" • ")}
          </p>
        </section>
      )}

      {/* PROFESSIONAL EXPERIENCE */}
      {experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-3 font-sans">
            Professional Experience
          </h2>
          
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className="break-inside-avoid">
                <div className="flex justify-between items-baseline font-sans text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-gray-900">{exp.role || "Position"}</span>
                    <span className="text-gray-500">, </span>
                    <span className="italic text-gray-800">{exp.company || "Company"}</span>
                  </div>
                  <span className="text-gray-600 whitespace-nowrap text-xs print:text-black">{exp.duration}</span>
                </div>
                
                {exp.description && (
                  <p className="mt-1.5 text-gray-700 text-xs sm:text-sm whitespace-pre-line pl-4 border-l-2 border-gray-100 print:border-none print:pl-0">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TECHNICAL PROJECTS */}
      {projects?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-3 font-sans">
            Projects
          </h2>
          
          <div className="space-y-4">
            {projects.map((proj, index) => (
              <div key={index} className="break-inside-avoid">
                <div className="flex justify-between items-baseline font-sans text-xs sm:text-sm">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-bold text-gray-900">{proj.name || "Project Name"}</span>
                    {proj.techStack && (
                      <span className="text-xs text-gray-500 italic">({proj.techStack})</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2 text-xs font-sans print:hidden">
                    {proj.githubLink && (
                      <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-blue-700 underline">Code</a>
                    )}
                    {proj.demoLink && (
                      <a href={proj.demoLink} target="_blank" rel="noreferrer" className="text-blue-700 underline">Live</a>
                    )}
                  </div>
                </div>

                {proj.description && (
                  <p className="mt-1 text-gray-700 text-xs sm:text-sm whitespace-pre-line pl-4 border-l-2 border-gray-100 print:border-none print:pl-0">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION BACKGROUND */}
      {education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-3 font-sans">
            Education
          </h2>
          
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-baseline font-sans text-xs sm:text-sm break-inside-avoid">
                <div>
                  <span className="font-bold text-gray-900">{edu.institution || "Institution"}</span>
                  <span className="text-gray-500"> — </span>
                  <span className="italic text-gray-800">{edu.degree || "Degree"}</span>
                  {edu.description && <p className="text-xs text-gray-600 mt-0.5 font-serif">{edu.description}</p>}
                </div>
                <span className="text-gray-600 whitespace-nowrap text-xs print:text-black">{edu.duration}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-2 font-sans">
            Certifications
          </h2>
          
          <ul className="list-none space-y-1 font-sans text-xs sm:text-sm">
            {certifications.map((cert, index) => (
              <li key={index} className="flex justify-between items-baseline break-inside-avoid">
                <div>
                  <span className="font-semibold text-gray-900">{cert.name || "Certification Name"}</span>
                  <span className="text-gray-400"> • </span>
                  <span className="text-gray-700 italic">{cert.issuer}</span>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="ml-2 text-xs text-blue-700 underline print:hidden">
                      Verify
                    </a>
                  )}
                </div>
                <span className="text-gray-600 text-xs print:text-black">{cert.issueDate}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

    </div>
  );
}

export default BasicTemplate;