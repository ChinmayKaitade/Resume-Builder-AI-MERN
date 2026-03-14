import React from "react";

const MinimalTemplate = ({ data, accentColor }) => {
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
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">
      {/* Header: Name and Contact Info */}
      <header className="mb-10">
        {/* Full Name: Large, thin font weight is characteristic of this minimal style. */}
        <h1 className="text-4xl font-thin mb-4 tracking-wide">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {/* Contact Details Row: Simple text separators/spacing */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.location && (
            <span>{data.personal_info.location}</span>
          )}
          {data.personal_info?.linkedin && (
            <span className="break-all">{data.personal_info.linkedin}</span>
          )}
          {data.personal_info?.website && (
            <span className="break-all">{data.personal_info.website}</span>
          )}
        </div>
      </header>

      {/* Professional Summary (Placed high for prominence) */}
      {data.professional_summary && (
        <section className="mb-10">
          <p className=" text-gray-700">{data.professional_summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-10">
          {/* Section Heading: Small, uppercase, wide tracking, accent color */}
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          <div className="space-y-6">
            {/* Map through each job entry */}
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-medium">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {/* Date Range Logic */}
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company}</p>
                {/* Job Description (Preserves line breaks from textarea) */}
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          <div className="space-y-4">
            {/* Map through each project entry */}
            {data.projects.map((proj, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 justify-between items-baseline"
              >
                <h3 className="text-lg font-medium ">{proj.name}</h3>
                {/* NOTE: Project descriptions are rendered without bullet points in this template */}
                {/* Role / Project Type */}
                {proj.type && (
                  <span className="text-sm text-gray-500 font-normal">
                    {proj.type}
                  </span>
                )}
                <p className="text-gray-600">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-4">
            {/* Map through each education entry */}
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          {/* Skills List: Simple list separated by a medium bullet ( • ) */}
          <div className="text-gray-700">{data.skills.join(" • ")}</div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
