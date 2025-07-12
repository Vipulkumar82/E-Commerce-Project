import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { addAddress, deleteAddress, fetchAllAddress, getSingleAddress } from '../controllers/address.js';

const router = express.Router();

router.post("/address/new", isAuth, addAddress);
router.get("/address/all", isAuth, fetchAllAddress);
router.get("/address/single/:id", isAuth, getSingleAddress);
router.delete("/address/delete/:id", isAuth, deleteAddress);
export default router;