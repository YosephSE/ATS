import mongoose, { Schema } from "mongoose";

const ErrorLogSchema: Schema = new Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  stack: { type: String },
  status: { type: Number },
  additionalInfo: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

const ErrorLog = mongoose.model("ErrorLog", ErrorLogSchema);

export default ErrorLog;
