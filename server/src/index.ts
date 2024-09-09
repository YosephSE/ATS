import express, { Express } from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorhandler";
import connectDB from "./config/DB";
import cookieParser from "cookie-parser";
import cors from "cors";
import jobsRoute from "./routes/jobs.route";
import candidateRoute from "./routes/candidates.route";
import adminAuth from "./routes/adminAuth";
import applicationRoute from "./routes/applications.route";
import requestLogger from "./utils/requests";

dotenv.config();
const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Set-Cookie", "Cookie"],
  })
);
app.use(express.urlencoded({ extended: true }));
connectDB();

requestLogger(app);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Job Portal and Application Tracking API!");
});

app.use("/api/jobs", jobsRoute);
app.use("/api/candidates", candidateRoute);
app.use("/api/admins", adminAuth);
app.use("/api/applications", applicationRoute);

app.use((req, res, next) => {
  const err = new Error();
  (err as any).status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
