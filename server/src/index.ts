import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/DB";
import cookieParser from "cookie-parser";
import cors from "cors";
import jobsRoute from "./routes/jobs.route";
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(cors());
connectDB();



app.use("/api/jobs", jobsRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
