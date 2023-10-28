import mongoose from "mongoose";

const HistoryProductsSchema=new mongoose.Schema({
    productName:{type:String,required:true},
    username:{type:String,required:true},
    productDescription:{type:String},
    productQuantity:{type:Number},
    totalAmount:{type:Number},
    dateOfPurchase:{type:Date},
    dateOfDelivery:{type:Date}
})

export const HistoryProductsModel=mongoose.model("HistoryProducts",HistoryProductsSchema);