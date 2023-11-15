import mongoose, { mongo } from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String},
    phoneNo:{type:Number},
    address1:{type:String},
    address2:{type:String},
    upiId1:{type:String},
    upiId2:{type:String},
    likedProducts:[
        {type:mongoose.Types.ObjectId,ref:'Product'}
    ],
    historyProducts:[
        {type:mongoose.Types.ObjectId,ref:'Product'}
    ]
});

export const UserModel=mongoose.model("User",UserSchema);