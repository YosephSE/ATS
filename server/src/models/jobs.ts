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
    minSalary: {
      type: Number,
      required: true,
    },
    maxSalary: {
      type: Number,
      required: true,
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
      type: Boolean,
      required: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      // required: true,
    },
  },
  { timestamps: true }
);
const Job = model("Job", jobSchema, "Jobs");

export default Job;
