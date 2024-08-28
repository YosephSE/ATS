import { Schema, model } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      aboutJob: {
        type: String,
        required: true,
      },
      requirements: {
        type: String,
        required: true,
      },
      responsibilities: {
        type: String,
        required: true,
      },
      additional: {
        type: String,
      },
    },
    location: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    // types: full-time, part-time, contract, internship, Inperson, Remote
    type: {
      type: String,
      required: true,
    },
    // status: active, inactive
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Job = model("Job", jobSchema, "Jobs");

export default Job;
