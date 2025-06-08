import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';

const app = express();
dotenv.config();

//middleware
app.use(express.json());

const port = process.env.PORT;

//importing routes
import userRoutes from './routes/user.js';

//using routes
app.use("/api", userRoutes);
app.listen(port,()=> {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});

