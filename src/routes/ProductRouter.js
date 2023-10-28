import express from 'express';

import { LikedProductModel } from "../Models/LikedProduct.js";
import { ProductModel } from '../Models/Product.js'
const router=express.Router();

router.get("/",async (req,res)=>{

    try{
        const products=await ProductModel.find({});
        return res.json(products);
    }catch(err){
        console.log(err);
        return res.json(null);
    }
});

router.get("/:productId",async (req,res)=>{
    const id=req.params.productId;

    try{
        const product=await ProductModel.findById(id);
        return res.json(product);
    }catch(err){
        console.log(err);
        return res.json(null);
    }
});

router.post("/:productId/addCart",async (req,res)=>{
    const id=req.params.productId;

    try{
        const product=await ProductModel.findById(id);
        await LikedProductModel.insertMany(product);
        return res.json("added to your cart");
    }catch(err){
        console.log(err);
        return res.json("Could not add the item");
    }
});

export {router as ProductRouter}
