import { Plus, Trash2 } from "lucide-react";
import React from "react";

// 1. FIX: Set 'data' prop to an empty array '[]' by default
// to prevent "Cannot read properties of undefined (reading 'map')" error.
const ProjectForm = ({ data = [], onChange }) => {
  const addProject = () => {
    // 2. ENHANCEMENT: Define the structure of a new project entry with new fields.
    const newProject = {
      name: "",
      type: "",
      description: "",
    };

    // Use the spread operator to create a new array instance for immutability.
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    // Filter the array, keeping only items whose index does not match.
    const updated = data.filter((_, i) => i !== index);

    // Pass the new filtered array back to the parent state.
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    // 1. Create a shallow copy of the main array.
    const updated = [...data];

    // 2. Create a shallow copy of the specific object and update the field.
    updated[index] = { ...updated[index], [field]: value };

    // Pass the new array back to the parent state.
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Projects
          </h3>

          <p className="text-sm text-gray-500">Add your Projects</p>
        </div>

        {/* Button to Add a new Project Entry */}
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {/* Project List Container */}
      <div className="space-y-4 mt-6">
        {/* 3. ENHANCEMENT: Show a placeholder if no projects are added. */}
        {data.length === 0 ? (
          <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg text-gray-500">
            Click "Add Project" to start listing your portfolio projects.
          </div>
        ) : (
          /* Map through all project entries to render individual form blocks */
          data.map((project, index) => (
            <div
              key={index} // Key is used here for mapping stability.
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                {/* Title and Remove Button */}
                <h4>Project #{index + 1}</h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Input Fields for a Single Project */}
              <div className="grid gap-3">
                {/* Project Name */}
                <input
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  type="text"
                  placeholder="Project Name"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />

                {/* Project Type/Role */}
                <input
                  value={project.type || ""}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  type="text"
                  placeholder="Role / Project Type (e.g., Lead Developer)"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />

                {/* Description Textarea */}
                <textarea
                  rows={4}
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  placeholder="Describe your project, your contributions, and the outcomes..."
                  className="w-full px-3 py-2 text-sm rounded-lg resize-none border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
