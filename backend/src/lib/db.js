import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Database connection successfully : ${process.env.MONGODB_URL}`
    );
  } catch (error) {
    console.log("Error in to connect Data base", error);
  }
};
