import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "Untitled Resume",
      trim: true,
    },
    public: {
      type: Boolean,
      default: false,
    },
    template: {
      type: String,
      default: "classic",
      enum: ["classic", "modern", "minimal", "minimal-image"],
    },
    accent_color: {
      type: String,
      default: "#3b82f6",
    },

    professional_summary: {
      type: String,
      default: "",
    }, // 👇 MODIFIED: Change the type from 'String' to '[String]'
    skills: {
      type: [String], // Array of Strings is the correct type for a list of skills
      default: [], // Add a default empty array for safety
    },

    personal_info: {
      image: { type: String, default: "" },
      full_name: { type: String, default: "" },
      profession: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    experience: [
      {
        company: { type: String, required: true },
        position: { type: String, required: true },
        start_date: { type: String },
        end_date: { type: String },
        description: { type: String },
        is_current: { type: Boolean, default: false },
      },
    ],

    projects: [
      {
        name: { type: String, required: true },
        type: { type: String },
        description: { type: String },
      },
    ],

    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String },
        field: { type: String },
        graduation_date: { type: String },
        gpa: { type: String },
      },
    ],
  },
  {
    timestamps: true,
    minimize: false,
  },
);

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
