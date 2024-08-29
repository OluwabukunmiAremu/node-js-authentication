import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
import { UserRouter } from "./routes/user.js";
import connectToDatabase from "./Mongodb.js";

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', UserRouter);

const options = {
  useNewUrlParser: true,
  socketTimeoutMS: 0,
  connectTimeoutMS: 2000000000,
  useUnifiedTopology: true,
};

// Wrap database connection and server startup in an async IIFE for proper error handling
(async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/authentication');
    console.log('DB connection created successfully!');

    // Handle database events
    const db = mongoose.connection;

    db.on('error', (err) => {
      console.log(`There was a db connection error: ${err.message}`, err);
    });

    db.once('disconnected', () => {
      console.log('DB connection disconnected!');
    });

    // Start the server
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    server.setTimeout(60000); // Set server timeout to 60 seconds

  } catch (error) {
    console.error(`Error occurred: ${error.message}`, error);
    process.exit(1); // Exit process with failure code
  }
})();
