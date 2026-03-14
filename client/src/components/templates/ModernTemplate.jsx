import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  ExternalLink,
} from "lucide-react";
import React from "react";

const ModernTemplate = ({ data, accentColor }) => {
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
    <div className="max-w-4xl mx-auto bg-white text-gray-800">
      {/* Header: Full-width Accent-Colored Block */}
      <header
        className="p-8 text-white"
        style={{ backgroundColor: accentColor }} // Dynamic accent background color
      >
        {/* Full Name */}
        <h1 className="text-4xl font-light mb-3">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {/* Contact Details (Grid layout for responsiveness) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ">
          {/* Email */}
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {/* Phone */}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {/* Location */}
          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {/* LinkedIn (URL displayed cleanly) */}
          {data.personal_info?.linkedin && (
            <a
              target="_blank"
              href={data.personal_info?.linkedin}
              className="flex items-center gap-2"
              rel="noreferrer"
            >
              <Linkedin className="size-4" />
              {/* Displays URL by removing 'https://www.' prefix if present */}
              <span className="break-all text-xs">
                {data.personal_info.linkedin.split("https://www.")[1]
                  ? data.personal_info.linkedin.split("https://www.")[1]
                  : data.personal_info.linkedin}
              </span>
            </a>
          )}
          {/* Website (URL displayed cleanly) */}
          {data.personal_info?.website && (
            <a
              target="_blank"
              href={data.personal_info?.website}
              className="flex items-center gap-2"
              rel="noreferrer"
            >
              <Globe className="size-4" />
              {/* Displays URL by removing 'https://' prefix if present */}
              <span className="break-all text-xs">
                {data.personal_info.website.split("https://")[1]
                  ? data.personal_info.website.split("https://")[1]
                  : data.personal_info.website}
              </span>
            </a>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-8">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
              Professional Summary
            </h2>
            <p className="text-gray-700 ">{data.professional_summary}</p>
          </section>
        )}

        {/* Experience (Timeline Style) */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
              Experience
            </h2>

            <div className="space-y-6">
              {/* Map through each job entry */}
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  // Vertical line styling to create a subtle timeline effect
                  className="relative pl-6 border-l border-gray-200"
                >
                  {/* Job Title and Company */}
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">
                        {exp.position}
                      </h3>
                      {/* Company Name uses the accent color */}
                      <p className="font-medium" style={{ color: accentColor }}>
                        {exp.company}
                      </p>
                    </div>
                    {/* Date Range Badge */}
                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>
                  {/* Job Description (Preserves line breaks) */}
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line">
                      {exp.description}
                    </div>
                  )}
                  {/* NOTE: Could add an absolute dot here to visually mark the timeline point */}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects (Timeline Style) */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
              Projects
            </h2>

            <div className="space-y-6">
              {/* Map through each project entry */}
              {data.projects.map((p, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l border-gray-200"
                  // Applies the accent color to the vertical line
                  style={{ borderLeftColor: accentColor }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {p.name}
                      </h3>

                      {p.type && (
                        <p
                          className="text-sm font-medium mb-1"
                          style={{ color: accentColor }}
                        >
                          {p.type}
                        </p>
                      )}
                      {/* NOTE: Project type/date is not displayed in this part of the template */}
                    </div>
                  </div>

                  {p.description && (
                    <div className="text-gray-700 leading-relaxed text-sm mt-3">
                      {p.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Half: Education and Skills (Side-by-Side) */}
        <div className="grid sm:grid-cols-2 gap-8">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
                Education
              </h2>

              <div className="space-y-4">
                {/* Map through each education entry */}
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    {/* Institution Name uses the accent color */}
                    <p style={{ color: accentColor }}>{edu.institution}</p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills (Tag Style) */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {/* Map through each skill string and render it as a tag/badge */}
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm text-white rounded-full"
                    style={{ backgroundColor: accentColor }} // Dynamic accent background color
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
