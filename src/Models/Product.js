import mongoose from "mongoose";

const ProductSchema=new mongoose.Schema({
    productName:{type:String,required:true},
    productDescription:{type:String,required:true},
    productPrice:{type:String},
});

export const ProductModel=mongoose.model("Product",ProductSchema);