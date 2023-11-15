import mongoose from "mongoose";

const LikedProductSchema=new mongoose.Schema({
    // userId:{type:}
    productName:{type:String,required:true},
    productDescription:{type:String,required:true},
    productPrice:{type:Number},
    gender:{type:String},
    minAge:{type:Number},
    maxAge:{type:Number},
    brand:{type:String},
    Season:{type:String}
});

export const LikedProductModel=mongoose.model("LikedProduct",LikedProductSchema);