import React from "react";

const defaultData = {
  personalInfo: {
    fullName: "Alex Mercer",
    title: "Senior Full Stack Engineer",
    email: "alex.mercer@email.com",
    phone: "+1 (555) 019-2834",
    location: "Austin, TX",
    linkedin: "linkedin.com/in/alexmercer",
    github: "github.com/alexmercer",
  },
  summary: "Results-driven Full Stack Engineer with over 6 years of experience designing, building, and scaling cloud-native web applications. Proven track record of optimizing system architecture and improving application performance by up to 40%.",
  skills: [
    { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "Go", "SQL", "HTML/CSS"] },
    { category: "Frameworks & Libraries", items: ["React", "Next.js", "Node.js", "Express", "FastAPI", "TailwindCSS"] },
    { category: "Tools & DevOps", items: ["AWS (S3, EC2, Lambda)", "Docker", "PostgreSQL", "Git", "CI/CD (GitHub Actions)"] }
  ],
  experience: [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      location: "Austin, TX",
      startDate: "Jan 2023",
      endDate: "Present",
      bullets: [
        "Architected and deployed a microservices-based analytics platform using Next.js and FastAPI, boosting processing speeds by 35%.",
        "Refactored legacy state management systems to Redux Toolkit, slashing overall bundle size and load latency."
      ]
    }
  ],
  projects: [
    {
      name: "OpenSource Analytics Hub",
      url: "github.com/alexmercer/hub",
      techStack: ["React", "TypeScript", "Node.js", "GraphQL"],
      date: "Fall 2024",
      bullets: [
        "Created a lightweight visualization engine capable of rendering real-time metrics dynamically without performance degradation."
      ]
    }
  ],
  education: [
    {
      degree: "B.S.",
      field: "Computer Science",
      institution: "University of Texas",
      location: "Austin, TX",
      startDate: "2016",
      endDate: "2020",
      gpa: "3.8/4.0",
      honors: "Cum Laude"
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2025"
    }
  ]
};

export function BasicTemplate({ formData = defaultData }) {
  if (!formData) return null;

  const { personalInfo, summary, skills, experience, projects, education, certifications } = formData;

  return (
    <div className="w-full bg-white text-[#111827] antialiased select-text max-w-[210mm] mx-auto p-[18mm] shadow-md border border-gray-100 print:max-w-none print:shadow-none print:border-none print:p-0">
      
      {/* ── HEADER ── */}
      <header className="text-center pb-[10pt]">
        <h1 className="font-sans text-[26pt] font-bold text-[#111827] tracking-[0.04em] uppercase leading-[1.1]">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        {personalInfo?.title && (
          <p className="font-sans text-[11pt] font-normal text-[#0f5132] mt-[3pt] tracking-[0.06em] uppercase">
            {personalInfo.title}
          </p>
        )}
        <div className="mt-[6pt] text-[9pt] text-[#374151] font-sans leading-[1.6]">
          {[
            personalInfo?.email,
            personalInfo?.phone,
            personalInfo?.location,
            personalInfo?.linkedin,
            personalInfo?.github,
            personalInfo?.portfolio
          ].filter(Boolean).map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <span>{item}</span>
              {idx < arr.length - 1 && <span className="mx-[5pt] text-[#0f5132] font-bold select-none">•</span>}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* ── TOP EMERALD DIVIDER BAR ── */}
      <div className="h-[2.5pt] bg-[#0f5132] mt-[8pt] mb-0" />

      {/* ── SUMMARY ── */}
      {summary && (
        <section className="mt-[12pt] break-inside-avoid print:break-inside-avoid">
          <h2 className="font-sans text-[10pt] font-bold text-[#0f5132] uppercase tracking-[0.10em] pb-[3pt] border-b border-[#d1d5db] mb-[7pt]">
            Professional Summary
          </h2>
          <p className="font-sans text-[9.5pt] text-[#374151] leading-[1.55]">
            {summary}
          </p>
        </section>
      )}

      {/* ── SKILLS ── */}
      {skills && skills.length > 0 && (
        <section className="mt-[12pt] break-inside-avoid print:break-inside-avoid">
          <h2 className="font-sans text-[10pt] font-bold text-[#0f5132] uppercase tracking-[0.10em] pb-[3pt] border-b border-[#d1d5db] mb-[7pt]">
            Skills
          </h2>
          <div>
            {skills[0] && typeof skills[0] === 'object' ? (
              skills.map((group, idx) => (
                <div key={idx} className="block mb-[3pt] text-[9.5pt] leading-[1.5]">
                  <span className="font-bold text-[#111827] mr-[4pt]">{group.category}:</span>
                  <span className="text-[#374151]">{group.items?.join(", ")}</span>
                </div>
              ))
            ) : (
              <div className="block text-[9.5pt] leading-[1.5]">
                <span className="text-[#374151]">{skills.join("  ·  ")}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── EXPERIENCE ── */}
      {experience && experience.length > 0 && (
        <section className="mt-[12pt]">
          <h2 className="font-sans text-[10pt] font-bold text-[#0f5132] uppercase tracking-[0.10em] pb-[3pt] border-b border-[#d1d5db] mb-[7pt]">
            {formData.roleCategory === "medical"
              ? "Clinical Experience"
              : formData.roleCategory === "education"
              ? "Teaching Experience"
              : "Experience"}
          </h2>

          {experience.map((job, idx) => (
            <div key={idx} className="mb-[9pt] break-inside-avoid print:break-inside-avoid">
              <div className="block w-full clear-both">
                <div className="float-left max-w-[72%]">
                  <span className="block text-[9.5pt] font-bold text-[#111827] leading-[1.35]">{job.title || job.role}</span>
                  <span className="block text-[9.5pt] text-[#374151] leading-[1.3] mt-[1pt]">
                    {job.company}{job.location ? `, ${job.location}` : ""}
                  </span>
                </div>
                <div className="float-right text-right max-w-[28%]">
                  <span className="block text-[9pt] text-[#6b7280] italic leading-[1.35] mt-[1pt] whitespace-nowrap">
                    {job.startDate || job.duration} {job.endDate ? `– ${job.endDate}` : ""}
                  </span>
                </div>
                <div className="clear-both" />
              </div>

              {job.bullets && job.bullets.length > 0 ? (
                <ul className="list-none p-0 mt-[4pt]">
                  {job.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="relative pl-[10pt] text-[9.5pt] text-[#374151] leading-[1.5] mb-[2.5pt] before:content-['–'] before:absolute before:left-0 before:text-[#0f5132] before:font-bold">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : job.description ? (
                <p className="text-[9.5pt] text-[#374151] leading-[1.5] mt-[3pt]">{job.description}</p>
              ) : null}
            </div>
          ))}
        </section>
      )}

      {/* ── PROJECTS ── */}
      {projects && projects.length > 0 && (formData.roleCategory === "software_engineering" || formData.roleCategory === "design" || formData.roleCategory === "general" || !formData.roleCategory) && (
        <section className="mt-[12pt]">
          <h2 className="font-sans text-[10pt] font-bold text-[#0f5132] uppercase tracking-[0.10em] pb-[3pt] border-b border-[#d1d5db] mb-[7pt]">
            {formData.roleCategory === "design" ? "Portfolio" : "Projects"}
          </h2>

          {projects.map((project, idx) => (
            <div key={idx} className="mb-[9pt] break-inside-avoid print:break-inside-avoid">
              <div className="block w-full clear-both">
                <div className="float-left max-w-[72%]">
                  <span className="block text-[9.5pt] font-bold text-[#111827] leading-[1.35]">
                    {project.name}
                    {(project.url || project.githubLink) && (
                      <span className="font-normal text-[#0f5132] text-[8.5pt]"> — {project.url || project.githubLink}</span>
                    )}
                  </span>
                  {project.techStack && (
                    <span className="block text-[9.5pt] text-[#6b7280] italic leading-[1.3] mt-[1pt]">
                      {Array.isArray(project.techStack) ? project.techStack.join(" · ") : project.techStack}
                    </span>
                  )}
                </div>
                {(project.date || project.duration) && (
                  <div className="float-right text-right max-w-[28%]">
                    <span className="block text-[9pt] text-[#6b7280] italic leading-[1.35] mt-[1pt] whitespace-nowrap">
                      {project.date || project.duration}
                    </span>
                  </div>
                )}
                <div className="clear-both" />
              </div>

              {project.bullets && project.bullets.length > 0 ? (
                <ul className="list-none p-0 mt-[4pt]">
                  {project.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="relative pl-[10pt] text-[9.5pt] text-[#374151] leading-[1.5] mb-[2.5pt] before:content-['–'] before:absolute before:left-0 before:text-[#0f5132] before:font-bold">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : project.description ? (
                <p className="text-[9.5pt] text-[#374151] leading-[1.5] mt-[3pt]">{project.description}</p>
              ) : null}
            </div>
          ))}
        </section>
      )}

      {/* ── EDUCATION ── */}
      {education && education.length > 0 && (
        <section className="mt-[12pt]">
          <h2 className="font-sans text-[10pt] font-bold text-[#0f5132] uppercase tracking-[0.10em] pb-[3pt] border-b border-[#d1d5db] mb-[7pt]">
            Education
          </h2>

          {education.map((edu, idx) => (
            <div key={idx} className="mb-[9pt] break-inside-avoid print:break-inside-avoid">
              <div className="block w-full clear-both">
                <div className="float-left max-w-[72%]">
                  <span className="block text-[9.5pt] font-bold text-[#111827] leading-[1.35]">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                  </span>
                  <span className="block text-[9.5pt] text-[#374151] leading-[1.3] mt-[1pt]">
                    {edu.institution}{edu.location ? `, ${edu.location}` : ""}
                  </span>
                </div>
                <div className="float-right text-right max-w-[28%]">
                  <span className="block text-[9pt] text-[#6b7280] italic leading-[1.35] mt-[1pt] whitespace-nowrap">
                    {edu.startDate || edu.duration} {edu.endDate ? `– ${edu.endDate}` : ""}
                  </span>
                </div>
                <div className="clear-both" />
              </div>
              {edu.gpa && <p className="text-[9.5pt] text-[#374151] leading-[1.5] mt-[3pt]">GPA: {edu.gpa}</p>}
              {edu.description && <p className="text-[9.5pt] text-[#374151] leading-[1.5] mt-[3pt]">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* ── CERTIFICATIONS ── */}
      {certifications && certifications.length > 0 && (
        <section className="mt-[12pt]">
          <h2 className="font-sans text-[10pt] font-bold text-[#0f5132] uppercase tracking-[0.10em] pb-[3pt] border-b border-[#d1d5db] mb-[7pt]">
            {formData.roleCategory === "medical" ? "Licenses & Certifications" : "Certifications"}
          </h2>

          {certifications.map((cert, idx) => (
            <div key={idx} className="block w-full clear-both mb-[4pt] break-inside-avoid print:break-inside-avoid">
              <div className="float-left max-w-[72%]">
                <span className="block text-[9.5pt] font-bold text-[#111827] leading-[1.35]">{cert.name}</span>
                {cert.issuer && <span className="block text-[9.5pt] text-[#374151] leading-[1.3]">{cert.issuer}</span>}
              </div>
              {(cert.date || cert.issueDate) && (
                <div className="float-right text-right max-w-[28%]">
                  <span className="block text-[9pt] text-[#6b7280] italic leading-[1.35] mt-[1pt] whitespace-nowrap">
                    {cert.date || cert.issueDate}
                  </span>
                </div>
              )}
              <div className="clear-both" />
            </div>
          ))}
        </section>
      )}

    </div>
  );
}
export default BasicTemplate;