import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { UserRouter } from './src/routes/UserRouter.js';
import { ProductRouter } from './src/routes/ProductRouter.js';
import { ProfileRouter } from './src/routes/ProfileRouter.js';

const app=express();

dotenv.config();

app.use(express.json());
app.use(cors(
    {
        origin:['https://e-commerce-psi-self.vercel.app/'],
        methods:["POST","GET"],
        credentials:true
    }
)); 

app.use("/auth",UserRouter);
app.use("/",ProductRouter);
app.use("/profile",ProfileRouter);

mongoose.connect(process.env.MONGODB_LOCAL_URL).then(console.log("connected to database"));

app.listen(3001,()=>{
    console.log("App is working on 3001");
});