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
                process.env.Activation_Secret,{
                    expiresIn: "5m"
                }
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

export const verifyUser = async(req, res)=>{
    try {
        const {otp, activationToken} = req.body;

        const verify= jwt.verify(
            activationToken,
            process.env.Activation_Secret
        );
        if(!verify)
            return res.status(400).json({
                message: "OTP Expired"
            });
        if(verify.otp !== otp)
            return res.status(400).json({
                message: "Invalid OTP"
            });
            
            await User.create({
                name: verify.user.name,
                email: verify.user.email,
                password: verify.user.password,
            });

            res.json({
                message: "User registered successfully",
            });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({
                message: "Ivalid Credentials",
            });
        
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword)
            return res.status(400).json({
                message: "Invalid Credentials",
            });

            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "10d" }
            );
            res.json({
                message: `Welcome back ${user.name}`,
                token,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({ user });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}
