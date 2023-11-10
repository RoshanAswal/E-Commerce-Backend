import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { UserRouter } from './src/routes/UserRouter.js';
import { ProductRouter } from './src/routes/ProductRouter.js';
import { ProfileRouter } from './src/routes/ProfileRouter.js';

const app=express();

dotenv.config();

// app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors()); 

app.use("/auth",UserRouter);
app.use("/profile",ProfileRouter);
app.use("/",ProductRouter);



mongoose.connect(process.env.MONGODB_LOCAL_URL).then(console.log("connected to database"));

app.listen(3001,()=>{
    console.log("App is working on 3001");
});