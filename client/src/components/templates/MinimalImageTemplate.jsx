import { Mail, Phone, MapPin } from "lucide-react";
import React from "react";

const MinimalImageTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    // NOTE: month - 1 is necessary because JavaScript Date months are 0-indexed.
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-zinc-800">
      {/* Main Grid: Defines the 1/3 (Sidebar) and 2/3 (Main Content) columns */}
      <div className="grid grid-cols-3">
        {/* Top-Left Section: Dedicated to the Profile Image */}
        <div className="col-span-1 py-10">
          {/* Image Display Logic */}
          {/* Case 1: Image exists and is a string (pre-uploaded URL) */}
          {data.personal_info?.image &&
          typeof data.personal_info.image === "string" ? (
            <div className="mb-6">
              <img
                src={data.personal_info.image}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mx-auto"
                // Subtle accent color ring on the image border
                style={{ border: `4px solid ${accentColor}` }}
              />
            </div>
          ) : /* Case 2: Image exists and is a File object (newly uploaded) */
          data.personal_info?.image &&
            typeof data.personal_info.image === "object" ? (
            <div className="mb-6">
              <img
                // Create a temporary URL for the local file for preview
                src={URL.createObjectURL(data.personal_info.image)}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mx-auto"
                style={{ border: `4px solid ${accentColor}` }}
              />
            </div>
          ) : null}
          {/* End Image Display */}
        </div>

        {/* Top-Right Section: Name and Profession Header */}
        <div className="col-span-2 flex flex-col justify-center py-10 px-8">
          <h1 className="text-4xl font-bold text-zinc-700 tracking-widest">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          <p className="uppercase text-zinc-600 font-medium text-sm tracking-widest">
            {data?.personal_info?.profession || "Profession"}
          </p>
        </div>

        {/* Left Sidebar Content (Contact, Education, Skills) */}
        <aside className="col-span-1 border-r border-zinc-400 p-6 pt-0">
          {/* Contact Details */}
          <section className="mb-8">
            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
              CONTACT
            </h2>
            <div className="space-y-2 text-sm">
              {/* Phone (Conditionally Rendered) */}
              {data.personal_info?.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} style={{ color: accentColor }} />{" "}
                  {/* Accent Color Icon */}
                  <span>{data.personal_info.phone}</span>
                </div>
              )}
              {/* Email (Conditionally Rendered) */}
              {data.personal_info?.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} style={{ color: accentColor }} />{" "}
                  {/* Accent Color Icon */}
                  <span>{data.personal_info.email}</span>
                </div>
              )}
              {/* Location (Conditionally Rendered) */}
              {data.personal_info?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: accentColor }} />{" "}
                  {/* Accent Color Icon */}
                  <span>{data.personal_info.location}</span>
                </div>
              )}
              {/* NOTE: LinkedIn and Website are missing from the contact section here */}
            </div>
          </section>

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                EDUCATION
              </h2>
              <div className="space-y-4 text-sm">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-semibold uppercase">{edu.degree}</p>
                    <p className="text-zinc-600">{edu.institution}</p>
                    <p className="text-xs text-zinc-500">
                      {formatDate(edu.graduation_date)}
                    </p>
                    {/* NOTE: GPA is not displayed in this template */}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                SKILLS
              </h2>
              <ul className="space-y-1 text-sm">
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Right Main Content (Summary, Experience, Projects) */}
        <main className="col-span-2 p-8 pt-0">
          {/* Summary */}
          {data.professional_summary && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold tracking-widest mb-3"
                style={{ color: accentColor }}
              >
                SUMMARY
              </h2>
              <p className="text-zinc-700 leading-relaxed">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section>
              <h2
                className="text-sm font-semibold tracking-widest mb-4"
                style={{ color: accentColor }}
              >
                EXPERIENCE
              </h2>
              <div className="space-y-6 mb-8">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-zinc-900">
                        {exp.position}
                      </h3>
                      <span className="text-xs text-zinc-500">
                        {/* Date Range */}
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: accentColor }}>
                      {exp.company}
                    </p>
                    {exp.description && (
                      <ul className="list-disc list-inside text-sm text-zinc-700 leading-relaxed space-y-1">
                        {/* Splits the description by newline to render as a bulleted list */}
                        {exp.description.split("\n").map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2
                className="text-sm uppercase tracking-widest font-semibold"
                style={{ color: accentColor }}
              >
                PROJECTS
              </h2>
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-md font-medium text-zinc-800 mt-3">
                      {project.name}
                    </h3>
                    {/* Project Type */}
                    <p
                      className="text-xs font-medium mt-0.5"
                      style={{ color: accentColor }}
                    >
                      {project.type}
                    </p>
                    {project.description && (
                      <ul className="list-disc list-inside text-sm text-zinc-700 space-y-1">
                        {/* Splits the description by newline to render as a bulleted list */}
                        {project.description.split("\n").map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;
