import { Product } from "../models/product.js";

export const createProduct = async (req, res) => {
    //Only admin can create product
    try {
        if(!req.user || req.user.role !== 'admin') 
            return res.status(403).json({
                message: "You are not authorized to create a product",
            });
        
            const {title, description, category, price, stock} = req.body;

            // const image = req.file;

            // if(!image)
            //     return res.status(400).json({
            //         message: "Please upload an image",
            //     });

                const product = await Product.create({
                    title,
                    description,
                    category,
                    price,
                    stock,
                    // image: image?.path,
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

export const fetchProducts = async (req, res) => {
    try {
        const { search, category, price, page } = req.query;

        const filter = {};
        if (search) {
            filter.title = { 
                $regex: search, $options: 'i' 
            }; // Case-insensitive search
        }
        if (category) {
            filter.category = category;
        }
        if(price){
            filter.price ={
            $gte: Number(price),
            }
        }
        const countProduct = await Product.countDocuments();
        const limit = 5; //this means we want to show only 5 product in 1 page
        const skip = (page - 1) * limit;
        const totalPages = Math.ceil(countProduct / limit);
        const products = await Product.find(filter)
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 }); // Sort by createdAt in descending order
        
            const categories = await Product.distinct("category");
            const mostSelling = await Product.find()
            .sort({ sold: -1 })
            .limit(3);

        res.json({
            products,
            totalPages,
            categories,
            mostSelling
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });        
    }
}