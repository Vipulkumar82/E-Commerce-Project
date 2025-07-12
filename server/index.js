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
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import addressRoutes from './routes/address.js';

//using routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", addressRoutes);

app.use("/uploads", express.static("uploads"));


app.listen(port,()=> {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});

