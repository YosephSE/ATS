
import { Schema, model } from "mongoose";

const candidateSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  resume: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  pdf:{
    type: String
  },
  education: [
    {
      schoolName: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      startYear: {
        type: Number,
        required: true,
      },
      endYear: {
        type: Number,
        required: true,
      },
    },
  ],
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

const Candidate = model("Candidate", candidateSchema, "Candidates");

export default Candidate;
