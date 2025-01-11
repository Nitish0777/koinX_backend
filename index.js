import express from 'express';

const app = express();

const PORT = process.env.PORT ||  3000;

app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to your initial Express server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});