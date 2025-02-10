import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"

export const signup = async (req,res)=>{
    try {
        const {email,fullName,password} = req.body;
        if(!email || !fullName || !password){
            return res.status(400).json({message:"All fields are requierd "});
        }
        if(password.length < 6) {
            return res.status(400).json({message:"password must be at least 6 characters"});
        } 
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"User Already Exist"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser =new User({
            email:email,
            fullName:fullName,
            password:hashedPassword
        });
        if(newUser){
            // generate jwt here
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(202).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({message:"Invalid User Data"});
        }
    } catch(error){
        console.log("error in sign up: ", error.message);
        res.status(500).json({message:"internal error"});

    }
    
};

export const login = (req,res)=>{
    res.send("log in");
};

export const logout = (req,res)=>{
    res.send("log out ");
};