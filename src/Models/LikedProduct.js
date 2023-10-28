import mongoose from "mongoose";

const LikedProductSchema=new mongoose.Schema({
    productName:{type:String,required:true},
    username:{type:String,required:true},
    productDescription:{type:String},
    productPrice:{type:String},
    productQuantity:{type:Number},
    totalAmount:{type:Number}
});

export const LikedProductModel=mongoose.model("LikedProduct",LikedProductSchema);