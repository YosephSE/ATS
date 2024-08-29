import express, { Express } from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorhandler";
import connectDB from "./config/DB";
import cookieParser from "cookie-parser";
import cors from "cors";
import jobsRoute from "./routes/jobs.route";
import requestLogger from "./utils/requests";

dotenv.config();
const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(cors());
connectDB();

requestLogger(app);

app.use("/api/jobs", jobsRoute);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
