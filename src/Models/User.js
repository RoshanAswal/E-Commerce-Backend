import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String},
    phoneNo:{type:Number},
    address1:{type:String},
    address2:{type:String},
    upiId1:{type:String},
    upiId2:{type:String}
});

export const UserModel=mongoose.model("User",UserSchema);