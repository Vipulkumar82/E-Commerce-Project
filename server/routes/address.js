import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { addAddress } from '../controllers/Address.js';

const router = express.Router();

router.post("/address/new", isAuth, addAddress);
console.log("Address routes loaded");
export default router;