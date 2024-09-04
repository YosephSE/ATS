import express, { Express } from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorhandler";
import connectDB from "./config/DB";
import cookieParser from "cookie-parser";
import cors from "cors";
import jobsRoute from "./routes/jobs.route";
import candidateAuth from "./routes/candidateAuth"
import adminAuth from "./routes/adminAuth";
import requestLogger from "./utils/requests";

dotenv.config();
const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
connectDB();

requestLogger(app);

app.use("/api/jobs", jobsRoute);
app.use("/api/candidates", candidateAuth);
app.use("/api/admins", adminAuth);

app.use((req, res, next) => {
  const err = new Error();
  (err as any).status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
