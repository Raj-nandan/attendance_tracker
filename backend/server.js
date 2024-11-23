import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";
import { dbConnect } from "./configs/dbConnect.js";
import authRoute from "./routes/authRoute.js";
import attendaceRoute from "./routes/attendanceRoute.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// DB
dbConnect();
// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/attendance", attendaceRoute);
app.use("/api/employee", userRoutes);

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(
    chalk.green("->"),
    chalk.blue(` Server is running on port ${PORT}`)
  )
);
