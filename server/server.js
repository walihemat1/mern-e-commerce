const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");

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
app.use(express.json());

// routes
app.use("/api/user", userRoutes);

app.use("*");

app.listen(PORT, () => console.log(`app is listening on ${PORT}`));
