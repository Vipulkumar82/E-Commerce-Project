import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendMail from '../middlewares/sendMail.js';

export const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ 
                message: "User already exists"
            });        
        }
        const hashPassword = await bcrypt.hash(password, 10);
             user = {
                name,
                email,
                password: hashPassword,
             };

             const otp =Math.floor(Math.random() * 1000000);

             const activationToken = jwt.sign(
                {user, otp},
                process.env.Activation_Secret,
            )
        await sendMail(
            email,
            "Verify your email",
            `Your activation code is ${otp}. Use this code to activate your account.`
        );
        res.status(200).json({
            message: "OTP sent to your email",
            activationToken,
        });
    }catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }
}