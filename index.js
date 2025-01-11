import express from "express";
import db from "./src/config/database.js";
import cryptoRoutes from "./src/routes/cryptoRoutes.js";
import cron from "node-cron";
import fetchCryptoData from "./src/jobs/fetchCryptoData.js";

const app = express();

const PORT = process.env.PORT || 3000;

cron.schedule("0 */2 * * *", fetchCryptoData);

app.get("/", (req, res) => {
  res.send("Hello, World! Welcome to your initial Express server!");
});

// Routes
app.use("/api", cryptoRoutes);

fetchCryptoData();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
