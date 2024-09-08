import { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    firstTime: {
      type: Boolean,
      default: true,
    },
    profilePicture: {
      type: String,
    },
    // Super admins and admins
    role: {
      type: String,
      default: "admin",
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Admin = model("Admin", adminSchema, "Admins");

export default Admin;
