import { Product } from "../models/product.js";

export const createProduct = async (req, res) => {
    //Only admin can create product
    try {
        if(!req.user || req.user.role !== 'admin') 
            return res.status(403).json({
                message: "You are not authorized to create a product",
            });
        
            const {title, description, category, price, stock} = req.body;

            const image = req.file;

            if(!image)
                return res.status(400).json({
                    message: "Please upload an image",
                });

                const product = await Product.create({
                    title,
                    description,
                    category,
                    price,
                    stock,
                    image: image?.path,
                });

                res.status(201).json({
                    message: "Product created successfully",
                    product,
                });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        
    }
}