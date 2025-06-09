import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { createProduct, fetchProducts } from "../controllers/product.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.post("/product/new", isAuth, uploadFiles, createProduct);
router.get("/product/all", fetchProducts);

export default router;
