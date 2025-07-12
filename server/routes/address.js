import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { addAddress } from '../controllers/address.js'; // fixed casing

const router = express.Router();

router.post("/address/new", isAuth, addAddress);
console.log("Address routes loaded");
export default router;