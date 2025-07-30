const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');
const authRoutes = require('./Routes/Auth');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('MongoDB connection failed:', err);
});
