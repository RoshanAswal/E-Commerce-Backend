import express from 'express';

import { LikedProductModel } from "../Models/LikedProduct.js";
import { HistoryProductsModel } from "../Models/HistoryProducts.js";
import { UserModel } from "../Models/User.js";
import mongoose, { Mongoose, ObjectId } from 'mongoose';

const router=express.Router();

router.get("/:userId",async (req,res)=>{
    const userId=req.params.userId;

    try{
        const user=await UserModel.findById(userId);
        
        if(user){
            return res.json({user});
        }else{
            console.log("not found");
            return res.json(null);
        }
    }catch(err){
        console.log(err);
        return res.json(null);
    }
});

router.get("/:userId/cart",async (req,res)=>{
    const userId=req.params.userId;

    try{
        const user=await UserModel.findById(userId);
        if(user){
            const products=await user.populate('likedProducts');
            return res.json({products:products.likedProducts});
        }else{
            return res.json({data:null});
        }
    }catch(err){
        return res.json(null);
    }
});

router.get("/:userId/history",async (req,res)=>{
    const userId=req.params.userId;

    try{
        const user=await UserModel.findById(userId);
        if(user){
            const products=await user.populate('historyProducts');
            return res.json({products:products.historyProducts});
        }else{
            return res.json({data:null});
        }
    }catch(err){
        return res.json(null);
    }
});


router.put("/edit/:userId/",async (req,res)=>{
    const {username,email,phoneNo,address1,address2,upiId1,upiId2}=req.body;
    const userId=req.params.userId;
   
    try{
        const user=await UserModel.findById(userId);
        
        if(user){
            if(username!="")user.username=username;
            if(email!="")user.email=email;
            if(phoneNo!="")user.phoneNo=phoneNo;
            if(address1!="")user.address1=address1;
            if(address2!="")user.address2=address2;
            if(upiId1!="")user.upiId1=upiId1;
            if(upiId2!="")user.upiId2=upiId2;
            
            await user.save();
            return res.json("Updated "+ username + " details");
        }else{
            console.log("user not found");
            return res.json(null);
        }
    }catch(err){
        console.log(err);
        return res.json(null);
    }
});

router.put("/:userId/deleteProduct",async (req,res)=>{
    const userId=req.params.userId;
    const {model,index}=req.body;
    const user=await UserModel.findById(userId);
    try{
        if(model==="his"){
            user.historyProducts.splice(index,1);
        }else{
            user.likedProducts.splice(index,1);
        }
        user.save();
        return res.json({data:"successfully deleted"});
    }catch(err){
        return res.json({data:'error'});
    }
});

router.put("/cart/checkout/:userId",async (req,res)=>{
    const userId=req.params.userId;
    const user=await UserModel.findById(userId);
    try{
        await UserModel.updateOne({_id:userId},
            {
                $push:{historyProducts:{$each:user.likedProducts}},
                $set:{likedProducts:[]}
            },
        );
        return res.json({data:'Checked out'});
    }catch(err){
        res.json({data:"error"});
    }
});

export {router as ProfileRouter}