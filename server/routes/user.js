import express from 'express';
import { register,verifyUser } from '../controllers/user.js';

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser); // Assuming you want to use the same controller for verification

export default router;