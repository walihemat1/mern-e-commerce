import mongoose from "mongoose";

export const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("DB connection error: ", error);
    throw error;
  }
};
