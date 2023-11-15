import express from 'express';

import { LikedProductModel } from "../Models/LikedProduct.js";
import { ProductModel } from '../Models/Product.js'
import { UserModel } from '../Models/User.js';
const router=express.Router();

router.get("/",async (req,res)=>{

    try{
        const products=await ProductModel.find({});
        return res.json({products});
    }catch(err){
        console.log(err);
        return res.json(null);
    }
});

router.get("/:productId",async (req,res)=>{
    const id=req.params.productId;

    try{
        const product=await ProductModel.findById(id);

        return res.json({product});
    }catch(err){
        console.log(err);
        return res.json(null);
    }
});

router.post("/newProduct",async (req,res)=>{

    try{
        const newProduct=await new ProductModel(req.body).save();
        res.json("new product saved");
    }catch(err){
        console.log(err);
    }
});

router.put("/:userId/:productId/addCart",async (req,res)=>{
    const {userId,productId}=req.params;
    const user=await UserModel.findById(userId);
    console.log(user);
    try{
        const response=user.likedProducts.find((e)=>e==productId);
        if(response){
            return res.json({data:'already',msg:"Already added in cart"});            
        }
        await UserModel.updateOne({_id:userId},
            {$push:{likedProducts:productId}}
        )
        return res.json({data:'noError',msg:"Added to your cart"});
    }catch(err){
        console.log(err);
        return res.json({data:'error',msg:"Could not add the item"});
    }
});

export {router as ProductRouter}
