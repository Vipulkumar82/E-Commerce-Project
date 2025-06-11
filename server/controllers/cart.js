import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

export const addToCart = async (req, res) => {
    try {
        const {product } = req.body;

        const cart = await Cart.findOne({
            product : product,
            user: req.user._id,
        }).populate("product");

        if (cart){
            if(cart.product.stock== cart.quantity)
                return res.status(400).json({
                    message: "Out of stock",
                });
            
            cart.quantity += 1;
            await cart.save();

            return res.status(200).json({
                message: "Added to Cart",
            });
        }
        const cartProduct = await Product.findById(product);

        if (cartProduct.stock === 0) 
            return res.status(400).json({
                message: "Out of stock",
            });
            
            await Cart.create({
                quantity: 1,
                product: product,
                user: req.user._id,
            });
            res.status(200).json({
                message: "Added to Cart",
            });
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const fetchCart = async (req, res) => {
    try {
        const cart = await Cart.find({ user: req.user._id })
            .populate("product")
        
        const sumOfQuantities = cart.reduce((acc, item) => acc + item.quantity, 0);

        let subTotal = 0;
        cart.forEach((item) => {
            const itemSubTotal = item.quantity * item.product.price;
            subTotal += itemSubTotal;
        });

        res.json({
            cart,
            sumOfQuantities,
            subTotal,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);

        await cart.deleteOne();
        res.status(200).json({
            message: "Removed from Cart",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        
    }
}

export const updateCart = async(req, res)=>{
    try {
        const {action} = req.query;

        if(action === "increment"){
            const {id}  = req.body;
            const cart = await Cart.findById(id).populate("product");

           if(cart.quantity < cart.product.stock){
            cart.quantity++;
            await cart.save();
           }else{
            return res.status(400).json({
                message: "Out of stock",
            });
           }
            return res.status(200).json({
                message: "Cart updated",
            });
        }

        if(action === "decrement"){
            const {id} = req.body;

            const cart = await Cart.findById(id).populate("product");

            if(cart.quantity >1 ){
                cart.quantity--;
                await cart.save();
            }else{
                return res.status(400).json({
                    message: "You have only one item in your cart",
                });
            }
            return res.status(200).json({
                message: "Cart updated",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
        
    }
}