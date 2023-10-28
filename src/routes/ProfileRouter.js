import express from 'express';

import { LikedProductModel } from "../Models/LikedProduct.js";
import { HistoryProductsModel } from "../Models/HistoryProducts.js";
import { UserModel } from "../Models/User.js";

const router=express.Router();

router.get("/:username",async (req,res)=>{
    const username=req.params.username;

    try{
        const user=await UserModel.findOne({username});
        
        if(user){
            return res.json(user);
        }else{
            console.log("not found");
            return res.json(null);
        }
    }catch(err){
        console.log(err);
        return res.json(null);
    }
});

router.get("/cart/:username",async (req,res)=>{
    const username=req.params.username;

    try{
        const products=await LikedProductModel.find({username});
        
        if(products){
            return res.json(products);
        }else{
            console.log("not found");
            return res.json(null);
        }
    }catch(err){
        console.log(err);
        return res.json(null);
    }
});

router.get("/history/:username",async (req,res)=>{
    const username=req.params.username;

    try{
        const products=await HistoryProductsModel.find({username});

        if(products){
            console.log("here are your products");
            return res.json(products);
        }else{
            console.log("not found");
            return res.json(null);
        }
    }catch(err){
        console.log(err);
        return res.json(null);
    }
});


router.put("/edit/:username/",async (req,res)=>{
    const {email,phoneNo,address1,address2,upiId1,upiId2}=req.body;
    const username=req.params.username;
    try{
        const user=await UserModel.findOne({username});
        
        if(user){
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

router.put("/deleteProduct/:username",async (req,res)=>{
    const username=req.params.username;
    const {productName,model}=req.body;
    try{
        if(model==="his"){
            const products=await HistoryProductsModel.findOne({username,productName});
            
            if(products){
                await HistoryProductsModel.deleteOne({username,productName});
                return res.json("Deleted from history");
            }else{
                console.log("not found in history");
                return res.json(null);
            }
        }else{
            const products=await LikedProductModel.findOne({username,productName});
            
            if(products){
                await LikedProductModel.deleteOne({username,productName});
                console.log("deleted from cart");
                return res.json("Deleted from cart");
            }else{
                console.log("not found in Cart");
                return res.json(null);
            }            
        }

    }catch(err){
        console.log(err);
        return res.json(null);
    }
});

router.put("/cart/checkout/:username",async (req,res)=>{
    const username=req.params.username;
    
    try{
        const products=await LikedProductModel.find({username});
        
        if(products){
            await HistoryProductsModel.insertMany(products);
            await LikedProductModel.deleteMany({username});

            console.log("moved");
            return res.json("Moved");
        }else{
            console.log("empty cart");
            return res.json(null);
        }

    }catch(err){
        console.log(err);
        res.json(null);
    }
})

export {router as ProfileRouter}