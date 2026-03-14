import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import React from "react";

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    // Destructure the year and month components.
    const [year, month] = dateStr.split("-");

    // NOTE: month - 1 is necessary because JavaScript Date months are 0-indexed (0 = January).
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
      {/* Header: Name and Contact Info */}
      <header
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: accentColor }} // Dynamic accent color for the border
      >
        {/* Full Name */}
        <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {/* Contact Details Row */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {/* Email (Conditionally Rendered) */}
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {/* Phone (Conditionally Rendered) */}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {/* Location (Conditionally Rendered) */}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {/* LinkedIn (Conditionally Rendered) */}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="size-4" />
              {/* Uses break-all for long URLs to prevent overflow */}
              <span className="break-all">{data.personal_info.linkedin}</span>
            </div>
          )}
          {/* Website (Conditionally Rendered) */}
          {data.personal_info?.website && (
            <div className="flex items-center gap-1">
              <Globe className="size-4" />
              <span className="break-all">{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: accentColor }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience (Conditionally Rendered if data exists) */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-4">
            {/* Map through each job entry */}
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-3 pl-4"
                style={{ borderColor: accentColor }} // Dynamic accent color for the vertical line
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {/* Dates: Uses formatDate helper, checks for 'is_current' */}
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </p>
                  </div>
                </div>
                {/* Job Description (Conditionally Rendered) */}
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {/* preserves line breaks from the textarea input */}
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects (Conditionally Rendered if data exists) */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PROJECTS
          </h2>

          <ul className="space-y-3 ">
            {/* Map through each project entry */}
            {data.projects.map((proj, index) => (
              <div
                key={index}
                className="flex justify-between items-start border-l-3 border-gray-300 pl-6"
              >
                <div>
                  <li className="font-semibold text-gray-800 ">{proj.name}</li>
                  {proj.type && (
                    <span className="text-sm text-gray-500">
                      {proj.type}
                    </span>
                  )}
                  <p className="text-gray-600">{proj.description}</p>
                </div>
                {/* NOTE: Project section template is missing date/time display */}
              </div>
            ))}
          </ul>
        </section>
      )}

      {/* Education (Conditionally Rendered if data exists) */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            EDUCATION
          </h2>

          <div className="space-y-3">
            {/* Map through each education entry */}
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {/* Degree and Field of study */}
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {/* GPA (Conditionally Rendered) */}
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
                {/* Graduation Date */}
                <div className="text-sm text-gray-600">
                  <p>{formatDate(edu.graduation_date)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills (Conditionally Rendered if data exists) */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            CORE SKILLS
          </h2>

          {/* Skills List: Simple bulleted format */}
          <div className="flex gap-4 flex-wrap">
            {data.skills.map((skill, index) => (
              <div key={index} className="text-gray-700">
                • {skill}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
