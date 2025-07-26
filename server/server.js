import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

env.config();

mongoose
  .connect(process.env.LOCAL_DB)
  .then(() => console.log("DB connected successfully!"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "https://localhost:5173/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.listen();
