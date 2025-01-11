import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = "mongodb://127.0.0.1:27017/express-mongo";

const connectToMongoDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connected to MongoDB!", MONGO_URI);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

connectToMongoDB();

export default mongoose;
