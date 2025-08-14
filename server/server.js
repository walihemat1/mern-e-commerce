import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import adminProductRouter from "./routes/productRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
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

// using express.json() will allow us to get the data from the http body like req.body
app.use(express.json());

// urlencoded will allow us to send form data
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouter);

connectDB(process.env.LOCAL_MONGO_DB_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
  })
  .catch((error) => {
    process.exit(1);
  });
