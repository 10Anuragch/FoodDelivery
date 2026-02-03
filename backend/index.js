
import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import authRoutes from "./Routes/Auth.js";
import adminRoutes from "./Routes/adminRoutes.js";

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);         
app.use("/api/admin", adminRoutes);       

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
