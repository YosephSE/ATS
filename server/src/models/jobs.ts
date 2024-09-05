import { Schema, model } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },
    salary: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
        required: true,
      },
    ],
    responsibilities: [
      {
        type: String,
        required: true,
      },
    ],

    status: {
      type: String,
      required: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);
const Job = model("Job", jobSchema, "Jobs");

export default Job;
