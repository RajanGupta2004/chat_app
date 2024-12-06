import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import cookiesParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

const app = express();

const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cookiesParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
  connectDB();
});
