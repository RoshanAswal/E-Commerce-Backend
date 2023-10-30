import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { UserModel } from '../Models/User.js';

const router=express.Router();

dotenv.config();

router.post("/register",async (req,res)=>{
    const {username,password,email}=req.body;
    
    try{
        const user=await UserModel.findOne({username});
        if(user){
            res.json("User already registered");
        }else{
            const hashedPassword=await bcrypt.hash(password,10);
            const newUser=new UserModel({username,password:hashedPassword,email});
            await newUser.save();
            console.log("user registered");
            return res.json("user registered!! Please login now");
        }
    }catch(err){
        console.log(err);
        return res.json(null);
    }
});

router.post("/login",async (req,res)=>{
    const {username,password}=req.body;

    try{

        const user=await UserModel.findOne({username});
       
        if(user){

            const hashedPassword=await bcrypt.compare(password,user.password);

            if(!hashedPassword){
                return res.json(null);
            }else{
                console.log("Welcome");

                const token=jwt.sign({id:user._id},process.env.SECRET);
                res.json({token,userId:user._id});
            }
        }else{
            console.log("User not found");
            return res.json(null);
        }

    }catch(err){
        console.log(err);
        return res.json(null);
    }
});

export {router as UserRouter};