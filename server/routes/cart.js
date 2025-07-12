import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { addToCart, fetchCart, removeFromCart } from '../controllers/cart.js';

const router = express.Router();

router.post("/cart/new", isAuth, addToCart);
router.delete("/cart/:id", isAuth, removeFromCart);
router.get("/cart/all", isAuth, fetchCart);

export default router;