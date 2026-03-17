import { Folder, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProjectForm = ({ data = [], onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
      link: "",
      technologies: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateDescription = async (index) => {
    const project = data[index];

    if (!project.name || !project.type) {
      toast.error("Please fill in the Project Name and Type/Role first.");
      return;
    }

    setGeneratingIndex(index);

    // UPDATED PROMPT: Explicitly asking for 3 dot bullet points
    const prompt = `Enhance this project description: "${project.description}" for a project named "${project.name}" where my role was "${project.type}". 
    CRITICAL INSTRUCTION: Provide exactly 3 concise and professional dot bullet points (using the • symbol). Do not use stars (*) or dashes (-).`;

    try {
      const { data: responseData } = await api.post(
        "/api/ai/enhance-job-desc",
        {
          promptContent: prompt,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      updateProject(index, "description", responseData.enhancedContent);
      toast.success("Project Description Enhanced Successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to generate description.";
      toast.error(errorMessage);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Projects
          </h3>
          <p className="text-sm text-gray-500">Add your portfolio projects</p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Folder className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No projects added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-700">
                  Project #{index + 1}
                </h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  type="text"
                  placeholder="Project Name"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                />

                <input
                  value={project.type || ""}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  type="text"
                  placeholder="Role / Project Type"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Project Description
                  </label>

                  <button
                    onClick={() => generateDescription(index)}
                    disabled={
                      generatingIndex === index ||
                      !project.name ||
                      !project.type
                    }
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors disabled:opacity-50"
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  className="w-full text-sm px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none resize-none whitespace-pre-line"
                  placeholder="Example: • Developed X... \n• Optimized Y... \n• Delivered Z..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
