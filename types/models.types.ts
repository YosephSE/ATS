import { Document, Schema } from "mongoose";

// Education sub-document interface
interface Education {
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number;
}

// Experience sub-document interface
interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

// Skills sub-document interface
interface Skill {
  skill: string;
}

// Main Candidate interface
export interface ICandidate extends Document {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  phoneNumber: string;
  resume: string;
  linkedIn: string;
  educaiton: Education[];
  experience: Experience[];
  skills: Skill[];
  bookmarks: Schema.Types.ObjectId[];
}

// Remove the duplicate export statement for 'ICandidate'
