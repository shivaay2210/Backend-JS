// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

// databases : two important points
// 1. always try to wrap in try-catch
// 2. databses is always in another continent always use async-await

// 1st method : and use this only in future 
connectDB()


// 2nd method : bad practice
/*
import express from "express";
const app = express();

// IIFE : ()()

;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App listening on PORT: ${process.env.PORT}`);
        })
         
    } catch (error) {
        console.log("ERROR: ", error);
        throw error;
    }
})()
*/