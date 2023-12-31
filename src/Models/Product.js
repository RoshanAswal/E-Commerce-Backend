import mongoose from "mongoose";

const ProductSchema=new mongoose.Schema({
    productName:{type:String,required:true},
    productDescription:{type:String,required:true},
    productPrice:{type:Number},
    gender:{type:String},
    minAge:{type:Number},
    maxAge:{type:Number},
    brand:{type:String},
    Season:{type:String}
});

export const ProductModel=mongoose.model("Product",ProductSchema);