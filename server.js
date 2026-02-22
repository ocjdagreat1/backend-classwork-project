import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoute from "./route/user.js";
import productRoute from "./route/products.js";

dotenv.config();

const server = express();
server.use(express.json());

/* ================= CORS ================= */

const allowedOrigins = [
  "https://tesla-com-psi.vercel.app",
  "https://house-project-six.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175"
];

server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman / Mobile Apps

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

server.options("", cors());

/* ================= ROUTES ================= */

// Health check route (IMPORTANT for Render)
server.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

server.use("/api/users", userRoute);
server.use("/api/product", productRoute);

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
