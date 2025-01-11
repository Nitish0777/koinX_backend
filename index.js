import express from "express";
import db from "./src/config/database.js";
import cryptoRoutes  from "./src/routes/cryptoRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World! Welcome to your initial Express server!");
});

// Routes
app.use("/api", cryptoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
