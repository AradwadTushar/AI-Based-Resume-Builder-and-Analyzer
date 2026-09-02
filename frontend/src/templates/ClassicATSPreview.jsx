import React from "react";

const defaultData = {
  personalInfo: {
    fullName: "Alex Mercer",
    title: "Senior Software Engineer",
    email: "alex.mercer@email.com",
    phone: "+1 (555) 019-2834",
    location: "Cambridge, MA",
    linkedin: "linkedin.com/in/alexmercer",
    github: "github.com/alexmercer",
  },
  summary:
    "Disciplined and results-oriented Software Engineer with 6+ years of expertise in distributed systems, backend architecture, and cloud infrastructure. Track record of improving system reliability and reducing query latency by 40%.",
  skills: [
    {
      category: "Languages",
      items: ["Python", "C++", "Java", "TypeScript", "SQL", "Go"],
    },
    {
      category: "Frameworks & Tools",
      items: ["FastAPI", "React", "Docker", "Kubernetes", "PostgreSQL", "AWS"],
    },
    {
      category: "Core Competencies",
      items: [
        "Distributed Systems",
        "Microservices Architecture",
        "API Design",
        "CI/CD Pipelines",
      ],
    },
  ],
  experience: [
    {
      title: "Senior Backend Engineer",
      company: "Apex Financial Technologies",
      location: "Boston, MA",
      startDate: "2022",
      endDate: "Present",
      bullets: [
        "Architected an event-driven transaction pipeline processing 15M+ daily requests with 99.99% availability.",
        "Refactored PostgreSQL indexing and asynchronous connection pooling, reducing peak-hour p99 latency from 320ms to 45ms.",
        "Mentored team of 5 junior and mid-level engineers in distributed systems design and test automation.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Beacon Cloud Systems",
      location: "Boston, MA",
      startDate: "2019",
      endDate: "2022",
      bullets: [
        "Developed high-throughput RESTful APIs in Python/FastAPI deployed on containerized AWS ECS clusters.",
        "Engineered automated regression test suite achieving 92% code coverage across core billing modules.",
      ],
    },
  ],
  projects: [
    {
      name: "High-Performance Cache Engine",
      url: "github.com/alexmercer/cache-engine",
      techStack: ["C++", "gRPC", "Redis Protocol"],
      date: "2024",
      bullets: [
        "Implemented custom LRU memory cache server supporting concurrent lock-free reads and custom binary serialization.",
      ],
    },
  ],
  education: [
    {
      degree: "B.S. in Computer Science",
      institution: "Harvard University",
      location: "Cambridge, MA",
      startDate: "2015",
      endDate: "2019",
      gpa: "3.9 / 4.0",
      honors: "Magna Cum Laude",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      date: "2024",
    },
  ],
};

export default function ClassicATSPreview({ formData = defaultData }) {
  if (!formData) return null;

  const {
    personalInfo = {},
    summary = "",
    skills = [],
    experience = [],
    projects = [],
    education = [],
    certifications = [],
    roleCategory = "software_engineering",
  } = formData;

  const contactItems = [
    personalInfo?.email,
    personalInfo?.phone,
    personalInfo?.location,
    personalInfo?.linkedin,
    personalInfo?.github,
    personalInfo?.portfolio,
  ].filter(Boolean);

  return (
    <div className="w-full bg-white text-[#111827] antialiased select-text max-w-[210mm] mx-auto p-[18mm] shadow-md border border-gray-100 print:max-w-none print:shadow-none print:border-none print:p-0 font-serif leading-relaxed text-[10pt]">
      {/* ── HEADER ── */}
      <header className="text-center pb-3 border-b-2 border-slate-900">
        <h1 className="text-[22pt] font-bold text-slate-900 tracking-wider uppercase font-serif">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        {personalInfo?.title && (
          <p className="text-[10pt] font-medium text-slate-700 tracking-wide uppercase mt-1">
            {personalInfo.title}
          </p>
        )}
        {contactItems.length > 0 && (
          <div className="mt-2 text-[9pt] text-slate-700 font-sans flex flex-wrap justify-center gap-x-2.5 gap-y-0.5">
            {contactItems.map((item, idx) => (
              <React.Fragment key={idx}>
                <span>{item}</span>
                {idx < contactItems.length - 1 && (
                  <span className="text-slate-400 select-none">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      {/* ── SUMMARY ── */}
      {summary && (
        <section className="mt-4">
          <h2 className="text-[10pt] font-bold text-slate-900 uppercase tracking-wider pb-0.5 border-b border-slate-900 font-sans">
            Professional Summary
          </h2>
          <p className="text-[9.5pt] text-slate-800 leading-normal mt-1.5 text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* ── EDUCATION ── */}
      {education && education.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[10pt] font-bold text-slate-900 uppercase tracking-wider pb-0.5 border-b border-slate-900 font-sans">
            Education
          </h2>
          <div className="mt-1.5 space-y-2">
            {education.map((edu, idx) => (
              <div key={idx} className="text-[9.5pt]">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{edu.institution || "University"}</span>
                  <span className="font-normal italic text-slate-700 text-[9pt]">
                    {edu.location || ""}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-slate-800">
                  <span className="italic">
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ""}
                  </span>
                  <span className="text-[9pt] text-slate-700 font-sans">
                    {edu.startDate && edu.endDate
                      ? `${edu.startDate} – ${edu.endDate}`
                      : edu.endDate || edu.startDate || ""}
                  </span>
                </div>
                {(edu.gpa || edu.honors) && (
                  <p className="text-[9pt] text-slate-600 mt-0.5">
                    {edu.gpa ? `GPA: ${edu.gpa}` : ""}
                    {edu.gpa && edu.honors ? " · " : ""}
                    {edu.honors ? edu.honors : ""}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── EXPERIENCE ── */}
      {experience && experience.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[10pt] font-bold text-slate-900 uppercase tracking-wider pb-0.5 border-b border-slate-900 font-sans">
            {roleCategory === "medical"
              ? "Clinical Experience"
              : roleCategory === "education"
              ? "Teaching Experience"
              : "Professional Experience"}
          </h2>
          <div className="mt-1.5 space-y-3">
            {experience.map((job, idx) => (
              <div key={idx} className="text-[9.5pt]">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{job.company}</span>
                  <span className="font-normal italic text-slate-700 text-[9pt]">
                    {job.location}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-slate-800">
                  <span className="font-semibold italic text-slate-900">
                    {job.title}
                  </span>
                  <span className="text-[9pt] text-slate-700 font-sans">
                    {job.startDate} – {job.endDate || "Present"}
                  </span>
                </div>
                {job.bullets && job.bullets.length > 0 ? (
                  <ul className="list-disc ml-5 mt-1 space-y-0.5 text-slate-800 text-[9pt] leading-normal">
                    {job.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                ) : job.description ? (
                  <p className="text-[9pt] text-slate-800 mt-1">
                    {job.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── PROJECTS ── */}
      {projects && projects.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[10pt] font-bold text-slate-900 uppercase tracking-wider pb-0.5 border-b border-slate-900 font-sans">
            {roleCategory === "design" ? "Portfolio Projects" : "Key Projects"}
          </h2>
          <div className="mt-1.5 space-y-2.5">
            {projects.map((proj, idx) => (
              <div key={idx} className="text-[9.5pt]">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    {proj.url && (
                      <span className="text-[8.5pt] text-slate-600 font-sans ml-2">
                        ({proj.url})
                      </span>
                    )}
                    {proj.techStack && (
                      <span className="text-[8.5pt] text-slate-600 font-sans ml-2 italic">
                        |{" "}
                        {Array.isArray(proj.techStack)
                          ? proj.techStack.join(", ")
                          : proj.techStack}
                      </span>
                    )}
                  </div>
                  {proj.date && (
                    <span className="text-[9pt] text-slate-700 font-sans">
                      {proj.date}
                    </span>
                  )}
                </div>
                {proj.bullets && proj.bullets.length > 0 ? (
                  <ul className="list-disc ml-5 mt-1 space-y-0.5 text-slate-800 text-[9pt] leading-normal">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                ) : proj.description ? (
                  <p className="text-[9pt] text-slate-800 mt-0.5">
                    {proj.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── SKILLS ── */}
      {skills && skills.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[10pt] font-bold text-slate-900 uppercase tracking-wider pb-0.5 border-b border-slate-900 font-sans">
            Skills & Technical Proficiencies
          </h2>
          <div className="mt-1.5 text-[9pt] space-y-1 text-slate-800">
            {skills[0] && typeof skills[0] === "object" && skills[0].category ? (
              skills.map((grp, idx) => (
                <div key={idx} className="flex flex-wrap gap-1">
                  <span className="font-bold text-slate-900">
                    {grp.category}:
                  </span>
                  <span>
                    {Array.isArray(grp.items)
                      ? grp.items.join(", ")
                      : grp.items}
                  </span>
                </div>
              ))
            ) : (
              <p>{skills.join(" • ")}</p>
            )}
          </div>
        </section>
      )}

      {/* ── CERTIFICATIONS ── */}
      {certifications && certifications.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[10pt] font-bold text-slate-900 uppercase tracking-wider pb-0.5 border-b border-slate-900 font-sans">
            {roleCategory === "medical"
              ? "Licenses & Certifications"
              : "Certifications"}
          </h2>
          <div className="mt-1.5 space-y-1 text-[9pt]">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold text-slate-900">
                    {cert.name}
                  </span>
                  {cert.issuer && (
                    <span className="text-slate-600 ml-1.5">
                      — {cert.issuer}
                    </span>
                  )}
                </div>
                {cert.date && (
                  <span className="text-slate-700 font-sans">{cert.date}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
