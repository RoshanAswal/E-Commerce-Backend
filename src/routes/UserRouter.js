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
            return res.json({message:'N',data:"User already registered"});
        }else{
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(password, salt);

            await UserModel.create({username,password:hashedPassword,email,phoneNo:''});
            
            return res.json({message:'Y',data:"user registered!! Please login now"});
        }
    }catch(err){
        console.log(err);
        return res.json({data:null});
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

                const token=jwt.sign({id:user._id},process.env.SECRET);
                res.json({token,userId:user._id});
            }
        }else{
            return res.json({data:null});
        }

    }catch(err){
        console.log(err);
        return res.json(null);
    }
});

export {router as UserRouter};