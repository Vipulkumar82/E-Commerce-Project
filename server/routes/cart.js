import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { addToCart, fetchCart } from '../controllers/cart.js';

const router = express.Router();

router.post("/cart/new", isAuth, addToCart);
router.get("/cart/all", isAuth, fetchCart);

export default router;