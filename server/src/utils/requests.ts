import morgan from "morgan";
import fs from "fs";
import path from "path";
import { Express } from "express";
const logDirectory = path.join(__dirname, "../logs");

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);

const requestLogger = (app: Express) => {
  app.use(morgan("dev"));

  app.use(morgan("combined", { stream: accessLogStream }));
};

export default requestLogger;
