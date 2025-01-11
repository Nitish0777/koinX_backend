import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://172.0.0.1:27017/express-mongo";

  console.log(MONGO_URI);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connection lost. Attempting to reconnect...");
});

export default mongoose;