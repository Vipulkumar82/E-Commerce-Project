import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuth = async(req, res, next) => {

    try {
        const token = req.headers.token;
        if (!token) 
            return res.status(403).json({
                message: "Please login to continue",
            });
        
            const decodedData= jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decodedData.id);
            next();
    } catch (error) {
        return res.status(403).json({
            message: "Please login to continue",
        });
        
    }
}