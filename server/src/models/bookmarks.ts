import { Schema, model } from "mongoose";

const bookmarkSchema = new Schema(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  { timestamps: true }
);

const Bookmark = model("Bookmark", bookmarkSchema, "Bookmarks");

export default Bookmark;
